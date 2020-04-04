#!/bin/bash

# NOTE: This script is intended for use by external repos that depend
#   on the Set Protocol smart contracts in any capacity. To deploy the Set Protocol
#   smart contracts on your local blockchain environment,
#   you can call this script, which will deploy the smart contracts
#   to your local chain and subsequently *locally* update the artifacts exported by
#   the package to reflect the newly deployed contracts' addresses.
#
# The build/ directory is used for day-to-day development environment
# environment, whereas the artifacts/ directory is to store production
# artifacts (i.e. artifacts which we publish in the contracts
# NPM package).
#
# Truffle will by default use the build folder to fetch the most recent
# artifacts and update them with the newly deployed contract
# addresses, saving the newest artifacts in build.
#
# Thus, when pushing a new build to a development network, we want to replace build
# folder with most recent saved  production artifacts/ directory contents
# so that our new artifacts include the addresses of contracts deployed in production
# on networks *other* than development.

# Deploy contracts onto development network
truffle migrate --network development

# Replace production artifacts with newly generated json artifacts
rm artifacts/json/*

mkdir artifacts/ts
mkdir artifacts/json

cp build/contracts/* artifacts/json/

# Remove old transpiled artifacts from the artifacts/ directory
rm -rf artifacts/ts/*

# Replace the auto-generated lines in the index.ts file
if [[ "$OSTYPE" == "darwin"* ]]; then
  # Mac OSX
  [ -f "artifacts/index.ts" ] && sed -i '' '/AUTO-GENERATED$/d' artifacts/index.ts
else
  [ -f "artifacts/index.ts" ] && sed -i '/AUTO-GENERATED$/d' artifacts/index.ts
fi

# Transform raw JSON artifacts into Typescript modules.  This makes
# interacting with the artifacts significantly easier when exporting
# them as modules.
for filename in build/contracts/*.json; do
  filename_base=$(basename $filename .json)

  # Extract out the folder name to keep the folder structure of own contracts folder

  # IMPORTANT: CHANGE THE REPO NAME IN REGEX IF CHANGING TO ANOTHER REPO: set-protocol-contracts
  regex="\"sourcePath\": \"[a-zA-Z_0-9\/\-]+\/set-protocol-contracts\/contracts\/([a-zA-Z_0-9\/\-]+)\/.+\.sol\""
  json=$(<build/contracts/$filename_base.json)
  if [[ $json =~ $regex ]]
  then
    folder="${BASH_REMATCH[1]}"
    # echo $folder
    mkdir -p "artifacts/ts/$folder"

    filename_base=$(basename $filename .json)
    new_file="artifacts/ts/$folder/$filename_base.ts"

    echo -e "export const $filename_base = " > $new_file
    cat "build/contracts/$filename_base.json" >> $new_file

    # Add export lines to artifacts/index.ts
    echo -e "export { $filename_base } from \"./ts/$folder/$filename_base\"; // THIS LINE IS AUTO-GENERATED" | cat - artifacts/index.ts > temp && mv temp artifacts/index.ts

    echo -e "Transpiled $filename_base.json into $new_file"
  else
    filename_base=$(basename $filename .json)
    new_file="artifacts/ts/$filename_base.ts"

    echo -e "export const $filename_base = " > $new_file
    cat "build/contracts/$filename_base.json" >> $new_file
  fi
done

echo -e "Successfully deployed contracts onto Development Testnet!"

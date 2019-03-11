# To make it really easy to work with the outputs file from the manager, 
# this script converts the JSON file into a typescript file

# Remove old transpiled outputs from the artifacts/ directory
rm -f artifacts/outputs.ts

# Output a TS file from the generated JSON file

filename=outputs
filename_base=$(basename $filename .json)
echo -e "export const $filename_base = " > "artifacts/$filename_base.ts"
cat "deployments/$filename_base.json" >> "artifacts/$filename_base.ts"
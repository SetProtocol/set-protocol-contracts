# Remove old dist/ directory
rm -rf ./dist

# Transpile typescript into javascript using dist configuration
tsc --p tsconfig.dist.json

# Minify the JSON ts files
yarn minify-artifacts

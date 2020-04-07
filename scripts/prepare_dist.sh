# Remove old dist/ directory
rm -rf ./dist

# Transpile typescript into javascript using dist configuration
yarn transpile-dist

# Minify the JSON ts files
yarn minify-artifacts

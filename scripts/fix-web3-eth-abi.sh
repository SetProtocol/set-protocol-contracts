if [[ "$OSTYPE" == "darwin"* ]]; then
  # Mac OSX
  [ -f "node_modules/web3-eth-abi/src/index.js" ] && sed -i '' 's/(nonIndexedData)/(nonIndexedData \&\& nonIndexedData !== "0x")/' node_modules/web3-eth-abi/src/index.js
  [ -f "node_modules/web3-eth-contract/src/index.js" ] && sed -i '' 's/abi.decodeParameters(outputs, returnValues)/(returnValues \&\& returnValues !== "0x") ? abi.decodeParameters(outputs, returnValues) : []/' node_modules/web3-eth-contract/src/index.js
else
  [ -f "node_modules/web3-eth-abi/src/index.js" ] && sed -i 's/(nonIndexedData)/(nonIndexedData \&\& nonIndexedData !== "0x")/' node_modules/web3-eth-abi/src/index.js
  [ -f "node_modules/web3-eth-contract/src/index.js" ] && sed -i 's/abi.decodeParameters(outputs, returnValues)/(returnValues \&\& returnValues !== "0x") ? abi.decodeParameters(outputs, returnValues) : []/' node_modules/web3-eth-contract/src/index.js
fi

echo "fix-web3-eth-abi script finished!"
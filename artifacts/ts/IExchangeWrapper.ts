export const IExchangeWrapper = 
{
  "contractName": "IExchangeWrapper",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_taker",
          "type": "address"
        },
        {
          "name": "_orderCount",
          "type": "uint256"
        },
        {
          "name": "_orderData",
          "type": "bytes"
        }
      ],
      "name": "exchange",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        },
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title IExchangeWrapper\n * @author Set Protocol\n *\n * Interface for executing an order with an exchange wrapper\n */\ninterface IExchangeWrapper {\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Exchange some amount of makerToken for takerToken.\n     *\n     * @param  _taker                Issuance order taker\n     * @param  _orderCount           Expected number of orders to execute\n     * @param  _orderData            Arbitrary bytes data for any information to pass to the exchange\n     * @return  address[], uint256[] The taker token addresses and the associated quantities       \n     */\n    function exchange(\n        address _taker,\n        uint256 _orderCount,\n        bytes _orderData\n    )\n        external\n        returns (address[], uint256[]);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchangeWrapper.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchangeWrapper.sol",
    "exportedSymbols": {
      "IExchangeWrapper": [
        4233
      ]
    },
    "id": 4234,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4217,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:20"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IExchangeWrapper\n@author Set Protocol\n * Interface for executing an order with an exchange wrapper",
        "fullyImplemented": false,
        "id": 4233,
        "linearizedBaseContracts": [
          4233
        ],
        "name": "IExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Exchange some amount of makerToken for takerToken.\n     * @param  _taker                Issuance order taker\n@param  _orderCount           Expected number of orders to execute\n@param  _orderData            Arbitrary bytes data for any information to pass to the exchange\n@return  address[], uint256[] The taker token addresses and the associated quantities       ",
            "id": 4232,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4224,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4219,
                  "name": "_taker",
                  "nodeType": "VariableDeclaration",
                  "scope": 4232,
                  "src": "1278:14:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4218,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1278:7:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4221,
                  "name": "_orderCount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4232,
                  "src": "1302:19:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4220,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1302:7:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4223,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 4232,
                  "src": "1331:16:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4222,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1331:5:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1268:85:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 4231,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4227,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4232,
                  "src": "1388:9:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4225,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1388:7:20",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4226,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1388:9:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4230,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4232,
                  "src": "1399:9:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4228,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1399:7:20",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4229,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1399:9:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1387:22:20"
            },
            "scope": 4233,
            "src": "1251:159:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4234,
        "src": "746:666:20"
      }
    ],
    "src": "597:816:20"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchangeWrapper.sol",
    "exportedSymbols": {
      "IExchangeWrapper": [
        4233
      ]
    },
    "id": 4234,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4217,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:20"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IExchangeWrapper\n@author Set Protocol\n * Interface for executing an order with an exchange wrapper",
        "fullyImplemented": false,
        "id": 4233,
        "linearizedBaseContracts": [
          4233
        ],
        "name": "IExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Exchange some amount of makerToken for takerToken.\n     * @param  _taker                Issuance order taker\n@param  _orderCount           Expected number of orders to execute\n@param  _orderData            Arbitrary bytes data for any information to pass to the exchange\n@return  address[], uint256[] The taker token addresses and the associated quantities       ",
            "id": 4232,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4224,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4219,
                  "name": "_taker",
                  "nodeType": "VariableDeclaration",
                  "scope": 4232,
                  "src": "1278:14:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4218,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1278:7:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4221,
                  "name": "_orderCount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4232,
                  "src": "1302:19:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4220,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1302:7:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4223,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 4232,
                  "src": "1331:16:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 4222,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1331:5:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1268:85:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 4231,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4227,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4232,
                  "src": "1388:9:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4225,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1388:7:20",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4226,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1388:9:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4230,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4232,
                  "src": "1399:9:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4228,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1399:7:20",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4229,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1399:9:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1387:22:20"
            },
            "scope": 4233,
            "src": "1251:159:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4234,
        "src": "746:666:20"
      }
    ],
    "src": "597:816:20"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.119Z"
}
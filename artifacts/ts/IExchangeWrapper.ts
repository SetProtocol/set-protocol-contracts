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
        3617
      ]
    },
    "id": 3618,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3601,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:18"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IExchangeWrapper\n@author Set Protocol\n * Interface for executing an order with an exchange wrapper",
        "fullyImplemented": false,
        "id": 3617,
        "linearizedBaseContracts": [
          3617
        ],
        "name": "IExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Exchange some amount of makerToken for takerToken.\n     * @param  _taker                Issuance order taker\n@param  _orderCount           Expected number of orders to execute\n@param  _orderData            Arbitrary bytes data for any information to pass to the exchange\n@return  address[], uint256[] The taker token addresses and the associated quantities       ",
            "id": 3616,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3608,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3603,
                  "name": "_taker",
                  "nodeType": "VariableDeclaration",
                  "scope": 3616,
                  "src": "1278:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3602,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1278:7:18",
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
                  "id": 3605,
                  "name": "_orderCount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3616,
                  "src": "1302:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3604,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1302:7:18",
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
                  "id": 3607,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3616,
                  "src": "1331:16:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3606,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1331:5:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1268:85:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3615,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3611,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3616,
                  "src": "1388:9:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3609,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1388:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3610,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1388:9:18",
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
                  "id": 3614,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3616,
                  "src": "1399:9:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3612,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1399:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3613,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1399:9:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1387:22:18"
            },
            "scope": 3617,
            "src": "1251:159:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3618,
        "src": "746:666:18"
      }
    ],
    "src": "597:816:18"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchangeWrapper.sol",
    "exportedSymbols": {
      "IExchangeWrapper": [
        3617
      ]
    },
    "id": 3618,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3601,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:18"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IExchangeWrapper\n@author Set Protocol\n * Interface for executing an order with an exchange wrapper",
        "fullyImplemented": false,
        "id": 3617,
        "linearizedBaseContracts": [
          3617
        ],
        "name": "IExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Exchange some amount of makerToken for takerToken.\n     * @param  _taker                Issuance order taker\n@param  _orderCount           Expected number of orders to execute\n@param  _orderData            Arbitrary bytes data for any information to pass to the exchange\n@return  address[], uint256[] The taker token addresses and the associated quantities       ",
            "id": 3616,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3608,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3603,
                  "name": "_taker",
                  "nodeType": "VariableDeclaration",
                  "scope": 3616,
                  "src": "1278:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3602,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1278:7:18",
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
                  "id": 3605,
                  "name": "_orderCount",
                  "nodeType": "VariableDeclaration",
                  "scope": 3616,
                  "src": "1302:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3604,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1302:7:18",
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
                  "id": 3607,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3616,
                  "src": "1331:16:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3606,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1331:5:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1268:85:18"
            },
            "payable": false,
            "returnParameters": {
              "id": 3615,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3611,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3616,
                  "src": "1388:9:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3609,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1388:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3610,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1388:9:18",
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
                  "id": 3614,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3616,
                  "src": "1399:9:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3612,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1399:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3613,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1399:9:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1387:22:18"
            },
            "scope": 3617,
            "src": "1251:159:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3618,
        "src": "746:666:18"
      }
    ],
    "src": "597:816:18"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T03:42:05.636Z"
}
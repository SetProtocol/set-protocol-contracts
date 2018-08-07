export const IExchange = 
{
  "contractName": "IExchange",
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title IExchange\n * @author Set Protocol\n *\n * Interface for executing an order with an exchange wrapper\n */\ninterface IExchange {\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Exchange some amount of makerToken for takerToken.\n     *\n     * @param  _taker       Issuance order taker\n     * @param  _orderCount  Expected number of orders to execute\n     * @param  _orderData   Arbitrary bytes data for any information to pass to the exchange\n     */\n    function exchange(\n        address _taker,\n        uint _orderCount,\n        bytes _orderData\n    )\n        external\n        returns (address[], uint256[]);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchange.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchange.sol",
    "exportedSymbols": {
      "IExchange": [
        1842
      ]
    },
    "id": 1843,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1826,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:9"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IExchange\n@author Set Protocol\n * Interface for executing an order with an exchange wrapper",
        "fullyImplemented": false,
        "id": 1842,
        "linearizedBaseContracts": [
          1842
        ],
        "name": "IExchange",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Exchange some amount of makerToken for takerToken.\n     * @param  _taker       Issuance order taker\n@param  _orderCount  Expected number of orders to execute\n@param  _orderData   Arbitrary bytes data for any information to pass to the exchange",
            "id": 1841,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1833,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1828,
                  "name": "_taker",
                  "nodeType": "VariableDeclaration",
                  "scope": 1841,
                  "src": "1137:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1827,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1137:7:9",
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
                  "id": 1830,
                  "name": "_orderCount",
                  "nodeType": "VariableDeclaration",
                  "scope": 1841,
                  "src": "1161:16:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1829,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1161:4:9",
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
                  "id": 1832,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1841,
                  "src": "1187:16:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1831,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1187:5:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1127:82:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1840,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1836,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1841,
                  "src": "1244:9:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1834,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1244:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1835,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1244:9:9",
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
                  "id": 1839,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1841,
                  "src": "1255:9:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1837,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1255:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1838,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1255:9:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1243:22:9"
            },
            "scope": 1842,
            "src": "1110:156:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1843,
        "src": "739:529:9"
      }
    ],
    "src": "597:672:9"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchange.sol",
    "exportedSymbols": {
      "IExchange": [
        1842
      ]
    },
    "id": 1843,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1826,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:9"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IExchange\n@author Set Protocol\n * Interface for executing an order with an exchange wrapper",
        "fullyImplemented": false,
        "id": 1842,
        "linearizedBaseContracts": [
          1842
        ],
        "name": "IExchange",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Exchange some amount of makerToken for takerToken.\n     * @param  _taker       Issuance order taker\n@param  _orderCount  Expected number of orders to execute\n@param  _orderData   Arbitrary bytes data for any information to pass to the exchange",
            "id": 1841,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1833,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1828,
                  "name": "_taker",
                  "nodeType": "VariableDeclaration",
                  "scope": 1841,
                  "src": "1137:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1827,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1137:7:9",
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
                  "id": 1830,
                  "name": "_orderCount",
                  "nodeType": "VariableDeclaration",
                  "scope": 1841,
                  "src": "1161:16:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1829,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1161:4:9",
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
                  "id": 1832,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1841,
                  "src": "1187:16:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1831,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1187:5:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1127:82:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1840,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1836,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1841,
                  "src": "1244:9:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1834,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1244:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1835,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1244:9:9",
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
                  "id": 1839,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1841,
                  "src": "1255:9:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1837,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1255:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1838,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1255:9:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1243:22:9"
            },
            "scope": 1842,
            "src": "1110:156:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1843,
        "src": "739:529:9"
      }
    ],
    "src": "597:672:9"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T05:35:59.446Z"
}
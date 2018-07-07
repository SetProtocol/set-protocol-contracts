export const IExchange = 
{
  "contractName": "IExchange",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_orderData",
          "type": "bytes"
        }
      ],
      "name": "exchange",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title IExchange\n * @author Set Protocol\n *\n * Interface for executing an order with an exchange\n */\ninterface IExchange {\n\n    /**\n     * Exchange some amount of takerToken for makerToken.\n     *\n     * @param  _orderData  Arbitrary bytes data for any information to pass to the exchange\n     * @return uint256     The amount of makerToken received\n     */\n    function exchange(\n        bytes _orderData\n    )\n        external\n        returns (uint256);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchange.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchange.sol",
    "exportedSymbols": {
      "IExchange": [
        2445
      ]
    },
    "id": 2446,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2437,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:16"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IExchange\n@author Set Protocol\n * Interface for executing an order with an exchange",
        "fullyImplemented": false,
        "id": 2445,
        "linearizedBaseContracts": [
          2445
        ],
        "name": "IExchange",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Exchange some amount of takerToken for makerToken.\n     * @param  _orderData  Arbitrary bytes data for any information to pass to the exchange\n@return uint256     The amount of makerToken received",
            "id": 2444,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2440,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2439,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2444,
                  "src": "1019:16:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2438,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1019:5:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1009:32:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2443,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2442,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2444,
                  "src": "1076:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2441,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1076:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1075:9:16"
            },
            "scope": 2445,
            "src": "992:93:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2446,
        "src": "731:356:16"
      }
    ],
    "src": "597:491:16"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchange.sol",
    "exportedSymbols": {
      "IExchange": [
        2445
      ]
    },
    "id": 2446,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2437,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:16"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title IExchange\n@author Set Protocol\n * Interface for executing an order with an exchange",
        "fullyImplemented": false,
        "id": 2445,
        "linearizedBaseContracts": [
          2445
        ],
        "name": "IExchange",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Exchange some amount of takerToken for makerToken.\n     * @param  _orderData  Arbitrary bytes data for any information to pass to the exchange\n@return uint256     The amount of makerToken received",
            "id": 2444,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2440,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2439,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2444,
                  "src": "1019:16:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2438,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1019:5:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1009:32:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2443,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2442,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2444,
                  "src": "1076:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2441,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1076:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1075:9:16"
            },
            "scope": 2445,
            "src": "992:93:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2446,
        "src": "731:356:16"
      }
    ],
    "src": "597:491:16"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.903Z"
}
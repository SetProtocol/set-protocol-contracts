export const IERC20 = 
{
  "contractName": "IERC20",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title GeneralERC20\n * @author Set Protocol\n *\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\n * fully ERC20 compliant and return something other than true on successful transfers.\n */\ninterface IERC20 {\n    function balanceOf(\n        address _owner\n    )\n        external\n        view\n        returns (uint256);\n\n    function transfer(\n        address _to,\n        uint256 _quantity\n    )\n        external;\n\n    function transferFrom(\n        address _from,\n        address _to,\n        uint256 _quantity\n    )\n        external;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        3348
      ]
    },
    "id": 3349,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3324,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:28"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 3348,
        "linearizedBaseContracts": [
          3348
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3331,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3327,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3326,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "918:14:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3325,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3330,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3329,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "986:7:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3328,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:28"
            },
            "scope": 3348,
            "src": "890:105:28",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3338,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3336,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3333,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3338,
                  "src": "1028:11:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3332,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1028:7:28",
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
                  "id": 3335,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3338,
                  "src": "1049:17:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3334,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1049:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1018:54:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3337,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1089:0:28"
            },
            "scope": 3348,
            "src": "1001:89:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3347,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3345,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3340,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3347,
                  "src": "1127:13:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3339,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1127:7:28",
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
                  "id": 3342,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3347,
                  "src": "1150:11:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3341,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1150:7:28",
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
                  "id": 3344,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3347,
                  "src": "1171:17:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3343,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1171:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1117:77:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3346,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1211:0:28"
            },
            "scope": 3348,
            "src": "1096:116:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3349,
        "src": "867:347:28"
      }
    ],
    "src": "597:618:28"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        3348
      ]
    },
    "id": 3349,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3324,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:28"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 3348,
        "linearizedBaseContracts": [
          3348
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3331,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3327,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3326,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "918:14:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3325,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3330,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3329,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3331,
                  "src": "986:7:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3328,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:28"
            },
            "scope": 3348,
            "src": "890:105:28",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3338,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3336,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3333,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3338,
                  "src": "1028:11:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3332,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1028:7:28",
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
                  "id": 3335,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3338,
                  "src": "1049:17:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3334,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1049:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1018:54:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3337,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1089:0:28"
            },
            "scope": 3348,
            "src": "1001:89:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3347,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3345,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3340,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3347,
                  "src": "1127:13:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3339,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1127:7:28",
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
                  "id": 3342,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3347,
                  "src": "1150:11:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3341,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1150:7:28",
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
                  "id": 3344,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3347,
                  "src": "1171:17:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3343,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1171:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1117:77:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3346,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1211:0:28"
            },
            "scope": 3348,
            "src": "1096:116:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3349,
        "src": "867:347:28"
      }
    ],
    "src": "597:618:28"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.908Z"
}
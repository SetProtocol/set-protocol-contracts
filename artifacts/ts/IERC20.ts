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
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
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
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title GeneralERC20\n * @author Set Protocol\n *\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\n * fully ERC20 compliant and return something other than true on successful transfers.\n */\ninterface IERC20 {\n    function balanceOf(\n        address _owner\n    )\n        external\n        view\n        returns (uint256);\n\n    function allowance(\n        address _owner,\n        address _spender\n    )\n        external\n        view\n        returns (uint256);\n\n    function transfer(\n        address _to,\n        uint256 _quantity\n    )\n        external;\n\n    function transferFrom(\n        address _from,\n        address _to,\n        uint256 _quantity\n    )\n        external;\n\n    function approve(\n        address _spender,\n        uint256 _quantity\n    )\n        external\n        returns (bool);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        5079
      ]
    },
    "id": 5080,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5037,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:40"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 5079,
        "linearizedBaseContracts": [
          5079
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5044,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5040,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5039,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5044,
                  "src": "918:14:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5038,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:40"
            },
            "payable": false,
            "returnParameters": {
              "id": 5043,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5042,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5044,
                  "src": "986:7:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5041,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:40"
            },
            "scope": 5079,
            "src": "890:105:40",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5053,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5049,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5046,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5053,
                  "src": "1029:14:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5045,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1029:7:40",
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
                  "id": 5048,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5053,
                  "src": "1053:16:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5047,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1019:56:40"
            },
            "payable": false,
            "returnParameters": {
              "id": 5052,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5051,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5053,
                  "src": "1123:7:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5050,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1123:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1122:9:40"
            },
            "scope": 5079,
            "src": "1001:131:40",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5060,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5058,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5055,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5060,
                  "src": "1165:11:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5054,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1165:7:40",
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
                  "id": 5057,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5060,
                  "src": "1186:17:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5056,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1186:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1155:54:40"
            },
            "payable": false,
            "returnParameters": {
              "id": 5059,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1226:0:40"
            },
            "scope": 5079,
            "src": "1138:89:40",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5069,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5067,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5062,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5069,
                  "src": "1264:13:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5061,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1264:7:40",
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
                  "id": 5064,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5069,
                  "src": "1287:11:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5063,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:40",
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
                  "id": 5066,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5069,
                  "src": "1308:17:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5065,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1254:77:40"
            },
            "payable": false,
            "returnParameters": {
              "id": 5068,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1348:0:40"
            },
            "scope": 5079,
            "src": "1233:116:40",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5078,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5074,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5071,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5078,
                  "src": "1381:16:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5070,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:40",
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
                  "id": 5073,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5078,
                  "src": "1407:17:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5072,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1407:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1371:59:40"
            },
            "payable": false,
            "returnParameters": {
              "id": 5077,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5076,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5078,
                  "src": "1465:4:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5075,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1465:4:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1464:6:40"
            },
            "scope": 5079,
            "src": "1355:116:40",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5080,
        "src": "867:606:40"
      }
    ],
    "src": "597:877:40"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        5079
      ]
    },
    "id": 5080,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5037,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:40"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 5079,
        "linearizedBaseContracts": [
          5079
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5044,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5040,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5039,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5044,
                  "src": "918:14:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5038,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:40"
            },
            "payable": false,
            "returnParameters": {
              "id": 5043,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5042,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5044,
                  "src": "986:7:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5041,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:40"
            },
            "scope": 5079,
            "src": "890:105:40",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5053,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5049,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5046,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5053,
                  "src": "1029:14:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5045,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1029:7:40",
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
                  "id": 5048,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5053,
                  "src": "1053:16:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5047,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1019:56:40"
            },
            "payable": false,
            "returnParameters": {
              "id": 5052,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5051,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5053,
                  "src": "1123:7:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5050,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1123:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1122:9:40"
            },
            "scope": 5079,
            "src": "1001:131:40",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5060,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5058,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5055,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5060,
                  "src": "1165:11:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5054,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1165:7:40",
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
                  "id": 5057,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5060,
                  "src": "1186:17:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5056,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1186:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1155:54:40"
            },
            "payable": false,
            "returnParameters": {
              "id": 5059,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1226:0:40"
            },
            "scope": 5079,
            "src": "1138:89:40",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5069,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5067,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5062,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5069,
                  "src": "1264:13:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5061,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1264:7:40",
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
                  "id": 5064,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5069,
                  "src": "1287:11:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5063,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:40",
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
                  "id": 5066,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5069,
                  "src": "1308:17:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5065,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1254:77:40"
            },
            "payable": false,
            "returnParameters": {
              "id": 5068,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1348:0:40"
            },
            "scope": 5079,
            "src": "1233:116:40",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5078,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5074,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5071,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5078,
                  "src": "1381:16:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5070,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:40",
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
                  "id": 5073,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5078,
                  "src": "1407:17:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5072,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1407:7:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1371:59:40"
            },
            "payable": false,
            "returnParameters": {
              "id": 5077,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5076,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5078,
                  "src": "1465:4:40",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5075,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1465:4:40",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1464:6:40"
            },
            "scope": 5079,
            "src": "1355:116:40",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5080,
        "src": "867:606:40"
      }
    ],
    "src": "597:877:40"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T03:42:05.772Z"
}
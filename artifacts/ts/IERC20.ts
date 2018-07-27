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
        5244
      ]
    },
    "id": 5245,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5202,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:49"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 5244,
        "linearizedBaseContracts": [
          5244
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5209,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5205,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5204,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5209,
                  "src": "918:14:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5203,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5208,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5207,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5209,
                  "src": "986:7:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5206,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:49"
            },
            "scope": 5244,
            "src": "890:105:49",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5218,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5214,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5211,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5218,
                  "src": "1029:14:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5210,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1029:7:49",
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
                  "id": 5213,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5218,
                  "src": "1053:16:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5212,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1019:56:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5217,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5216,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5218,
                  "src": "1123:7:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5215,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1123:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1122:9:49"
            },
            "scope": 5244,
            "src": "1001:131:49",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5225,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5223,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5220,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5225,
                  "src": "1165:11:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5219,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1165:7:49",
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
                  "id": 5222,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5225,
                  "src": "1186:17:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5221,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1186:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1155:54:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5224,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1226:0:49"
            },
            "scope": 5244,
            "src": "1138:89:49",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5234,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5232,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5227,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5234,
                  "src": "1264:13:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5226,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1264:7:49",
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
                  "id": 5229,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5234,
                  "src": "1287:11:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5228,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:49",
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
                  "id": 5231,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5234,
                  "src": "1308:17:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5230,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1254:77:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5233,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1348:0:49"
            },
            "scope": 5244,
            "src": "1233:116:49",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5243,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5239,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5236,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5243,
                  "src": "1381:16:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5235,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:49",
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
                  "id": 5238,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5243,
                  "src": "1407:17:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5237,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1407:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1371:59:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5242,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5241,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5243,
                  "src": "1465:4:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5240,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1465:4:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1464:6:49"
            },
            "scope": 5244,
            "src": "1355:116:49",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5245,
        "src": "867:606:49"
      }
    ],
    "src": "597:877:49"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        5244
      ]
    },
    "id": 5245,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5202,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:49"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 5244,
        "linearizedBaseContracts": [
          5244
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5209,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5205,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5204,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5209,
                  "src": "918:14:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5203,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5208,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5207,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5209,
                  "src": "986:7:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5206,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:49"
            },
            "scope": 5244,
            "src": "890:105:49",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5218,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5214,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5211,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5218,
                  "src": "1029:14:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5210,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1029:7:49",
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
                  "id": 5213,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5218,
                  "src": "1053:16:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5212,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1019:56:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5217,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5216,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5218,
                  "src": "1123:7:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5215,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1123:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1122:9:49"
            },
            "scope": 5244,
            "src": "1001:131:49",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5225,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5223,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5220,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5225,
                  "src": "1165:11:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5219,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1165:7:49",
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
                  "id": 5222,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5225,
                  "src": "1186:17:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5221,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1186:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1155:54:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5224,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1226:0:49"
            },
            "scope": 5244,
            "src": "1138:89:49",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5234,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5232,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5227,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5234,
                  "src": "1264:13:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5226,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1264:7:49",
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
                  "id": 5229,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5234,
                  "src": "1287:11:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5228,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:49",
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
                  "id": 5231,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5234,
                  "src": "1308:17:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5230,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1254:77:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5233,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1348:0:49"
            },
            "scope": 5244,
            "src": "1233:116:49",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5243,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5239,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5236,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5243,
                  "src": "1381:16:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5235,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:49",
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
                  "id": 5238,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5243,
                  "src": "1407:17:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5237,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1407:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1371:59:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5242,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5241,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5243,
                  "src": "1465:4:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5240,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1465:4:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1464:6:49"
            },
            "scope": 5244,
            "src": "1355:116:49",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5245,
        "src": "867:606:49"
      }
    ],
    "src": "597:877:49"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.834Z"
}
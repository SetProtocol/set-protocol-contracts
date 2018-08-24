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
        6208
      ]
    },
    "id": 6209,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6166,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:38"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 6208,
        "linearizedBaseContracts": [
          6208
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6173,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6169,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6168,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6173,
                  "src": "918:14:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6167,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 6172,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6171,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6173,
                  "src": "986:7:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6170,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:38"
            },
            "scope": 6208,
            "src": "890:105:38",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6182,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6178,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6175,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6182,
                  "src": "1029:14:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6174,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1029:7:38",
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
                  "id": 6177,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6182,
                  "src": "1053:16:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6176,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1019:56:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 6181,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6180,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6182,
                  "src": "1123:7:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6179,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1123:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1122:9:38"
            },
            "scope": 6208,
            "src": "1001:131:38",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6189,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6187,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6184,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6189,
                  "src": "1165:11:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6183,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1165:7:38",
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
                  "id": 6186,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6189,
                  "src": "1186:17:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6185,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1186:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1155:54:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 6188,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1226:0:38"
            },
            "scope": 6208,
            "src": "1138:89:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6198,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6196,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6191,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6198,
                  "src": "1264:13:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6190,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1264:7:38",
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
                  "id": 6193,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6198,
                  "src": "1287:11:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6192,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:38",
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
                  "id": 6195,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6198,
                  "src": "1308:17:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6194,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1254:77:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 6197,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1348:0:38"
            },
            "scope": 6208,
            "src": "1233:116:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6207,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6203,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6200,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6207,
                  "src": "1381:16:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6199,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:38",
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
                  "id": 6202,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6207,
                  "src": "1407:17:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6201,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1407:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1371:59:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 6206,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6205,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6207,
                  "src": "1465:4:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6204,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1465:4:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1464:6:38"
            },
            "scope": 6208,
            "src": "1355:116:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 6209,
        "src": "867:606:38"
      }
    ],
    "src": "597:877:38"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        6208
      ]
    },
    "id": 6209,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6166,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:38"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 6208,
        "linearizedBaseContracts": [
          6208
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6173,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6169,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6168,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6173,
                  "src": "918:14:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6167,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 6172,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6171,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6173,
                  "src": "986:7:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6170,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:38"
            },
            "scope": 6208,
            "src": "890:105:38",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6182,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6178,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6175,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6182,
                  "src": "1029:14:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6174,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1029:7:38",
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
                  "id": 6177,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6182,
                  "src": "1053:16:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6176,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1019:56:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 6181,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6180,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6182,
                  "src": "1123:7:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6179,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1123:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1122:9:38"
            },
            "scope": 6208,
            "src": "1001:131:38",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6189,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6187,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6184,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6189,
                  "src": "1165:11:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6183,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1165:7:38",
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
                  "id": 6186,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6189,
                  "src": "1186:17:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6185,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1186:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1155:54:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 6188,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1226:0:38"
            },
            "scope": 6208,
            "src": "1138:89:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6198,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6196,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6191,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6198,
                  "src": "1264:13:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6190,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1264:7:38",
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
                  "id": 6193,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6198,
                  "src": "1287:11:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6192,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:38",
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
                  "id": 6195,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6198,
                  "src": "1308:17:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6194,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1254:77:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 6197,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1348:0:38"
            },
            "scope": 6208,
            "src": "1233:116:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6207,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6203,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6200,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6207,
                  "src": "1381:16:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6199,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:38",
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
                  "id": 6202,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6207,
                  "src": "1407:17:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6201,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1407:7:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1371:59:38"
            },
            "payable": false,
            "returnParameters": {
              "id": 6206,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6205,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6207,
                  "src": "1465:4:38",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6204,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1465:4:38",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1464:6:38"
            },
            "scope": 6208,
            "src": "1355:116:38",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 6209,
        "src": "867:606:38"
      }
    ],
    "src": "597:877:38"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.607Z"
}
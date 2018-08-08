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
        3728
      ]
    },
    "id": 3729,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3686,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:32"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 3728,
        "linearizedBaseContracts": [
          3728
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3693,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3689,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3688,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3693,
                  "src": "918:14:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3687,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3692,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3691,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3693,
                  "src": "986:7:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3690,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:32"
            },
            "scope": 3728,
            "src": "890:105:32",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3702,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3698,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3695,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3702,
                  "src": "1029:14:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3694,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1029:7:32",
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
                  "id": 3697,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3702,
                  "src": "1053:16:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3696,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1019:56:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3701,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3700,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3702,
                  "src": "1123:7:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3699,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1123:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1122:9:32"
            },
            "scope": 3728,
            "src": "1001:131:32",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3709,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3707,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3704,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3709,
                  "src": "1165:11:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3703,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1165:7:32",
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
                  "id": 3706,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3709,
                  "src": "1186:17:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3705,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1186:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1155:54:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3708,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1226:0:32"
            },
            "scope": 3728,
            "src": "1138:89:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3718,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3716,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3711,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3718,
                  "src": "1264:13:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3710,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1264:7:32",
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
                  "id": 3713,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3718,
                  "src": "1287:11:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3712,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:32",
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
                  "id": 3715,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3718,
                  "src": "1308:17:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3714,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1254:77:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3717,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1348:0:32"
            },
            "scope": 3728,
            "src": "1233:116:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3727,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3723,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3720,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3727,
                  "src": "1381:16:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3719,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:32",
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
                  "id": 3722,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3727,
                  "src": "1407:17:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3721,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1407:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1371:59:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3726,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3725,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3727,
                  "src": "1465:4:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3724,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1465:4:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1464:6:32"
            },
            "scope": 3728,
            "src": "1355:116:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3729,
        "src": "867:606:32"
      }
    ],
    "src": "597:877:32"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        3728
      ]
    },
    "id": 3729,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3686,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:32"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 3728,
        "linearizedBaseContracts": [
          3728
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3693,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3689,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3688,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3693,
                  "src": "918:14:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3687,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3692,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3691,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3693,
                  "src": "986:7:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3690,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:32"
            },
            "scope": 3728,
            "src": "890:105:32",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3702,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3698,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3695,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3702,
                  "src": "1029:14:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3694,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1029:7:32",
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
                  "id": 3697,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3702,
                  "src": "1053:16:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3696,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1019:56:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3701,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3700,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3702,
                  "src": "1123:7:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3699,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1123:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1122:9:32"
            },
            "scope": 3728,
            "src": "1001:131:32",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3709,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3707,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3704,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3709,
                  "src": "1165:11:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3703,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1165:7:32",
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
                  "id": 3706,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3709,
                  "src": "1186:17:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3705,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1186:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1155:54:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3708,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1226:0:32"
            },
            "scope": 3728,
            "src": "1138:89:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3718,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3716,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3711,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3718,
                  "src": "1264:13:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3710,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1264:7:32",
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
                  "id": 3713,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3718,
                  "src": "1287:11:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3712,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:32",
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
                  "id": 3715,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3718,
                  "src": "1308:17:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3714,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1254:77:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3717,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1348:0:32"
            },
            "scope": 3728,
            "src": "1233:116:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3727,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3723,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3720,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3727,
                  "src": "1381:16:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3719,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:32",
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
                  "id": 3722,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3727,
                  "src": "1407:17:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3721,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1407:7:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1371:59:32"
            },
            "payable": false,
            "returnParameters": {
              "id": 3726,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3725,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3727,
                  "src": "1465:4:32",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3724,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1465:4:32",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1464:6:32"
            },
            "scope": 3728,
            "src": "1355:116:32",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3729,
        "src": "867:606:32"
      }
    ],
    "src": "597:877:32"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.899Z"
}
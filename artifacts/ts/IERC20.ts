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
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/IERC20.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        4909
      ]
    },
    "id": 4910,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4867,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:48"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 4909,
        "linearizedBaseContracts": [
          4909
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4874,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4870,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4869,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4874,
                  "src": "918:14:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4868,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 4873,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4872,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4874,
                  "src": "986:7:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4871,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:48"
            },
            "scope": 4909,
            "src": "890:105:48",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4883,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4879,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4876,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4883,
                  "src": "1029:14:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4875,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1029:7:48",
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
                  "id": 4878,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4883,
                  "src": "1053:16:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4877,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1019:56:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 4882,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4881,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4883,
                  "src": "1123:7:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4880,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1123:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1122:9:48"
            },
            "scope": 4909,
            "src": "1001:131:48",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4890,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4888,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4885,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4890,
                  "src": "1165:11:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4884,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1165:7:48",
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
                  "id": 4887,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4890,
                  "src": "1186:17:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4886,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1186:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1155:54:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 4889,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1226:0:48"
            },
            "scope": 4909,
            "src": "1138:89:48",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4899,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4897,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4892,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4899,
                  "src": "1264:13:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4891,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1264:7:48",
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
                  "id": 4894,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4899,
                  "src": "1287:11:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4893,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:48",
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
                  "id": 4896,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4899,
                  "src": "1308:17:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4895,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1254:77:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 4898,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1348:0:48"
            },
            "scope": 4909,
            "src": "1233:116:48",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4908,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4904,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4901,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4908,
                  "src": "1381:16:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4900,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:48",
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
                  "id": 4903,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4908,
                  "src": "1407:17:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4902,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1407:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1371:59:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 4907,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4906,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4908,
                  "src": "1465:4:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4905,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1465:4:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1464:6:48"
            },
            "scope": 4909,
            "src": "1355:116:48",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4910,
        "src": "867:606:48"
      }
    ],
    "src": "597:877:48"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/IERC20.sol",
    "exportedSymbols": {
      "IERC20": [
        4909
      ]
    },
    "id": 4910,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4867,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:48"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title GeneralERC20\n@author Set Protocol\n * Interface for using ERC20 Tokens. This interface is needed to interact with tokens that are not\nfully ERC20 compliant and return something other than true on successful transfers.",
        "fullyImplemented": false,
        "id": 4909,
        "linearizedBaseContracts": [
          4909
        ],
        "name": "IERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4874,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4870,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4869,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4874,
                  "src": "918:14:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4868,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "918:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "908:30:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 4873,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4872,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4874,
                  "src": "986:7:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4871,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "986:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "985:9:48"
            },
            "scope": 4909,
            "src": "890:105:48",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4883,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4879,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4876,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4883,
                  "src": "1029:14:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4875,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1029:7:48",
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
                  "id": 4878,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4883,
                  "src": "1053:16:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4877,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1053:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1019:56:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 4882,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4881,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4883,
                  "src": "1123:7:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4880,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1123:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1122:9:48"
            },
            "scope": 4909,
            "src": "1001:131:48",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4890,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4888,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4885,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4890,
                  "src": "1165:11:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4884,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1165:7:48",
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
                  "id": 4887,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4890,
                  "src": "1186:17:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4886,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1186:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1155:54:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 4889,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1226:0:48"
            },
            "scope": 4909,
            "src": "1138:89:48",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4899,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4897,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4892,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4899,
                  "src": "1264:13:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4891,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1264:7:48",
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
                  "id": 4894,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4899,
                  "src": "1287:11:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4893,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:48",
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
                  "id": 4896,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4899,
                  "src": "1308:17:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4895,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1308:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1254:77:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 4898,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1348:0:48"
            },
            "scope": 4909,
            "src": "1233:116:48",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4908,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4904,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4901,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4908,
                  "src": "1381:16:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4900,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1381:7:48",
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
                  "id": 4903,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4908,
                  "src": "1407:17:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4902,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1407:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1371:59:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 4907,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4906,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4908,
                  "src": "1465:4:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4905,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1465:4:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1464:6:48"
            },
            "scope": 4909,
            "src": "1355:116:48",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4910,
        "src": "867:606:48"
      }
    ],
    "src": "597:877:48"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.431Z"
}
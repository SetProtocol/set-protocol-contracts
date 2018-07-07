export const ERC20 = 
{
  "contractName": "ERC20",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
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
          "name": "who",
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
          "name": "to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "spender",
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
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "value",
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
  "source": "pragma solidity ^0.4.23;\n\nimport \"./ERC20Basic.sol\";\n\n\n/**\n * @title ERC20 interface\n * @dev see https://github.com/ethereum/EIPs/issues/20\n */\ncontract ERC20 is ERC20Basic {\n  function allowance(address owner, address spender)\n    public view returns (uint256);\n\n  function transferFrom(address from, address to, uint256 value)\n    public returns (bool);\n\n  function approve(address spender, uint256 value) public returns (bool);\n  event Approval(\n    address indexed owner,\n    address indexed spender,\n    uint256 value\n  );\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        1142
      ]
    },
    "id": 1143,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1101,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:8"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 1102,
        "nodeType": "ImportDirective",
        "scope": 1143,
        "sourceUnit": 1175,
        "src": "26:26:8",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1103,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1174,
              "src": "162:10:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$1174",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 1104,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:8"
          }
        ],
        "contractDependencies": [
          1174
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 1142,
        "linearizedBaseContracts": [
          1142,
          1174
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 1113,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1109,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1106,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 1113,
                  "src": "196:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1105,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:8",
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
                  "id": 1108,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1113,
                  "src": "211:15:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1107,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1112,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1111,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1113,
                  "src": "253:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1110,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:8"
            },
            "scope": 1142,
            "src": "177:85:8",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1124,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1120,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1115,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1124,
                  "src": "288:12:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1114,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:8",
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
                  "id": 1117,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1124,
                  "src": "302:10:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1116,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:8",
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
                  "id": 1119,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 1124,
                  "src": "314:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1118,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1123,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1122,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1124,
                  "src": "349:4:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1121,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:8"
            },
            "scope": 1142,
            "src": "266:89:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1133,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1129,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1126,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1133,
                  "src": "376:15:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1125,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:8",
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
                  "id": 1128,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 1133,
                  "src": "393:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1127,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1132,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1131,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1133,
                  "src": "424:4:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1130,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:8"
            },
            "scope": 1142,
            "src": "359:71:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1141,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1140,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1135,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 1141,
                  "src": "453:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1134,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:8",
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
                  "id": 1137,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1141,
                  "src": "480:23:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1136,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:8",
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
                  "id": 1139,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 1141,
                  "src": "509:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1138,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:8"
            },
            "src": "433:94:8"
          }
        ],
        "scope": 1143,
        "src": "144:385:8"
      }
    ],
    "src": "0:530:8"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        1142
      ]
    },
    "id": 1143,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1101,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:8"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 1102,
        "nodeType": "ImportDirective",
        "scope": 1143,
        "sourceUnit": 1175,
        "src": "26:26:8",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1103,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1174,
              "src": "162:10:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$1174",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 1104,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:8"
          }
        ],
        "contractDependencies": [
          1174
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 1142,
        "linearizedBaseContracts": [
          1142,
          1174
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 1113,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1109,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1106,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 1113,
                  "src": "196:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1105,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:8",
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
                  "id": 1108,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1113,
                  "src": "211:15:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1107,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1112,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1111,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1113,
                  "src": "253:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1110,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:8"
            },
            "scope": 1142,
            "src": "177:85:8",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1124,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1120,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1115,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1124,
                  "src": "288:12:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1114,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:8",
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
                  "id": 1117,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1124,
                  "src": "302:10:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1116,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:8",
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
                  "id": 1119,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 1124,
                  "src": "314:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1118,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1123,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1122,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1124,
                  "src": "349:4:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1121,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:8"
            },
            "scope": 1142,
            "src": "266:89:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1133,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1129,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1126,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1133,
                  "src": "376:15:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1125,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:8",
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
                  "id": 1128,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 1133,
                  "src": "393:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1127,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1132,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1131,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1133,
                  "src": "424:4:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1130,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:8"
            },
            "scope": 1142,
            "src": "359:71:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1141,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1140,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1135,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 1141,
                  "src": "453:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1134,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:8",
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
                  "id": 1137,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1141,
                  "src": "480:23:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1136,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:8",
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
                  "id": 1139,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 1141,
                  "src": "509:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1138,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:8"
            },
            "src": "433:94:8"
          }
        ],
        "scope": 1143,
        "src": "144:385:8"
      }
    ],
    "src": "0:530:8"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T15:28:53.738Z"
}
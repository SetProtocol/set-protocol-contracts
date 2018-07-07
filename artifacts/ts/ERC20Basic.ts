export const ERC20Basic = 
{
  "contractName": "ERC20Basic",
  "abi": [
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
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "pragma solidity ^0.4.23;\n\n\n/**\n * @title ERC20Basic\n * @dev Simpler version of ERC20 interface\n * @dev see https://github.com/ethereum/EIPs/issues/179\n */\ncontract ERC20Basic {\n  function totalSupply() public view returns (uint256);\n  function balanceOf(address who) public view returns (uint256);\n  function transfer(address to, uint256 value) public returns (bool);\n  event Transfer(address indexed from, address indexed to, uint256 value);\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        1174
      ]
    },
    "id": 1175,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1144,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:9"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 1174,
        "linearizedBaseContracts": [
          1174
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 1149,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1145,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "199:2:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1148,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1147,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1149,
                  "src": "223:7:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1146,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "223:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "222:9:9"
            },
            "scope": 1174,
            "src": "179:53:9",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1156,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1152,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1151,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "254:11:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1150,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "254:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "253:13:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1155,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1154,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "288:7:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1153,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:9:9"
            },
            "scope": 1174,
            "src": "235:62:9",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1165,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1161,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1158,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1165,
                  "src": "318:10:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1157,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:9",
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
                  "id": 1160,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 1165,
                  "src": "330:13:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1159,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:27:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1164,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1163,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1165,
                  "src": "361:4:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1162,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "361:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "360:6:9"
            },
            "scope": 1174,
            "src": "300:67:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1173,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1172,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1167,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1173,
                  "src": "385:20:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1166,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "385:7:9",
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
                  "id": 1169,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1173,
                  "src": "407:18:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1168,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "407:7:9",
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
                  "id": 1171,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 1173,
                  "src": "427:13:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1170,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "427:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "384:57:9"
            },
            "src": "370:72:9"
          }
        ],
        "scope": 1175,
        "src": "155:289:9"
      }
    ],
    "src": "0:445:9"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        1174
      ]
    },
    "id": 1175,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1144,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:9"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 1174,
        "linearizedBaseContracts": [
          1174
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 1149,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1145,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "199:2:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1148,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1147,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1149,
                  "src": "223:7:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1146,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "223:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "222:9:9"
            },
            "scope": 1174,
            "src": "179:53:9",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1156,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1152,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1151,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "254:11:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1150,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "254:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "253:13:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1155,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1154,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "288:7:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1153,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:9:9"
            },
            "scope": 1174,
            "src": "235:62:9",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1165,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1161,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1158,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1165,
                  "src": "318:10:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1157,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:9",
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
                  "id": 1160,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 1165,
                  "src": "330:13:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1159,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:27:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1164,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1163,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1165,
                  "src": "361:4:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1162,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "361:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "360:6:9"
            },
            "scope": 1174,
            "src": "300:67:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1173,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1172,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1167,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1173,
                  "src": "385:20:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1166,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "385:7:9",
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
                  "id": 1169,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1173,
                  "src": "407:18:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1168,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "407:7:9",
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
                  "id": 1171,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 1173,
                  "src": "427:13:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1170,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "427:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "384:57:9"
            },
            "src": "370:72:9"
          }
        ],
        "scope": 1175,
        "src": "155:289:9"
      }
    ],
    "src": "0:445:9"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T15:28:53.739Z"
}
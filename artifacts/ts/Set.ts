export const Set = 
{
  "contractName": "Set",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_sender",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "LogIssuance",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_sender",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "LogRedemption",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "name": "issue",
      "outputs": [
        {
          "name": "success",
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
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "name": "redeem",
      "outputs": [
        {
          "name": "success",
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
  "source": "pragma solidity ^0.4.19;\n\n\n/**\n * @title Set interface\n */\ncontract Set {\n  function issue(uint quantity) public returns (bool success);\n  function redeem(uint quantity) public returns (bool success);\n\n  event LogIssuance(\n    address indexed _sender,\n    uint indexed _quantity\n  );\n\n  event LogRedemption(\n    address indexed _sender,\n    uint indexed _quantity\n  );\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Set.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Set.sol",
    "exportedSymbols": {
      "Set": [
        421
      ]
    },
    "id": 422,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 394,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".19"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:2"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Set interface",
        "fullyImplemented": false,
        "id": 421,
        "linearizedBaseContracts": [
          421
        ],
        "name": "Set",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 401,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 397,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 396,
                  "name": "quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 401,
                  "src": "91:13:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 395,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "91:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "90:15:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 400,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 399,
                  "name": "success",
                  "nodeType": "VariableDeclaration",
                  "scope": 401,
                  "src": "122:12:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 398,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "122:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "121:14:2"
            },
            "scope": 421,
            "src": "76:60:2",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 408,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 404,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 403,
                  "name": "quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 408,
                  "src": "155:13:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 402,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "155:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "154:15:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 407,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 406,
                  "name": "success",
                  "nodeType": "VariableDeclaration",
                  "scope": 408,
                  "src": "186:12:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 405,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "186:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "185:14:2"
            },
            "scope": 421,
            "src": "139:61:2",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 414,
            "name": "LogIssuance",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 413,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 410,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 414,
                  "src": "227:23:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 409,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:7:2",
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
                  "id": 412,
                  "indexed": true,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 414,
                  "src": "256:22:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 411,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "256:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "221:61:2"
            },
            "src": "204:79:2"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 420,
            "name": "LogRedemption",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 419,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 416,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 420,
                  "src": "312:23:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 415,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "312:7:2",
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
                  "id": 418,
                  "indexed": true,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 420,
                  "src": "341:22:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 417,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "341:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "306:61:2"
            },
            "src": "287:81:2"
          }
        ],
        "scope": 422,
        "src": "59:311:2"
      }
    ],
    "src": "0:371:2"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Set.sol",
    "exportedSymbols": {
      "Set": [
        421
      ]
    },
    "id": 422,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 394,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".19"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:2"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Set interface",
        "fullyImplemented": false,
        "id": 421,
        "linearizedBaseContracts": [
          421
        ],
        "name": "Set",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 401,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 397,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 396,
                  "name": "quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 401,
                  "src": "91:13:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 395,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "91:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "90:15:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 400,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 399,
                  "name": "success",
                  "nodeType": "VariableDeclaration",
                  "scope": 401,
                  "src": "122:12:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 398,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "122:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "121:14:2"
            },
            "scope": 421,
            "src": "76:60:2",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 408,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 404,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 403,
                  "name": "quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 408,
                  "src": "155:13:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 402,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "155:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "154:15:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 407,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 406,
                  "name": "success",
                  "nodeType": "VariableDeclaration",
                  "scope": 408,
                  "src": "186:12:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 405,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "186:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "185:14:2"
            },
            "scope": 421,
            "src": "139:61:2",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 414,
            "name": "LogIssuance",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 413,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 410,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 414,
                  "src": "227:23:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 409,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "227:7:2",
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
                  "id": 412,
                  "indexed": true,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 414,
                  "src": "256:22:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 411,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "256:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "221:61:2"
            },
            "src": "204:79:2"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 420,
            "name": "LogRedemption",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 419,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 416,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 420,
                  "src": "312:23:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 415,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "312:7:2",
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
                  "id": 418,
                  "indexed": true,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 420,
                  "src": "341:22:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 417,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "341:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "306:61:2"
            },
            "src": "287:81:2"
          }
        ],
        "scope": 422,
        "src": "59:311:2"
      }
    ],
    "src": "0:371:2"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.21+commit.dfe3193c.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-04-09T06:08:42.800Z"
}
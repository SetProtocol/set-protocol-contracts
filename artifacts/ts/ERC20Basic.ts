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
  "source": "pragma solidity ^0.4.24;\n\n\n/**\n * @title ERC20Basic\n * @dev Simpler version of ERC20 interface\n * See https://github.com/ethereum/EIPs/issues/179\n */\ncontract ERC20Basic {\n  function totalSupply() public view returns (uint256);\n  function balanceOf(address who) public view returns (uint256);\n  function transfer(address to, uint256 value) public returns (bool);\n  event Transfer(address indexed from, address indexed to, uint256 value);\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        9045
      ]
    },
    "id": 9046,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 9015,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:72"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\nSee https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 9045,
        "linearizedBaseContracts": [
          9045
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 9020,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 9016,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "194:2:72"
            },
            "payable": false,
            "returnParameters": {
              "id": 9019,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9018,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 9020,
                  "src": "218:7:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 9017,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "218:7:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "217:9:72"
            },
            "scope": 9045,
            "src": "174:53:72",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 9027,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 9023,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9022,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 9027,
                  "src": "249:11:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 9021,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:13:72"
            },
            "payable": false,
            "returnParameters": {
              "id": 9026,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9025,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 9027,
                  "src": "283:7:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 9024,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "283:7:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "282:9:72"
            },
            "scope": 9045,
            "src": "230:62:72",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 9036,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 9032,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9029,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 9036,
                  "src": "313:10:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 9028,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "313:7:72",
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
                  "id": 9031,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 9036,
                  "src": "325:13:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 9030,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "325:7:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "312:27:72"
            },
            "payable": false,
            "returnParameters": {
              "id": 9035,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9034,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 9036,
                  "src": "356:4:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 9033,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "356:4:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "355:6:72"
            },
            "scope": 9045,
            "src": "295:67:72",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 9044,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 9043,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9038,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 9044,
                  "src": "380:20:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 9037,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "380:7:72",
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
                  "id": 9040,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 9044,
                  "src": "402:18:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 9039,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "402:7:72",
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
                  "id": 9042,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 9044,
                  "src": "422:13:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 9041,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "422:7:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "379:57:72"
            },
            "src": "365:72:72"
          }
        ],
        "scope": 9046,
        "src": "150:289:72"
      }
    ],
    "src": "0:440:72"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        9045
      ]
    },
    "id": 9046,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 9015,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:72"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\nSee https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 9045,
        "linearizedBaseContracts": [
          9045
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 9020,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 9016,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "194:2:72"
            },
            "payable": false,
            "returnParameters": {
              "id": 9019,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9018,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 9020,
                  "src": "218:7:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 9017,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "218:7:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "217:9:72"
            },
            "scope": 9045,
            "src": "174:53:72",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 9027,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 9023,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9022,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 9027,
                  "src": "249:11:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 9021,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:13:72"
            },
            "payable": false,
            "returnParameters": {
              "id": 9026,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9025,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 9027,
                  "src": "283:7:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 9024,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "283:7:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "282:9:72"
            },
            "scope": 9045,
            "src": "230:62:72",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 9036,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 9032,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9029,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 9036,
                  "src": "313:10:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 9028,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "313:7:72",
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
                  "id": 9031,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 9036,
                  "src": "325:13:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 9030,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "325:7:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "312:27:72"
            },
            "payable": false,
            "returnParameters": {
              "id": 9035,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9034,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 9036,
                  "src": "356:4:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 9033,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "356:4:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "355:6:72"
            },
            "scope": 9045,
            "src": "295:67:72",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 9044,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 9043,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 9038,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 9044,
                  "src": "380:20:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 9037,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "380:7:72",
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
                  "id": 9040,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 9044,
                  "src": "402:18:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 9039,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "402:7:72",
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
                  "id": 9042,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 9044,
                  "src": "422:13:72",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 9041,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "422:7:72",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "379:57:72"
            },
            "src": "365:72:72"
          }
        ],
        "scope": 9046,
        "src": "150:289:72"
      }
    ],
    "src": "0:440:72"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.228Z"
}
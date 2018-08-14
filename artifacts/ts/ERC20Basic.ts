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
        7036
      ]
    },
    "id": 7037,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 7006,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:65"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\nSee https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 7036,
        "linearizedBaseContracts": [
          7036
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 7011,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7007,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "194:2:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 7010,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7009,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7011,
                  "src": "218:7:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7008,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "218:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "217:9:65"
            },
            "scope": 7036,
            "src": "174:53:65",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 7018,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7014,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7013,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 7018,
                  "src": "249:11:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7012,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:13:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 7017,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7016,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7018,
                  "src": "283:7:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7015,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "283:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "282:9:65"
            },
            "scope": 7036,
            "src": "230:62:65",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 7027,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7023,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7020,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 7027,
                  "src": "313:10:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7019,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "313:7:65",
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
                  "id": 7022,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 7027,
                  "src": "325:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7021,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "325:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "312:27:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 7026,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7025,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7027,
                  "src": "356:4:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 7024,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "356:4:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "355:6:65"
            },
            "scope": 7036,
            "src": "295:67:65",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 7035,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 7034,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7029,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 7035,
                  "src": "380:20:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7028,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "380:7:65",
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
                  "id": 7031,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 7035,
                  "src": "402:18:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7030,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "402:7:65",
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
                  "id": 7033,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 7035,
                  "src": "422:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7032,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "422:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "379:57:65"
            },
            "src": "365:72:65"
          }
        ],
        "scope": 7037,
        "src": "150:289:65"
      }
    ],
    "src": "0:440:65"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        7036
      ]
    },
    "id": 7037,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 7006,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:65"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\nSee https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 7036,
        "linearizedBaseContracts": [
          7036
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 7011,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7007,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "194:2:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 7010,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7009,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7011,
                  "src": "218:7:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7008,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "218:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "217:9:65"
            },
            "scope": 7036,
            "src": "174:53:65",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 7018,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7014,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7013,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 7018,
                  "src": "249:11:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7012,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:13:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 7017,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7016,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7018,
                  "src": "283:7:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7015,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "283:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "282:9:65"
            },
            "scope": 7036,
            "src": "230:62:65",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 7027,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7023,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7020,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 7027,
                  "src": "313:10:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7019,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "313:7:65",
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
                  "id": 7022,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 7027,
                  "src": "325:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7021,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "325:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "312:27:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 7026,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7025,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7027,
                  "src": "356:4:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 7024,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "356:4:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "355:6:65"
            },
            "scope": 7036,
            "src": "295:67:65",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 7035,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 7034,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7029,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 7035,
                  "src": "380:20:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7028,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "380:7:65",
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
                  "id": 7031,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 7035,
                  "src": "402:18:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7030,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "402:7:65",
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
                  "id": 7033,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 7035,
                  "src": "422:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7032,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "422:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "379:57:65"
            },
            "src": "365:72:65"
          }
        ],
        "scope": 7037,
        "src": "150:289:65"
      }
    ],
    "src": "0:440:65"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.424Z"
}
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
        6993
      ]
    },
    "id": 6994,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6963,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:66"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 6993,
        "linearizedBaseContracts": [
          6993
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6968,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6964,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "199:2:66"
            },
            "payable": false,
            "returnParameters": {
              "id": 6967,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6966,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6968,
                  "src": "223:7:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6965,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "223:7:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "222:9:66"
            },
            "scope": 6993,
            "src": "179:53:66",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6975,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6971,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6970,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 6975,
                  "src": "254:11:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6969,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "254:7:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "253:13:66"
            },
            "payable": false,
            "returnParameters": {
              "id": 6974,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6973,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6975,
                  "src": "288:7:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6972,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:9:66"
            },
            "scope": 6993,
            "src": "235:62:66",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6984,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6980,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6977,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6984,
                  "src": "318:10:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6976,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:66",
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
                  "id": 6979,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6984,
                  "src": "330:13:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6978,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:27:66"
            },
            "payable": false,
            "returnParameters": {
              "id": 6983,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6982,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6984,
                  "src": "361:4:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6981,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "361:4:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "360:6:66"
            },
            "scope": 6993,
            "src": "300:67:66",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6992,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6991,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6986,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6992,
                  "src": "385:20:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6985,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "385:7:66",
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
                  "id": 6988,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6992,
                  "src": "407:18:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6987,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "407:7:66",
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
                  "id": 6990,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6992,
                  "src": "427:13:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6989,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "427:7:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "384:57:66"
            },
            "src": "370:72:66"
          }
        ],
        "scope": 6994,
        "src": "155:289:66"
      }
    ],
    "src": "0:445:66"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        6993
      ]
    },
    "id": 6994,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6963,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:66"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 6993,
        "linearizedBaseContracts": [
          6993
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6968,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6964,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "199:2:66"
            },
            "payable": false,
            "returnParameters": {
              "id": 6967,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6966,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6968,
                  "src": "223:7:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6965,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "223:7:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "222:9:66"
            },
            "scope": 6993,
            "src": "179:53:66",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6975,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6971,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6970,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 6975,
                  "src": "254:11:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6969,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "254:7:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "253:13:66"
            },
            "payable": false,
            "returnParameters": {
              "id": 6974,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6973,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6975,
                  "src": "288:7:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6972,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:9:66"
            },
            "scope": 6993,
            "src": "235:62:66",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6984,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6980,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6977,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6984,
                  "src": "318:10:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6976,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:66",
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
                  "id": 6979,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6984,
                  "src": "330:13:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6978,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:27:66"
            },
            "payable": false,
            "returnParameters": {
              "id": 6983,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6982,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6984,
                  "src": "361:4:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6981,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "361:4:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "360:6:66"
            },
            "scope": 6993,
            "src": "300:67:66",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6992,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6991,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6986,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6992,
                  "src": "385:20:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6985,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "385:7:66",
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
                  "id": 6988,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6992,
                  "src": "407:18:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6987,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "407:7:66",
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
                  "id": 6990,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6992,
                  "src": "427:13:66",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6989,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "427:7:66",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "384:57:66"
            },
            "src": "370:72:66"
          }
        ],
        "scope": 6994,
        "src": "155:289:66"
      }
    ],
    "src": "0:445:66"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.857Z"
}
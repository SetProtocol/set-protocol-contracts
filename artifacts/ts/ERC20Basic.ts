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
        6094
      ]
    },
    "id": 6095,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6064,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:63"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 6094,
        "linearizedBaseContracts": [
          6094
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6069,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6065,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "199:2:63"
            },
            "payable": false,
            "returnParameters": {
              "id": 6068,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6067,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6069,
                  "src": "223:7:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6066,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "223:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "222:9:63"
            },
            "scope": 6094,
            "src": "179:53:63",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6076,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6072,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6071,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 6076,
                  "src": "254:11:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6070,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "254:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "253:13:63"
            },
            "payable": false,
            "returnParameters": {
              "id": 6075,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6074,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6076,
                  "src": "288:7:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6073,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:9:63"
            },
            "scope": 6094,
            "src": "235:62:63",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6085,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6081,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6078,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6085,
                  "src": "318:10:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6077,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:63",
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
                  "id": 6080,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6085,
                  "src": "330:13:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6079,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:27:63"
            },
            "payable": false,
            "returnParameters": {
              "id": 6084,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6083,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6085,
                  "src": "361:4:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6082,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "361:4:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "360:6:63"
            },
            "scope": 6094,
            "src": "300:67:63",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6093,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6092,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6087,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6093,
                  "src": "385:20:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6086,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "385:7:63",
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
                  "id": 6089,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6093,
                  "src": "407:18:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6088,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "407:7:63",
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
                  "id": 6091,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6093,
                  "src": "427:13:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6090,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "427:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "384:57:63"
            },
            "src": "370:72:63"
          }
        ],
        "scope": 6095,
        "src": "155:289:63"
      }
    ],
    "src": "0:445:63"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        6094
      ]
    },
    "id": 6095,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6064,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:63"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 6094,
        "linearizedBaseContracts": [
          6094
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6069,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6065,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "199:2:63"
            },
            "payable": false,
            "returnParameters": {
              "id": 6068,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6067,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6069,
                  "src": "223:7:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6066,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "223:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "222:9:63"
            },
            "scope": 6094,
            "src": "179:53:63",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6076,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6072,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6071,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 6076,
                  "src": "254:11:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6070,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "254:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "253:13:63"
            },
            "payable": false,
            "returnParameters": {
              "id": 6075,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6074,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6076,
                  "src": "288:7:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6073,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:9:63"
            },
            "scope": 6094,
            "src": "235:62:63",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6085,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6081,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6078,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6085,
                  "src": "318:10:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6077,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:63",
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
                  "id": 6080,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6085,
                  "src": "330:13:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6079,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:27:63"
            },
            "payable": false,
            "returnParameters": {
              "id": 6084,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6083,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6085,
                  "src": "361:4:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6082,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "361:4:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "360:6:63"
            },
            "scope": 6094,
            "src": "300:67:63",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6093,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6092,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6087,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6093,
                  "src": "385:20:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6086,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "385:7:63",
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
                  "id": 6089,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6093,
                  "src": "407:18:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6088,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "407:7:63",
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
                  "id": 6091,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6093,
                  "src": "427:13:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6090,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "427:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "384:57:63"
            },
            "src": "370:72:63"
          }
        ],
        "scope": 6095,
        "src": "155:289:63"
      }
    ],
    "src": "0:445:63"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.213Z"
}
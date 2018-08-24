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
        6754
      ]
    },
    "id": 6755,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6724,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:47"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\nSee https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 6754,
        "linearizedBaseContracts": [
          6754
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6729,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6725,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "194:2:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6728,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6727,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6729,
                  "src": "218:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6726,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "218:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "217:9:47"
            },
            "scope": 6754,
            "src": "174:53:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6736,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6732,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6731,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 6736,
                  "src": "249:11:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6730,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:13:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6735,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6734,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6736,
                  "src": "283:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6733,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "283:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "282:9:47"
            },
            "scope": 6754,
            "src": "230:62:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6745,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6741,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6738,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6745,
                  "src": "313:10:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6737,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "313:7:47",
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
                  "id": 6740,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6745,
                  "src": "325:13:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6739,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "325:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "312:27:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6744,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6743,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6745,
                  "src": "356:4:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6742,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "356:4:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "355:6:47"
            },
            "scope": 6754,
            "src": "295:67:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6753,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6752,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6747,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6753,
                  "src": "380:20:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6746,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "380:7:47",
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
                  "id": 6749,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6753,
                  "src": "402:18:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6748,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "402:7:47",
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
                  "id": 6751,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6753,
                  "src": "422:13:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6750,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "422:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "379:57:47"
            },
            "src": "365:72:47"
          }
        ],
        "scope": 6755,
        "src": "150:289:47"
      }
    ],
    "src": "0:440:47"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        6754
      ]
    },
    "id": 6755,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6724,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:47"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\nSee https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 6754,
        "linearizedBaseContracts": [
          6754
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6729,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6725,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "194:2:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6728,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6727,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6729,
                  "src": "218:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6726,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "218:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "217:9:47"
            },
            "scope": 6754,
            "src": "174:53:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6736,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6732,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6731,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 6736,
                  "src": "249:11:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6730,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:13:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6735,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6734,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6736,
                  "src": "283:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6733,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "283:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "282:9:47"
            },
            "scope": 6754,
            "src": "230:62:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6745,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6741,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6738,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6745,
                  "src": "313:10:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6737,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "313:7:47",
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
                  "id": 6740,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6745,
                  "src": "325:13:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6739,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "325:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "312:27:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6744,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6743,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6745,
                  "src": "356:4:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6742,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "356:4:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "355:6:47"
            },
            "scope": 6754,
            "src": "295:67:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6753,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6752,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6747,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6753,
                  "src": "380:20:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6746,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "380:7:47",
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
                  "id": 6749,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6753,
                  "src": "402:18:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6748,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "402:7:47",
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
                  "id": 6751,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6753,
                  "src": "422:13:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6750,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "422:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "379:57:47"
            },
            "src": "365:72:47"
          }
        ],
        "scope": 6755,
        "src": "150:289:47"
      }
    ],
    "src": "0:440:47"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.620Z"
}
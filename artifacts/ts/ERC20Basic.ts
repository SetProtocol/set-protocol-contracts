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
        5735
      ]
    },
    "id": 5736,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5705,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:49"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\nSee https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 5735,
        "linearizedBaseContracts": [
          5735
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5710,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5706,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "194:2:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5709,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5708,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5710,
                  "src": "218:7:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5707,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "218:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "217:9:49"
            },
            "scope": 5735,
            "src": "174:53:49",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5717,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5713,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5712,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 5717,
                  "src": "249:11:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5711,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:13:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5716,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5715,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5717,
                  "src": "283:7:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5714,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "283:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "282:9:49"
            },
            "scope": 5735,
            "src": "230:62:49",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5726,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5722,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5719,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5726,
                  "src": "313:10:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5718,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "313:7:49",
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
                  "id": 5721,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5726,
                  "src": "325:13:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5720,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "325:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "312:27:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5725,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5724,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5726,
                  "src": "356:4:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5723,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "356:4:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "355:6:49"
            },
            "scope": 5735,
            "src": "295:67:49",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5734,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5733,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5728,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "380:20:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5727,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "380:7:49",
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
                  "id": 5730,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "402:18:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5729,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "402:7:49",
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
                  "id": 5732,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "422:13:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5731,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "422:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "379:57:49"
            },
            "src": "365:72:49"
          }
        ],
        "scope": 5736,
        "src": "150:289:49"
      }
    ],
    "src": "0:440:49"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        5735
      ]
    },
    "id": 5736,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5705,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:49"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\nSee https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 5735,
        "linearizedBaseContracts": [
          5735
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5710,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5706,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "194:2:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5709,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5708,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5710,
                  "src": "218:7:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5707,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "218:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "217:9:49"
            },
            "scope": 5735,
            "src": "174:53:49",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5717,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5713,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5712,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 5717,
                  "src": "249:11:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5711,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:13:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5716,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5715,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5717,
                  "src": "283:7:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5714,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "283:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "282:9:49"
            },
            "scope": 5735,
            "src": "230:62:49",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5726,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5722,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5719,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5726,
                  "src": "313:10:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5718,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "313:7:49",
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
                  "id": 5721,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5726,
                  "src": "325:13:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5720,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "325:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "312:27:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 5725,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5724,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5726,
                  "src": "356:4:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5723,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "356:4:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "355:6:49"
            },
            "scope": 5735,
            "src": "295:67:49",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5734,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5733,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5728,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "380:20:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5727,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "380:7:49",
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
                  "id": 5730,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "402:18:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5729,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "402:7:49",
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
                  "id": 5732,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "422:13:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5731,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "422:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "379:57:49"
            },
            "src": "365:72:49"
          }
        ],
        "scope": 5736,
        "src": "150:289:49"
      }
    ],
    "src": "0:440:49"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T03:42:05.791Z"
}
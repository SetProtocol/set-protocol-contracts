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
        6961
      ]
    },
    "id": 6962,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6920,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:65"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6921,
        "nodeType": "ImportDirective",
        "scope": 6962,
        "sourceUnit": 6994,
        "src": "26:26:65",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6922,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6993,
              "src": "162:10:65",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6993",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6923,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:65"
          }
        ],
        "contractDependencies": [
          6993
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6961,
        "linearizedBaseContracts": [
          6961,
          6993
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6932,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6928,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6925,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6932,
                  "src": "196:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6924,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:65",
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
                  "id": 6927,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6932,
                  "src": "211:15:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6926,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6931,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6930,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6932,
                  "src": "253:7:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6929,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:65"
            },
            "scope": 6961,
            "src": "177:85:65",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6943,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6939,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6934,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6943,
                  "src": "288:12:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6933,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:65",
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
                  "id": 6936,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6943,
                  "src": "302:10:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6935,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:65",
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
                  "id": 6938,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6943,
                  "src": "314:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6937,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6942,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6941,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6943,
                  "src": "349:4:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6940,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:65"
            },
            "scope": 6961,
            "src": "266:89:65",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6952,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6948,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6945,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6952,
                  "src": "376:15:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6944,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:65",
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
                  "id": 6947,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6952,
                  "src": "393:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6946,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6951,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6950,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6952,
                  "src": "424:4:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6949,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:65"
            },
            "scope": 6961,
            "src": "359:71:65",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6960,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6959,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6954,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6960,
                  "src": "453:21:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6953,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:65",
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
                  "id": 6956,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6960,
                  "src": "480:23:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6955,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:65",
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
                  "id": 6958,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6960,
                  "src": "509:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6957,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:65"
            },
            "src": "433:94:65"
          }
        ],
        "scope": 6962,
        "src": "144:385:65"
      }
    ],
    "src": "0:530:65"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        6961
      ]
    },
    "id": 6962,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6920,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:65"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6921,
        "nodeType": "ImportDirective",
        "scope": 6962,
        "sourceUnit": 6994,
        "src": "26:26:65",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6922,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6993,
              "src": "162:10:65",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6993",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6923,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:65"
          }
        ],
        "contractDependencies": [
          6993
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6961,
        "linearizedBaseContracts": [
          6961,
          6993
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6932,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6928,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6925,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6932,
                  "src": "196:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6924,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:65",
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
                  "id": 6927,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6932,
                  "src": "211:15:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6926,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6931,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6930,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6932,
                  "src": "253:7:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6929,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:65"
            },
            "scope": 6961,
            "src": "177:85:65",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6943,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6939,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6934,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6943,
                  "src": "288:12:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6933,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:65",
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
                  "id": 6936,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6943,
                  "src": "302:10:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6935,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:65",
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
                  "id": 6938,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6943,
                  "src": "314:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6937,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6942,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6941,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6943,
                  "src": "349:4:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6940,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:65"
            },
            "scope": 6961,
            "src": "266:89:65",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6952,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6948,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6945,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6952,
                  "src": "376:15:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6944,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:65",
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
                  "id": 6947,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6952,
                  "src": "393:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6946,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6951,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6950,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6952,
                  "src": "424:4:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6949,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:65"
            },
            "scope": 6961,
            "src": "359:71:65",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6960,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6959,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6954,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6960,
                  "src": "453:21:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6953,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:65",
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
                  "id": 6956,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6960,
                  "src": "480:23:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6955,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:65",
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
                  "id": 6958,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6960,
                  "src": "509:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6957,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:65"
            },
            "src": "433:94:65"
          }
        ],
        "scope": 6962,
        "src": "144:385:65"
      }
    ],
    "src": "0:530:65"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.857Z"
}
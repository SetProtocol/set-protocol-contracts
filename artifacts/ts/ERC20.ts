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
        6062
      ]
    },
    "id": 6063,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6021,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:62"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6022,
        "nodeType": "ImportDirective",
        "scope": 6063,
        "sourceUnit": 6095,
        "src": "26:26:62",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6023,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6094,
              "src": "162:10:62",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6094",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6024,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:62"
          }
        ],
        "contractDependencies": [
          6094
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6062,
        "linearizedBaseContracts": [
          6062,
          6094
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6033,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6029,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6026,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6033,
                  "src": "196:13:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6025,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:62",
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
                  "id": 6028,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6033,
                  "src": "211:15:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6027,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6032,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6031,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6033,
                  "src": "253:7:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6030,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:62"
            },
            "scope": 6062,
            "src": "177:85:62",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6044,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6040,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6035,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6044,
                  "src": "288:12:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6034,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:62",
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
                  "id": 6037,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6044,
                  "src": "302:10:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6036,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:62",
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
                  "id": 6039,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6044,
                  "src": "314:13:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6038,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6043,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6042,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6044,
                  "src": "349:4:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6041,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:62"
            },
            "scope": 6062,
            "src": "266:89:62",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6053,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6049,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6046,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6053,
                  "src": "376:15:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6045,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:62",
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
                  "id": 6048,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6053,
                  "src": "393:13:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6047,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6052,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6051,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6053,
                  "src": "424:4:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6050,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:62"
            },
            "scope": 6062,
            "src": "359:71:62",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6061,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6060,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6055,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6061,
                  "src": "453:21:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6054,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:62",
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
                  "id": 6057,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6061,
                  "src": "480:23:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6056,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:62",
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
                  "id": 6059,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6061,
                  "src": "509:13:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6058,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:62"
            },
            "src": "433:94:62"
          }
        ],
        "scope": 6063,
        "src": "144:385:62"
      }
    ],
    "src": "0:530:62"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        6062
      ]
    },
    "id": 6063,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6021,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:62"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6022,
        "nodeType": "ImportDirective",
        "scope": 6063,
        "sourceUnit": 6095,
        "src": "26:26:62",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6023,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6094,
              "src": "162:10:62",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6094",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6024,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:62"
          }
        ],
        "contractDependencies": [
          6094
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6062,
        "linearizedBaseContracts": [
          6062,
          6094
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6033,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6029,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6026,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6033,
                  "src": "196:13:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6025,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:62",
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
                  "id": 6028,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6033,
                  "src": "211:15:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6027,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6032,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6031,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6033,
                  "src": "253:7:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6030,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:62"
            },
            "scope": 6062,
            "src": "177:85:62",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6044,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6040,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6035,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6044,
                  "src": "288:12:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6034,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:62",
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
                  "id": 6037,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6044,
                  "src": "302:10:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6036,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:62",
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
                  "id": 6039,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6044,
                  "src": "314:13:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6038,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6043,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6042,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6044,
                  "src": "349:4:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6041,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:62"
            },
            "scope": 6062,
            "src": "266:89:62",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6053,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6049,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6046,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6053,
                  "src": "376:15:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6045,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:62",
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
                  "id": 6048,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6053,
                  "src": "393:13:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6047,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:62"
            },
            "payable": false,
            "returnParameters": {
              "id": 6052,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6051,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6053,
                  "src": "424:4:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6050,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:62"
            },
            "scope": 6062,
            "src": "359:71:62",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6061,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6060,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6055,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6061,
                  "src": "453:21:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6054,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:62",
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
                  "id": 6057,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6061,
                  "src": "480:23:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6056,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:62",
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
                  "id": 6059,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6061,
                  "src": "509:13:62",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6058,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:62",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:62"
            },
            "src": "433:94:62"
          }
        ],
        "scope": 6063,
        "src": "144:385:62"
      }
    ],
    "src": "0:530:62"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.213Z"
}
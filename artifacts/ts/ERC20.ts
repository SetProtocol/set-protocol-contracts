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
        6679
      ]
    },
    "id": 6680,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6638,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:64"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6639,
        "nodeType": "ImportDirective",
        "scope": 6680,
        "sourceUnit": 6712,
        "src": "26:26:64",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6640,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6711,
              "src": "162:10:64",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6711",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6641,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:64"
          }
        ],
        "contractDependencies": [
          6711
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6679,
        "linearizedBaseContracts": [
          6679,
          6711
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6650,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6646,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6643,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6650,
                  "src": "196:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6642,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:64",
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
                  "id": 6645,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6650,
                  "src": "211:15:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6644,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:64"
            },
            "payable": false,
            "returnParameters": {
              "id": 6649,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6648,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6650,
                  "src": "253:7:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6647,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:64"
            },
            "scope": 6679,
            "src": "177:85:64",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6661,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6657,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6652,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6661,
                  "src": "288:12:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6651,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:64",
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
                  "id": 6654,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6661,
                  "src": "302:10:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6653,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:64",
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
                  "id": 6656,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6661,
                  "src": "314:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6655,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:64"
            },
            "payable": false,
            "returnParameters": {
              "id": 6660,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6659,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6661,
                  "src": "349:4:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6658,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:64"
            },
            "scope": 6679,
            "src": "266:89:64",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6670,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6666,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6663,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6670,
                  "src": "376:15:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6662,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:64",
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
                  "id": 6665,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6670,
                  "src": "393:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6664,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:64"
            },
            "payable": false,
            "returnParameters": {
              "id": 6669,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6668,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6670,
                  "src": "424:4:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6667,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:64"
            },
            "scope": 6679,
            "src": "359:71:64",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6678,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6677,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6672,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6678,
                  "src": "453:21:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6671,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:64",
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
                  "id": 6674,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6678,
                  "src": "480:23:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6673,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:64",
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
                  "id": 6676,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6678,
                  "src": "509:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6675,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:64"
            },
            "src": "433:94:64"
          }
        ],
        "scope": 6680,
        "src": "144:385:64"
      }
    ],
    "src": "0:530:64"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        6679
      ]
    },
    "id": 6680,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6638,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:64"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6639,
        "nodeType": "ImportDirective",
        "scope": 6680,
        "sourceUnit": 6712,
        "src": "26:26:64",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6640,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6711,
              "src": "162:10:64",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6711",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6641,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:64"
          }
        ],
        "contractDependencies": [
          6711
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6679,
        "linearizedBaseContracts": [
          6679,
          6711
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6650,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6646,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6643,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6650,
                  "src": "196:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6642,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:64",
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
                  "id": 6645,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6650,
                  "src": "211:15:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6644,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:64"
            },
            "payable": false,
            "returnParameters": {
              "id": 6649,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6648,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6650,
                  "src": "253:7:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6647,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:64"
            },
            "scope": 6679,
            "src": "177:85:64",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6661,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6657,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6652,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6661,
                  "src": "288:12:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6651,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:64",
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
                  "id": 6654,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6661,
                  "src": "302:10:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6653,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:64",
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
                  "id": 6656,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6661,
                  "src": "314:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6655,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:64"
            },
            "payable": false,
            "returnParameters": {
              "id": 6660,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6659,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6661,
                  "src": "349:4:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6658,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:64"
            },
            "scope": 6679,
            "src": "266:89:64",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6670,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6666,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6663,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6670,
                  "src": "376:15:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6662,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:64",
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
                  "id": 6665,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6670,
                  "src": "393:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6664,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:64"
            },
            "payable": false,
            "returnParameters": {
              "id": 6669,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6668,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6670,
                  "src": "424:4:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6667,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:64"
            },
            "scope": 6679,
            "src": "359:71:64",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6678,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6677,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6672,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6678,
                  "src": "453:21:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6671,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:64",
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
                  "id": 6674,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6678,
                  "src": "480:23:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6673,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:64",
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
                  "id": 6676,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6678,
                  "src": "509:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6675,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:64",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:64"
            },
            "src": "433:94:64"
          }
        ],
        "scope": 6680,
        "src": "144:385:64"
      }
    ],
    "src": "0:530:64"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-06T13:39:43.022Z"
}
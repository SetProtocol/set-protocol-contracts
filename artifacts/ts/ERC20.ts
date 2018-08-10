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
  "source": "pragma solidity ^0.4.24;\n\nimport \"./ERC20Basic.sol\";\n\n\n/**\n * @title ERC20 interface\n * @dev see https://github.com/ethereum/EIPs/issues/20\n */\ncontract ERC20 is ERC20Basic {\n  function allowance(address owner, address spender)\n    public view returns (uint256);\n\n  function transferFrom(address from, address to, uint256 value)\n    public returns (bool);\n\n  function approve(address spender, uint256 value) public returns (bool);\n  event Approval(\n    address indexed owner,\n    address indexed spender,\n    uint256 value\n  );\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        5703
      ]
    },
    "id": 5704,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5662,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:48"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 5663,
        "nodeType": "ImportDirective",
        "scope": 5704,
        "sourceUnit": 5736,
        "src": "26:26:48",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5664,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5735,
              "src": "162:10:48",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$5735",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 5665,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:48"
          }
        ],
        "contractDependencies": [
          5735
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 5703,
        "linearizedBaseContracts": [
          5703,
          5735
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5674,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5670,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5667,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5674,
                  "src": "196:13:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5666,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:48",
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
                  "id": 5669,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5674,
                  "src": "211:15:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5668,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 5673,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5672,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5674,
                  "src": "253:7:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5671,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:48"
            },
            "scope": 5703,
            "src": "177:85:48",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5685,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5681,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5676,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5685,
                  "src": "288:12:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5675,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:48",
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
                  "id": 5678,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5685,
                  "src": "302:10:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5677,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:48",
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
                  "id": 5680,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5685,
                  "src": "314:13:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5679,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 5684,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5683,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5685,
                  "src": "349:4:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5682,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:48"
            },
            "scope": 5703,
            "src": "266:89:48",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5694,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5690,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5687,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5694,
                  "src": "376:15:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5686,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:48",
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
                  "id": 5689,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5694,
                  "src": "393:13:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5688,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 5693,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5692,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5694,
                  "src": "424:4:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5691,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:48"
            },
            "scope": 5703,
            "src": "359:71:48",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5702,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5701,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5696,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5702,
                  "src": "453:21:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5695,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:48",
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
                  "id": 5698,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5702,
                  "src": "480:23:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5697,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:48",
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
                  "id": 5700,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5702,
                  "src": "509:13:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5699,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:48"
            },
            "src": "433:94:48"
          }
        ],
        "scope": 5704,
        "src": "144:385:48"
      }
    ],
    "src": "0:530:48"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        5703
      ]
    },
    "id": 5704,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5662,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:48"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 5663,
        "nodeType": "ImportDirective",
        "scope": 5704,
        "sourceUnit": 5736,
        "src": "26:26:48",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5664,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5735,
              "src": "162:10:48",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$5735",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 5665,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:48"
          }
        ],
        "contractDependencies": [
          5735
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 5703,
        "linearizedBaseContracts": [
          5703,
          5735
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5674,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5670,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5667,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5674,
                  "src": "196:13:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5666,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:48",
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
                  "id": 5669,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5674,
                  "src": "211:15:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5668,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 5673,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5672,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5674,
                  "src": "253:7:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5671,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:48"
            },
            "scope": 5703,
            "src": "177:85:48",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5685,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5681,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5676,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5685,
                  "src": "288:12:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5675,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:48",
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
                  "id": 5678,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5685,
                  "src": "302:10:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5677,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:48",
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
                  "id": 5680,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5685,
                  "src": "314:13:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5679,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 5684,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5683,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5685,
                  "src": "349:4:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5682,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:48"
            },
            "scope": 5703,
            "src": "266:89:48",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5694,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5690,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5687,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5694,
                  "src": "376:15:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5686,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:48",
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
                  "id": 5689,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5694,
                  "src": "393:13:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5688,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:48"
            },
            "payable": false,
            "returnParameters": {
              "id": 5693,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5692,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5694,
                  "src": "424:4:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5691,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:48"
            },
            "scope": 5703,
            "src": "359:71:48",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5702,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5701,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5696,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5702,
                  "src": "453:21:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5695,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:48",
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
                  "id": 5698,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5702,
                  "src": "480:23:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5697,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:48",
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
                  "id": 5700,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5702,
                  "src": "509:13:48",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5699,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:48",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:48"
            },
            "src": "433:94:48"
          }
        ],
        "scope": 5704,
        "src": "144:385:48"
      }
    ],
    "src": "0:530:48"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T03:42:05.792Z"
}
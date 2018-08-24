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
        6722
      ]
    },
    "id": 6723,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6681,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:46"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6682,
        "nodeType": "ImportDirective",
        "scope": 6723,
        "sourceUnit": 6755,
        "src": "26:26:46",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6683,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6754,
              "src": "162:10:46",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6754",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6684,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:46"
          }
        ],
        "contractDependencies": [
          6754
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6722,
        "linearizedBaseContracts": [
          6722,
          6754
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6693,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6689,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6686,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6693,
                  "src": "196:13:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6685,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:46",
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
                  "id": 6688,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6693,
                  "src": "211:15:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6687,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6692,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6691,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6693,
                  "src": "253:7:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6690,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:46"
            },
            "scope": 6722,
            "src": "177:85:46",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6704,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6700,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6695,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6704,
                  "src": "288:12:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6694,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:46",
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
                  "id": 6697,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6704,
                  "src": "302:10:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6696,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:46",
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
                  "id": 6699,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6704,
                  "src": "314:13:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6698,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6703,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6702,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6704,
                  "src": "349:4:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6701,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:46"
            },
            "scope": 6722,
            "src": "266:89:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6713,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6709,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6706,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6713,
                  "src": "376:15:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6705,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:46",
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
                  "id": 6708,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6713,
                  "src": "393:13:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6707,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6712,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6711,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6713,
                  "src": "424:4:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6710,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:46"
            },
            "scope": 6722,
            "src": "359:71:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6721,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6720,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6715,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6721,
                  "src": "453:21:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6714,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:46",
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
                  "id": 6717,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6721,
                  "src": "480:23:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6716,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:46",
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
                  "id": 6719,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6721,
                  "src": "509:13:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6718,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:46"
            },
            "src": "433:94:46"
          }
        ],
        "scope": 6723,
        "src": "144:385:46"
      }
    ],
    "src": "0:530:46"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        6722
      ]
    },
    "id": 6723,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6681,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:46"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 6682,
        "nodeType": "ImportDirective",
        "scope": 6723,
        "sourceUnit": 6755,
        "src": "26:26:46",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 6683,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6754,
              "src": "162:10:46",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6754",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6684,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:46"
          }
        ],
        "contractDependencies": [
          6754
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6722,
        "linearizedBaseContracts": [
          6722,
          6754
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6693,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6689,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6686,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6693,
                  "src": "196:13:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6685,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:46",
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
                  "id": 6688,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6693,
                  "src": "211:15:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6687,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6692,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6691,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6693,
                  "src": "253:7:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6690,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:46"
            },
            "scope": 6722,
            "src": "177:85:46",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6704,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6700,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6695,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6704,
                  "src": "288:12:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6694,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:46",
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
                  "id": 6697,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6704,
                  "src": "302:10:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6696,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:46",
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
                  "id": 6699,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6704,
                  "src": "314:13:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6698,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6703,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6702,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6704,
                  "src": "349:4:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6701,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:46"
            },
            "scope": 6722,
            "src": "266:89:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6713,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6709,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6706,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6713,
                  "src": "376:15:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6705,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:46",
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
                  "id": 6708,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6713,
                  "src": "393:13:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6707,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6712,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6711,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6713,
                  "src": "424:4:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6710,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:46"
            },
            "scope": 6722,
            "src": "359:71:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6721,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6720,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6715,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6721,
                  "src": "453:21:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6714,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:46",
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
                  "id": 6717,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6721,
                  "src": "480:23:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6716,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:46",
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
                  "id": 6719,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6721,
                  "src": "509:13:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6718,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:46"
            },
            "src": "433:94:46"
          }
        ],
        "scope": 6723,
        "src": "144:385:46"
      }
    ],
    "src": "0:530:46"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.620Z"
}
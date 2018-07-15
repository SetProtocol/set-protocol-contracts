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
        6605
      ]
    },
    "id": 6606,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6564,
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
        "id": 6565,
        "nodeType": "ImportDirective",
        "scope": 6606,
        "sourceUnit": 6638,
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
              "id": 6566,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6637,
              "src": "162:10:64",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6637",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6567,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:64"
          }
        ],
        "contractDependencies": [
          6637
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6605,
        "linearizedBaseContracts": [
          6605,
          6637
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6576,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6572,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6569,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6576,
                  "src": "196:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6568,
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
                  "id": 6571,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6576,
                  "src": "211:15:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6570,
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
              "id": 6575,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6574,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6576,
                  "src": "253:7:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6573,
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
            "scope": 6605,
            "src": "177:85:64",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6587,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6583,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6578,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6587,
                  "src": "288:12:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6577,
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
                  "id": 6580,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6587,
                  "src": "302:10:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6579,
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
                  "id": 6582,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6587,
                  "src": "314:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6581,
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
              "id": 6586,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6585,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6587,
                  "src": "349:4:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6584,
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
            "scope": 6605,
            "src": "266:89:64",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6596,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6592,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6589,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6596,
                  "src": "376:15:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6588,
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
                  "id": 6591,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6596,
                  "src": "393:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6590,
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
              "id": 6595,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6594,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6596,
                  "src": "424:4:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6593,
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
            "scope": 6605,
            "src": "359:71:64",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6604,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6603,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6598,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6604,
                  "src": "453:21:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6597,
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
                  "id": 6600,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6604,
                  "src": "480:23:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6599,
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
                  "id": 6602,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6604,
                  "src": "509:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6601,
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
        "scope": 6606,
        "src": "144:385:64"
      }
    ],
    "src": "0:530:64"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        6605
      ]
    },
    "id": 6606,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6564,
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
        "id": 6565,
        "nodeType": "ImportDirective",
        "scope": 6606,
        "sourceUnit": 6638,
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
              "id": 6566,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6637,
              "src": "162:10:64",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6637",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6567,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:64"
          }
        ],
        "contractDependencies": [
          6637
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6605,
        "linearizedBaseContracts": [
          6605,
          6637
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6576,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6572,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6569,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6576,
                  "src": "196:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6568,
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
                  "id": 6571,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6576,
                  "src": "211:15:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6570,
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
              "id": 6575,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6574,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6576,
                  "src": "253:7:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6573,
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
            "scope": 6605,
            "src": "177:85:64",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6587,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6583,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6578,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6587,
                  "src": "288:12:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6577,
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
                  "id": 6580,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6587,
                  "src": "302:10:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6579,
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
                  "id": 6582,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6587,
                  "src": "314:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6581,
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
              "id": 6586,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6585,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6587,
                  "src": "349:4:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6584,
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
            "scope": 6605,
            "src": "266:89:64",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6596,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6592,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6589,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6596,
                  "src": "376:15:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6588,
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
                  "id": 6591,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6596,
                  "src": "393:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6590,
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
              "id": 6595,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6594,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6596,
                  "src": "424:4:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6593,
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
            "scope": 6605,
            "src": "359:71:64",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6604,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6603,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6598,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6604,
                  "src": "453:21:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6597,
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
                  "id": 6600,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6604,
                  "src": "480:23:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6599,
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
                  "id": 6602,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6604,
                  "src": "509:13:64",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6601,
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
        "scope": 6606,
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
  "updatedAt": "2018-07-13T21:55:38.442Z"
}
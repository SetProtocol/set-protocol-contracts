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
        5743
      ]
    },
    "id": 5744,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5702,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:31"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 5703,
        "nodeType": "ImportDirective",
        "scope": 5744,
        "sourceUnit": 5776,
        "src": "26:26:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5704,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5775,
              "src": "162:10:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$5775",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 5705,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:31"
          }
        ],
        "contractDependencies": [
          5775
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 5743,
        "linearizedBaseContracts": [
          5743,
          5775
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5714,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5710,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5707,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5714,
                  "src": "196:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5706,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:31",
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
                  "id": 5709,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5714,
                  "src": "211:15:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5708,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 5713,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5712,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5714,
                  "src": "253:7:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5711,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:31"
            },
            "scope": 5743,
            "src": "177:85:31",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5725,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5721,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5716,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5725,
                  "src": "288:12:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5715,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:31",
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
                  "id": 5718,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5725,
                  "src": "302:10:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5717,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:31",
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
                  "id": 5720,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5725,
                  "src": "314:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5719,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 5724,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5723,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5725,
                  "src": "349:4:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5722,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:31"
            },
            "scope": 5743,
            "src": "266:89:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5734,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5730,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5727,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "376:15:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5726,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:31",
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
                  "id": 5729,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "393:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5728,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 5733,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5732,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "424:4:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5731,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:31"
            },
            "scope": 5743,
            "src": "359:71:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5742,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5741,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5736,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5742,
                  "src": "453:21:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5735,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:31",
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
                  "id": 5738,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5742,
                  "src": "480:23:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5737,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:31",
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
                  "id": 5740,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5742,
                  "src": "509:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5739,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:31"
            },
            "src": "433:94:31"
          }
        ],
        "scope": 5744,
        "src": "144:385:31"
      }
    ],
    "src": "0:530:31"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        5743
      ]
    },
    "id": 5744,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5702,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:31"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 5703,
        "nodeType": "ImportDirective",
        "scope": 5744,
        "sourceUnit": 5776,
        "src": "26:26:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5704,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5775,
              "src": "162:10:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$5775",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 5705,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:31"
          }
        ],
        "contractDependencies": [
          5775
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 5743,
        "linearizedBaseContracts": [
          5743,
          5775
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5714,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5710,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5707,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5714,
                  "src": "196:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5706,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:31",
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
                  "id": 5709,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5714,
                  "src": "211:15:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5708,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 5713,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5712,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5714,
                  "src": "253:7:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5711,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:31"
            },
            "scope": 5743,
            "src": "177:85:31",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5725,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5721,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5716,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5725,
                  "src": "288:12:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5715,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:31",
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
                  "id": 5718,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5725,
                  "src": "302:10:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5717,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:31",
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
                  "id": 5720,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5725,
                  "src": "314:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5719,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 5724,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5723,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5725,
                  "src": "349:4:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5722,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:31"
            },
            "scope": 5743,
            "src": "266:89:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5734,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5730,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5727,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "376:15:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5726,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:31",
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
                  "id": 5729,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "393:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5728,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 5733,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5732,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5734,
                  "src": "424:4:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5731,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:31"
            },
            "scope": 5743,
            "src": "359:71:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5742,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5741,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5736,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5742,
                  "src": "453:21:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5735,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:31",
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
                  "id": 5738,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5742,
                  "src": "480:23:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5737,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:31",
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
                  "id": 5740,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5742,
                  "src": "509:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5739,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:31"
            },
            "src": "433:94:31"
          }
        ],
        "scope": 5744,
        "src": "144:385:31"
      }
    ],
    "src": "0:530:31"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T15:29:45.040Z"
}
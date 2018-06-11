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
        2414
      ]
    },
    "id": 2415,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2373,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:14"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 2374,
        "nodeType": "ImportDirective",
        "scope": 2415,
        "sourceUnit": 2447,
        "src": "26:26:14",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2375,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2446,
              "src": "162:10:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$2446",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 2376,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:14"
          }
        ],
        "contractDependencies": [
          2446
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 2414,
        "linearizedBaseContracts": [
          2414,
          2446
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 2385,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2381,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2378,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2385,
                  "src": "196:13:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2377,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:14",
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
                  "id": 2380,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 2385,
                  "src": "211:15:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2379,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2384,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2383,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2385,
                  "src": "253:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2382,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:14"
            },
            "scope": 2414,
            "src": "177:85:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2396,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2392,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2387,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 2396,
                  "src": "288:12:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2386,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:14",
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
                  "id": 2389,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 2396,
                  "src": "302:10:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2388,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:14",
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
                  "id": 2391,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 2396,
                  "src": "314:13:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2390,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2395,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2394,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2396,
                  "src": "349:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2393,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:14"
            },
            "scope": 2414,
            "src": "266:89:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2405,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2401,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2398,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 2405,
                  "src": "376:15:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2397,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:14",
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
                  "id": 2400,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 2405,
                  "src": "393:13:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2399,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2404,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2403,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2405,
                  "src": "424:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2402,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:14"
            },
            "scope": 2414,
            "src": "359:71:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 2413,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 2412,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2407,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2413,
                  "src": "453:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2406,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:14",
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
                  "id": 2409,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 2413,
                  "src": "480:23:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2408,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:14",
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
                  "id": 2411,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 2413,
                  "src": "509:13:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2410,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:14"
            },
            "src": "433:94:14"
          }
        ],
        "scope": 2415,
        "src": "144:385:14"
      }
    ],
    "src": "0:530:14"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        2414
      ]
    },
    "id": 2415,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2373,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:14"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 2374,
        "nodeType": "ImportDirective",
        "scope": 2415,
        "sourceUnit": 2447,
        "src": "26:26:14",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2375,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2446,
              "src": "162:10:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$2446",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 2376,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:14"
          }
        ],
        "contractDependencies": [
          2446
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 2414,
        "linearizedBaseContracts": [
          2414,
          2446
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 2385,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2381,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2378,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2385,
                  "src": "196:13:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2377,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:14",
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
                  "id": 2380,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 2385,
                  "src": "211:15:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2379,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2384,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2383,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2385,
                  "src": "253:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2382,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "253:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "252:9:14"
            },
            "scope": 2414,
            "src": "177:85:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2396,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2392,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2387,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 2396,
                  "src": "288:12:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2386,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:14",
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
                  "id": 2389,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 2396,
                  "src": "302:10:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2388,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "302:7:14",
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
                  "id": 2391,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 2396,
                  "src": "314:13:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2390,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:41:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2395,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2394,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2396,
                  "src": "349:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2393,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "349:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "348:6:14"
            },
            "scope": 2414,
            "src": "266:89:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 2405,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2401,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2398,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 2405,
                  "src": "376:15:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2397,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "376:7:14",
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
                  "id": 2400,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 2405,
                  "src": "393:13:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2399,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "393:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "375:32:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2404,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2403,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2405,
                  "src": "424:4:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2402,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "424:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "423:6:14"
            },
            "scope": 2414,
            "src": "359:71:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 2413,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 2412,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2407,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 2413,
                  "src": "453:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2406,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "453:7:14",
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
                  "id": 2409,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 2413,
                  "src": "480:23:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2408,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "480:7:14",
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
                  "id": 2411,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 2413,
                  "src": "509:13:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2410,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "447:79:14"
            },
            "src": "433:94:14"
          }
        ],
        "scope": 2415,
        "src": "144:385:14"
      }
    ],
    "src": "0:530:14"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.23+commit.124ca40d.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-06-06T22:54:27.588Z"
}
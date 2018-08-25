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
          "name": "_who",
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
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
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
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
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
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
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
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
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
  "source": "pragma solidity ^0.4.24;\n\nimport \"./ERC20Basic.sol\";\n\n\n/**\n * @title ERC20 interface\n * @dev see https://github.com/ethereum/EIPs/issues/20\n */\ncontract ERC20 is ERC20Basic {\n  function allowance(address _owner, address _spender)\n    public view returns (uint256);\n\n  function transferFrom(address _from, address _to, uint256 _value)\n    public returns (bool);\n\n  function approve(address _spender, uint256 _value) public returns (bool);\n  event Approval(\n    address indexed owner,\n    address indexed spender,\n    uint256 value\n  );\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        6776
      ]
    },
    "id": 6777,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6735,
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
        "id": 6736,
        "nodeType": "ImportDirective",
        "scope": 6777,
        "sourceUnit": 6809,
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
              "id": 6737,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6808,
              "src": "162:10:46",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6808",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6738,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:46"
          }
        ],
        "contractDependencies": [
          6808
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6776,
        "linearizedBaseContracts": [
          6776,
          6808
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6747,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6743,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6740,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6747,
                  "src": "196:14:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6739,
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
                  "id": 6742,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6747,
                  "src": "212:16:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6741,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "212:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:34:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6746,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6745,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6747,
                  "src": "255:7:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6744,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "255:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "254:9:46"
            },
            "scope": 6776,
            "src": "177:87:46",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6758,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6754,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6749,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6758,
                  "src": "290:13:46",
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
                    "src": "290:7:46",
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
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6758,
                  "src": "305:11:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6750,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "305:7:46",
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
                  "id": 6753,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6758,
                  "src": "318:14:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6752,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "289:44:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6757,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6756,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6758,
                  "src": "354:4:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6755,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "354:4:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "353:6:46"
            },
            "scope": 6776,
            "src": "268:92:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6767,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6763,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6760,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6767,
                  "src": "381:16:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6759,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "381:7:46",
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
                  "id": 6762,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6767,
                  "src": "399:14:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6761,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "399:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "380:34:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6766,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6765,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6767,
                  "src": "431:4:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6764,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "431:4:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "430:6:46"
            },
            "scope": 6776,
            "src": "364:73:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6775,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6774,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6769,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6775,
                  "src": "460:21:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6768,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "460:7:46",
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
                  "id": 6771,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6775,
                  "src": "487:23:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6770,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "487:7:46",
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
                  "id": 6773,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6775,
                  "src": "516:13:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6772,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "516:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "454:79:46"
            },
            "src": "440:94:46"
          }
        ],
        "scope": 6777,
        "src": "144:392:46"
      }
    ],
    "src": "0:537:46"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        6776
      ]
    },
    "id": 6777,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6735,
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
        "id": 6736,
        "nodeType": "ImportDirective",
        "scope": 6777,
        "sourceUnit": 6809,
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
              "id": 6737,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6808,
              "src": "162:10:46",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$6808",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 6738,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:46"
          }
        ],
        "contractDependencies": [
          6808
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 6776,
        "linearizedBaseContracts": [
          6776,
          6808
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6747,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6743,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6740,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6747,
                  "src": "196:14:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6739,
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
                  "id": 6742,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6747,
                  "src": "212:16:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6741,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "212:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:34:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6746,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6745,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6747,
                  "src": "255:7:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6744,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "255:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "254:9:46"
            },
            "scope": 6776,
            "src": "177:87:46",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6758,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6754,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6749,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6758,
                  "src": "290:13:46",
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
                    "src": "290:7:46",
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
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6758,
                  "src": "305:11:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6750,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "305:7:46",
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
                  "id": 6753,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6758,
                  "src": "318:14:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6752,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "289:44:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6757,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6756,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6758,
                  "src": "354:4:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6755,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "354:4:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "353:6:46"
            },
            "scope": 6776,
            "src": "268:92:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6767,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6763,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6760,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6767,
                  "src": "381:16:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6759,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "381:7:46",
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
                  "id": 6762,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6767,
                  "src": "399:14:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6761,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "399:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "380:34:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 6766,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6765,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6767,
                  "src": "431:4:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6764,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "431:4:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "430:6:46"
            },
            "scope": 6776,
            "src": "364:73:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6775,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6774,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6769,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6775,
                  "src": "460:21:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6768,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "460:7:46",
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
                  "id": 6771,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6775,
                  "src": "487:23:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6770,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "487:7:46",
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
                  "id": 6773,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6775,
                  "src": "516:13:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6772,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "516:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "454:79:46"
            },
            "src": "440:94:46"
          }
        ],
        "scope": 6777,
        "src": "144:392:46"
      }
    ],
    "src": "0:537:46"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-25T17:34:39.539Z"
}
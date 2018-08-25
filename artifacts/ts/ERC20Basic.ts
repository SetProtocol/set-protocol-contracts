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
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "pragma solidity ^0.4.24;\n\n\n/**\n * @title ERC20Basic\n * @dev Simpler version of ERC20 interface\n * See https://github.com/ethereum/EIPs/issues/179\n */\ncontract ERC20Basic {\n  function totalSupply() public view returns (uint256);\n  function balanceOf(address _who) public view returns (uint256);\n  function transfer(address _to, uint256 _value) public returns (bool);\n  event Transfer(address indexed from, address indexed to, uint256 value);\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        6808
      ]
    },
    "id": 6809,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6778,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:47"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\nSee https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 6808,
        "linearizedBaseContracts": [
          6808
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6783,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6779,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "194:2:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6782,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6781,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6783,
                  "src": "218:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6780,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "218:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "217:9:47"
            },
            "scope": 6808,
            "src": "174:53:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6790,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6786,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6785,
                  "name": "_who",
                  "nodeType": "VariableDeclaration",
                  "scope": 6790,
                  "src": "249:12:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6784,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:14:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6789,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6788,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6790,
                  "src": "284:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6787,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "284:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "283:9:47"
            },
            "scope": 6808,
            "src": "230:63:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6799,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6795,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6792,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6799,
                  "src": "314:11:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6791,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:47",
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
                  "id": 6794,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6799,
                  "src": "327:14:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6793,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "327:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "313:29:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6798,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6797,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6799,
                  "src": "359:4:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6796,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "359:4:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "358:6:47"
            },
            "scope": 6808,
            "src": "296:69:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6807,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6806,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6801,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6807,
                  "src": "383:20:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6800,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "383:7:47",
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
                  "id": 6803,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6807,
                  "src": "405:18:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6802,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "405:7:47",
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
                  "id": 6805,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6807,
                  "src": "425:13:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6804,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "425:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "382:57:47"
            },
            "src": "368:72:47"
          }
        ],
        "scope": 6809,
        "src": "150:292:47"
      }
    ],
    "src": "0:443:47"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        6808
      ]
    },
    "id": 6809,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6778,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:47"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\nSee https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 6808,
        "linearizedBaseContracts": [
          6808
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6783,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6779,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "194:2:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6782,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6781,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6783,
                  "src": "218:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6780,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "218:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "217:9:47"
            },
            "scope": 6808,
            "src": "174:53:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6790,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6786,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6785,
                  "name": "_who",
                  "nodeType": "VariableDeclaration",
                  "scope": 6790,
                  "src": "249:12:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6784,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:14:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6789,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6788,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6790,
                  "src": "284:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6787,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "284:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "283:9:47"
            },
            "scope": 6808,
            "src": "230:63:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6799,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6795,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6792,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6799,
                  "src": "314:11:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6791,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "314:7:47",
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
                  "id": 6794,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6799,
                  "src": "327:14:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6793,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "327:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "313:29:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 6798,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6797,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6799,
                  "src": "359:4:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6796,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "359:4:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "358:6:47"
            },
            "scope": 6808,
            "src": "296:69:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6807,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6806,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6801,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6807,
                  "src": "383:20:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6800,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "383:7:47",
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
                  "id": 6803,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6807,
                  "src": "405:18:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6802,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "405:7:47",
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
                  "id": 6805,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6807,
                  "src": "425:13:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6804,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "425:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "382:57:47"
            },
            "src": "368:72:47"
          }
        ],
        "scope": 6809,
        "src": "150:292:47"
      }
    ],
    "src": "0:443:47"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-25T17:34:39.540Z"
}
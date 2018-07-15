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
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "pragma solidity ^0.4.23;\n\n\n/**\n * @title ERC20Basic\n * @dev Simpler version of ERC20 interface\n * @dev see https://github.com/ethereum/EIPs/issues/179\n */\ncontract ERC20Basic {\n  function totalSupply() public view returns (uint256);\n  function balanceOf(address who) public view returns (uint256);\n  function transfer(address to, uint256 value) public returns (bool);\n  event Transfer(address indexed from, address indexed to, uint256 value);\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        6637
      ]
    },
    "id": 6638,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6607,
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
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 6637,
        "linearizedBaseContracts": [
          6637
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6612,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6608,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "199:2:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6611,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6610,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6612,
                  "src": "223:7:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6609,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "223:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "222:9:65"
            },
            "scope": 6637,
            "src": "179:53:65",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6619,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6615,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6614,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 6619,
                  "src": "254:11:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6613,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "254:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "253:13:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6618,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6617,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6619,
                  "src": "288:7:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6616,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:9:65"
            },
            "scope": 6637,
            "src": "235:62:65",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6628,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6624,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6621,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6628,
                  "src": "318:10:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6620,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:65",
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
                  "id": 6623,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6628,
                  "src": "330:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6622,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:27:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6627,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6626,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6628,
                  "src": "361:4:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6625,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "361:4:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "360:6:65"
            },
            "scope": 6637,
            "src": "300:67:65",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6636,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6635,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6630,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6636,
                  "src": "385:20:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6629,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "385:7:65",
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
                  "id": 6632,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6636,
                  "src": "407:18:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6631,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "407:7:65",
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
                  "id": 6634,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6636,
                  "src": "427:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6633,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "427:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "384:57:65"
            },
            "src": "370:72:65"
          }
        ],
        "scope": 6638,
        "src": "155:289:65"
      }
    ],
    "src": "0:445:65"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        6637
      ]
    },
    "id": 6638,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6607,
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
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 6637,
        "linearizedBaseContracts": [
          6637
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 6612,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6608,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "199:2:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6611,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6610,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6612,
                  "src": "223:7:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6609,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "223:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "222:9:65"
            },
            "scope": 6637,
            "src": "179:53:65",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6619,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6615,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6614,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 6619,
                  "src": "254:11:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6613,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "254:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "253:13:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6618,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6617,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6619,
                  "src": "288:7:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6616,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:9:65"
            },
            "scope": 6637,
            "src": "235:62:65",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 6628,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6624,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6621,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6628,
                  "src": "318:10:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6620,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:65",
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
                  "id": 6623,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6628,
                  "src": "330:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6622,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:27:65"
            },
            "payable": false,
            "returnParameters": {
              "id": 6627,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6626,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6628,
                  "src": "361:4:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6625,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "361:4:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "360:6:65"
            },
            "scope": 6637,
            "src": "300:67:65",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 6636,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 6635,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6630,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6636,
                  "src": "385:20:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6629,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "385:7:65",
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
                  "id": 6632,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6636,
                  "src": "407:18:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6631,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "407:7:65",
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
                  "id": 6634,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6636,
                  "src": "427:13:65",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6633,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "427:7:65",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "384:57:65"
            },
            "src": "370:72:65"
          }
        ],
        "scope": 6638,
        "src": "155:289:65"
      }
    ],
    "src": "0:445:65"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.443Z"
}
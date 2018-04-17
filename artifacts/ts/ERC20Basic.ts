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
  "source": "pragma solidity ^0.4.18;\n\n\n/**\n * @title ERC20Basic\n * @dev Simpler version of ERC20 interface\n * @dev see https://github.com/ethereum/EIPs/issues/179\n */\ncontract ERC20Basic {\n  function totalSupply() public view returns (uint256);\n  function balanceOf(address who) public view returns (uint256);\n  function transfer(address to, uint256 value) public returns (bool);\n  event Transfer(address indexed from, address indexed to, uint256 value);\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        766
      ]
    },
    "id": 767,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 736,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".18"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:8"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 766,
        "linearizedBaseContracts": [
          766
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 741,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 737,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "199:2:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 740,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 739,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 741,
                  "src": "223:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 738,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "223:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "222:9:8"
            },
            "scope": 766,
            "src": "179:53:8",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 748,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 744,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 743,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 748,
                  "src": "254:11:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 742,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "254:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "253:13:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 747,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 746,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 748,
                  "src": "288:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 745,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:9:8"
            },
            "scope": 766,
            "src": "235:62:8",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 757,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 753,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 750,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 757,
                  "src": "318:10:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 749,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:8",
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
                  "id": 752,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 757,
                  "src": "330:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 751,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:27:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 756,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 755,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 757,
                  "src": "361:4:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 754,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "361:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "360:6:8"
            },
            "scope": 766,
            "src": "300:67:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 765,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 764,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 759,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 765,
                  "src": "385:20:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 758,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "385:7:8",
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
                  "id": 761,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 765,
                  "src": "407:18:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 760,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "407:7:8",
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
                  "id": 763,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 765,
                  "src": "427:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 762,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "427:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "384:57:8"
            },
            "src": "370:72:8"
          }
        ],
        "scope": 767,
        "src": "155:289:8"
      }
    ],
    "src": "0:445:8"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
    "exportedSymbols": {
      "ERC20Basic": [
        766
      ]
    },
    "id": 767,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 736,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".18"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:8"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ERC20Basic\n@dev Simpler version of ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/179",
        "fullyImplemented": false,
        "id": 766,
        "linearizedBaseContracts": [
          766
        ],
        "name": "ERC20Basic",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 741,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "totalSupply",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 737,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "199:2:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 740,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 739,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 741,
                  "src": "223:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 738,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "223:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "222:9:8"
            },
            "scope": 766,
            "src": "179:53:8",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 748,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 744,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 743,
                  "name": "who",
                  "nodeType": "VariableDeclaration",
                  "scope": 748,
                  "src": "254:11:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 742,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "254:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "253:13:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 747,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 746,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 748,
                  "src": "288:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 745,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "288:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "287:9:8"
            },
            "scope": 766,
            "src": "235:62:8",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 757,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 753,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 750,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 757,
                  "src": "318:10:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 749,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "318:7:8",
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
                  "id": 752,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 757,
                  "src": "330:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 751,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "330:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "317:27:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 756,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 755,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 757,
                  "src": "361:4:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 754,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "361:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "360:6:8"
            },
            "scope": 766,
            "src": "300:67:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 765,
            "name": "Transfer",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 764,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 759,
                  "indexed": true,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 765,
                  "src": "385:20:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 758,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "385:7:8",
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
                  "id": 761,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 765,
                  "src": "407:18:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 760,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "407:7:8",
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
                  "id": 763,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 765,
                  "src": "427:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 762,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "427:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "384:57:8"
            },
            "src": "370:72:8"
          }
        ],
        "scope": 767,
        "src": "155:289:8"
      }
    ],
    "src": "0:445:8"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.21+commit.dfe3193c.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-04-09T06:08:42.802Z"
}
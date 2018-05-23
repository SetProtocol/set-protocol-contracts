export const SetInterface = 
{
  "contractName": "SetInterface",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_sender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "LogIssuance",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_sender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "LogRedemption",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "issue",
      "outputs": [
        {
          "name": "success",
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
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "redeem",
      "outputs": [
        {
          "name": "success",
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
  "source": "pragma solidity 0.4.23;\n\n\n/**\n * @title Set interface\n */\ncontract SetInterface {\n\n  /**\n   * @dev Function to convert component into {Set} Tokens\n   *\n   * Please note that the user's ERC20 component must be approved by\n   * their ERC20 contract to transfer their components to this contract.\n   *\n   * @param _quantity uint The quantity of Sets desired to issue in Wei as a multiple of naturalUnit\n   */\n  function issue(uint _quantity) public returns (bool success);\n  \n  /**\n   * @dev Function to convert {Set} Tokens into underlying components\n   *\n   * The ERC20 components do not need to be approved to call this function\n   *\n   * @param _quantity uint The quantity of Sets desired to redeem in Wei as a multiple of naturalUnit\n   */\n  function redeem(uint _quantity) public returns (bool success);\n\n  event LogIssuance(\n    address indexed _sender,\n    uint _quantity\n  );\n\n  event LogRedemption(\n    address indexed _sender,\n    uint _quantity\n  );\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/SetInterface.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/SetInterface.sol",
    "exportedSymbols": {
      "SetInterface": [
        1687
      ]
    },
    "id": 1688,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1660,
        "literals": [
          "solidity",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:6"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Set interface",
        "fullyImplemented": false,
        "id": 1687,
        "linearizedBaseContracts": [
          1687
        ],
        "name": "SetInterface",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Function to convert component into {Set} Tokens\n   * Please note that the user's ERC20 component must be approved by\ntheir ERC20 contract to transfer their components to this contract.\n   * @param _quantity uint The quantity of Sets desired to issue in Wei as a multiple of naturalUnit",
            "id": 1667,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1663,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1662,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1667,
                  "src": "423:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1661,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "423:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "422:16:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1666,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1665,
                  "name": "success",
                  "nodeType": "VariableDeclaration",
                  "scope": 1667,
                  "src": "455:12:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1664,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "455:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "454:14:6"
            },
            "scope": 1687,
            "src": "408:61:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Function to convert {Set} Tokens into underlying components\n   * The ERC20 components do not need to be approved to call this function\n   * @param _quantity uint The quantity of Sets desired to redeem in Wei as a multiple of naturalUnit",
            "id": 1674,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1670,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1669,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1674,
                  "src": "760:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1668,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "760:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "759:16:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1673,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1672,
                  "name": "success",
                  "nodeType": "VariableDeclaration",
                  "scope": 1674,
                  "src": "792:12:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1671,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "792:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "791:14:6"
            },
            "scope": 1687,
            "src": "744:62:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1680,
            "name": "LogIssuance",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1679,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1676,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1680,
                  "src": "833:23:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1675,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "833:7:6",
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
                  "id": 1678,
                  "indexed": false,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1680,
                  "src": "862:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1677,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "827:53:6"
            },
            "src": "810:71:6"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1686,
            "name": "LogRedemption",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1685,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1682,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "910:23:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1681,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "910:7:6",
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
                  "id": 1684,
                  "indexed": false,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "939:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1683,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "939:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "904:53:6"
            },
            "src": "885:73:6"
          }
        ],
        "scope": 1688,
        "src": "58:902:6"
      }
    ],
    "src": "0:961:6"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/SetInterface.sol",
    "exportedSymbols": {
      "SetInterface": [
        1687
      ]
    },
    "id": 1688,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1660,
        "literals": [
          "solidity",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:6"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Set interface",
        "fullyImplemented": false,
        "id": 1687,
        "linearizedBaseContracts": [
          1687
        ],
        "name": "SetInterface",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Function to convert component into {Set} Tokens\n   * Please note that the user's ERC20 component must be approved by\ntheir ERC20 contract to transfer their components to this contract.\n   * @param _quantity uint The quantity of Sets desired to issue in Wei as a multiple of naturalUnit",
            "id": 1667,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1663,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1662,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1667,
                  "src": "423:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1661,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "423:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "422:16:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1666,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1665,
                  "name": "success",
                  "nodeType": "VariableDeclaration",
                  "scope": 1667,
                  "src": "455:12:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1664,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "455:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "454:14:6"
            },
            "scope": 1687,
            "src": "408:61:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Function to convert {Set} Tokens into underlying components\n   * The ERC20 components do not need to be approved to call this function\n   * @param _quantity uint The quantity of Sets desired to redeem in Wei as a multiple of naturalUnit",
            "id": 1674,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1670,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1669,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1674,
                  "src": "760:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1668,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "760:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "759:16:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1673,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1672,
                  "name": "success",
                  "nodeType": "VariableDeclaration",
                  "scope": 1674,
                  "src": "792:12:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1671,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "792:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "791:14:6"
            },
            "scope": 1687,
            "src": "744:62:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1680,
            "name": "LogIssuance",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1679,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1676,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1680,
                  "src": "833:23:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1675,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "833:7:6",
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
                  "id": 1678,
                  "indexed": false,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1680,
                  "src": "862:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1677,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "827:53:6"
            },
            "src": "810:71:6"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1686,
            "name": "LogRedemption",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1685,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1682,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "910:23:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1681,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "910:7:6",
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
                  "id": 1684,
                  "indexed": false,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "939:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1683,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "939:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "904:53:6"
            },
            "src": "885:73:6"
          }
        ],
        "scope": 1688,
        "src": "58:902:6"
      }
    ],
    "src": "0:961:6"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.23+commit.124ca40d.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-05-23T02:37:40.356Z"
}
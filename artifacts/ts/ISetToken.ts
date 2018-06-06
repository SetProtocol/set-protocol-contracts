export const ISetToken = 
{
  "contractName": "ISetToken",
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
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "redeem",
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
  "source": "pragma solidity 0.4.23;\n\n\n/**\n * @title Set Token Interface\n */\ncontract ISetToken {\n\n    /**\n    * @dev Function to convert component into {Set} Tokens\n    *\n    * Please note that the user's ERC20 component must be approved by\n    * their ERC20 contract to transfer their components to this contract.\n    *\n    * @param _quantity uint The quantity of Sets desired to issue in Wei as a multiple of naturalUnit\n    */\n    function issue(\n        uint _quantity\n    )\n        public\n        returns (bool);\n\n    /**\n    * @dev Function to convert {Set} Tokens into underlying components\n    *\n    * The ERC20 components do not need to be approved to call this function\n    *\n    * @param _quantity uint The quantity of Sets desired to redeem in Wei as a multiple of naturalUnit\n    */\n    function redeem(\n        uint _quantity\n    )\n        public\n        returns (bool);\n\n    event LogIssuance(\n        address indexed _sender,\n        uint _quantity\n    );\n\n    event LogRedemption(\n        address indexed _sender,\n        uint _quantity\n    );\n}\n",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        1621
      ]
    },
    "id": 1622,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1594,
        "literals": [
          "solidity",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:5"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Set Token Interface",
        "fullyImplemented": false,
        "id": 1621,
        "linearizedBaseContracts": [
          1621
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Function to convert component into {Set} Tokens\n    * Please note that the user's ERC20 component must be approved by\ntheir ERC20 contract to transfer their components to this contract.\n    * @param _quantity uint The quantity of Sets desired to issue in Wei as a multiple of naturalUnit",
            "id": 1601,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1597,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1596,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1601,
                  "src": "446:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1595,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "446:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "436:30:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1600,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1599,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1601,
                  "src": "499:4:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1598,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "499:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "498:6:5"
            },
            "scope": 1621,
            "src": "422:83:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Function to convert {Set} Tokens into underlying components\n    * The ERC20 components do not need to be approved to call this function\n    * @param _quantity uint The quantity of Sets desired to redeem in Wei as a multiple of naturalUnit",
            "id": 1608,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1604,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1603,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1608,
                  "src": "813:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1602,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "813:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "803:30:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1607,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1606,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1608,
                  "src": "866:4:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1605,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "866:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "865:6:5"
            },
            "scope": 1621,
            "src": "788:84:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1614,
            "name": "LogIssuance",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1613,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1610,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1614,
                  "src": "905:23:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1609,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "905:7:5",
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
                  "id": 1612,
                  "indexed": false,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1614,
                  "src": "938:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1611,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "938:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "895:63:5"
            },
            "src": "878:81:5"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1620,
            "name": "LogRedemption",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1619,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1616,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1620,
                  "src": "994:23:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1615,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "994:7:5",
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
                  "id": 1618,
                  "indexed": false,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1620,
                  "src": "1027:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1617,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1027:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "984:63:5"
            },
            "src": "965:83:5"
          }
        ],
        "scope": 1622,
        "src": "64:986:5"
      }
    ],
    "src": "0:1051:5"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        1621
      ]
    },
    "id": 1622,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1594,
        "literals": [
          "solidity",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:5"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title Set Token Interface",
        "fullyImplemented": false,
        "id": 1621,
        "linearizedBaseContracts": [
          1621
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Function to convert component into {Set} Tokens\n    * Please note that the user's ERC20 component must be approved by\ntheir ERC20 contract to transfer their components to this contract.\n    * @param _quantity uint The quantity of Sets desired to issue in Wei as a multiple of naturalUnit",
            "id": 1601,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "issue",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1597,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1596,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1601,
                  "src": "446:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1595,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "446:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "436:30:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1600,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1599,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1601,
                  "src": "499:4:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1598,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "499:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "498:6:5"
            },
            "scope": 1621,
            "src": "422:83:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": "@dev Function to convert {Set} Tokens into underlying components\n    * The ERC20 components do not need to be approved to call this function\n    * @param _quantity uint The quantity of Sets desired to redeem in Wei as a multiple of naturalUnit",
            "id": 1608,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "redeem",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1604,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1603,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1608,
                  "src": "813:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1602,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "813:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "803:30:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1607,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1606,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1608,
                  "src": "866:4:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 1605,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "866:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "865:6:5"
            },
            "scope": 1621,
            "src": "788:84:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1614,
            "name": "LogIssuance",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1613,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1610,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1614,
                  "src": "905:23:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1609,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "905:7:5",
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
                  "id": 1612,
                  "indexed": false,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1614,
                  "src": "938:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1611,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "938:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "895:63:5"
            },
            "src": "878:81:5"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1620,
            "name": "LogRedemption",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1619,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1616,
                  "indexed": true,
                  "name": "_sender",
                  "nodeType": "VariableDeclaration",
                  "scope": 1620,
                  "src": "994:23:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1615,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "994:7:5",
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
                  "id": 1618,
                  "indexed": false,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1620,
                  "src": "1027:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1617,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1027:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "984:63:5"
            },
            "src": "965:83:5"
          }
        ],
        "scope": 1622,
        "src": "64:986:5"
      }
    ],
    "src": "0:1051:5"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.23+commit.124ca40d.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-06-06T22:54:27.578Z"
}
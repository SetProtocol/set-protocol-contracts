export const ISetToken = 
{
  "contractName": "ISetToken",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "naturalUnit",
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
      "inputs": [],
      "name": "getComponents",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getUnits",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
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
          "name": "_issuer",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n/**\n * @title ISetToken\n * @author Set Protocol\n *\n * The ISetToken interface provides a light-weight, structured way to interact with the\n * SetToken contract from another contract.\n */\ninterface ISetToken {\n\n    /* ============ External Functions ============ */\n\n    /*\n     * Get natural unit of Set\n     *\n     * @return  uint256       Natural unit of Set\n     */\n    function naturalUnit()\n        external\n        view\n        returns (uint256);\n\n    /*\n     * Get addresses of all components in the Set\n     *\n     * @return  componentAddresses       Array of component tokens\n     */\n    function getComponents()\n        external\n        view\n        returns(address[]);\n\n    /*\n     * Get units of all tokens in Set\n     *\n     * @return  units       Array of component units\n     */\n    function getUnits()\n        external\n        view\n        returns(uint256[]);\n\n    /*\n     * Mint set token for given address.\n     * Can only be called by authorized contracts.\n     *\n     * @param  _issuer      The address of the issuing account\n     * @param  _quantity    The number of sets to attribute to issuer\n     */\n    function mint(\n        address _issuer,\n        uint256 _quantity\n    )\n        external;\n\n    /*\n     * Burn set token for given address.\n     * Can only be called by authorized contracts.\n     *\n     * @param  _from        The address of the redeeming account\n     * @param  _quantity    The number of sets to burn from redeemer\n     */\n    function burn(\n        address _from,\n        uint256 _quantity\n    )\n        external;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        4321
      ]
    },
    "id": 4322,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4289,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:23"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 4321,
        "linearizedBaseContracts": [
          4321
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4294,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4290,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1015:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 4293,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4292,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4294,
                  "src": "1065:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4291,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1065:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1064:9:23"
            },
            "scope": 4321,
            "src": "995:79:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4300,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4295,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1241:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 4299,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4298,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4300,
                  "src": "1290:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4296,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1290:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4297,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1290:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1289:11:23"
            },
            "scope": 4321,
            "src": "1219:82:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4306,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4301,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1437:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 4305,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4304,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4306,
                  "src": "1486:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4302,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1486:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4303,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1486:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1485:11:23"
            },
            "scope": 4321,
            "src": "1420:77:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4313,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4311,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4308,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 4313,
                  "src": "1773:15:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4307,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1773:7:23",
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
                  "id": 4310,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4313,
                  "src": "1798:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4309,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1798:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1763:58:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 4312,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1838:0:23"
            },
            "scope": 4321,
            "src": "1750:89:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4320,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4318,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4315,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4320,
                  "src": "2116:13:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4314,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2116:7:23",
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
                  "id": 4317,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4320,
                  "src": "2139:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4316,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2139:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2106:56:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 4319,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2179:0:23"
            },
            "scope": 4321,
            "src": "2093:87:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4322,
        "src": "809:1373:23"
      }
    ],
    "src": "597:1586:23"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        4321
      ]
    },
    "id": 4322,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4289,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:23"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 4321,
        "linearizedBaseContracts": [
          4321
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4294,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4290,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1015:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 4293,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4292,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4294,
                  "src": "1065:7:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4291,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1065:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1064:9:23"
            },
            "scope": 4321,
            "src": "995:79:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4300,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4295,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1241:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 4299,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4298,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4300,
                  "src": "1290:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4296,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1290:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4297,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1290:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1289:11:23"
            },
            "scope": 4321,
            "src": "1219:82:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4306,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4301,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1437:2:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 4305,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4304,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4306,
                  "src": "1486:9:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4302,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1486:7:23",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4303,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1486:9:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1485:11:23"
            },
            "scope": 4321,
            "src": "1420:77:23",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4313,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4311,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4308,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 4313,
                  "src": "1773:15:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4307,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1773:7:23",
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
                  "id": 4310,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4313,
                  "src": "1798:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4309,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1798:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1763:58:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 4312,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1838:0:23"
            },
            "scope": 4321,
            "src": "1750:89:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 4320,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4318,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4315,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4320,
                  "src": "2116:13:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4314,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2116:7:23",
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
                  "id": 4317,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4320,
                  "src": "2139:17:23",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4316,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2139:7:23",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2106:56:23"
            },
            "payable": false,
            "returnParameters": {
              "id": 4319,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2179:0:23"
            },
            "scope": 4321,
            "src": "2093:87:23",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4322,
        "src": "809:1373:23"
      }
    ],
    "src": "597:1586:23"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.121Z"
}
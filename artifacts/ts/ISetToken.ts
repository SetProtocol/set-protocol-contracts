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
        3405
      ]
    },
    "id": 3406,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3373,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:16"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 3405,
        "linearizedBaseContracts": [
          3405
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3378,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3374,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1015:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3377,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3376,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3378,
                  "src": "1065:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3375,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1065:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1064:9:16"
            },
            "scope": 3405,
            "src": "995:79:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3384,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3379,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1241:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3383,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3382,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3384,
                  "src": "1290:9:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3380,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1290:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3381,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1290:9:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1289:11:16"
            },
            "scope": 3405,
            "src": "1219:82:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3390,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3385,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1437:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3389,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3388,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3390,
                  "src": "1486:9:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3386,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1486:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3387,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1486:9:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1485:11:16"
            },
            "scope": 3405,
            "src": "1420:77:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3397,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3395,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3392,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 3397,
                  "src": "1773:15:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3391,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1773:7:16",
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
                  "id": 3394,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3397,
                  "src": "1798:17:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3393,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1798:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1763:58:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3396,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1838:0:16"
            },
            "scope": 3405,
            "src": "1750:89:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3404,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3402,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3399,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2116:13:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3398,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2116:7:16",
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
                  "id": 3401,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2139:17:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3400,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2139:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2106:56:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3403,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2179:0:16"
            },
            "scope": 3405,
            "src": "2093:87:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3406,
        "src": "809:1373:16"
      }
    ],
    "src": "597:1586:16"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        3405
      ]
    },
    "id": 3406,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3373,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:16"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 3405,
        "linearizedBaseContracts": [
          3405
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3378,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3374,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1015:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3377,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3376,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3378,
                  "src": "1065:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3375,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1065:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1064:9:16"
            },
            "scope": 3405,
            "src": "995:79:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3384,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3379,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1241:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3383,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3382,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3384,
                  "src": "1290:9:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3380,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1290:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3381,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1290:9:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1289:11:16"
            },
            "scope": 3405,
            "src": "1219:82:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3390,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3385,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1437:2:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3389,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3388,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3390,
                  "src": "1486:9:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3386,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "1486:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3387,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1486:9:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1485:11:16"
            },
            "scope": 3405,
            "src": "1420:77:16",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3397,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3395,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3392,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 3397,
                  "src": "1773:15:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3391,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1773:7:16",
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
                  "id": 3394,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3397,
                  "src": "1798:17:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3393,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1798:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1763:58:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3396,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1838:0:16"
            },
            "scope": 3405,
            "src": "1750:89:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3404,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3402,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3399,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2116:13:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3398,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2116:7:16",
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
                  "id": 3401,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3404,
                  "src": "2139:17:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3400,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2139:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2106:56:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 3403,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2179:0:16"
            },
            "scope": 3405,
            "src": "2093:87:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3406,
        "src": "809:1373:16"
      }
    ],
    "src": "597:1586:16"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T15:29:45.026Z"
}
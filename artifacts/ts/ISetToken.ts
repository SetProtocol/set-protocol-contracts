export const ISetToken = 
{
  "contractName": "ISetToken",
  "abi": [
    {
      "constant": false,
      "inputs": [],
      "name": "naturalUnit",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "getComponents",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "getUnits",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n/**\n * @title ISetToken\n * @author Set Protocol\n *\n * The ISetToken interface provides a light-weight, structured way to interact with the\n * SetToken contract from another contract.\n */\ninterface ISetToken {\n\n    /* ============ External Functions ============ */\n\n    /*\n     * Get natural unit of Set\n     *\n     * @return  uint       Natural unit of Set\n     */\n    function naturalUnit()\n        external\n        returns (uint);\n\n    /*\n     * Get addresses of all components in the Set\n     *\n     * @return  componentAddresses       Array of component tokens\n     */\n    function getComponents()\n        external\n        returns(address[]);\n\n    /*\n     * Get units of all tokens in Set\n     *\n     * @return  units       Array of component units\n     */\n    function getUnits()\n        external\n        returns(uint[]);\n\n    /*\n     * Mint set token for given address.\n     * Can only be called by authorized contracts.\n     *\n     * @param  _issuer      The address of the issuing account\n     * @param  _quantity    The number of sets to attribute to issuer\n     */\n    function mint(\n        address _issuer,\n        uint _quantity\n    )\n        external;\n\n    /*\n     * Burn set token for given address.\n     * Can only be called by authorized contracts.\n     *\n     * @param  _from        The address of the redeeming account\n     * @param  _quantity    The number of sets to burn from redeemer\n     */\n    function burn(\n        address _from,\n        uint _quantity\n    )\n        external;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        1901
      ]
    },
    "id": 1902,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1869,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:11"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 1901,
        "linearizedBaseContracts": [
          1901
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 1874,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1870,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1012:2:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1873,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1872,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1874,
                  "src": "1049:4:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1871,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1049:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1048:6:11"
            },
            "scope": 1901,
            "src": "992:63:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1880,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1875,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1222:2:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1879,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1878,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1880,
                  "src": "1258:9:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1876,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1258:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1877,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1258:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1257:11:11"
            },
            "scope": 1901,
            "src": "1200:69:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1886,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1881,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1405:2:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1885,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1884,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1886,
                  "src": "1441:6:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1882,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1441:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1883,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1441:6:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1440:8:11"
            },
            "scope": 1901,
            "src": "1388:61:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1893,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1891,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1888,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 1893,
                  "src": "1725:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1887,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1725:7:11",
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
                  "id": 1890,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1893,
                  "src": "1750:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1889,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1750:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1715:55:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1892,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1787:0:11"
            },
            "scope": 1901,
            "src": "1702:86:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1900,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1898,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1895,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1900,
                  "src": "2065:13:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1894,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2065:7:11",
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
                  "id": 1897,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1900,
                  "src": "2088:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1896,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2088:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2055:53:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1899,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2125:0:11"
            },
            "scope": 1901,
            "src": "2042:84:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1902,
        "src": "809:1319:11"
      }
    ],
    "src": "597:1532:11"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        1901
      ]
    },
    "id": 1902,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1869,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:11"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 1901,
        "linearizedBaseContracts": [
          1901
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 1874,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1870,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1012:2:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1873,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1872,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1874,
                  "src": "1049:4:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1871,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1049:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1048:6:11"
            },
            "scope": 1901,
            "src": "992:63:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1880,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1875,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1222:2:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1879,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1878,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1880,
                  "src": "1258:9:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1876,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1258:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1877,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1258:9:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1257:11:11"
            },
            "scope": 1901,
            "src": "1200:69:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1886,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1881,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1405:2:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1885,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1884,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1886,
                  "src": "1441:6:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1882,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1441:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1883,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1441:6:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1440:8:11"
            },
            "scope": 1901,
            "src": "1388:61:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1893,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1891,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1888,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 1893,
                  "src": "1725:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1887,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1725:7:11",
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
                  "id": 1890,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1893,
                  "src": "1750:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1889,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1750:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1715:55:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1892,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1787:0:11"
            },
            "scope": 1901,
            "src": "1702:86:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 1900,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1898,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1895,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1900,
                  "src": "2065:13:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1894,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2065:7:11",
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
                  "id": 1897,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1900,
                  "src": "2088:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1896,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2088:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2055:53:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1899,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2125:0:11"
            },
            "scope": 1901,
            "src": "2042:84:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1902,
        "src": "809:1319:11"
      }
    ],
    "src": "597:1532:11"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T05:35:59.447Z"
}
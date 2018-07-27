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
        3549
      ]
    },
    "id": 3550,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3517,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:20"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 3549,
        "linearizedBaseContracts": [
          3549
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3522,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3518,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1012:2:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3521,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3520,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3522,
                  "src": "1049:4:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3519,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1049:4:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1048:6:20"
            },
            "scope": 3549,
            "src": "992:63:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3528,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3523,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1222:2:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3527,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3526,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3528,
                  "src": "1258:9:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3524,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1258:7:20",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3525,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1258:9:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1257:11:20"
            },
            "scope": 3549,
            "src": "1200:69:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3534,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3529,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1405:2:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3533,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3532,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3534,
                  "src": "1441:6:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3530,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1441:4:20",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3531,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1441:6:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1440:8:20"
            },
            "scope": 3549,
            "src": "1388:61:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3541,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3539,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3536,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 3541,
                  "src": "1725:15:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3535,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1725:7:20",
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
                  "id": 3538,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3541,
                  "src": "1750:14:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3537,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1750:4:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1715:55:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3540,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1787:0:20"
            },
            "scope": 3549,
            "src": "1702:86:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3548,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3546,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3543,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3548,
                  "src": "2065:13:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3542,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2065:7:20",
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
                  "id": 3545,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3548,
                  "src": "2088:14:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3544,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2088:4:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2055:53:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3547,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2125:0:20"
            },
            "scope": 3549,
            "src": "2042:84:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3550,
        "src": "809:1319:20"
      }
    ],
    "src": "597:1532:20"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
    "exportedSymbols": {
      "ISetToken": [
        3549
      ]
    },
    "id": 3550,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3517,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:20"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetToken\n@author Set Protocol\n * The ISetToken interface provides a light-weight, structured way to interact with the\nSetToken contract from another contract.",
        "fullyImplemented": false,
        "id": 3549,
        "linearizedBaseContracts": [
          3549
        ],
        "name": "ISetToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3522,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "naturalUnit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3518,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1012:2:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3521,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3520,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3522,
                  "src": "1049:4:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3519,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1049:4:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1048:6:20"
            },
            "scope": 3549,
            "src": "992:63:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3528,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getComponents",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3523,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1222:2:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3527,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3526,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3528,
                  "src": "1258:9:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3524,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1258:7:20",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3525,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1258:9:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1257:11:20"
            },
            "scope": 3549,
            "src": "1200:69:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3534,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getUnits",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3529,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1405:2:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3533,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3532,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3534,
                  "src": "1441:6:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3530,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1441:4:20",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3531,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1441:6:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1440:8:20"
            },
            "scope": 3549,
            "src": "1388:61:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3541,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3539,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3536,
                  "name": "_issuer",
                  "nodeType": "VariableDeclaration",
                  "scope": 3541,
                  "src": "1725:15:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3535,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1725:7:20",
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
                  "id": 3538,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3541,
                  "src": "1750:14:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3537,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1750:4:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1715:55:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3540,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1787:0:20"
            },
            "scope": 3549,
            "src": "1702:86:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": null,
            "id": 3548,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "burn",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3546,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3543,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3548,
                  "src": "2065:13:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3542,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2065:7:20",
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
                  "id": 3545,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3548,
                  "src": "2088:14:20",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3544,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2088:4:20",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2055:53:20"
            },
            "payable": false,
            "returnParameters": {
              "id": 3547,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2125:0:20"
            },
            "scope": 3549,
            "src": "2042:84:20",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3550,
        "src": "809:1319:20"
      }
    ],
    "src": "597:1532:20"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.821Z"
}
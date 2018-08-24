export const ISetFactory = 
{
  "contractName": "ISetFactory",
  "abi": [
    {
      "constant": false,
      "inputs": [],
      "name": "core",
      "outputs": [
        {
          "name": "",
          "type": "address"
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
          "name": "_components",
          "type": "address[]"
        },
        {
          "name": "_units",
          "type": "uint256[]"
        },
        {
          "name": "_naturalUnit",
          "type": "uint256"
        },
        {
          "name": "_name",
          "type": "bytes32"
        },
        {
          "name": "_symbol",
          "type": "bytes32"
        },
        {
          "name": "_callData",
          "type": "bytes"
        }
      ],
      "name": "create",
      "outputs": [
        {
          "name": "",
          "type": "address"
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\n/**\n * @title ISetFactory\n * @author Set Protocol\n *\n * The ISetFactory interface provides operability for authorized contracts\n * to interact with SetTokenFactory\n */\ninterface ISetFactory {\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Return core address\n     *\n     * @return address        core address\n     */\n    function core()\n        external\n        returns (address);\n\n    /**\n     * Deploys a new Set Token and adds it to the valid list of SetTokens\n     *\n     * @param  _components           The address of component tokens\n     * @param  _units                The units of each component token\n     * @param  _naturalUnit          The minimum unit to be issued or redeemed\n     * @param  _name                 The bytes32 encoded name of the new Set\n     * @param  _symbol               The bytes32 encoded symbol of the new Set\n     * @param  _callData             Byte string containing additional call parameters\n     * @return setTokenAddress       The address of the new Set\n     */\n    function create(\n        address[] _components,\n        uint[] _units,\n        uint256 _naturalUnit,\n        bytes32 _name,\n        bytes32 _symbol,\n        bytes _callData\n    )\n        external\n        returns (address);\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
    "exportedSymbols": {
      "ISetFactory": [
        3465
      ]
    },
    "id": 3466,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3440,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:15"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetFactory\n@author Set Protocol\n * The ISetFactory interface provides operability for authorized contracts\nto interact with SetTokenFactory",
        "fullyImplemented": false,
        "id": 3465,
        "linearizedBaseContracts": [
          3465
        ],
        "name": "ISetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Return core address\n     * @return address        core address",
            "id": 3445,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "core",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3441,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "982:2:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3444,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3443,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3445,
                  "src": "1019:7:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3442,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1019:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1018:9:15"
            },
            "scope": 3465,
            "src": "969:59:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The bytes32 encoded name of the new Set\n@param  _symbol               The bytes32 encoded symbol of the new Set\n@param  _callData             Byte string containing additional call parameters\n@return setTokenAddress       The address of the new Set",
            "id": 3464,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3460,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3448,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1682:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3446,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1682:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3447,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1682:9:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3451,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1713:13:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3449,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1713:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3450,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1713:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3453,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1736:20:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3452,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1736:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3455,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1766:13:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3454,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1766:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3457,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1789:15:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3456,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1789:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3459,
                  "name": "_callData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1814:15:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3458,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1814:5:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1672:163:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3463,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3462,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1870:7:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3461,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1870:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:9:15"
            },
            "scope": 3465,
            "src": "1657:222:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3466,
        "src": "791:1090:15"
      }
    ],
    "src": "597:1285:15"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
    "exportedSymbols": {
      "ISetFactory": [
        3465
      ]
    },
    "id": 3466,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3440,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:15"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ISetFactory\n@author Set Protocol\n * The ISetFactory interface provides operability for authorized contracts\nto interact with SetTokenFactory",
        "fullyImplemented": false,
        "id": 3465,
        "linearizedBaseContracts": [
          3465
        ],
        "name": "ISetFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Return core address\n     * @return address        core address",
            "id": 3445,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "core",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3441,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "982:2:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3444,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3443,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3445,
                  "src": "1019:7:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3442,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1019:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1018:9:15"
            },
            "scope": 3465,
            "src": "969:59:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The bytes32 encoded name of the new Set\n@param  _symbol               The bytes32 encoded symbol of the new Set\n@param  _callData             Byte string containing additional call parameters\n@return setTokenAddress       The address of the new Set",
            "id": 3464,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3460,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3448,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1682:21:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3446,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1682:7:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3447,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1682:9:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3451,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1713:13:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3449,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1713:4:15",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 3450,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1713:6:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3453,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1736:20:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3452,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1736:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3455,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1766:13:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3454,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1766:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3457,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1789:15:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 3456,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "1789:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 3459,
                  "name": "_callData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1814:15:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 3458,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1814:5:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1672:163:15"
            },
            "payable": false,
            "returnParameters": {
              "id": 3463,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3462,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3464,
                  "src": "1870:7:15",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3461,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1870:7:15",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1869:9:15"
            },
            "scope": 3465,
            "src": "1657:222:15",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3466,
        "src": "791:1090:15"
      }
    ],
    "src": "597:1285:15"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.593Z"
}
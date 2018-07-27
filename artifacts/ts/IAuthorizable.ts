export const IAuthorizable = 
{
  "contractName": "IAuthorizable",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAuthorizedAddresses",
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
      "constant": false,
      "inputs": [
        {
          "name": "target",
          "type": "address"
        }
      ],
      "name": "addAuthorizedAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "target",
          "type": "address"
        }
      ],
      "name": "removeAuthorizedAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "target",
          "type": "address"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "removeAuthorizedAddressAtIndex",
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
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\npragma experimental ABIEncoderV2;\n\n/*\n * Ownable\n *\n * Base contract with an owner.\n * Provides onlyOwner modifier, which prevents function from running if it is called by anyone other than the owner.\n */\n\ncontract IOwnable {\n    function transferOwnership(address newOwner)\n        public;\n}\n\ncontract IAuthorizable is\n    IOwnable\n{\n\n    /// @dev Gets all authorized addresses.\n    /// @return Array of authorized addresses.\n    function getAuthorizedAddresses()\n        external\n        view\n        returns (address[]);\n\n    /// @dev Authorizes an address.\n    /// @param target Address to authorize.\n    function addAuthorizedAddress(address target)\n        external;\n\n    /// @dev Removes authorizion of an address.\n    /// @param target Address to remove authorization from.\n    function removeAuthorizedAddress(address target)\n        external;\n\n    /// @dev Removes authorizion of an address.\n    /// @param target Address to remove authorization from.\n    /// @param index Index of target in authorities array.\n    function removeAuthorizedAddressAtIndex(\n        address target,\n        uint256 index\n    )\n        external;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAuthorizable.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAuthorizable.sol",
    "exportedSymbols": {
      "IAuthorizable": [
        4129
      ],
      "IOwnable": [
        4103
      ]
    },
    "id": 4130,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4096,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:29"
      },
      {
        "id": 4097,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:29"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4103,
        "linearizedBaseContracts": [
          4103
        ],
        "name": "IOwnable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4102,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4100,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4099,
                  "name": "newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4102,
                  "src": "862:16:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4098,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "861:18:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4101,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "894:0:29"
            },
            "scope": 4103,
            "src": "835:60:29",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4130,
        "src": "811:86:29"
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4104,
              "name": "IOwnable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4103,
              "src": "929:8:29",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IOwnable_$4103",
                "typeString": "contract IOwnable"
              }
            },
            "id": 4105,
            "nodeType": "InheritanceSpecifier",
            "src": "929:8:29"
          }
        ],
        "contractDependencies": [
          4103
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4129,
        "linearizedBaseContracts": [
          4129,
          4103
        ],
        "name": "IAuthorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Gets all authorized addresses.\n @return Array of authorized addresses.",
            "id": 4111,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4106,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1067:2:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4110,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4109,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4111,
                  "src": "1117:9:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4107,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1117:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4108,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1117:9:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1116:11:29"
            },
            "scope": 4129,
            "src": "1036:92:29",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Authorizes an address.\n @param target Address to authorize.",
            "id": 4116,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4114,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4113,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4116,
                  "src": "1244:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4112,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1244:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1243:16:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4115,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1276:0:29"
            },
            "scope": 4129,
            "src": "1214:63:29",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.",
            "id": 4121,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4119,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4118,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4121,
                  "src": "1424:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4117,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1424:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1423:16:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4120,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1456:0:29"
            },
            "scope": 4129,
            "src": "1391:66:29",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.\n @param index Index of target in authorities array.",
            "id": 4128,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4126,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4123,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4128,
                  "src": "1679:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4122,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:29",
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
                  "id": 4125,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4128,
                  "src": "1703:13:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4124,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1669:53:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4127,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1739:0:29"
            },
            "scope": 4129,
            "src": "1630:110:29",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4130,
        "src": "899:843:29"
      }
    ],
    "src": "580:1163:29"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAuthorizable.sol",
    "exportedSymbols": {
      "IAuthorizable": [
        4129
      ],
      "IOwnable": [
        4103
      ]
    },
    "id": 4130,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4096,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:29"
      },
      {
        "id": 4097,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:29"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4103,
        "linearizedBaseContracts": [
          4103
        ],
        "name": "IOwnable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4102,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4100,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4099,
                  "name": "newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4102,
                  "src": "862:16:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4098,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "861:18:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4101,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "894:0:29"
            },
            "scope": 4103,
            "src": "835:60:29",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4130,
        "src": "811:86:29"
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4104,
              "name": "IOwnable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4103,
              "src": "929:8:29",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IOwnable_$4103",
                "typeString": "contract IOwnable"
              }
            },
            "id": 4105,
            "nodeType": "InheritanceSpecifier",
            "src": "929:8:29"
          }
        ],
        "contractDependencies": [
          4103
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4129,
        "linearizedBaseContracts": [
          4129,
          4103
        ],
        "name": "IAuthorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Gets all authorized addresses.\n @return Array of authorized addresses.",
            "id": 4111,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4106,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1067:2:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4110,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4109,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4111,
                  "src": "1117:9:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4107,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1117:7:29",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4108,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1117:9:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1116:11:29"
            },
            "scope": 4129,
            "src": "1036:92:29",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Authorizes an address.\n @param target Address to authorize.",
            "id": 4116,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4114,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4113,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4116,
                  "src": "1244:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4112,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1244:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1243:16:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4115,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1276:0:29"
            },
            "scope": 4129,
            "src": "1214:63:29",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.",
            "id": 4121,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4119,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4118,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4121,
                  "src": "1424:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4117,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1424:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1423:16:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4120,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1456:0:29"
            },
            "scope": 4129,
            "src": "1391:66:29",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.\n @param index Index of target in authorities array.",
            "id": 4128,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4126,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4123,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4128,
                  "src": "1679:14:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4122,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:29",
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
                  "id": 4125,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4128,
                  "src": "1703:13:29",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4124,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:29",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1669:53:29"
            },
            "payable": false,
            "returnParameters": {
              "id": 4127,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1739:0:29"
            },
            "scope": 4129,
            "src": "1630:110:29",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4130,
        "src": "899:843:29"
      }
    ],
    "src": "580:1163:29"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.825Z"
}
export const IOwnable = 
{
  "contractName": "IOwnable",
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
        3480
      ],
      "IOwnable": [
        3454
      ]
    },
    "id": 3481,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3447,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:28"
      },
      {
        "id": 3448,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:28"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3454,
        "linearizedBaseContracts": [
          3454
        ],
        "name": "IOwnable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3453,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3451,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3450,
                  "name": "newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3453,
                  "src": "862:16:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3449,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "861:18:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3452,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "894:0:28"
            },
            "scope": 3454,
            "src": "835:60:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3481,
        "src": "811:86:28"
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 3455,
              "name": "IOwnable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3454,
              "src": "929:8:28",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IOwnable_$3454",
                "typeString": "contract IOwnable"
              }
            },
            "id": 3456,
            "nodeType": "InheritanceSpecifier",
            "src": "929:8:28"
          }
        ],
        "contractDependencies": [
          3454
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3480,
        "linearizedBaseContracts": [
          3480,
          3454
        ],
        "name": "IAuthorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Gets all authorized addresses.\n @return Array of authorized addresses.",
            "id": 3462,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3457,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1067:2:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3461,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3460,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3462,
                  "src": "1117:9:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3458,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1117:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3459,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1117:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1116:11:28"
            },
            "scope": 3480,
            "src": "1036:92:28",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Authorizes an address.\n @param target Address to authorize.",
            "id": 3467,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3465,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3464,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 3467,
                  "src": "1244:14:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3463,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1244:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1243:16:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3466,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1276:0:28"
            },
            "scope": 3480,
            "src": "1214:63:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.",
            "id": 3472,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3470,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3469,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 3472,
                  "src": "1424:14:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3468,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1424:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1423:16:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3471,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1456:0:28"
            },
            "scope": 3480,
            "src": "1391:66:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.\n @param index Index of target in authorities array.",
            "id": 3479,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3477,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3474,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 3479,
                  "src": "1679:14:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3473,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:28",
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
                  "id": 3476,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3479,
                  "src": "1703:13:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3475,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1669:53:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3478,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1739:0:28"
            },
            "scope": 3480,
            "src": "1630:110:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3481,
        "src": "899:843:28"
      }
    ],
    "src": "580:1163:28"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAuthorizable.sol",
    "exportedSymbols": {
      "IAuthorizable": [
        3480
      ],
      "IOwnable": [
        3454
      ]
    },
    "id": 3481,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3447,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:28"
      },
      {
        "id": 3448,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:28"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3454,
        "linearizedBaseContracts": [
          3454
        ],
        "name": "IOwnable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 3453,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3451,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3450,
                  "name": "newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3453,
                  "src": "862:16:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3449,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "861:18:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3452,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "894:0:28"
            },
            "scope": 3454,
            "src": "835:60:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 3481,
        "src": "811:86:28"
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 3455,
              "name": "IOwnable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3454,
              "src": "929:8:28",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IOwnable_$3454",
                "typeString": "contract IOwnable"
              }
            },
            "id": 3456,
            "nodeType": "InheritanceSpecifier",
            "src": "929:8:28"
          }
        ],
        "contractDependencies": [
          3454
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 3480,
        "linearizedBaseContracts": [
          3480,
          3454
        ],
        "name": "IAuthorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Gets all authorized addresses.\n @return Array of authorized addresses.",
            "id": 3462,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3457,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1067:2:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3461,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3460,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3462,
                  "src": "1117:9:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 3458,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1117:7:28",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 3459,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1117:9:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1116:11:28"
            },
            "scope": 3480,
            "src": "1036:92:28",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Authorizes an address.\n @param target Address to authorize.",
            "id": 3467,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3465,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3464,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 3467,
                  "src": "1244:14:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3463,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1244:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1243:16:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3466,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1276:0:28"
            },
            "scope": 3480,
            "src": "1214:63:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.",
            "id": 3472,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3470,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3469,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 3472,
                  "src": "1424:14:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3468,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1424:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1423:16:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3471,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1456:0:28"
            },
            "scope": 3480,
            "src": "1391:66:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.\n @param index Index of target in authorities array.",
            "id": 3479,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3477,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3474,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 3479,
                  "src": "1679:14:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3473,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:28",
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
                  "id": 3476,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 3479,
                  "src": "1703:13:28",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3475,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:28",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1669:53:28"
            },
            "payable": false,
            "returnParameters": {
              "id": 3478,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1739:0:28"
            },
            "scope": 3480,
            "src": "1630:110:28",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 3481,
        "src": "899:843:28"
      }
    ],
    "src": "580:1163:28"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.199Z"
}
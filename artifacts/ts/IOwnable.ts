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
        4851
      ],
      "IOwnable": [
        4825
      ]
    },
    "id": 4852,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4818,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:31"
      },
      {
        "id": 4819,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:31"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4825,
        "linearizedBaseContracts": [
          4825
        ],
        "name": "IOwnable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4824,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4822,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4821,
                  "name": "newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4824,
                  "src": "862:16:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4820,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "861:18:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 4823,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "894:0:31"
            },
            "scope": 4825,
            "src": "835:60:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4852,
        "src": "811:86:31"
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4826,
              "name": "IOwnable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4825,
              "src": "929:8:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IOwnable_$4825",
                "typeString": "contract IOwnable"
              }
            },
            "id": 4827,
            "nodeType": "InheritanceSpecifier",
            "src": "929:8:31"
          }
        ],
        "contractDependencies": [
          4825
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4851,
        "linearizedBaseContracts": [
          4851,
          4825
        ],
        "name": "IAuthorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Gets all authorized addresses.\n @return Array of authorized addresses.",
            "id": 4833,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4828,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1067:2:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 4832,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4831,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4833,
                  "src": "1117:9:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4829,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1117:7:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4830,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1117:9:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1116:11:31"
            },
            "scope": 4851,
            "src": "1036:92:31",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Authorizes an address.\n @param target Address to authorize.",
            "id": 4838,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4836,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4835,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4838,
                  "src": "1244:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4834,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1244:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1243:16:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 4837,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1276:0:31"
            },
            "scope": 4851,
            "src": "1214:63:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.",
            "id": 4843,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4841,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4840,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4843,
                  "src": "1424:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4839,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1424:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1423:16:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 4842,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1456:0:31"
            },
            "scope": 4851,
            "src": "1391:66:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.\n @param index Index of target in authorities array.",
            "id": 4850,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4848,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4845,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4850,
                  "src": "1679:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4844,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:31",
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
                  "id": 4847,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4850,
                  "src": "1703:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4846,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1669:53:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 4849,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1739:0:31"
            },
            "scope": 4851,
            "src": "1630:110:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4852,
        "src": "899:843:31"
      }
    ],
    "src": "580:1163:31"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/AssetProxy/interfaces/IAuthorizable.sol",
    "exportedSymbols": {
      "IAuthorizable": [
        4851
      ],
      "IOwnable": [
        4825
      ]
    },
    "id": 4852,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4818,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:31"
      },
      {
        "id": 4819,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:31"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4825,
        "linearizedBaseContracts": [
          4825
        ],
        "name": "IOwnable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 4824,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferOwnership",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4822,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4821,
                  "name": "newOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4824,
                  "src": "862:16:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4820,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "862:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "861:18:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 4823,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "894:0:31"
            },
            "scope": 4825,
            "src": "835:60:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4852,
        "src": "811:86:31"
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4826,
              "name": "IOwnable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4825,
              "src": "929:8:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IOwnable_$4825",
                "typeString": "contract IOwnable"
              }
            },
            "id": 4827,
            "nodeType": "InheritanceSpecifier",
            "src": "929:8:31"
          }
        ],
        "contractDependencies": [
          4825
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4851,
        "linearizedBaseContracts": [
          4851,
          4825
        ],
        "name": "IAuthorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "@dev Gets all authorized addresses.\n @return Array of authorized addresses.",
            "id": 4833,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4828,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1067:2:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 4832,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4831,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4833,
                  "src": "1117:9:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4829,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1117:7:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4830,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1117:9:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1116:11:31"
            },
            "scope": 4851,
            "src": "1036:92:31",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Authorizes an address.\n @param target Address to authorize.",
            "id": 4838,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4836,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4835,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4838,
                  "src": "1244:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4834,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1244:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1243:16:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 4837,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1276:0:31"
            },
            "scope": 4851,
            "src": "1214:63:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.",
            "id": 4843,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4841,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4840,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4843,
                  "src": "1424:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4839,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1424:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1423:16:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 4842,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1456:0:31"
            },
            "scope": 4851,
            "src": "1391:66:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": null,
            "documentation": "@dev Removes authorizion of an address.\n @param target Address to remove authorization from.\n @param index Index of target in authorities array.",
            "id": 4850,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4848,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4845,
                  "name": "target",
                  "nodeType": "VariableDeclaration",
                  "scope": 4850,
                  "src": "1679:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4844,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:31",
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
                  "id": 4847,
                  "name": "index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4850,
                  "src": "1703:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4846,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1703:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1669:53:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 4849,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1739:0:31"
            },
            "scope": 4851,
            "src": "1630:110:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4852,
        "src": "899:843:31"
      }
    ],
    "src": "580:1163:31"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.126Z"
}
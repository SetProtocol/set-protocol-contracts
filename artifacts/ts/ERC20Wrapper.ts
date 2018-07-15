export const ERC20Wrapper = 
{
  "contractName": "ERC20Wrapper",
  "abi": [],
  "bytecode": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820764463bea61feac75547460761006ada5992bf3c4e9409d3de8febfa82d78d8f0029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820764463bea61feac75547460761006ada5992bf3c4e9409d3de8febfa82d78d8f0029",
  "sourceMap": "1008:2940:47:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "1008:2940:47:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { CommonMath } from \"./CommonMath.sol\";\nimport { IERC20 } from \"./IERC20.sol\";\n\n\n/**\n * @title ERC20Wrapper\n * @author Set Protocol\n *\n * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.\n * For all functions we will only accept tokens that return a null or true value, any other values will\n * cause the operation to revert.\n */\nlibrary ERC20Wrapper {\n\n    // ============ Constants ============\n\n    string constant INVALID_RETURN_TRANSFER = \"Transferred token does not return null or true on successful transfer.\";\n    string constant INVALID_RETURN_TRANSFERFROM = \"Transferred token does not return null or true on successful transferFrom.\";\n    string constant INVALID_RETURN_APPROVE = \"Approved token does not return null or true on successful approve.\";\n\n    // ============ Internal Functions ============\n\n    function balanceOf(\n        address _tokenAddress,\n        address _ownerAddress\n    )\n        internal\n        view\n        returns (uint256)\n    {\n        return IERC20(_tokenAddress).balanceOf(_ownerAddress);\n    }\n\n    function allowance(\n        address _tokenAddress,\n        address _tokenOwner,\n        address _spender\n    )\n        internal\n        view\n        returns (uint256)\n    {\n        return IERC20(_tokenAddress).allowance(_tokenOwner, _spender);\n    }\n\n    function transfer(\n        address _tokenAddress,\n        address _to,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_tokenAddress).transfer(_to, _quantity);\n\n        require(\n            checkSuccess(),\n            INVALID_RETURN_TRANSFER\n        );\n    }\n\n    function transferFrom(\n        address _tokenAddress,\n        address _from,\n        address _to,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_tokenAddress).transferFrom(_from, _to, _quantity);\n\n        require(\n            checkSuccess(),\n            INVALID_RETURN_TRANSFERFROM\n        );\n    }\n\n    function approve(\n        address _tokenAddress,\n        address _spender,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_tokenAddress).approve(_spender, _quantity);\n    \n        require(\n            checkSuccess(),\n            INVALID_RETURN_APPROVE\n        );\n    }\n\n    // ============ Private Functions ============\n\n    /**\n     * Checks the return value of the previous function up to 32 bytes. Returns true if the previous\n     * function returned 0 bytes or 1.\n     */\n    function checkSuccess(\n    )\n        private\n        pure\n        returns (bool)\n    {\n        // default to failure\n        uint256 returnValue = 0;\n\n        assembly {\n            // check number of bytes returned from last function call\n            switch returndatasize\n\n            // no bytes returned: assume success\n            case 0x0 {\n                returnValue := 1\n            }\n\n            // 32 bytes returned\n            case 0x20 {\n                // copy 32 bytes into scratch space\n                returndatacopy(0x0, 0x0, 0x20)\n\n                // load those bytes into returnValue\n                returnValue := mload(0x0)\n            }\n\n            // not sure what was returned: dont mark as success\n            default { }\n        }\n\n        // check if returned value is one or nothing\n        return returnValue == 1;\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        4865
      ]
    },
    "id": 4866,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4724,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:47"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "./CommonMath.sol",
        "id": 4726,
        "nodeType": "ImportDirective",
        "scope": 4866,
        "sourceUnit": 4723,
        "src": "622:46:47",
        "symbolAliases": [
          {
            "foreign": 4725,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/IERC20.sol",
        "file": "./IERC20.sol",
        "id": 4728,
        "nodeType": "ImportDirective",
        "scope": 4866,
        "sourceUnit": 4910,
        "src": "669:38:47",
        "symbolAliases": [
          {
            "foreign": 4727,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title ERC20Wrapper\n@author Set Protocol\n * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.\nFor all functions we will only accept tokens that return a null or true value, any other values will\ncause the operation to revert.",
        "fullyImplemented": true,
        "id": 4865,
        "linearizedBaseContracts": [
          4865
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4731,
            "name": "INVALID_RETURN_TRANSFER",
            "nodeType": "VariableDeclaration",
            "scope": 4865,
            "src": "1080:114:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4729,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1080:6:47",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e736665722e",
              "id": 4730,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1122:72:47",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_6a28e8cd70cea460f64d888906c14b1e15dd90824bd08d495b1878c7147754b3",
                "typeString": "literal_string \"Transferred token does not return null or true on successful transfer.\""
              },
              "value": "Transferred token does not return null or true on successful transfer."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4734,
            "name": "INVALID_RETURN_TRANSFERFROM",
            "nodeType": "VariableDeclaration",
            "scope": 4865,
            "src": "1200:122:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4732,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1200:6:47",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e7366657246726f6d2e",
              "id": 4733,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1246:76:47",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_4aa4f2ff21e6312a79f309b1750981deb687adeae13f742ac475b55c58e95666",
                "typeString": "literal_string \"Transferred token does not return null or true on successful transferFrom.\""
              },
              "value": "Transferred token does not return null or true on successful transferFrom."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4737,
            "name": "INVALID_RETURN_APPROVE",
            "nodeType": "VariableDeclaration",
            "scope": 4865,
            "src": "1328:109:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4735,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1328:6:47",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "417070726f76656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c20617070726f76652e",
              "id": 4736,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1369:68:47",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_99d0dda7a6d81737bc992be9cf35fe1c1e8501bdd21bd0dfe88583241e132c2f",
                "typeString": "literal_string \"Approved token does not return null or true on successful approve.\""
              },
              "value": "Approved token does not return null or true on successful approve."
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4753,
              "nodeType": "Block",
              "src": "1644:70:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4750,
                        "name": "_ownerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4741,
                        "src": "1693:13:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4747,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4739,
                            "src": "1668:13:47",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 4746,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4909,
                          "src": "1661:6:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4909_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4748,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1661:21:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4909",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4749,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4874,
                      "src": "1661:31:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 4751,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1661:46:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4745,
                  "id": 4752,
                  "nodeType": "Return",
                  "src": "1654:53:47"
                }
              ]
            },
            "documentation": null,
            "id": 4754,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4742,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4739,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4754,
                  "src": "1525:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4738,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1525:7:47",
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
                  "id": 4741,
                  "name": "_ownerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4754,
                  "src": "1556:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4740,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1556:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1515:68:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4745,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4744,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4754,
                  "src": "1631:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4743,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1631:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1630:9:47"
            },
            "scope": 4865,
            "src": "1497:217:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4773,
              "nodeType": "Block",
              "src": "1891:78:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4769,
                        "name": "_tokenOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4758,
                        "src": "1940:11:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4770,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4760,
                        "src": "1953:8:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4766,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4756,
                            "src": "1915:13:47",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 4765,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4909,
                          "src": "1908:6:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4909_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4767,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1908:21:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4909",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4768,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4883,
                      "src": "1908:31:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view external returns (uint256)"
                      }
                    },
                    "id": 4771,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1908:54:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4764,
                  "id": 4772,
                  "nodeType": "Return",
                  "src": "1901:61:47"
                }
              ]
            },
            "documentation": null,
            "id": 4774,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4761,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4756,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4774,
                  "src": "1748:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4755,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1748:7:47",
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
                  "id": 4758,
                  "name": "_tokenOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4774,
                  "src": "1779:19:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4757,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1779:7:47",
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
                  "id": 4760,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4774,
                  "src": "1808:16:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4759,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1808:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1738:92:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4764,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4763,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4774,
                  "src": "1878:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4762,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1878:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1877:9:47"
            },
            "scope": 4865,
            "src": "1720:249:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4797,
              "nodeType": "Block",
              "src": "2099:156:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4787,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4778,
                        "src": "2140:3:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4788,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4780,
                        "src": "2145:9:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4784,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4776,
                            "src": "2116:13:47",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 4783,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4909,
                          "src": "2109:6:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4909_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4785,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2109:21:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4909",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4786,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4890,
                      "src": "2109:30:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 4789,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2109:46:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4790,
                  "nodeType": "ExpressionStatement",
                  "src": "2109:46:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 4792,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4864,
                          "src": "2187:12:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4793,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2187:14:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4794,
                        "name": "INVALID_RETURN_TRANSFER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4731,
                        "src": "2215:23:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4791,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2166:7:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4795,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2166:82:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4796,
                  "nodeType": "ExpressionStatement",
                  "src": "2166:82:47"
                }
              ]
            },
            "documentation": null,
            "id": 4798,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4781,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4776,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4798,
                  "src": "2002:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4775,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2002:7:47",
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
                  "id": 4778,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4798,
                  "src": "2033:11:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4777,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2033:7:47",
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
                  "id": 4780,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4798,
                  "src": "2054:17:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4779,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2054:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1992:85:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4782,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2099:0:47"
            },
            "scope": 4865,
            "src": "1975:280:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4824,
              "nodeType": "Block",
              "src": "2412:171:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4813,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4802,
                        "src": "2457:5:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4814,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4804,
                        "src": "2464:3:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4815,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4806,
                        "src": "2469:9:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4810,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4800,
                            "src": "2429:13:47",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 4809,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4909,
                          "src": "2422:6:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4909_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4811,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2422:21:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4909",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4812,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4899,
                      "src": "2422:34:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 4816,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2422:57:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4817,
                  "nodeType": "ExpressionStatement",
                  "src": "2422:57:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 4819,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4864,
                          "src": "2511:12:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4820,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2511:14:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4821,
                        "name": "INVALID_RETURN_TRANSFERFROM",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4734,
                        "src": "2539:27:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4818,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2490:7:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4822,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2490:86:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4823,
                  "nodeType": "ExpressionStatement",
                  "src": "2490:86:47"
                }
              ]
            },
            "documentation": null,
            "id": 4825,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4807,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4800,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4825,
                  "src": "2292:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4799,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2292:7:47",
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
                  "id": 4802,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4825,
                  "src": "2323:13:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4801,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2323:7:47",
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
                  "id": 4804,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4825,
                  "src": "2346:11:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4803,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2346:7:47",
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
                  "id": 4806,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4825,
                  "src": "2367:17:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4805,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2367:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2282:108:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4808,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2412:0:47"
            },
            "scope": 4865,
            "src": "2261:322:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4848,
              "nodeType": "Block",
              "src": "2717:163:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4838,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4829,
                        "src": "2757:8:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4839,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4831,
                        "src": "2767:9:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4835,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4827,
                            "src": "2734:13:47",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 4834,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4909,
                          "src": "2727:6:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4909_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4836,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2727:21:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4909",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4837,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4908,
                      "src": "2727:29:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,uint256) external returns (bool)"
                      }
                    },
                    "id": 4840,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2727:50:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4841,
                  "nodeType": "ExpressionStatement",
                  "src": "2727:50:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 4843,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4864,
                          "src": "2813:12:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4844,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2813:14:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4845,
                        "name": "INVALID_RETURN_APPROVE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4737,
                        "src": "2841:22:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4842,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2792:7:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4846,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2792:81:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4847,
                  "nodeType": "ExpressionStatement",
                  "src": "2792:81:47"
                }
              ]
            },
            "documentation": null,
            "id": 4849,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4832,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4827,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4849,
                  "src": "2615:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4826,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2615:7:47",
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
                  "id": 4829,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4849,
                  "src": "2646:16:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4828,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2646:7:47",
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
                  "id": 4831,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4849,
                  "src": "2672:17:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4830,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2672:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2605:90:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4833,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2717:0:47"
            },
            "scope": 4865,
            "src": "2589:291:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4863,
              "nodeType": "Block",
              "src": "3179:767:47",
              "statements": [
                {
                  "assignments": [
                    4855
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4855,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 4864,
                      "src": "3219:19:47",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 4854,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3219:7:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 4857,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 4856,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "3241:1:47",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3219:23:47"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 4855,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3715:11:47",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 4855,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3457:11:47",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 4858,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "3253:669:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 4861,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4859,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4855,
                      "src": "3923:11:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "31",
                      "id": 4860,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3938:1:47",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "3923:16:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 4853,
                  "id": 4862,
                  "nodeType": "Return",
                  "src": "3916:23:47"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 4864,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4850,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3115:7:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4853,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4852,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4864,
                  "src": "3169:4:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4851,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3169:4:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3168:6:47"
            },
            "scope": 4865,
            "src": "3094:852:47",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 4866,
        "src": "1008:2940:47"
      }
    ],
    "src": "597:3352:47"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        4865
      ]
    },
    "id": 4866,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4724,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:47"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "./CommonMath.sol",
        "id": 4726,
        "nodeType": "ImportDirective",
        "scope": 4866,
        "sourceUnit": 4723,
        "src": "622:46:47",
        "symbolAliases": [
          {
            "foreign": 4725,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/IERC20.sol",
        "file": "./IERC20.sol",
        "id": 4728,
        "nodeType": "ImportDirective",
        "scope": 4866,
        "sourceUnit": 4910,
        "src": "669:38:47",
        "symbolAliases": [
          {
            "foreign": 4727,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title ERC20Wrapper\n@author Set Protocol\n * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.\nFor all functions we will only accept tokens that return a null or true value, any other values will\ncause the operation to revert.",
        "fullyImplemented": true,
        "id": 4865,
        "linearizedBaseContracts": [
          4865
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4731,
            "name": "INVALID_RETURN_TRANSFER",
            "nodeType": "VariableDeclaration",
            "scope": 4865,
            "src": "1080:114:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4729,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1080:6:47",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e736665722e",
              "id": 4730,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1122:72:47",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_6a28e8cd70cea460f64d888906c14b1e15dd90824bd08d495b1878c7147754b3",
                "typeString": "literal_string \"Transferred token does not return null or true on successful transfer.\""
              },
              "value": "Transferred token does not return null or true on successful transfer."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4734,
            "name": "INVALID_RETURN_TRANSFERFROM",
            "nodeType": "VariableDeclaration",
            "scope": 4865,
            "src": "1200:122:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4732,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1200:6:47",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5472616e7366657272656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c207472616e7366657246726f6d2e",
              "id": 4733,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1246:76:47",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_4aa4f2ff21e6312a79f309b1750981deb687adeae13f742ac475b55c58e95666",
                "typeString": "literal_string \"Transferred token does not return null or true on successful transferFrom.\""
              },
              "value": "Transferred token does not return null or true on successful transferFrom."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4737,
            "name": "INVALID_RETURN_APPROVE",
            "nodeType": "VariableDeclaration",
            "scope": 4865,
            "src": "1328:109:47",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4735,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1328:6:47",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "417070726f76656420746f6b656e20646f6573206e6f742072657475726e206e756c6c206f722074727565206f6e207375636365737366756c20617070726f76652e",
              "id": 4736,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1369:68:47",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_99d0dda7a6d81737bc992be9cf35fe1c1e8501bdd21bd0dfe88583241e132c2f",
                "typeString": "literal_string \"Approved token does not return null or true on successful approve.\""
              },
              "value": "Approved token does not return null or true on successful approve."
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4753,
              "nodeType": "Block",
              "src": "1644:70:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4750,
                        "name": "_ownerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4741,
                        "src": "1693:13:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4747,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4739,
                            "src": "1668:13:47",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 4746,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4909,
                          "src": "1661:6:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4909_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4748,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1661:21:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4909",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4749,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4874,
                      "src": "1661:31:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 4751,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1661:46:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4745,
                  "id": 4752,
                  "nodeType": "Return",
                  "src": "1654:53:47"
                }
              ]
            },
            "documentation": null,
            "id": 4754,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4742,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4739,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4754,
                  "src": "1525:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4738,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1525:7:47",
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
                  "id": 4741,
                  "name": "_ownerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4754,
                  "src": "1556:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4740,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1556:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1515:68:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4745,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4744,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4754,
                  "src": "1631:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4743,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1631:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1630:9:47"
            },
            "scope": 4865,
            "src": "1497:217:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4773,
              "nodeType": "Block",
              "src": "1891:78:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4769,
                        "name": "_tokenOwner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4758,
                        "src": "1940:11:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4770,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4760,
                        "src": "1953:8:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4766,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4756,
                            "src": "1915:13:47",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 4765,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4909,
                          "src": "1908:6:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4909_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4767,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1908:21:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4909",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4768,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4883,
                      "src": "1908:31:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view external returns (uint256)"
                      }
                    },
                    "id": 4771,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1908:54:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4764,
                  "id": 4772,
                  "nodeType": "Return",
                  "src": "1901:61:47"
                }
              ]
            },
            "documentation": null,
            "id": 4774,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4761,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4756,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4774,
                  "src": "1748:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4755,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1748:7:47",
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
                  "id": 4758,
                  "name": "_tokenOwner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4774,
                  "src": "1779:19:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4757,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1779:7:47",
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
                  "id": 4760,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4774,
                  "src": "1808:16:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4759,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1808:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1738:92:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4764,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4763,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4774,
                  "src": "1878:7:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4762,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1878:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1877:9:47"
            },
            "scope": 4865,
            "src": "1720:249:47",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4797,
              "nodeType": "Block",
              "src": "2099:156:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4787,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4778,
                        "src": "2140:3:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4788,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4780,
                        "src": "2145:9:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4784,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4776,
                            "src": "2116:13:47",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 4783,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4909,
                          "src": "2109:6:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4909_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4785,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2109:21:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4909",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4786,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4890,
                      "src": "2109:30:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 4789,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2109:46:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4790,
                  "nodeType": "ExpressionStatement",
                  "src": "2109:46:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 4792,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4864,
                          "src": "2187:12:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4793,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2187:14:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4794,
                        "name": "INVALID_RETURN_TRANSFER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4731,
                        "src": "2215:23:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4791,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2166:7:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4795,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2166:82:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4796,
                  "nodeType": "ExpressionStatement",
                  "src": "2166:82:47"
                }
              ]
            },
            "documentation": null,
            "id": 4798,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4781,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4776,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4798,
                  "src": "2002:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4775,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2002:7:47",
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
                  "id": 4778,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4798,
                  "src": "2033:11:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4777,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2033:7:47",
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
                  "id": 4780,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4798,
                  "src": "2054:17:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4779,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2054:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1992:85:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4782,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2099:0:47"
            },
            "scope": 4865,
            "src": "1975:280:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4824,
              "nodeType": "Block",
              "src": "2412:171:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4813,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4802,
                        "src": "2457:5:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4814,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4804,
                        "src": "2464:3:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4815,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4806,
                        "src": "2469:9:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4810,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4800,
                            "src": "2429:13:47",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 4809,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4909,
                          "src": "2422:6:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4909_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4811,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2422:21:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4909",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4812,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4899,
                      "src": "2422:34:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 4816,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2422:57:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4817,
                  "nodeType": "ExpressionStatement",
                  "src": "2422:57:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 4819,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4864,
                          "src": "2511:12:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4820,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2511:14:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4821,
                        "name": "INVALID_RETURN_TRANSFERFROM",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4734,
                        "src": "2539:27:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4818,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2490:7:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4822,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2490:86:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4823,
                  "nodeType": "ExpressionStatement",
                  "src": "2490:86:47"
                }
              ]
            },
            "documentation": null,
            "id": 4825,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4807,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4800,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4825,
                  "src": "2292:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4799,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2292:7:47",
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
                  "id": 4802,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4825,
                  "src": "2323:13:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4801,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2323:7:47",
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
                  "id": 4804,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4825,
                  "src": "2346:11:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4803,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2346:7:47",
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
                  "id": 4806,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4825,
                  "src": "2367:17:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4805,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2367:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2282:108:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4808,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2412:0:47"
            },
            "scope": 4865,
            "src": "2261:322:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4848,
              "nodeType": "Block",
              "src": "2717:163:47",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4838,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4829,
                        "src": "2757:8:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4839,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4831,
                        "src": "2767:9:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 4835,
                            "name": "_tokenAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4827,
                            "src": "2734:13:47",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          ],
                          "id": 4834,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4909,
                          "src": "2727:6:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$4909_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4836,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2727:21:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$4909",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4837,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4908,
                      "src": "2727:29:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,uint256) external returns (bool)"
                      }
                    },
                    "id": 4840,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2727:50:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4841,
                  "nodeType": "ExpressionStatement",
                  "src": "2727:50:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "id": 4843,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4864,
                          "src": "2813:12:47",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4844,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2813:14:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4845,
                        "name": "INVALID_RETURN_APPROVE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4737,
                        "src": "2841:22:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4842,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2792:7:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4846,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2792:81:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4847,
                  "nodeType": "ExpressionStatement",
                  "src": "2792:81:47"
                }
              ]
            },
            "documentation": null,
            "id": 4849,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4832,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4827,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4849,
                  "src": "2615:21:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4826,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2615:7:47",
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
                  "id": 4829,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4849,
                  "src": "2646:16:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4828,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2646:7:47",
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
                  "id": 4831,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4849,
                  "src": "2672:17:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4830,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2672:7:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2605:90:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4833,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2717:0:47"
            },
            "scope": 4865,
            "src": "2589:291:47",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4863,
              "nodeType": "Block",
              "src": "3179:767:47",
              "statements": [
                {
                  "assignments": [
                    4855
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4855,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 4864,
                      "src": "3219:19:47",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 4854,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3219:7:47",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 4857,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 4856,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "3241:1:47",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3219:23:47"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 4855,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3715:11:47",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 4855,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3457:11:47",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 4858,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "3253:669:47"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 4861,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4859,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4855,
                      "src": "3923:11:47",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "hexValue": "31",
                      "id": 4860,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3938:1:47",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "3923:16:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 4853,
                  "id": 4862,
                  "nodeType": "Return",
                  "src": "3916:23:47"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 4864,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4850,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3115:7:47"
            },
            "payable": false,
            "returnParameters": {
              "id": 4853,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4852,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4864,
                  "src": "3169:4:47",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4851,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3169:4:47",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3168:6:47"
            },
            "scope": 4865,
            "src": "3094:852:47",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 4866,
        "src": "1008:2940:47"
      }
    ],
    "src": "597:3352:47"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.427Z"
}
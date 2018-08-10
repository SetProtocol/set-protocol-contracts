export const ERC20Wrapper = 
{
  "contractName": "ERC20Wrapper",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "constant": false,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x610309610030600b82828239805160001a6073146000811461002057610022565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600436106100545763ffffffff60e060020a60003504166315dacbea8114610059578063beabacc81461008b578063f7888aec146100b5575b600080fd5b81801561006557600080fd5b50610089600160a060020a03600435811690602435811690604435166064356100e1565b005b81801561009757600080fd5b50610089600160a060020a0360043581169060243516604435610185565b6100cf600160a060020a0360043581169060243516610218565b60408051918252519081900360200190f35b604080517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a0385811660048301528481166024830152604482018490529151918616916323b872dd9160648082019260009290919082900301818387803b15801561015457600080fd5b505af1158015610168573d6000803e3d6000fd5b505050506101746102a8565b151561017f57600080fd5b50505050565b82600160a060020a031663a9059cbb83836040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050600060405180830381600087803b1580156101e857600080fd5b505af11580156101fc573d6000803e3d6000fd5b505050506102086102a8565b151561021357600080fd5b505050565b600082600160a060020a03166370a08231836040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561027557600080fd5b505af1158015610289573d6000803e3d6000fd5b505050506040513d602081101561029f57600080fd5b50519392505050565b6000803d80156102bf57602081146102c8576102d4565b600191506102d4565b60206000803e60005191505b506001149190505600a165627a7a72305820fff9444616fc08c2a381c67ed3b92a65c9d51681bf323fbdba9d6165b7c364650029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600436106100545763ffffffff60e060020a60003504166315dacbea8114610059578063beabacc81461008b578063f7888aec146100b5575b600080fd5b81801561006557600080fd5b50610089600160a060020a03600435811690602435811690604435166064356100e1565b005b81801561009757600080fd5b50610089600160a060020a0360043581169060243516604435610185565b6100cf600160a060020a0360043581169060243516610218565b60408051918252519081900360200190f35b604080517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a0385811660048301528481166024830152604482018490529151918616916323b872dd9160648082019260009290919082900301818387803b15801561015457600080fd5b505af1158015610168573d6000803e3d6000fd5b505050506101746102a8565b151561017f57600080fd5b50505050565b82600160a060020a031663a9059cbb83836040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050600060405180830381600087803b1580156101e857600080fd5b505af11580156101fc573d6000803e3d6000fd5b505050506102086102a8565b151561021357600080fd5b505050565b600082600160a060020a03166370a08231836040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561027557600080fd5b505af1158015610289573d6000803e3d6000fd5b505050506040513d602081101561029f57600080fd5b50519392505050565b6000803d80156102bf57602081146102c8576102d4565b600191506102d4565b60206000803e60005191505b506001149190505600a165627a7a72305820fff9444616fc08c2a381c67ed3b92a65c9d51681bf323fbdba9d6165b7c364650029",
  "sourceMap": "1008:4964:39:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "1008:4964:39:-;;;;;;;;;;;;-1:-1:-1;;;1008:4964:39;;;;;;;;;;;;;;;;;;;;;;;3169:301;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3169:301:39;-1:-1:-1;;;;;3169:301:39;;;;;;;;;;;;;;;;;;;2475:259;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2475:259:39;-1:-1:-1;;;;;2475:259:39;;;;;;;;;;;;1359:189;;-1:-1:-1;;;;;1359:189:39;;;;;;;;;;;;;;;;;;;;;;;;;;3169:301;3323:50;;;;;;-1:-1:-1;;;;;3323:50:39;;;;;;;;;;;;;;;;;;;;;;:27;;;;;;:50;;;;;-1:-1:-1;;3323:50:39;;;;;;;;-1:-1:-1;3323:27:39;:50;;;5:2:-1;;;;30:1;27;20:12;5:2;3323:50:39;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3323:50:39;;;;3448:14;:12;:14::i;:::-;3440:23;;;;;;;;3169:301;;;;:::o;2475:259::-;2609:6;-1:-1:-1;;;;;2602:23:39;;2626:3;2631:9;2602:39;;;;;-1:-1:-1;;;2602:39:39;;;;;;;-1:-1:-1;;;;;2602:39:39;-1:-1:-1;;;;;2602:39:39;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2602:39:39;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2602:39:39;;;;2712:14;:12;:14::i;:::-;2704:23;;;;;;;;2475:259;;;:::o;1359:189::-;1479:7;1516:6;-1:-1:-1;;;;;1509:24:39;;1534:6;1509:32;;;;;-1:-1:-1;;;1509:32:39;;;;;;;-1:-1:-1;;;;;1509:32:39;-1:-1:-1;;;;;1509:32:39;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1509:32:39;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1509:32:39;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1509:32:39;;1359:189;-1:-1:-1;;;1359:189:39:o;5118:852::-;5193:4;;5377:14;5454:57;;;;5563:4;5558:220;;;;5370:497;;5454:57;5496:1;5481:16;;5454:57;;5558:220;5663:4;5658:3;5653;5638:30;5760:3;5754:10;5739:25;;5370:497;-1:-1:-1;5962:1:39;5947:16;;5118:852;-1:-1:-1;5118:852:39:o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { CommonMath } from \"./CommonMath.sol\";\nimport { IERC20 } from \"./IERC20.sol\";\n\n\n/**\n * @title ERC20Wrapper\n * @author Set Protocol\n *\n * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.\n * For all functions we will only accept tokens that return a null or true value, any other values will\n * cause the operation to revert.\n */\nlibrary ERC20Wrapper {\n\n    // ============ Internal Functions ============\n\n    /**\n     * Check balance owner's balance of ERC20 token\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _owner          The owner who's balance is being checked\n     * @return  uint256        The _owner's amount of tokens\n     */\n    function balanceOf(\n        address _token,\n        address _owner\n    )\n        external\n        view\n        returns (uint256)\n    {\n        return IERC20(_token).balanceOf(_owner);\n    }\n\n    /**\n     * Checks spender's allowance to use token's on owner's behalf.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _owner          The token owner address\n     * @param  _spender        The address the allowance is being checked on\n     * @return  uint256        The spender's allowance on behalf of owner\n     */\n    function allowance(\n        address _token,\n        address _owner,\n        address _spender\n    )\n        internal\n        view\n        returns (uint256)\n    {\n        return IERC20(_token).allowance(_owner, _spender);\n    }\n\n    /**\n     * Transfers tokens from an address. Handle's tokens that return true or null.\n     * If other value returned, reverts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _to             The address to transfer to\n     * @param  _quantity       The amount of tokens to transfer\n     */\n    function transfer(\n        address _token,\n        address _to,\n        uint256 _quantity\n    )\n        external\n    {\n        IERC20(_token).transfer(_to, _quantity);\n\n        // Check that transfer returns true or null\n        require(checkSuccess());\n    }\n\n    /**\n     * Transfers tokens from an address (that has set allowance on the proxy).\n     * Handle's tokens that return true or null. If other value returned, reverts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _from           The address to transfer from\n     * @param  _to             The address to transfer to\n     * @param  _quantity       The number of tokens to transfer\n     */\n    function transferFrom(\n        address _token,\n        address _from,\n        address _to,\n        uint256 _quantity\n    )\n        external\n    {\n        IERC20(_token).transferFrom(_from, _to, _quantity);\n\n        // Check that transferFrom returns true or null\n        require(checkSuccess());\n    }\n\n    /**\n     * Grants spender ability to spend on owner's behalf.\n     * Handle's tokens that return true or null. If other value returned, reverts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _spender        The address to approve for transfer\n     * @param  _quantity       The amount of tokens to approve spender for\n     */\n    function approve(\n        address _token,\n        address _spender,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_token).approve(_spender, _quantity);\n\n        // Check that approve returns true or null\n        require(checkSuccess());\n    }\n\n    /**\n     * Ensure's the owner has granted enough allowance for system to\n     * transfer tokens.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _owner          The address of the token owner\n     * @param  _spender        The address to grant/check allowance for\n     * @param  _quantity       The amount to see if allowed for\n     */\n    function ensureAllowance(\n        address _token,\n        address _owner,\n        address _spender,\n        uint256 _quantity\n    )\n        internal\n    {\n        uint256 currentAllowance = allowance(_token, _owner, _spender);\n        if (currentAllowance < _quantity) {\n            approve(\n                _token,\n                _spender,\n                CommonMath.maxUInt256()\n            );\n        }\n    }\n\n    // ============ Private Functions ============\n\n    /**\n     * Checks the return value of the previous function up to 32 bytes. Returns true if the previous\n     * function returned 0 bytes or 1.\n     */\n    function checkSuccess(\n    )\n        private\n        pure\n        returns (bool)\n    {\n        // default to failure\n        uint256 returnValue = 0;\n\n        assembly {\n            // check number of bytes returned from last function call\n            switch returndatasize\n\n            // no bytes returned: assume success\n            case 0x0 {\n                returnValue := 1\n            }\n\n            // 32 bytes returned\n            case 0x20 {\n                // copy 32 bytes into scratch space\n                returndatacopy(0x0, 0x0, 0x20)\n\n                // load those bytes into returnValue\n                returnValue := mload(0x0)\n            }\n\n            // not sure what was returned: dont mark as success\n            default { }\n        }\n\n        // check if returned value is one or nothing\n        return returnValue == 1;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        5035
      ]
    },
    "id": 5036,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4873,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:39"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "./CommonMath.sol",
        "id": 4875,
        "nodeType": "ImportDirective",
        "scope": 5036,
        "sourceUnit": 4872,
        "src": "622:46:39",
        "symbolAliases": [
          {
            "foreign": 4874,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
        "file": "./IERC20.sol",
        "id": 4877,
        "nodeType": "ImportDirective",
        "scope": 5036,
        "sourceUnit": 5080,
        "src": "669:38:39",
        "symbolAliases": [
          {
            "foreign": 4876,
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
        "id": 5035,
        "linearizedBaseContracts": [
          5035
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 4893,
              "nodeType": "Block",
              "src": "1492:56:39",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4890,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4881,
                        "src": "1534:6:39",
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
                            "id": 4887,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4879,
                            "src": "1516:6:39",
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
                          "id": 4886,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5079,
                          "src": "1509:6:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$5079_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4888,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1509:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$5079",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4889,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5044,
                      "src": "1509:24:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 4891,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1509:32:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4885,
                  "id": 4892,
                  "nodeType": "Return",
                  "src": "1502:39:39"
                }
              ]
            },
            "documentation": "Check balance owner's balance of ERC20 token\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The owner who's balance is being checked\n@return  uint256        The _owner's amount of tokens",
            "id": 4894,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4882,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4879,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4894,
                  "src": "1387:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4878,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1387:7:39",
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
                  "id": 4881,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4894,
                  "src": "1411:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4880,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1411:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1377:54:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4885,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4884,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4894,
                  "src": "1479:7:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4883,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1479:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1478:9:39"
            },
            "scope": 5035,
            "src": "1359:189:39",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4913,
              "nodeType": "Block",
              "src": "2072:66:39",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4909,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4898,
                        "src": "2114:6:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4910,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4900,
                        "src": "2122:8:39",
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
                            "id": 4906,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4896,
                            "src": "2096:6:39",
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
                          "id": 4905,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5079,
                          "src": "2089:6:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$5079_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4907,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2089:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$5079",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4908,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5053,
                      "src": "2089:24:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view external returns (uint256)"
                      }
                    },
                    "id": 4911,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2089:42:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4904,
                  "id": 4912,
                  "nodeType": "Return",
                  "src": "2082:49:39"
                }
              ]
            },
            "documentation": "Checks spender's allowance to use token's on owner's behalf.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The token owner address\n@param  _spender        The address the allowance is being checked on\n@return  uint256        The spender's allowance on behalf of owner",
            "id": 4914,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4901,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4896,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4914,
                  "src": "1941:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4895,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1941:7:39",
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
                  "id": 4898,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4914,
                  "src": "1965:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4897,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1965:7:39",
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
                  "id": 4900,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4914,
                  "src": "1989:16:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4899,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1989:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1931:80:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4904,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4903,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4914,
                  "src": "2059:7:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4902,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2059:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2058:9:39"
            },
            "scope": 5035,
            "src": "1913:225:39",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4936,
              "nodeType": "Block",
              "src": "2592:142:39",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4927,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4918,
                        "src": "2626:3:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4928,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4920,
                        "src": "2631:9:39",
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
                            "id": 4924,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4916,
                            "src": "2609:6:39",
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
                          "id": 4923,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5079,
                          "src": "2602:6:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$5079_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4925,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2602:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$5079",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4926,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5060,
                      "src": "2602:23:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 4929,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2602:39:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4930,
                  "nodeType": "ExpressionStatement",
                  "src": "2602:39:39"
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
                          "id": 4932,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5034,
                          "src": "2712:12:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4933,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2712:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 4931,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6000,
                        6001
                      ],
                      "referencedDeclaration": 6000,
                      "src": "2704:7:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4934,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2704:23:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4935,
                  "nodeType": "ExpressionStatement",
                  "src": "2704:23:39"
                }
              ]
            },
            "documentation": "Transfers tokens from an address. Handle's tokens that return true or null.\nIf other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _to             The address to transfer to\n@param  _quantity       The amount of tokens to transfer",
            "id": 4937,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4921,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4916,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4937,
                  "src": "2502:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4915,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2502:7:39",
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
                  "id": 4918,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4937,
                  "src": "2526:11:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4917,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2526:7:39",
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
                  "id": 4920,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4937,
                  "src": "2547:17:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4919,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2547:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2492:78:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4922,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2592:0:39"
            },
            "scope": 5035,
            "src": "2475:259:39",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4962,
              "nodeType": "Block",
              "src": "3313:157:39",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4952,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4941,
                        "src": "3351:5:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4953,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4943,
                        "src": "3358:3:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4954,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4945,
                        "src": "3363:9:39",
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
                            "id": 4949,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4939,
                            "src": "3330:6:39",
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
                          "id": 4948,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5079,
                          "src": "3323:6:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$5079_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4950,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3323:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$5079",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4951,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5069,
                      "src": "3323:27:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 4955,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3323:50:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4956,
                  "nodeType": "ExpressionStatement",
                  "src": "3323:50:39"
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
                          "id": 4958,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5034,
                          "src": "3448:12:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4959,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3448:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 4957,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6000,
                        6001
                      ],
                      "referencedDeclaration": 6000,
                      "src": "3440:7:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4960,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3440:23:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4961,
                  "nodeType": "ExpressionStatement",
                  "src": "3440:23:39"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to\n@param  _quantity       The number of tokens to transfer",
            "id": 4963,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4946,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4939,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4963,
                  "src": "3200:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4938,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3200:7:39",
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
                  "id": 4941,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4963,
                  "src": "3224:13:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4940,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3224:7:39",
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
                  "id": 4943,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4963,
                  "src": "3247:11:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4942,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3247:7:39",
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
                  "id": 4945,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4963,
                  "src": "3268:17:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4944,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3268:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3190:101:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4947,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3313:0:39"
            },
            "scope": 5035,
            "src": "3169:301:39",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4985,
              "nodeType": "Block",
              "src": "3965:145:39",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4976,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4967,
                        "src": "3998:8:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4977,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4969,
                        "src": "4008:9:39",
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
                            "id": 4973,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4965,
                            "src": "3982:6:39",
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
                          "id": 4972,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5079,
                          "src": "3975:6:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$5079_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4974,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3975:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$5079",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4975,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5078,
                      "src": "3975:22:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,uint256) external returns (bool)"
                      }
                    },
                    "id": 4978,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3975:43:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4979,
                  "nodeType": "ExpressionStatement",
                  "src": "3975:43:39"
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
                          "id": 4981,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5034,
                          "src": "4088:12:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4982,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4088:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 4980,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6000,
                        6001
                      ],
                      "referencedDeclaration": 6000,
                      "src": "4080:7:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4983,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4080:23:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4984,
                  "nodeType": "ExpressionStatement",
                  "src": "4080:23:39"
                }
              ]
            },
            "documentation": "Grants spender ability to spend on owner's behalf.\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _spender        The address to approve for transfer\n@param  _quantity       The amount of tokens to approve spender for",
            "id": 4986,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4970,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4965,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4986,
                  "src": "3870:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4964,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3870:7:39",
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
                  "id": 4967,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4986,
                  "src": "3894:16:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4966,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3894:7:39",
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
                  "id": 4969,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4986,
                  "src": "3920:17:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4968,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3920:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3860:83:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4971,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3965:0:39"
            },
            "scope": 5035,
            "src": "3844:266:39",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 5018,
              "nodeType": "Block",
              "src": "4645:259:39",
              "statements": [
                {
                  "assignments": [
                    4998
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4998,
                      "name": "currentAllowance",
                      "nodeType": "VariableDeclaration",
                      "scope": 5019,
                      "src": "4655:24:39",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 4997,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4655:7:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 5004,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5000,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4988,
                        "src": "4692:6:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5001,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4990,
                        "src": "4700:6:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5002,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4992,
                        "src": "4708:8:39",
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
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 4999,
                      "name": "allowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4914,
                      "src": "4682:9:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 5003,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4682:35:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4655:62:39"
                },
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 5007,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 5005,
                      "name": "currentAllowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4998,
                      "src": "4731:16:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 5006,
                      "name": "_quantity",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4994,
                      "src": "4750:9:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4731:28:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 5017,
                  "nodeType": "IfStatement",
                  "src": "4727:171:39",
                  "trueBody": {
                    "id": 5016,
                    "nodeType": "Block",
                    "src": "4761:137:39",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 5009,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4988,
                              "src": "4800:6:39",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 5010,
                              "name": "_spender",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4992,
                              "src": "4824:8:39",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "arguments": [],
                              "expression": {
                                "argumentTypes": [],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 5011,
                                  "name": "CommonMath",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4871,
                                  "src": "4850:10:39",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_CommonMath_$4871_$",
                                    "typeString": "type(library CommonMath)"
                                  }
                                },
                                "id": 5012,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "maxUInt256",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4870,
                                "src": "4850:21:39",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                                  "typeString": "function () pure returns (uint256)"
                                }
                              },
                              "id": 5013,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "4850:23:39",
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
                            "id": 5008,
                            "name": "approve",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4986,
                            "src": "4775:7:39",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,uint256)"
                            }
                          },
                          "id": 5014,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "4775:112:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 5015,
                        "nodeType": "ExpressionStatement",
                        "src": "4775:112:39"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "Ensure's the owner has granted enough allowance for system to\ntransfer tokens.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The address of the token owner\n@param  _spender        The address to grant/check allowance for\n@param  _quantity       The amount to see if allowed for",
            "id": 5019,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4995,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4988,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5019,
                  "src": "4526:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4987,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4526:7:39",
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
                  "id": 4990,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5019,
                  "src": "4550:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4989,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4550:7:39",
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
                  "id": 4992,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5019,
                  "src": "4574:16:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4991,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4574:7:39",
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
                  "id": 4994,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5019,
                  "src": "4600:17:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4993,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4600:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4516:107:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4996,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4645:0:39"
            },
            "scope": 5035,
            "src": "4492:412:39",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 5033,
              "nodeType": "Block",
              "src": "5203:767:39",
              "statements": [
                {
                  "assignments": [
                    5025
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 5025,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 5034,
                      "src": "5243:19:39",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 5024,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5243:7:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 5027,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 5026,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5265:1:39",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5243:23:39"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 5025,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5739:11:39",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 5025,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5481:11:39",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 5028,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "5277:669:39"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 5031,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 5029,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5025,
                      "src": "5947:11:39",
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
                      "id": 5030,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5962:1:39",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "5947:16:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 5023,
                  "id": 5032,
                  "nodeType": "Return",
                  "src": "5940:23:39"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 5034,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5020,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5139:7:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 5023,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5022,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5034,
                  "src": "5193:4:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5021,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5193:4:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5192:6:39"
            },
            "scope": 5035,
            "src": "5118:852:39",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 5036,
        "src": "1008:4964:39"
      }
    ],
    "src": "597:5376:39"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        5035
      ]
    },
    "id": 5036,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4873,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:39"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "./CommonMath.sol",
        "id": 4875,
        "nodeType": "ImportDirective",
        "scope": 5036,
        "sourceUnit": 4872,
        "src": "622:46:39",
        "symbolAliases": [
          {
            "foreign": 4874,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
        "file": "./IERC20.sol",
        "id": 4877,
        "nodeType": "ImportDirective",
        "scope": 5036,
        "sourceUnit": 5080,
        "src": "669:38:39",
        "symbolAliases": [
          {
            "foreign": 4876,
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
        "id": 5035,
        "linearizedBaseContracts": [
          5035
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 4893,
              "nodeType": "Block",
              "src": "1492:56:39",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4890,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4881,
                        "src": "1534:6:39",
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
                            "id": 4887,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4879,
                            "src": "1516:6:39",
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
                          "id": 4886,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5079,
                          "src": "1509:6:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$5079_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4888,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1509:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$5079",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4889,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5044,
                      "src": "1509:24:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 4891,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1509:32:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4885,
                  "id": 4892,
                  "nodeType": "Return",
                  "src": "1502:39:39"
                }
              ]
            },
            "documentation": "Check balance owner's balance of ERC20 token\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The owner who's balance is being checked\n@return  uint256        The _owner's amount of tokens",
            "id": 4894,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4882,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4879,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4894,
                  "src": "1387:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4878,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1387:7:39",
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
                  "id": 4881,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4894,
                  "src": "1411:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4880,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1411:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1377:54:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4885,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4884,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4894,
                  "src": "1479:7:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4883,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1479:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1478:9:39"
            },
            "scope": 5035,
            "src": "1359:189:39",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4913,
              "nodeType": "Block",
              "src": "2072:66:39",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4909,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4898,
                        "src": "2114:6:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4910,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4900,
                        "src": "2122:8:39",
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
                            "id": 4906,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4896,
                            "src": "2096:6:39",
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
                          "id": 4905,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5079,
                          "src": "2089:6:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$5079_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4907,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2089:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$5079",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4908,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5053,
                      "src": "2089:24:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view external returns (uint256)"
                      }
                    },
                    "id": 4911,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2089:42:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 4904,
                  "id": 4912,
                  "nodeType": "Return",
                  "src": "2082:49:39"
                }
              ]
            },
            "documentation": "Checks spender's allowance to use token's on owner's behalf.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The token owner address\n@param  _spender        The address the allowance is being checked on\n@return  uint256        The spender's allowance on behalf of owner",
            "id": 4914,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4901,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4896,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4914,
                  "src": "1941:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4895,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1941:7:39",
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
                  "id": 4898,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 4914,
                  "src": "1965:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4897,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1965:7:39",
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
                  "id": 4900,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4914,
                  "src": "1989:16:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4899,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1989:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1931:80:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4904,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4903,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4914,
                  "src": "2059:7:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4902,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2059:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2058:9:39"
            },
            "scope": 5035,
            "src": "1913:225:39",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 4936,
              "nodeType": "Block",
              "src": "2592:142:39",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4927,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4918,
                        "src": "2626:3:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4928,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4920,
                        "src": "2631:9:39",
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
                            "id": 4924,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4916,
                            "src": "2609:6:39",
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
                          "id": 4923,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5079,
                          "src": "2602:6:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$5079_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4925,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2602:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$5079",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4926,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5060,
                      "src": "2602:23:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 4929,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2602:39:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4930,
                  "nodeType": "ExpressionStatement",
                  "src": "2602:39:39"
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
                          "id": 4932,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5034,
                          "src": "2712:12:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4933,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2712:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 4931,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6000,
                        6001
                      ],
                      "referencedDeclaration": 6000,
                      "src": "2704:7:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4934,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2704:23:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4935,
                  "nodeType": "ExpressionStatement",
                  "src": "2704:23:39"
                }
              ]
            },
            "documentation": "Transfers tokens from an address. Handle's tokens that return true or null.\nIf other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _to             The address to transfer to\n@param  _quantity       The amount of tokens to transfer",
            "id": 4937,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4921,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4916,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4937,
                  "src": "2502:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4915,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2502:7:39",
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
                  "id": 4918,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4937,
                  "src": "2526:11:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4917,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2526:7:39",
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
                  "id": 4920,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4937,
                  "src": "2547:17:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4919,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2547:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2492:78:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4922,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2592:0:39"
            },
            "scope": 5035,
            "src": "2475:259:39",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4962,
              "nodeType": "Block",
              "src": "3313:157:39",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4952,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4941,
                        "src": "3351:5:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4953,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4943,
                        "src": "3358:3:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4954,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4945,
                        "src": "3363:9:39",
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
                            "id": 4949,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4939,
                            "src": "3330:6:39",
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
                          "id": 4948,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5079,
                          "src": "3323:6:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$5079_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4950,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3323:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$5079",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4951,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5069,
                      "src": "3323:27:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 4955,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3323:50:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4956,
                  "nodeType": "ExpressionStatement",
                  "src": "3323:50:39"
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
                          "id": 4958,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5034,
                          "src": "3448:12:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4959,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3448:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 4957,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6000,
                        6001
                      ],
                      "referencedDeclaration": 6000,
                      "src": "3440:7:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4960,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3440:23:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4961,
                  "nodeType": "ExpressionStatement",
                  "src": "3440:23:39"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to\n@param  _quantity       The number of tokens to transfer",
            "id": 4963,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4946,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4939,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4963,
                  "src": "3200:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4938,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3200:7:39",
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
                  "id": 4941,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 4963,
                  "src": "3224:13:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4940,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3224:7:39",
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
                  "id": 4943,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4963,
                  "src": "3247:11:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4942,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3247:7:39",
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
                  "id": 4945,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4963,
                  "src": "3268:17:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4944,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3268:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3190:101:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4947,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3313:0:39"
            },
            "scope": 5035,
            "src": "3169:301:39",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4985,
              "nodeType": "Block",
              "src": "3965:145:39",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4976,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4967,
                        "src": "3998:8:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4977,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4969,
                        "src": "4008:9:39",
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
                            "id": 4973,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4965,
                            "src": "3982:6:39",
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
                          "id": 4972,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5079,
                          "src": "3975:6:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$5079_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 4974,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3975:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$5079",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 4975,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5078,
                      "src": "3975:22:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,uint256) external returns (bool)"
                      }
                    },
                    "id": 4978,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3975:43:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4979,
                  "nodeType": "ExpressionStatement",
                  "src": "3975:43:39"
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
                          "id": 4981,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5034,
                          "src": "4088:12:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 4982,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4088:14:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 4980,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6000,
                        6001
                      ],
                      "referencedDeclaration": 6000,
                      "src": "4080:7:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4983,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4080:23:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4984,
                  "nodeType": "ExpressionStatement",
                  "src": "4080:23:39"
                }
              ]
            },
            "documentation": "Grants spender ability to spend on owner's behalf.\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _spender        The address to approve for transfer\n@param  _quantity       The amount of tokens to approve spender for",
            "id": 4986,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4970,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4965,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 4986,
                  "src": "3870:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4964,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3870:7:39",
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
                  "id": 4967,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 4986,
                  "src": "3894:16:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4966,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3894:7:39",
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
                  "id": 4969,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 4986,
                  "src": "3920:17:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4968,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3920:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3860:83:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4971,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3965:0:39"
            },
            "scope": 5035,
            "src": "3844:266:39",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 5018,
              "nodeType": "Block",
              "src": "4645:259:39",
              "statements": [
                {
                  "assignments": [
                    4998
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 4998,
                      "name": "currentAllowance",
                      "nodeType": "VariableDeclaration",
                      "scope": 5019,
                      "src": "4655:24:39",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 4997,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4655:7:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 5004,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5000,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4988,
                        "src": "4692:6:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5001,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4990,
                        "src": "4700:6:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5002,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4992,
                        "src": "4708:8:39",
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
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 4999,
                      "name": "allowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4914,
                      "src": "4682:9:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 5003,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4682:35:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4655:62:39"
                },
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 5007,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 5005,
                      "name": "currentAllowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4998,
                      "src": "4731:16:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 5006,
                      "name": "_quantity",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4994,
                      "src": "4750:9:39",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4731:28:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 5017,
                  "nodeType": "IfStatement",
                  "src": "4727:171:39",
                  "trueBody": {
                    "id": 5016,
                    "nodeType": "Block",
                    "src": "4761:137:39",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 5009,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4988,
                              "src": "4800:6:39",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 5010,
                              "name": "_spender",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4992,
                              "src": "4824:8:39",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "arguments": [],
                              "expression": {
                                "argumentTypes": [],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 5011,
                                  "name": "CommonMath",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4871,
                                  "src": "4850:10:39",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_CommonMath_$4871_$",
                                    "typeString": "type(library CommonMath)"
                                  }
                                },
                                "id": 5012,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "maxUInt256",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4870,
                                "src": "4850:21:39",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                                  "typeString": "function () pure returns (uint256)"
                                }
                              },
                              "id": 5013,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "4850:23:39",
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
                            "id": 5008,
                            "name": "approve",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4986,
                            "src": "4775:7:39",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,uint256)"
                            }
                          },
                          "id": 5014,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "4775:112:39",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 5015,
                        "nodeType": "ExpressionStatement",
                        "src": "4775:112:39"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "Ensure's the owner has granted enough allowance for system to\ntransfer tokens.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The address of the token owner\n@param  _spender        The address to grant/check allowance for\n@param  _quantity       The amount to see if allowed for",
            "id": 5019,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4995,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4988,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5019,
                  "src": "4526:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4987,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4526:7:39",
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
                  "id": 4990,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5019,
                  "src": "4550:14:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4989,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4550:7:39",
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
                  "id": 4992,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5019,
                  "src": "4574:16:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4991,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4574:7:39",
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
                  "id": 4994,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5019,
                  "src": "4600:17:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4993,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4600:7:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4516:107:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 4996,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4645:0:39"
            },
            "scope": 5035,
            "src": "4492:412:39",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 5033,
              "nodeType": "Block",
              "src": "5203:767:39",
              "statements": [
                {
                  "assignments": [
                    5025
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 5025,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 5034,
                      "src": "5243:19:39",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 5024,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5243:7:39",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 5027,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 5026,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5265:1:39",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5243:23:39"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 5025,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5739:11:39",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 5025,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5481:11:39",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 5028,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "5277:669:39"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 5031,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 5029,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5025,
                      "src": "5947:11:39",
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
                      "id": 5030,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5962:1:39",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "5947:16:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 5023,
                  "id": 5032,
                  "nodeType": "Return",
                  "src": "5940:23:39"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 5034,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5020,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5139:7:39"
            },
            "payable": false,
            "returnParameters": {
              "id": 5023,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5022,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5034,
                  "src": "5193:4:39",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5021,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5193:4:39",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5192:6:39"
            },
            "scope": 5035,
            "src": "5118:852:39",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 5036,
        "src": "1008:4964:39"
      }
    ],
    "src": "597:5376:39"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T03:42:05.773Z"
}
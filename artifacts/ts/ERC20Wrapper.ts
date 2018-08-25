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
  "sourceMap": "1008:4964:37:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "1008:4964:37:-;;;;;;;;;;;;-1:-1:-1;;;1008:4964:37;;;;;;;;;;;;;;;;;;;;;;;3169:301;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3169:301:37;-1:-1:-1;;;;;3169:301:37;;;;;;;;;;;;;;;;;;;2475:259;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2475:259:37;-1:-1:-1;;;;;2475:259:37;;;;;;;;;;;;1359:189;;-1:-1:-1;;;;;1359:189:37;;;;;;;;;;;;;;;;;;;;;;;;;;3169:301;3323:50;;;;;;-1:-1:-1;;;;;3323:50:37;;;;;;;;;;;;;;;;;;;;;;:27;;;;;;:50;;;;;-1:-1:-1;;3323:50:37;;;;;;;;-1:-1:-1;3323:27:37;:50;;;5:2:-1;;;;30:1;27;20:12;5:2;3323:50:37;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3323:50:37;;;;3448:14;:12;:14::i;:::-;3440:23;;;;;;;;3169:301;;;;:::o;2475:259::-;2609:6;-1:-1:-1;;;;;2602:23:37;;2626:3;2631:9;2602:39;;;;;-1:-1:-1;;;2602:39:37;;;;;;;-1:-1:-1;;;;;2602:39:37;-1:-1:-1;;;;;2602:39:37;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2602:39:37;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2602:39:37;;;;2712:14;:12;:14::i;:::-;2704:23;;;;;;;;2475:259;;;:::o;1359:189::-;1479:7;1516:6;-1:-1:-1;;;;;1509:24:37;;1534:6;1509:32;;;;;-1:-1:-1;;;1509:32:37;;;;;;;-1:-1:-1;;;;;1509:32:37;-1:-1:-1;;;;;1509:32:37;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1509:32:37;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1509:32:37;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1509:32:37;;1359:189;-1:-1:-1;;;1359:189:37:o;5118:852::-;5193:4;;5377:14;5454:57;;;;5563:4;5558:220;;;;5370:497;;5454:57;5496:1;5481:16;;5454:57;;5558:220;5663:4;5658:3;5653;5638:30;5760:3;5754:10;5739:25;;5370:497;-1:-1:-1;5962:1:37;5947:16;;5118:852;-1:-1:-1;5118:852:37:o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { CommonMath } from \"./CommonMath.sol\";\nimport { IERC20 } from \"./IERC20.sol\";\n\n\n/**\n * @title ERC20Wrapper\n * @author Set Protocol\n *\n * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.\n * For all functions we will only accept tokens that return a null or true value, any other values will\n * cause the operation to revert.\n */\nlibrary ERC20Wrapper {\n\n    // ============ Internal Functions ============\n\n    /**\n     * Check balance owner's balance of ERC20 token\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _owner          The owner who's balance is being checked\n     * @return  uint256        The _owner's amount of tokens\n     */\n    function balanceOf(\n        address _token,\n        address _owner\n    )\n        external\n        view\n        returns (uint256)\n    {\n        return IERC20(_token).balanceOf(_owner);\n    }\n\n    /**\n     * Checks spender's allowance to use token's on owner's behalf.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _owner          The token owner address\n     * @param  _spender        The address the allowance is being checked on\n     * @return  uint256        The spender's allowance on behalf of owner\n     */\n    function allowance(\n        address _token,\n        address _owner,\n        address _spender\n    )\n        internal\n        view\n        returns (uint256)\n    {\n        return IERC20(_token).allowance(_owner, _spender);\n    }\n\n    /**\n     * Transfers tokens from an address. Handle's tokens that return true or null.\n     * If other value returned, reverts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _to             The address to transfer to\n     * @param  _quantity       The amount of tokens to transfer\n     */\n    function transfer(\n        address _token,\n        address _to,\n        uint256 _quantity\n    )\n        external\n    {\n        IERC20(_token).transfer(_to, _quantity);\n\n        // Check that transfer returns true or null\n        require(checkSuccess());\n    }\n\n    /**\n     * Transfers tokens from an address (that has set allowance on the proxy).\n     * Handle's tokens that return true or null. If other value returned, reverts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _from           The address to transfer from\n     * @param  _to             The address to transfer to\n     * @param  _quantity       The number of tokens to transfer\n     */\n    function transferFrom(\n        address _token,\n        address _from,\n        address _to,\n        uint256 _quantity\n    )\n        external\n    {\n        IERC20(_token).transferFrom(_from, _to, _quantity);\n\n        // Check that transferFrom returns true or null\n        require(checkSuccess());\n    }\n\n    /**\n     * Grants spender ability to spend on owner's behalf.\n     * Handle's tokens that return true or null. If other value returned, reverts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _spender        The address to approve for transfer\n     * @param  _quantity       The amount of tokens to approve spender for\n     */\n    function approve(\n        address _token,\n        address _spender,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_token).approve(_spender, _quantity);\n\n        // Check that approve returns true or null\n        require(checkSuccess());\n    }\n\n    /**\n     * Ensure's the owner has granted enough allowance for system to\n     * transfer tokens.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _owner          The address of the token owner\n     * @param  _spender        The address to grant/check allowance for\n     * @param  _quantity       The amount to see if allowed for\n     */\n    function ensureAllowance(\n        address _token,\n        address _owner,\n        address _spender,\n        uint256 _quantity\n    )\n        internal\n    {\n        uint256 currentAllowance = allowance(_token, _owner, _spender);\n        if (currentAllowance < _quantity) {\n            approve(\n                _token,\n                _spender,\n                CommonMath.maxUInt256()\n            );\n        }\n    }\n\n    // ============ Private Functions ============\n\n    /**\n     * Checks the return value of the previous function up to 32 bytes. Returns true if the previous\n     * function returned 0 bytes or 1.\n     */\n    function checkSuccess(\n    )\n        private\n        pure\n        returns (bool)\n    {\n        // default to failure\n        uint256 returnValue = 0;\n\n        assembly {\n            // check number of bytes returned from last function call\n            switch returndatasize\n\n            // no bytes returned: assume success\n            case 0x0 {\n                returnValue := 1\n            }\n\n            // 32 bytes returned\n            case 0x20 {\n                // copy 32 bytes into scratch space\n                returndatacopy(0x0, 0x0, 0x20)\n\n                // load those bytes into returnValue\n                returnValue := mload(0x0)\n            }\n\n            // not sure what was returned: dont mark as success\n            default { }\n        }\n\n        // check if returned value is one or nothing\n        return returnValue == 1;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        6211
      ]
    },
    "id": 6212,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6049,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:37"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "./CommonMath.sol",
        "id": 6051,
        "nodeType": "ImportDirective",
        "scope": 6212,
        "sourceUnit": 6048,
        "src": "622:46:37",
        "symbolAliases": [
          {
            "foreign": 6050,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
        "file": "./IERC20.sol",
        "id": 6053,
        "nodeType": "ImportDirective",
        "scope": 6212,
        "sourceUnit": 6256,
        "src": "669:38:37",
        "symbolAliases": [
          {
            "foreign": 6052,
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
        "id": 6211,
        "linearizedBaseContracts": [
          6211
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 6069,
              "nodeType": "Block",
              "src": "1492:56:37",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6066,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6057,
                        "src": "1534:6:37",
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
                            "id": 6063,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6055,
                            "src": "1516:6:37",
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
                          "id": 6062,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6255,
                          "src": "1509:6:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$6255_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 6064,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1509:14:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$6255",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 6065,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6220,
                      "src": "1509:24:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 6067,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1509:32:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6061,
                  "id": 6068,
                  "nodeType": "Return",
                  "src": "1502:39:37"
                }
              ]
            },
            "documentation": "Check balance owner's balance of ERC20 token\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The owner who's balance is being checked\n@return  uint256        The _owner's amount of tokens",
            "id": 6070,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6058,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6055,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6070,
                  "src": "1387:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6054,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1387:7:37",
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
                  "id": 6057,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6070,
                  "src": "1411:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6056,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1411:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1377:54:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6061,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6060,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6070,
                  "src": "1479:7:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6059,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1479:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1478:9:37"
            },
            "scope": 6211,
            "src": "1359:189:37",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 6089,
              "nodeType": "Block",
              "src": "2072:66:37",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6085,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6074,
                        "src": "2114:6:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6086,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6076,
                        "src": "2122:8:37",
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
                            "id": 6082,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6072,
                            "src": "2096:6:37",
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
                          "id": 6081,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6255,
                          "src": "2089:6:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$6255_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 6083,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2089:14:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$6255",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 6084,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6229,
                      "src": "2089:24:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view external returns (uint256)"
                      }
                    },
                    "id": 6087,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2089:42:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6080,
                  "id": 6088,
                  "nodeType": "Return",
                  "src": "2082:49:37"
                }
              ]
            },
            "documentation": "Checks spender's allowance to use token's on owner's behalf.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The token owner address\n@param  _spender        The address the allowance is being checked on\n@return  uint256        The spender's allowance on behalf of owner",
            "id": 6090,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6077,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6072,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6090,
                  "src": "1941:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6071,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1941:7:37",
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
                  "id": 6074,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6090,
                  "src": "1965:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6073,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1965:7:37",
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
                  "id": 6076,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6090,
                  "src": "1989:16:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6075,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1989:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1931:80:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6080,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6079,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6090,
                  "src": "2059:7:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6078,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2059:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2058:9:37"
            },
            "scope": 6211,
            "src": "1913:225:37",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6112,
              "nodeType": "Block",
              "src": "2592:142:37",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6103,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6094,
                        "src": "2626:3:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6104,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6096,
                        "src": "2631:9:37",
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
                            "id": 6100,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6092,
                            "src": "2609:6:37",
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
                          "id": 6099,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6255,
                          "src": "2602:6:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$6255_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 6101,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2602:14:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$6255",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 6102,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6236,
                      "src": "2602:23:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 6105,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2602:39:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6106,
                  "nodeType": "ExpressionStatement",
                  "src": "2602:39:37"
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
                          "id": 6108,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6210,
                          "src": "2712:12:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 6109,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2712:14:37",
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
                      "id": 6107,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "2704:7:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6110,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2704:23:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6111,
                  "nodeType": "ExpressionStatement",
                  "src": "2704:23:37"
                }
              ]
            },
            "documentation": "Transfers tokens from an address. Handle's tokens that return true or null.\nIf other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _to             The address to transfer to\n@param  _quantity       The amount of tokens to transfer",
            "id": 6113,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6097,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6092,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6113,
                  "src": "2502:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6091,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2502:7:37",
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
                  "id": 6094,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6113,
                  "src": "2526:11:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6093,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2526:7:37",
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
                  "id": 6096,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6113,
                  "src": "2547:17:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6095,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2547:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2492:78:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6098,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2592:0:37"
            },
            "scope": 6211,
            "src": "2475:259:37",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 6138,
              "nodeType": "Block",
              "src": "3313:157:37",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6128,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6117,
                        "src": "3351:5:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6129,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6119,
                        "src": "3358:3:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6130,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6121,
                        "src": "3363:9:37",
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
                            "id": 6125,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6115,
                            "src": "3330:6:37",
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
                          "id": 6124,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6255,
                          "src": "3323:6:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$6255_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 6126,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3323:14:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$6255",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 6127,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6245,
                      "src": "3323:27:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 6131,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3323:50:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6132,
                  "nodeType": "ExpressionStatement",
                  "src": "3323:50:37"
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
                          "id": 6134,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6210,
                          "src": "3448:12:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 6135,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3448:14:37",
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
                      "id": 6133,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "3440:7:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6136,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3440:23:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6137,
                  "nodeType": "ExpressionStatement",
                  "src": "3440:23:37"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to\n@param  _quantity       The number of tokens to transfer",
            "id": 6139,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6122,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6115,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6139,
                  "src": "3200:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6114,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3200:7:37",
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
                  "id": 6117,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6139,
                  "src": "3224:13:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6116,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3224:7:37",
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
                  "id": 6119,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6139,
                  "src": "3247:11:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6118,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3247:7:37",
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
                  "id": 6121,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6139,
                  "src": "3268:17:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6120,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3268:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3190:101:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6123,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3313:0:37"
            },
            "scope": 6211,
            "src": "3169:301:37",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 6161,
              "nodeType": "Block",
              "src": "3965:145:37",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6152,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6143,
                        "src": "3998:8:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6153,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6145,
                        "src": "4008:9:37",
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
                            "id": 6149,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6141,
                            "src": "3982:6:37",
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
                          "id": 6148,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6255,
                          "src": "3975:6:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$6255_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 6150,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3975:14:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$6255",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 6151,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6254,
                      "src": "3975:22:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,uint256) external returns (bool)"
                      }
                    },
                    "id": 6154,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3975:43:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 6155,
                  "nodeType": "ExpressionStatement",
                  "src": "3975:43:37"
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
                          "id": 6157,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6210,
                          "src": "4088:12:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 6158,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4088:14:37",
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
                      "id": 6156,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "4080:7:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6159,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4080:23:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6160,
                  "nodeType": "ExpressionStatement",
                  "src": "4080:23:37"
                }
              ]
            },
            "documentation": "Grants spender ability to spend on owner's behalf.\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _spender        The address to approve for transfer\n@param  _quantity       The amount of tokens to approve spender for",
            "id": 6162,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6146,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6141,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6162,
                  "src": "3870:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6140,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3870:7:37",
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
                  "id": 6143,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6162,
                  "src": "3894:16:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6142,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3894:7:37",
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
                  "id": 6145,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6162,
                  "src": "3920:17:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6144,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3920:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3860:83:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6147,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3965:0:37"
            },
            "scope": 6211,
            "src": "3844:266:37",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6194,
              "nodeType": "Block",
              "src": "4645:259:37",
              "statements": [
                {
                  "assignments": [
                    6174
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 6174,
                      "name": "currentAllowance",
                      "nodeType": "VariableDeclaration",
                      "scope": 6195,
                      "src": "4655:24:37",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 6173,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4655:7:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 6180,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6176,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6164,
                        "src": "4692:6:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6177,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6166,
                        "src": "4700:6:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6178,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6168,
                        "src": "4708:8:37",
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
                      "id": 6175,
                      "name": "allowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6090,
                      "src": "4682:9:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 6179,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4682:35:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4655:62:37"
                },
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 6183,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 6181,
                      "name": "currentAllowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6174,
                      "src": "4731:16:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 6182,
                      "name": "_quantity",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6170,
                      "src": "4750:9:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4731:28:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 6193,
                  "nodeType": "IfStatement",
                  "src": "4727:171:37",
                  "trueBody": {
                    "id": 6192,
                    "nodeType": "Block",
                    "src": "4761:137:37",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 6185,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 6164,
                              "src": "4800:6:37",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 6186,
                              "name": "_spender",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 6168,
                              "src": "4824:8:37",
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
                                  "id": 6187,
                                  "name": "CommonMath",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 6047,
                                  "src": "4850:10:37",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_CommonMath_$6047_$",
                                    "typeString": "type(library CommonMath)"
                                  }
                                },
                                "id": 6188,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "maxUInt256",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6046,
                                "src": "4850:21:37",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                                  "typeString": "function () pure returns (uint256)"
                                }
                              },
                              "id": 6189,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "4850:23:37",
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
                            "id": 6184,
                            "name": "approve",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6162,
                            "src": "4775:7:37",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,uint256)"
                            }
                          },
                          "id": 6190,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "4775:112:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 6191,
                        "nodeType": "ExpressionStatement",
                        "src": "4775:112:37"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "Ensure's the owner has granted enough allowance for system to\ntransfer tokens.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The address of the token owner\n@param  _spender        The address to grant/check allowance for\n@param  _quantity       The amount to see if allowed for",
            "id": 6195,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6171,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6164,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6195,
                  "src": "4526:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6163,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4526:7:37",
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
                  "id": 6166,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6195,
                  "src": "4550:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6165,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4550:7:37",
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
                  "id": 6168,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6195,
                  "src": "4574:16:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6167,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4574:7:37",
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
                  "id": 6170,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6195,
                  "src": "4600:17:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6169,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4600:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4516:107:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6172,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4645:0:37"
            },
            "scope": 6211,
            "src": "4492:412:37",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6209,
              "nodeType": "Block",
              "src": "5203:767:37",
              "statements": [
                {
                  "assignments": [
                    6201
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 6201,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 6210,
                      "src": "5243:19:37",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 6200,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5243:7:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 6203,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 6202,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5265:1:37",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5243:23:37"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 6201,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5739:11:37",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 6201,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5481:11:37",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 6204,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "5277:669:37"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 6207,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 6205,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6201,
                      "src": "5947:11:37",
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
                      "id": 6206,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5962:1:37",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "5947:16:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 6199,
                  "id": 6208,
                  "nodeType": "Return",
                  "src": "5940:23:37"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 6210,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6196,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5139:7:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6199,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6198,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6210,
                  "src": "5193:4:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6197,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5193:4:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5192:6:37"
            },
            "scope": 6211,
            "src": "5118:852:37",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 6212,
        "src": "1008:4964:37"
      }
    ],
    "src": "597:5376:37"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        6211
      ]
    },
    "id": 6212,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6049,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:37"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "./CommonMath.sol",
        "id": 6051,
        "nodeType": "ImportDirective",
        "scope": 6212,
        "sourceUnit": 6048,
        "src": "622:46:37",
        "symbolAliases": [
          {
            "foreign": 6050,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
        "file": "./IERC20.sol",
        "id": 6053,
        "nodeType": "ImportDirective",
        "scope": 6212,
        "sourceUnit": 6256,
        "src": "669:38:37",
        "symbolAliases": [
          {
            "foreign": 6052,
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
        "id": 6211,
        "linearizedBaseContracts": [
          6211
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 6069,
              "nodeType": "Block",
              "src": "1492:56:37",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6066,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6057,
                        "src": "1534:6:37",
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
                            "id": 6063,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6055,
                            "src": "1516:6:37",
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
                          "id": 6062,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6255,
                          "src": "1509:6:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$6255_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 6064,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1509:14:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$6255",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 6065,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6220,
                      "src": "1509:24:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 6067,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1509:32:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6061,
                  "id": 6068,
                  "nodeType": "Return",
                  "src": "1502:39:37"
                }
              ]
            },
            "documentation": "Check balance owner's balance of ERC20 token\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The owner who's balance is being checked\n@return  uint256        The _owner's amount of tokens",
            "id": 6070,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6058,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6055,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6070,
                  "src": "1387:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6054,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1387:7:37",
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
                  "id": 6057,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6070,
                  "src": "1411:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6056,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1411:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1377:54:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6061,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6060,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6070,
                  "src": "1479:7:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6059,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1479:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1478:9:37"
            },
            "scope": 6211,
            "src": "1359:189:37",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 6089,
              "nodeType": "Block",
              "src": "2072:66:37",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6085,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6074,
                        "src": "2114:6:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6086,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6076,
                        "src": "2122:8:37",
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
                            "id": 6082,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6072,
                            "src": "2096:6:37",
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
                          "id": 6081,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6255,
                          "src": "2089:6:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$6255_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 6083,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2089:14:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$6255",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 6084,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6229,
                      "src": "2089:24:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view external returns (uint256)"
                      }
                    },
                    "id": 6087,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2089:42:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 6080,
                  "id": 6088,
                  "nodeType": "Return",
                  "src": "2082:49:37"
                }
              ]
            },
            "documentation": "Checks spender's allowance to use token's on owner's behalf.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The token owner address\n@param  _spender        The address the allowance is being checked on\n@return  uint256        The spender's allowance on behalf of owner",
            "id": 6090,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6077,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6072,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6090,
                  "src": "1941:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6071,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1941:7:37",
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
                  "id": 6074,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6090,
                  "src": "1965:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6073,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1965:7:37",
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
                  "id": 6076,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6090,
                  "src": "1989:16:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6075,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1989:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1931:80:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6080,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6079,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6090,
                  "src": "2059:7:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6078,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2059:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2058:9:37"
            },
            "scope": 6211,
            "src": "1913:225:37",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6112,
              "nodeType": "Block",
              "src": "2592:142:37",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6103,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6094,
                        "src": "2626:3:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6104,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6096,
                        "src": "2631:9:37",
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
                            "id": 6100,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6092,
                            "src": "2609:6:37",
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
                          "id": 6099,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6255,
                          "src": "2602:6:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$6255_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 6101,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2602:14:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$6255",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 6102,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6236,
                      "src": "2602:23:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 6105,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2602:39:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6106,
                  "nodeType": "ExpressionStatement",
                  "src": "2602:39:37"
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
                          "id": 6108,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6210,
                          "src": "2712:12:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 6109,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2712:14:37",
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
                      "id": 6107,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "2704:7:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6110,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2704:23:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6111,
                  "nodeType": "ExpressionStatement",
                  "src": "2704:23:37"
                }
              ]
            },
            "documentation": "Transfers tokens from an address. Handle's tokens that return true or null.\nIf other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _to             The address to transfer to\n@param  _quantity       The amount of tokens to transfer",
            "id": 6113,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6097,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6092,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6113,
                  "src": "2502:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6091,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2502:7:37",
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
                  "id": 6094,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6113,
                  "src": "2526:11:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6093,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2526:7:37",
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
                  "id": 6096,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6113,
                  "src": "2547:17:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6095,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2547:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2492:78:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6098,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2592:0:37"
            },
            "scope": 6211,
            "src": "2475:259:37",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 6138,
              "nodeType": "Block",
              "src": "3313:157:37",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6128,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6117,
                        "src": "3351:5:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6129,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6119,
                        "src": "3358:3:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6130,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6121,
                        "src": "3363:9:37",
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
                            "id": 6125,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6115,
                            "src": "3330:6:37",
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
                          "id": 6124,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6255,
                          "src": "3323:6:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$6255_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 6126,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3323:14:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$6255",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 6127,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6245,
                      "src": "3323:27:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 6131,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3323:50:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6132,
                  "nodeType": "ExpressionStatement",
                  "src": "3323:50:37"
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
                          "id": 6134,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6210,
                          "src": "3448:12:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 6135,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3448:14:37",
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
                      "id": 6133,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "3440:7:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6136,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3440:23:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6137,
                  "nodeType": "ExpressionStatement",
                  "src": "3440:23:37"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to\n@param  _quantity       The number of tokens to transfer",
            "id": 6139,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6122,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6115,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6139,
                  "src": "3200:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6114,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3200:7:37",
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
                  "id": 6117,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6139,
                  "src": "3224:13:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6116,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3224:7:37",
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
                  "id": 6119,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6139,
                  "src": "3247:11:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6118,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3247:7:37",
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
                  "id": 6121,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6139,
                  "src": "3268:17:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6120,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3268:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3190:101:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6123,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3313:0:37"
            },
            "scope": 6211,
            "src": "3169:301:37",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 6161,
              "nodeType": "Block",
              "src": "3965:145:37",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6152,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6143,
                        "src": "3998:8:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6153,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6145,
                        "src": "4008:9:37",
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
                            "id": 6149,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6141,
                            "src": "3982:6:37",
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
                          "id": 6148,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6255,
                          "src": "3975:6:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$6255_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 6150,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3975:14:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$6255",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 6151,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6254,
                      "src": "3975:22:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,uint256) external returns (bool)"
                      }
                    },
                    "id": 6154,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3975:43:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 6155,
                  "nodeType": "ExpressionStatement",
                  "src": "3975:43:37"
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
                          "id": 6157,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6210,
                          "src": "4088:12:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 6158,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4088:14:37",
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
                      "id": 6156,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "4080:7:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6159,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4080:23:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6160,
                  "nodeType": "ExpressionStatement",
                  "src": "4080:23:37"
                }
              ]
            },
            "documentation": "Grants spender ability to spend on owner's behalf.\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _spender        The address to approve for transfer\n@param  _quantity       The amount of tokens to approve spender for",
            "id": 6162,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6146,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6141,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6162,
                  "src": "3870:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6140,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3870:7:37",
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
                  "id": 6143,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6162,
                  "src": "3894:16:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6142,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3894:7:37",
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
                  "id": 6145,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6162,
                  "src": "3920:17:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6144,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3920:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3860:83:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6147,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3965:0:37"
            },
            "scope": 6211,
            "src": "3844:266:37",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6194,
              "nodeType": "Block",
              "src": "4645:259:37",
              "statements": [
                {
                  "assignments": [
                    6174
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 6174,
                      "name": "currentAllowance",
                      "nodeType": "VariableDeclaration",
                      "scope": 6195,
                      "src": "4655:24:37",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 6173,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4655:7:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 6180,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 6176,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6164,
                        "src": "4692:6:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6177,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6166,
                        "src": "4700:6:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 6178,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6168,
                        "src": "4708:8:37",
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
                      "id": 6175,
                      "name": "allowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6090,
                      "src": "4682:9:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 6179,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4682:35:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4655:62:37"
                },
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 6183,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 6181,
                      "name": "currentAllowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6174,
                      "src": "4731:16:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 6182,
                      "name": "_quantity",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6170,
                      "src": "4750:9:37",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4731:28:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 6193,
                  "nodeType": "IfStatement",
                  "src": "4727:171:37",
                  "trueBody": {
                    "id": 6192,
                    "nodeType": "Block",
                    "src": "4761:137:37",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 6185,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 6164,
                              "src": "4800:6:37",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 6186,
                              "name": "_spender",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 6168,
                              "src": "4824:8:37",
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
                                  "id": 6187,
                                  "name": "CommonMath",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 6047,
                                  "src": "4850:10:37",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_CommonMath_$6047_$",
                                    "typeString": "type(library CommonMath)"
                                  }
                                },
                                "id": 6188,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "maxUInt256",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6046,
                                "src": "4850:21:37",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                                  "typeString": "function () pure returns (uint256)"
                                }
                              },
                              "id": 6189,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "4850:23:37",
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
                            "id": 6184,
                            "name": "approve",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6162,
                            "src": "4775:7:37",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,uint256)"
                            }
                          },
                          "id": 6190,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "4775:112:37",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 6191,
                        "nodeType": "ExpressionStatement",
                        "src": "4775:112:37"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "Ensure's the owner has granted enough allowance for system to\ntransfer tokens.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The address of the token owner\n@param  _spender        The address to grant/check allowance for\n@param  _quantity       The amount to see if allowed for",
            "id": 6195,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6171,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6164,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 6195,
                  "src": "4526:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6163,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4526:7:37",
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
                  "id": 6166,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 6195,
                  "src": "4550:14:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6165,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4550:7:37",
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
                  "id": 6168,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 6195,
                  "src": "4574:16:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6167,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4574:7:37",
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
                  "id": 6170,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 6195,
                  "src": "4600:17:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6169,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4600:7:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4516:107:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6172,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4645:0:37"
            },
            "scope": 6211,
            "src": "4492:412:37",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 6209,
              "nodeType": "Block",
              "src": "5203:767:37",
              "statements": [
                {
                  "assignments": [
                    6201
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 6201,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 6210,
                      "src": "5243:19:37",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 6200,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5243:7:37",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 6203,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 6202,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5265:1:37",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5243:23:37"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 6201,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5739:11:37",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 6201,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5481:11:37",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 6204,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "5277:669:37"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 6207,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 6205,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6201,
                      "src": "5947:11:37",
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
                      "id": 6206,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5962:1:37",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "5947:16:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 6199,
                  "id": 6208,
                  "nodeType": "Return",
                  "src": "5940:23:37"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 6210,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6196,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5139:7:37"
            },
            "payable": false,
            "returnParameters": {
              "id": 6199,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 6198,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6210,
                  "src": "5193:4:37",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6197,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5193:4:37",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5192:6:37"
            },
            "scope": 6211,
            "src": "5118:852:37",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 6212,
        "src": "1008:4964:37"
      }
    ],
    "src": "597:5376:37"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-25T17:34:40.947Z"
}
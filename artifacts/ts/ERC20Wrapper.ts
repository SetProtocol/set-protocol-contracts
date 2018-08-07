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
  "bytecode": "0x610309610030600b82828239805160001a6073146000811461002057610022565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600436106100545763ffffffff60e060020a60003504166315dacbea8114610059578063beabacc81461008b578063f7888aec146100b5575b600080fd5b81801561006557600080fd5b50610089600160a060020a03600435811690602435811690604435166064356100e1565b005b81801561009757600080fd5b50610089600160a060020a0360043581169060243516604435610185565b6100cf600160a060020a0360043581169060243516610218565b60408051918252519081900360200190f35b604080517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a0385811660048301528481166024830152604482018490529151918616916323b872dd9160648082019260009290919082900301818387803b15801561015457600080fd5b505af1158015610168573d6000803e3d6000fd5b505050506101746102a8565b151561017f57600080fd5b50505050565b82600160a060020a031663a9059cbb83836040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050600060405180830381600087803b1580156101e857600080fd5b505af11580156101fc573d6000803e3d6000fd5b505050506102086102a8565b151561021357600080fd5b505050565b600082600160a060020a03166370a08231836040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561027557600080fd5b505af1158015610289573d6000803e3d6000fd5b505050506040513d602081101561029f57600080fd5b50519392505050565b6000803d80156102bf57602081146102c8576102d4565b600191506102d4565b60206000803e60005191505b506001149190505600a165627a7a7230582022e76a91f5f1264f8bcd8624ef2c0ae85c2e5deed7158ea299ddef1c2b16c9420029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600436106100545763ffffffff60e060020a60003504166315dacbea8114610059578063beabacc81461008b578063f7888aec146100b5575b600080fd5b81801561006557600080fd5b50610089600160a060020a03600435811690602435811690604435166064356100e1565b005b81801561009757600080fd5b50610089600160a060020a0360043581169060243516604435610185565b6100cf600160a060020a0360043581169060243516610218565b60408051918252519081900360200190f35b604080517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a0385811660048301528481166024830152604482018490529151918616916323b872dd9160648082019260009290919082900301818387803b15801561015457600080fd5b505af1158015610168573d6000803e3d6000fd5b505050506101746102a8565b151561017f57600080fd5b50505050565b82600160a060020a031663a9059cbb83836040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050600060405180830381600087803b1580156101e857600080fd5b505af11580156101fc573d6000803e3d6000fd5b505050506102086102a8565b151561021357600080fd5b505050565b600082600160a060020a03166370a08231836040518263ffffffff1660e060020a0281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b15801561027557600080fd5b505af1158015610289573d6000803e3d6000fd5b505050506040513d602081101561029f57600080fd5b50519392505050565b6000803d80156102bf57602081146102c8576102d4565b600191506102d4565b60206000803e60005191505b506001149190505600a165627a7a7230582022e76a91f5f1264f8bcd8624ef2c0ae85c2e5deed7158ea299ddef1c2b16c9420029",
  "sourceMap": "1008:4961:31:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "1008:4961:31:-;;;;;;;;;;;;-1:-1:-1;;;1008:4961:31;;;;;;;;;;;;;;;;;;;;;;;3169:301;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3169:301:31;-1:-1:-1;;;;;3169:301:31;;;;;;;;;;;;;;;;;;;2475:259;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2475:259:31;-1:-1:-1;;;;;2475:259:31;;;;;;;;;;;;1359:189;;-1:-1:-1;;;;;1359:189:31;;;;;;;;;;;;;;;;;;;;;;;;;;3169:301;3323:50;;;;;;-1:-1:-1;;;;;3323:50:31;;;;;;;;;;;;;;;;;;;;;;:27;;;;;;:50;;;;;-1:-1:-1;;3323:50:31;;;;;;;;-1:-1:-1;3323:27:31;:50;;;5:2:-1;;;;30:1;27;20:12;5:2;3323:50:31;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3323:50:31;;;;3448:14;:12;:14::i;:::-;3440:23;;;;;;;;3169:301;;;;:::o;2475:259::-;2609:6;-1:-1:-1;;;;;2602:23:31;;2626:3;2631:9;2602:39;;;;;-1:-1:-1;;;2602:39:31;;;;;;;-1:-1:-1;;;;;2602:39:31;-1:-1:-1;;;;;2602:39:31;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2602:39:31;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2602:39:31;;;;2712:14;:12;:14::i;:::-;2704:23;;;;;;;;2475:259;;;:::o;1359:189::-;1479:7;1516:6;-1:-1:-1;;;;;1509:24:31;;1534:6;1509:32;;;;;-1:-1:-1;;;1509:32:31;;;;;;;-1:-1:-1;;;;;1509:32:31;-1:-1:-1;;;;;1509:32:31;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1509:32:31;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1509:32:31;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1509:32:31;;1359:189;-1:-1:-1;;;1359:189:31:o;5115:852::-;5190:4;;5374:14;5451:57;;;;5560:4;5555:220;;;;5367:497;;5451:57;5493:1;5478:16;;5451:57;;5555:220;5660:4;5655:3;5650;5635:30;5757:3;5751:10;5736:25;;5367:497;-1:-1:-1;5959:1:31;5944:16;;5115:852;-1:-1:-1;5115:852:31:o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { CommonMath } from \"./CommonMath.sol\";\nimport { IERC20 } from \"./IERC20.sol\";\n\n\n/**\n * @title ERC20Wrapper\n * @author Set Protocol\n *\n * This library contains functions for interacting wtih ERC20 tokens, even those not fully compliant.\n * For all functions we will only accept tokens that return a null or true value, any other values will\n * cause the operation to revert.\n */\nlibrary ERC20Wrapper {\n\n    // ============ Internal Functions ============\n\n    /**\n     * Check balance owner's balance of ERC20 token\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _owner          The owner who's balance is being checked\n     * @return  uint256        The _owner's amount of tokens\n     */\n    function balanceOf(\n        address _token,\n        address _owner\n    )\n        external\n        view\n        returns (uint256)\n    {\n        return IERC20(_token).balanceOf(_owner);\n    }\n\n    /**\n     * Checks spender's allowance to use token's on owner's behalf.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _owner          The token owner address\n     * @param  _spender        The address the allowance is being checked on\n     * @return  uint256        The spender's allowance on behalf of owner\n     */\n    function allowance(\n        address _token,\n        address _owner,\n        address _spender\n    )\n        internal\n        view\n        returns (uint256)\n    {\n        return IERC20(_token).allowance(_owner, _spender);\n    }\n\n    /**\n     * Transfers tokens from an address. Handle's tokens that return true or null.\n     * If other value returned, reverts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _to             The address to transfer to\n     * @param  _quantity       The amount of tokens to transfer\n     */\n    function transfer(\n        address _token,\n        address _to,\n        uint256 _quantity\n    )\n        external\n    {\n        IERC20(_token).transfer(_to, _quantity);\n\n        // Check that transfer returns true or null\n        require(checkSuccess());\n    }\n\n    /**\n     * Transfers tokens from an address (that has set allowance on the proxy).\n     * Handle's tokens that return true or null. If other value returned, reverts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _from           The address to transfer from\n     * @param  _to             The address to transfer to\n     * @param  _quantity       The number of tokens to transfer\n     */\n    function transferFrom(\n        address _token,\n        address _from,\n        address _to,\n        uint256 _quantity\n    )\n        external\n    {\n        IERC20(_token).transferFrom(_from, _to, _quantity);\n\n        // Check that transferFrom returns true or null\n        require(checkSuccess());\n    }\n\n    /**\n     * Grants spender ability to spend on owner's behalf.\n     * Handle's tokens that return true or null. If other value returned, reverts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _spender        The address to approve for transfer\n     * @param  _quantity       The amount of tokens to approve spender for\n     */\n    function approve(\n        address _token,\n        address _spender,\n        uint256 _quantity\n    )\n        internal\n    {\n        IERC20(_token).approve(_spender, _quantity);\n\n        // Check that approve returns true or null\n        require(checkSuccess());\n    }\n\n    /**\n     * Ensure's the owner has granted enough allowance for system to\n     * transfer tokens.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _owner          The address of the token owner\n     * @param  _spender        The address to grant/check allowance for\n     * @param  _quantity       The amount to see if allowed for\n     */\n    function ensureAllowance(\n        address _token,\n        address _owner,\n        address _spender,\n        uint256 _quantity\n    )\n        internal\n    {\n        uint currentAllowance = allowance(_token, _owner, _spender);\n        if (currentAllowance < _quantity) {\n            approve(\n                _token,\n                _spender,\n                CommonMath.maxUInt256()\n            );\n        }\n    }\n\n    // ============ Private Functions ============\n\n    /**\n     * Checks the return value of the previous function up to 32 bytes. Returns true if the previous\n     * function returned 0 bytes or 1.\n     */\n    function checkSuccess(\n    )\n        private\n        pure\n        returns (bool)\n    {\n        // default to failure\n        uint256 returnValue = 0;\n\n        assembly {\n            // check number of bytes returned from last function call\n            switch returndatasize\n\n            // no bytes returned: assume success\n            case 0x0 {\n                returnValue := 1\n            }\n\n            // 32 bytes returned\n            case 0x20 {\n                // copy 32 bytes into scratch space\n                returndatacopy(0x0, 0x0, 0x20)\n\n                // load those bytes into returnValue\n                returnValue := mload(0x0)\n            }\n\n            // not sure what was returned: dont mark as success\n            default { }\n        }\n\n        // check if returned value is one or nothing\n        return returnValue == 1;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        3409
      ]
    },
    "id": 3410,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3247,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:31"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "./CommonMath.sol",
        "id": 3249,
        "nodeType": "ImportDirective",
        "scope": 3410,
        "sourceUnit": 3246,
        "src": "622:46:31",
        "symbolAliases": [
          {
            "foreign": 3248,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
        "file": "./IERC20.sol",
        "id": 3251,
        "nodeType": "ImportDirective",
        "scope": 3410,
        "sourceUnit": 3454,
        "src": "669:38:31",
        "symbolAliases": [
          {
            "foreign": 3250,
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
        "id": 3409,
        "linearizedBaseContracts": [
          3409
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 3267,
              "nodeType": "Block",
              "src": "1492:56:31",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3264,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3255,
                        "src": "1534:6:31",
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
                            "id": 3261,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3253,
                            "src": "1516:6:31",
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
                          "id": 3260,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3453,
                          "src": "1509:6:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3453_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3262,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1509:14:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3453",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3263,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3418,
                      "src": "1509:24:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 3265,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1509:32:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3259,
                  "id": 3266,
                  "nodeType": "Return",
                  "src": "1502:39:31"
                }
              ]
            },
            "documentation": "Check balance owner's balance of ERC20 token\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The owner who's balance is being checked\n@return  uint256        The _owner's amount of tokens",
            "id": 3268,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3256,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3253,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3268,
                  "src": "1387:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3252,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1387:7:31",
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
                  "id": 3255,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3268,
                  "src": "1411:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3254,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1411:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1377:54:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3259,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3258,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3268,
                  "src": "1479:7:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3257,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1479:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1478:9:31"
            },
            "scope": 3409,
            "src": "1359:189:31",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 3287,
              "nodeType": "Block",
              "src": "2072:66:31",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3283,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3272,
                        "src": "2114:6:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3284,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3274,
                        "src": "2122:8:31",
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
                            "id": 3280,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3270,
                            "src": "2096:6:31",
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
                          "id": 3279,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3453,
                          "src": "2089:6:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3453_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3281,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2089:14:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3453",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3282,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3427,
                      "src": "2089:24:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view external returns (uint256)"
                      }
                    },
                    "id": 3285,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2089:42:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3278,
                  "id": 3286,
                  "nodeType": "Return",
                  "src": "2082:49:31"
                }
              ]
            },
            "documentation": "Checks spender's allowance to use token's on owner's behalf.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The token owner address\n@param  _spender        The address the allowance is being checked on\n@return  uint256        The spender's allowance on behalf of owner",
            "id": 3288,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3275,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3270,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3288,
                  "src": "1941:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3269,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1941:7:31",
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
                  "id": 3272,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3288,
                  "src": "1965:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3271,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1965:7:31",
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
                  "id": 3274,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3288,
                  "src": "1989:16:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3273,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1989:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1931:80:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3278,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3277,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3288,
                  "src": "2059:7:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3276,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2059:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2058:9:31"
            },
            "scope": 3409,
            "src": "1913:225:31",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3310,
              "nodeType": "Block",
              "src": "2592:142:31",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3301,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3292,
                        "src": "2626:3:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3302,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3294,
                        "src": "2631:9:31",
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
                            "id": 3298,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3290,
                            "src": "2609:6:31",
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
                          "id": 3297,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3453,
                          "src": "2602:6:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3453_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3299,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2602:14:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3453",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3300,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3434,
                      "src": "2602:23:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 3303,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2602:39:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3304,
                  "nodeType": "ExpressionStatement",
                  "src": "2602:39:31"
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
                          "id": 3306,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3408,
                          "src": "2712:12:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3307,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2712:14:31",
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
                      "id": 3305,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3722,
                        3723
                      ],
                      "referencedDeclaration": 3722,
                      "src": "2704:7:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3308,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2704:23:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3309,
                  "nodeType": "ExpressionStatement",
                  "src": "2704:23:31"
                }
              ]
            },
            "documentation": "Transfers tokens from an address. Handle's tokens that return true or null.\nIf other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _to             The address to transfer to\n@param  _quantity       The amount of tokens to transfer",
            "id": 3311,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3295,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3290,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3311,
                  "src": "2502:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3289,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2502:7:31",
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
                  "id": 3292,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3311,
                  "src": "2526:11:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3291,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2526:7:31",
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
                  "id": 3294,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3311,
                  "src": "2547:17:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3293,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2547:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2492:78:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3296,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2592:0:31"
            },
            "scope": 3409,
            "src": "2475:259:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 3336,
              "nodeType": "Block",
              "src": "3313:157:31",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3326,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3315,
                        "src": "3351:5:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3327,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3317,
                        "src": "3358:3:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3328,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3319,
                        "src": "3363:9:31",
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
                            "id": 3323,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3313,
                            "src": "3330:6:31",
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
                          "id": 3322,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3453,
                          "src": "3323:6:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3453_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3324,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3323:14:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3453",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3325,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3443,
                      "src": "3323:27:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 3329,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3323:50:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3330,
                  "nodeType": "ExpressionStatement",
                  "src": "3323:50:31"
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
                          "id": 3332,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3408,
                          "src": "3448:12:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3333,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3448:14:31",
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
                      "id": 3331,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3722,
                        3723
                      ],
                      "referencedDeclaration": 3722,
                      "src": "3440:7:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3334,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3440:23:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3335,
                  "nodeType": "ExpressionStatement",
                  "src": "3440:23:31"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to\n@param  _quantity       The number of tokens to transfer",
            "id": 3337,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3320,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3313,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3337,
                  "src": "3200:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3312,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3200:7:31",
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
                  "id": 3315,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3337,
                  "src": "3224:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3314,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3224:7:31",
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
                  "id": 3317,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3337,
                  "src": "3247:11:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3316,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3247:7:31",
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
                  "id": 3319,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3337,
                  "src": "3268:17:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3318,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3268:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3190:101:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3321,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3313:0:31"
            },
            "scope": 3409,
            "src": "3169:301:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 3359,
              "nodeType": "Block",
              "src": "3965:145:31",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3350,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3341,
                        "src": "3998:8:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3351,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3343,
                        "src": "4008:9:31",
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
                            "id": 3347,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3339,
                            "src": "3982:6:31",
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
                          "id": 3346,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3453,
                          "src": "3975:6:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3453_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3348,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3975:14:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3453",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3349,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3452,
                      "src": "3975:22:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,uint256) external returns (bool)"
                      }
                    },
                    "id": 3352,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3975:43:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 3353,
                  "nodeType": "ExpressionStatement",
                  "src": "3975:43:31"
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
                          "id": 3355,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3408,
                          "src": "4088:12:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3356,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4088:14:31",
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
                      "id": 3354,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3722,
                        3723
                      ],
                      "referencedDeclaration": 3722,
                      "src": "4080:7:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3357,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4080:23:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3358,
                  "nodeType": "ExpressionStatement",
                  "src": "4080:23:31"
                }
              ]
            },
            "documentation": "Grants spender ability to spend on owner's behalf.\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _spender        The address to approve for transfer\n@param  _quantity       The amount of tokens to approve spender for",
            "id": 3360,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3344,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3339,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3360,
                  "src": "3870:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3338,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3870:7:31",
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
                  "id": 3341,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3360,
                  "src": "3894:16:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3340,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3894:7:31",
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
                  "id": 3343,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3360,
                  "src": "3920:17:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3342,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3920:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3860:83:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3345,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3965:0:31"
            },
            "scope": 3409,
            "src": "3844:266:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3392,
              "nodeType": "Block",
              "src": "4645:256:31",
              "statements": [
                {
                  "assignments": [
                    3372
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3372,
                      "name": "currentAllowance",
                      "nodeType": "VariableDeclaration",
                      "scope": 3393,
                      "src": "4655:21:31",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3371,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "4655:4:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3378,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3374,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3362,
                        "src": "4689:6:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3375,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3364,
                        "src": "4697:6:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3376,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3366,
                        "src": "4705:8:31",
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
                      "id": 3373,
                      "name": "allowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3288,
                      "src": "4679:9:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 3377,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4679:35:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4655:59:31"
                },
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3381,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3379,
                      "name": "currentAllowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3372,
                      "src": "4728:16:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3380,
                      "name": "_quantity",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3368,
                      "src": "4747:9:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4728:28:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 3391,
                  "nodeType": "IfStatement",
                  "src": "4724:171:31",
                  "trueBody": {
                    "id": 3390,
                    "nodeType": "Block",
                    "src": "4758:137:31",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 3383,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3362,
                              "src": "4797:6:31",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 3384,
                              "name": "_spender",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3366,
                              "src": "4821:8:31",
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
                                  "id": 3385,
                                  "name": "CommonMath",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3245,
                                  "src": "4847:10:31",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_CommonMath_$3245_$",
                                    "typeString": "type(library CommonMath)"
                                  }
                                },
                                "id": 3386,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "maxUInt256",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 3244,
                                "src": "4847:21:31",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                                  "typeString": "function () pure returns (uint256)"
                                }
                              },
                              "id": 3387,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "4847:23:31",
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
                            "id": 3382,
                            "name": "approve",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3360,
                            "src": "4772:7:31",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,uint256)"
                            }
                          },
                          "id": 3388,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "4772:112:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 3389,
                        "nodeType": "ExpressionStatement",
                        "src": "4772:112:31"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "Ensure's the owner has granted enough allowance for system to\ntransfer tokens.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The address of the token owner\n@param  _spender        The address to grant/check allowance for\n@param  _quantity       The amount to see if allowed for",
            "id": 3393,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3369,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3362,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "4526:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3361,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4526:7:31",
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
                  "id": 3364,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "4550:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3363,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4550:7:31",
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
                  "id": 3366,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "4574:16:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3365,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4574:7:31",
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
                  "id": 3368,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "4600:17:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3367,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4600:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4516:107:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3370,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4645:0:31"
            },
            "scope": 3409,
            "src": "4492:409:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3407,
              "nodeType": "Block",
              "src": "5200:767:31",
              "statements": [
                {
                  "assignments": [
                    3399
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3399,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 3408,
                      "src": "5240:19:31",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3398,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5240:7:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3401,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 3400,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5262:1:31",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5240:23:31"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 3399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5736:11:31",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 3399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5478:11:31",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3402,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "5274:669:31"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3405,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3403,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3399,
                      "src": "5944:11:31",
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
                      "id": 3404,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5959:1:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "5944:16:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3397,
                  "id": 3406,
                  "nodeType": "Return",
                  "src": "5937:23:31"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 3408,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3394,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5136:7:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3397,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3396,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3408,
                  "src": "5190:4:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3395,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5190:4:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5189:6:31"
            },
            "scope": 3409,
            "src": "5115:852:31",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 3410,
        "src": "1008:4961:31"
      }
    ],
    "src": "597:5373:31"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
    "exportedSymbols": {
      "ERC20Wrapper": [
        3409
      ]
    },
    "id": 3410,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 3247,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:31"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/CommonMath.sol",
        "file": "./CommonMath.sol",
        "id": 3249,
        "nodeType": "ImportDirective",
        "scope": 3410,
        "sourceUnit": 3246,
        "src": "622:46:31",
        "symbolAliases": [
          {
            "foreign": 3248,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/IERC20.sol",
        "file": "./IERC20.sol",
        "id": 3251,
        "nodeType": "ImportDirective",
        "scope": 3410,
        "sourceUnit": 3454,
        "src": "669:38:31",
        "symbolAliases": [
          {
            "foreign": 3250,
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
        "id": 3409,
        "linearizedBaseContracts": [
          3409
        ],
        "name": "ERC20Wrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 3267,
              "nodeType": "Block",
              "src": "1492:56:31",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3264,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3255,
                        "src": "1534:6:31",
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
                            "id": 3261,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3253,
                            "src": "1516:6:31",
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
                          "id": 3260,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3453,
                          "src": "1509:6:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3453_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3262,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1509:14:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3453",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3263,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3418,
                      "src": "1509:24:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) view external returns (uint256)"
                      }
                    },
                    "id": 3265,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1509:32:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3259,
                  "id": 3266,
                  "nodeType": "Return",
                  "src": "1502:39:31"
                }
              ]
            },
            "documentation": "Check balance owner's balance of ERC20 token\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The owner who's balance is being checked\n@return  uint256        The _owner's amount of tokens",
            "id": 3268,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "balanceOf",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3256,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3253,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3268,
                  "src": "1387:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3252,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1387:7:31",
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
                  "id": 3255,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3268,
                  "src": "1411:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3254,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1411:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1377:54:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3259,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3258,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3268,
                  "src": "1479:7:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3257,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1479:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1478:9:31"
            },
            "scope": 3409,
            "src": "1359:189:31",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 3287,
              "nodeType": "Block",
              "src": "2072:66:31",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3283,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3272,
                        "src": "2114:6:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3284,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3274,
                        "src": "2122:8:31",
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
                            "id": 3280,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3270,
                            "src": "2096:6:31",
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
                          "id": 3279,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3453,
                          "src": "2089:6:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3453_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3281,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2089:14:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3453",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3282,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3427,
                      "src": "2089:24:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view external returns (uint256)"
                      }
                    },
                    "id": 3285,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2089:42:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 3278,
                  "id": 3286,
                  "nodeType": "Return",
                  "src": "2082:49:31"
                }
              ]
            },
            "documentation": "Checks spender's allowance to use token's on owner's behalf.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The token owner address\n@param  _spender        The address the allowance is being checked on\n@return  uint256        The spender's allowance on behalf of owner",
            "id": 3288,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3275,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3270,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3288,
                  "src": "1941:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3269,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1941:7:31",
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
                  "id": 3272,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3288,
                  "src": "1965:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3271,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1965:7:31",
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
                  "id": 3274,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3288,
                  "src": "1989:16:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3273,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1989:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1931:80:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3278,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3277,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3288,
                  "src": "2059:7:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3276,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2059:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2058:9:31"
            },
            "scope": 3409,
            "src": "1913:225:31",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3310,
              "nodeType": "Block",
              "src": "2592:142:31",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3301,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3292,
                        "src": "2626:3:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3302,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3294,
                        "src": "2631:9:31",
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
                            "id": 3298,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3290,
                            "src": "2609:6:31",
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
                          "id": 3297,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3453,
                          "src": "2602:6:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3453_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3299,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2602:14:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3453",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3300,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3434,
                      "src": "2602:23:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256) external"
                      }
                    },
                    "id": 3303,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2602:39:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3304,
                  "nodeType": "ExpressionStatement",
                  "src": "2602:39:31"
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
                          "id": 3306,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3408,
                          "src": "2712:12:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3307,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2712:14:31",
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
                      "id": 3305,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3722,
                        3723
                      ],
                      "referencedDeclaration": 3722,
                      "src": "2704:7:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3308,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2704:23:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3309,
                  "nodeType": "ExpressionStatement",
                  "src": "2704:23:31"
                }
              ]
            },
            "documentation": "Transfers tokens from an address. Handle's tokens that return true or null.\nIf other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _to             The address to transfer to\n@param  _quantity       The amount of tokens to transfer",
            "id": 3311,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3295,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3290,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3311,
                  "src": "2502:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3289,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2502:7:31",
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
                  "id": 3292,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3311,
                  "src": "2526:11:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3291,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2526:7:31",
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
                  "id": 3294,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3311,
                  "src": "2547:17:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3293,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2547:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2492:78:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3296,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2592:0:31"
            },
            "scope": 3409,
            "src": "2475:259:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 3336,
              "nodeType": "Block",
              "src": "3313:157:31",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3326,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3315,
                        "src": "3351:5:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3327,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3317,
                        "src": "3358:3:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3328,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3319,
                        "src": "3363:9:31",
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
                            "id": 3323,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3313,
                            "src": "3330:6:31",
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
                          "id": 3322,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3453,
                          "src": "3323:6:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3453_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3324,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3323:14:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3453",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3325,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3443,
                      "src": "3323:27:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 3329,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3323:50:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3330,
                  "nodeType": "ExpressionStatement",
                  "src": "3323:50:31"
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
                          "id": 3332,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3408,
                          "src": "3448:12:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3333,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3448:14:31",
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
                      "id": 3331,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3722,
                        3723
                      ],
                      "referencedDeclaration": 3722,
                      "src": "3440:7:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3334,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3440:23:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3335,
                  "nodeType": "ExpressionStatement",
                  "src": "3440:23:31"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to\n@param  _quantity       The number of tokens to transfer",
            "id": 3337,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3320,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3313,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3337,
                  "src": "3200:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3312,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3200:7:31",
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
                  "id": 3315,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 3337,
                  "src": "3224:13:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3314,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3224:7:31",
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
                  "id": 3317,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 3337,
                  "src": "3247:11:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3316,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3247:7:31",
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
                  "id": 3319,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3337,
                  "src": "3268:17:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3318,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3268:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3190:101:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3321,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3313:0:31"
            },
            "scope": 3409,
            "src": "3169:301:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 3359,
              "nodeType": "Block",
              "src": "3965:145:31",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3350,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3341,
                        "src": "3998:8:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3351,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3343,
                        "src": "4008:9:31",
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
                            "id": 3347,
                            "name": "_token",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3339,
                            "src": "3982:6:31",
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
                          "id": 3346,
                          "name": "IERC20",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3453,
                          "src": "3975:6:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IERC20_$3453_$",
                            "typeString": "type(contract IERC20)"
                          }
                        },
                        "id": 3348,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3975:14:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IERC20_$3453",
                          "typeString": "contract IERC20"
                        }
                      },
                      "id": 3349,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3452,
                      "src": "3975:22:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,uint256) external returns (bool)"
                      }
                    },
                    "id": 3352,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3975:43:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 3353,
                  "nodeType": "ExpressionStatement",
                  "src": "3975:43:31"
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
                          "id": 3355,
                          "name": "checkSuccess",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3408,
                          "src": "4088:12:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$__$returns$_t_bool_$",
                            "typeString": "function () pure returns (bool)"
                          }
                        },
                        "id": 3356,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4088:14:31",
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
                      "id": 3354,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3722,
                        3723
                      ],
                      "referencedDeclaration": 3722,
                      "src": "4080:7:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3357,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4080:23:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3358,
                  "nodeType": "ExpressionStatement",
                  "src": "4080:23:31"
                }
              ]
            },
            "documentation": "Grants spender ability to spend on owner's behalf.\nHandle's tokens that return true or null. If other value returned, reverts.\n     * @param  _token          The address of the ERC20 token\n@param  _spender        The address to approve for transfer\n@param  _quantity       The amount of tokens to approve spender for",
            "id": 3360,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3344,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3339,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3360,
                  "src": "3870:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3338,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3870:7:31",
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
                  "id": 3341,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3360,
                  "src": "3894:16:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3340,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3894:7:31",
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
                  "id": 3343,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3360,
                  "src": "3920:17:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3342,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3920:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3860:83:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3345,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3965:0:31"
            },
            "scope": 3409,
            "src": "3844:266:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3392,
              "nodeType": "Block",
              "src": "4645:256:31",
              "statements": [
                {
                  "assignments": [
                    3372
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3372,
                      "name": "currentAllowance",
                      "nodeType": "VariableDeclaration",
                      "scope": 3393,
                      "src": "4655:21:31",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3371,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "4655:4:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3378,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3374,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3362,
                        "src": "4689:6:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3375,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3364,
                        "src": "4697:6:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3376,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3366,
                        "src": "4705:8:31",
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
                      "id": 3373,
                      "name": "allowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3288,
                      "src": "4679:9:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 3377,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4679:35:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4655:59:31"
                },
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3381,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3379,
                      "name": "currentAllowance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3372,
                      "src": "4728:16:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 3380,
                      "name": "_quantity",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3368,
                      "src": "4747:9:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4728:28:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 3391,
                  "nodeType": "IfStatement",
                  "src": "4724:171:31",
                  "trueBody": {
                    "id": 3390,
                    "nodeType": "Block",
                    "src": "4758:137:31",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 3383,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3362,
                              "src": "4797:6:31",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 3384,
                              "name": "_spender",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3366,
                              "src": "4821:8:31",
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
                                  "id": 3385,
                                  "name": "CommonMath",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3245,
                                  "src": "4847:10:31",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_CommonMath_$3245_$",
                                    "typeString": "type(library CommonMath)"
                                  }
                                },
                                "id": 3386,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "maxUInt256",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 3244,
                                "src": "4847:21:31",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$__$returns$_t_uint256_$",
                                  "typeString": "function () pure returns (uint256)"
                                }
                              },
                              "id": 3387,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "4847:23:31",
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
                            "id": 3382,
                            "name": "approve",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3360,
                            "src": "4772:7:31",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,uint256)"
                            }
                          },
                          "id": 3388,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "4772:112:31",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 3389,
                        "nodeType": "ExpressionStatement",
                        "src": "4772:112:31"
                      }
                    ]
                  }
                }
              ]
            },
            "documentation": "Ensure's the owner has granted enough allowance for system to\ntransfer tokens.\n     * @param  _token          The address of the ERC20 token\n@param  _owner          The address of the token owner\n@param  _spender        The address to grant/check allowance for\n@param  _quantity       The amount to see if allowed for",
            "id": 3393,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3369,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3362,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "4526:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3361,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4526:7:31",
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
                  "id": 3364,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "4550:14:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3363,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4550:7:31",
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
                  "id": 3366,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "4574:16:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 3365,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4574:7:31",
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
                  "id": 3368,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3393,
                  "src": "4600:17:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 3367,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4600:7:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4516:107:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3370,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4645:0:31"
            },
            "scope": 3409,
            "src": "4492:409:31",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 3407,
              "nodeType": "Block",
              "src": "5200:767:31",
              "statements": [
                {
                  "assignments": [
                    3399
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3399,
                      "name": "returnValue",
                      "nodeType": "VariableDeclaration",
                      "scope": 3408,
                      "src": "5240:19:31",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3398,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5240:7:31",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3401,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 3400,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5262:1:31",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5240:23:31"
                },
                {
                  "externalReferences": [
                    {
                      "returnValue": {
                        "declaration": 3399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5736:11:31",
                        "valueSize": 1
                      }
                    },
                    {
                      "returnValue": {
                        "declaration": 3399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "5478:11:31",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 3402,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    switch returndatasize()\n    case 0x0 {\n        returnValue := 1\n    }\n    case 0x20 {\n        returndatacopy(0x0, 0x0, 0x20)\n        returnValue := mload(0x0)\n    }\n    default {\n    }\n}",
                  "src": "5274:669:31"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3405,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3403,
                      "name": "returnValue",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3399,
                      "src": "5944:11:31",
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
                      "id": 3404,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5959:1:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "5944:16:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 3397,
                  "id": 3406,
                  "nodeType": "Return",
                  "src": "5937:23:31"
                }
              ]
            },
            "documentation": "Checks the return value of the previous function up to 32 bytes. Returns true if the previous\nfunction returned 0 bytes or 1.",
            "id": 3408,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "checkSuccess",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 3394,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5136:7:31"
            },
            "payable": false,
            "returnParameters": {
              "id": 3397,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 3396,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 3408,
                  "src": "5190:4:31",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 3395,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5190:4:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5189:6:31"
            },
            "scope": 3409,
            "src": "5115:852:31",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 3410,
        "src": "1008:4961:31"
      }
    ],
    "src": "597:5373:31"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T02:05:30.503Z"
}
export const ZeroExExchangeWrapper = 
{
  "contractName": "ZeroExExchangeWrapper",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "ZERO_EX_EXCHANGE",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ZERO_EX_PROXY",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "SET_PROXY",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_zeroExExchange",
          "type": "address"
        },
        {
          "name": "_zeroExProxy",
          "type": "address"
        },
        {
          "name": "_setProxy",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tradeOriginator",
          "type": "address"
        },
        {
          "name": "_orderData",
          "type": "bytes"
        }
      ],
      "name": "exchange",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5060405160608061034a833981018060405261002f9190810190610084565b60008054600160a060020a03948516600160a060020a0319918216179091556001805493851693821693909317909255600280549190931691161790556100dd565b600061007d82516100d1565b9392505050565b60008060006060848603121561009957600080fd5b60006100a58686610071565b93505060206100b686828701610071565b92505060406100c786828701610071565b9150509250925092565b600160a060020a031690565b61025e806100ec6000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635da270fc8114610066578063881e142e14610091578063b6c8e453146100b3578063e5345524146100c8575b600080fd5b34801561007257600080fd5b5061007b6100dd565b60405161008891906101f7565b60405180910390f35b34801561009d57600080fd5b506100b16100ac366004610192565b6100f9565b005b3480156100bf57600080fd5b5061007b6100fe565b3480156100d457600080fd5b5061007b61011a565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b6000610142823561020b565b9392505050565b600080601f8301841361015b57600080fd5b50813567ffffffffffffffff81111561017357600080fd5b60208301915083600182028301111561018b57600080fd5b9250929050565b6000806000604084860312156101a757600080fd5b60006101b38686610136565b935050602084013567ffffffffffffffff8111156101d057600080fd5b6101dc86828701610149565b92509250509250925092565b6101f18161020b565b82525050565b6020810161020582846101e8565b92915050565b73ffffffffffffffffffffffffffffffffffffffff16905600a265627a7a72305820184902f8d961204c2c031889f0e83d7339a29fbf6b23aaf0205b55fd3927f7e26c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x6080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635da270fc8114610066578063881e142e14610091578063b6c8e453146100b3578063e5345524146100c8575b600080fd5b34801561007257600080fd5b5061007b6100dd565b60405161008891906101f7565b60405180910390f35b34801561009d57600080fd5b506100b16100ac366004610192565b6100f9565b005b3480156100bf57600080fd5b5061007b6100fe565b3480156100d457600080fd5b5061007b61011a565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b6000610142823561020b565b9392505050565b600080601f8301841361015b57600080fd5b50813567ffffffffffffffff81111561017357600080fd5b60208301915083600182028301111561018b57600080fd5b9250929050565b6000806000604084860312156101a757600080fd5b60006101b38686610136565b935050602084013567ffffffffffffffff8111156101d057600080fd5b6101dc86828701610149565b92509250509250925092565b6101f18161020b565b82525050565b6020810161020582846101e8565b92915050565b73ffffffffffffffffffffffffffffffffffffffff16905600a265627a7a72305820184902f8d961204c2c031889f0e83d7339a29fbf6b23aaf0205b55fd3927f7e26c6578706572696d656e74616cf50037",
  "sourceMap": "1388:1916:6:-;;;1663:247;8:9:-1;5:2;;;30:1;27;20:12;5:2;1663:247:6;;;;;;;;;;;;;;;;;;;;;;1800:16;:34;;-1:-1:-1;;;;;1800:34:6;;;-1:-1:-1;;;;;;1800:34:6;;;;;;;;1844:28;;;;;;;;;;;;;;;1882:9;:21;;;;;;;;;;;1388:1916;;5:122:-1;;83:39;114:6;108:13;83:39;;;74:48;68:59;-1:-1;;;68:59;134:535;;;;283:2;271:9;262:7;258:23;254:32;251:2;;;299:1;296;289:12;251:2;334:1;351:64;407:7;387:9;351:64;;;341:74;;313:108;452:2;470:64;526:7;517:6;506:9;502:22;470:64;;;460:74;;431:109;571:2;589:64;645:7;636:6;625:9;621:22;589:64;;;579:74;;550:109;245:424;;;;;;676:128;-1:-1;;;;;745:54;;728:76;;1388:1916:6;;;;;;",
  "deployedSourceMap": "1388:1916:6:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1511:31;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1511:31:6;;;;;;;;;;;;;;;;;;;;2143:288;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2143:288:6;;;;;;;;;;;1548:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1548:28:6;;;;1582:24;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1582:24:6;;;;1511:31;;;;;;:::o;2143:288::-;;;;:::o;1548:28::-;;;;;;:::o;1582:24::-;;;;;;:::o;5:118:-1:-;;72:46;110:6;97:20;72:46;;;63:55;57:66;-1:-1;;;57:66;144:335;;;251:4;239:17;;235:27;-1:-1;225:2;;276:1;273;266:12;225:2;-1:-1;296:20;;336:18;325:30;;322:2;;;368:1;365;358:12;322:2;402:4;394:6;390:17;378:29;;452:3;445;437:6;433:16;423:8;419:31;416:40;413:2;;;469:1;466;459:12;413:2;218:261;;;;;;487:490;;;;627:2;615:9;606:7;602:23;598:32;595:2;;;643:1;640;633:12;595:2;678:1;695:53;740:7;720:9;695:53;;;685:63;;657:97;813:2;802:9;798:18;785:32;837:18;829:6;826:30;823:2;;;869:1;866;859:12;823:2;897:64;953:7;944:6;933:9;929:22;897:64;;;879:82;;;;764:203;589:388;;;;;;984:110;1057:31;1082:5;1057:31;;;1052:3;1045:44;1039:55;;;1101:193;1209:2;1194:18;;1223:61;1198:9;1257:6;1223:61;;;1180:114;;;;;1301:128;1381:42;1370:54;;1353:76",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { ZeroExOrderDataHandler as OrderHandler } from \"./lib/ZeroExOrderDataHandler.sol\";\nimport { LibBytes } from \"../../external/0x/LibBytes.sol\";\nimport { LibOrder as ZeroExOrder } from \"../../external/0x/Exchange/libs/LibOrder.sol\";\nimport { LibFillResults as ZeroExFillResults } from \"../../external/0x/Exchange/libs/LibFillResults.sol\";\nimport { IExchange as ZeroExExchange } from \"../../external/0x/Exchange/interfaces/IExchange.sol\";\nimport { ERC20Wrapper as ERC20 } from \"../../core/lib/ERC20Wrapper.sol\";\n\n\n\n/**\n * @title ZeroExExchangeWrapper\n * @author Set Protocol\n *\n * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2\n */\ncontract ZeroExExchangeWrapper\n{\n    using SafeMath for uint256;\n\n    /* ============ State Variables ============ */\n\n    address public ZERO_EX_EXCHANGE;\n    address public ZERO_EX_PROXY;\n    address public SET_PROXY;\n\n\n    /* ============ Constructor ============ */\n\n    constructor(\n        address _zeroExExchange,\n        address _zeroExProxy,\n        address _setProxy\n    )\n        public\n    {\n        ZERO_EX_EXCHANGE = _zeroExExchange;\n        ZERO_EX_PROXY = _zeroExProxy;\n        SET_PROXY = _setProxy;\n    }\n\n\n    /* ============ Public Functions ============ */\n\n\n    // The purpose of this function is to decode the order data and execute the trade\n    // TODO - We are currently assuming no taker fee. Add in taker fee going forward\n    function exchange(\n        address _tradeOriginator,\n        bytes _orderData\n    )\n        external\n        // returns (uint256)\n    {\n        // Loop through order data and perform each order\n\n        // Approve the taker token for transfer to the Set Vault\n\n\n        // return 1;\n    }\n\n    /* ============ Getters ============ */\n\n    /* ============ Private ============ */\n    \n    function fillZeroExOrder(\n        bytes _zeroExOrderData\n    )\n        private\n        returns (ZeroExFillResults.FillResults memory)\n    {\n        uint256 fillAmount = OrderHandler.parseFillAmount(_zeroExOrderData);\n        bytes memory signature = OrderHandler.sliceSignature(_zeroExOrderData);\n        ZeroExOrder.Order memory order = OrderHandler.parseZeroExOrder(_zeroExOrderData);\n\n        // Ensure the maker token is allowed to be approved to the ZeroEx proxy\n\n\n        ZeroExFillResults.FillResults memory fillResults = \n            ZeroExExchange(ZERO_EX_EXCHANGE).fillOrKillOrder(\n                order,\n                fillAmount,\n                signature\n            );\n\n        // Ensure the taker token is allowed to be approved to the TransferProxy\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
    "exportedSymbols": {
      "ZeroExExchangeWrapper": [
        1014
      ]
    },
    "id": 1015,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 915,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:6"
      },
      {
        "id": 916,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:6"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 918,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 5804,
        "src": "658:73:6",
        "symbolAliases": [
          {
            "foreign": 917,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
        "file": "./lib/ZeroExOrderDataHandler.sol",
        "id": 920,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 1289,
        "src": "732:90:6",
        "symbolAliases": [
          {
            "foreign": 919,
            "local": "OrderHandler"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 922,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 4144,
        "src": "823:58:6",
        "symbolAliases": [
          {
            "foreign": 921,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 924,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 3995,
        "src": "882:87:6",
        "symbolAliases": [
          {
            "foreign": 923,
            "local": "ZeroExOrder"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../../external/0x/Exchange/libs/LibFillResults.sol",
        "id": 926,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 3928,
        "src": "970:105:6",
        "symbolAliases": [
          {
            "foreign": 925,
            "local": "ZeroExFillResults"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 928,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 3549,
        "src": "1076:98:6",
        "symbolAliases": [
          {
            "foreign": 927,
            "local": "ZeroExExchange"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ERC20Wrapper.sol",
        "file": "../../core/lib/ERC20Wrapper.sol",
        "id": 930,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 3261,
        "src": "1175:72:6",
        "symbolAliases": [
          {
            "foreign": 929,
            "local": "ERC20"
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ZeroExExchangeWrapper\n@author Set Protocol\n * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2",
        "fullyImplemented": true,
        "id": 1014,
        "linearizedBaseContracts": [
          1014
        ],
        "name": "ZeroExExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 933,
            "libraryName": {
              "contractScope": null,
              "id": 931,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5803,
              "src": "1431:8:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$5803",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1425:27:6",
            "typeName": {
              "id": 932,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1444:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 935,
            "name": "ZERO_EX_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 1014,
            "src": "1511:31:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 934,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1511:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 937,
            "name": "ZERO_EX_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1014,
            "src": "1548:28:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 936,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1548:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 939,
            "name": "SET_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1014,
            "src": "1582:24:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 938,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1582:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 960,
              "nodeType": "Block",
              "src": "1790:120:6",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 950,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 948,
                      "name": "ZERO_EX_EXCHANGE",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 935,
                      "src": "1800:16:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 949,
                      "name": "_zeroExExchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 941,
                      "src": "1819:15:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1800:34:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 951,
                  "nodeType": "ExpressionStatement",
                  "src": "1800:34:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 954,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 952,
                      "name": "ZERO_EX_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 937,
                      "src": "1844:13:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 953,
                      "name": "_zeroExProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 943,
                      "src": "1860:12:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1844:28:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 955,
                  "nodeType": "ExpressionStatement",
                  "src": "1844:28:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 958,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 956,
                      "name": "SET_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 939,
                      "src": "1882:9:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 957,
                      "name": "_setProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 945,
                      "src": "1894:9:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1882:21:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 959,
                  "nodeType": "ExpressionStatement",
                  "src": "1882:21:6"
                }
              ]
            },
            "documentation": null,
            "id": 961,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 946,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 941,
                  "name": "_zeroExExchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 961,
                  "src": "1684:23:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 940,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1684:7:6",
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
                  "id": 943,
                  "name": "_zeroExProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 961,
                  "src": "1717:20:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 942,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1717:7:6",
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
                  "id": 945,
                  "name": "_setProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 961,
                  "src": "1747:17:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 944,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1747:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1674:96:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 947,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1790:0:6"
            },
            "scope": 1014,
            "src": "1663:247:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 968,
              "nodeType": "Block",
              "src": "2277:154:6",
              "statements": []
            },
            "documentation": null,
            "id": 969,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 966,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 963,
                  "name": "_tradeOriginator",
                  "nodeType": "VariableDeclaration",
                  "scope": 969,
                  "src": "2170:24:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 962,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2170:7:6",
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
                  "id": 965,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 969,
                  "src": "2204:16:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 964,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2204:5:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2160:66:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 967,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2277:0:6"
            },
            "scope": 1014,
            "src": "2143:288:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1012,
              "nodeType": "Block",
              "src": "2669:633:6",
              "statements": [
                {
                  "assignments": [
                    977
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 977,
                      "name": "fillAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1013,
                      "src": "2679:18:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 976,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2679:7:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 982,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 980,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 971,
                        "src": "2729:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 978,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1288,
                        "src": "2700:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1288_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 979,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseFillAmount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1093,
                      "src": "2700:28:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 981,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2700:46:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2679:67:6"
                },
                {
                  "assignments": [
                    984
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 984,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 1013,
                      "src": "2756:22:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 983,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "2756:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 989,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 987,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 971,
                        "src": "2809:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 985,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1288,
                        "src": "2781:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1288_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 986,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sliceSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1124,
                      "src": "2781:27:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (bytes memory)"
                      }
                    },
                    "id": 988,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2781:45:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2756:70:6"
                },
                {
                  "assignments": [
                    993
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 993,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1013,
                      "src": "2836:30:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 992,
                        "name": "ZeroExOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3986,
                        "src": "2836:17:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 998,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 996,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 971,
                        "src": "2899:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 994,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1288,
                        "src": "2869:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1288_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 995,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseZeroExOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1254,
                      "src": "2869:29:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_Order_$3986_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 997,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2869:47:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2836:80:6"
                },
                {
                  "assignments": [
                    1002
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1002,
                      "name": "fillResults",
                      "nodeType": "VariableDeclaration",
                      "scope": 1013,
                      "src": "3009:48:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                        "typeString": "struct LibFillResults.FillResults"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1001,
                        "name": "ZeroExFillResults.FillResults",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3919,
                        "src": "3009:29:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                          "typeString": "struct LibFillResults.FillResults"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1011,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1007,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 993,
                        "src": "3139:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1008,
                        "name": "fillAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 977,
                        "src": "3162:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1009,
                        "name": "signature",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 984,
                        "src": "3190:9:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1004,
                            "name": "ZERO_EX_EXCHANGE",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 935,
                            "src": "3088:16:6",
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
                          "id": 1003,
                          "name": "ZeroExExchange",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3548,
                          "src": "3073:14:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IExchange_$3548_$",
                            "typeString": "type(contract IExchange)"
                          }
                        },
                        "id": 1005,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3073:32:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IExchange_$3548",
                          "typeString": "contract IExchange"
                        }
                      },
                      "id": 1006,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "fillOrKillOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3687,
                      "src": "3073:48:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_struct$_Order_$3986_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$_t_struct$_FillResults_$3919_memory_ptr_$",
                        "typeString": "function (struct LibOrder.Order memory,uint256,bytes memory) external returns (struct LibFillResults.FillResults memory)"
                      }
                    },
                    "id": 1010,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3073:140:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                      "typeString": "struct LibFillResults.FillResults memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3009:204:6"
                }
              ]
            },
            "documentation": null,
            "id": 1013,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 972,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 971,
                  "name": "_zeroExOrderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1013,
                  "src": "2565:22:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 970,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2565:5:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2555:38:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 975,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 974,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1013,
                  "src": "2627:29:6",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 973,
                    "name": "ZeroExFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "2627:29:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2626:38:6"
            },
            "scope": 1014,
            "src": "2531:771:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 1015,
        "src": "1388:1916:6"
      }
    ],
    "src": "597:2708:6"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
    "exportedSymbols": {
      "ZeroExExchangeWrapper": [
        1014
      ]
    },
    "id": 1015,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 915,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:6"
      },
      {
        "id": 916,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:6"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 918,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 5804,
        "src": "658:73:6",
        "symbolAliases": [
          {
            "foreign": 917,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
        "file": "./lib/ZeroExOrderDataHandler.sol",
        "id": 920,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 1289,
        "src": "732:90:6",
        "symbolAliases": [
          {
            "foreign": 919,
            "local": "OrderHandler"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 922,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 4144,
        "src": "823:58:6",
        "symbolAliases": [
          {
            "foreign": 921,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 924,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 3995,
        "src": "882:87:6",
        "symbolAliases": [
          {
            "foreign": 923,
            "local": "ZeroExOrder"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../../external/0x/Exchange/libs/LibFillResults.sol",
        "id": 926,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 3928,
        "src": "970:105:6",
        "symbolAliases": [
          {
            "foreign": 925,
            "local": "ZeroExFillResults"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 928,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 3549,
        "src": "1076:98:6",
        "symbolAliases": [
          {
            "foreign": 927,
            "local": "ZeroExExchange"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ERC20Wrapper.sol",
        "file": "../../core/lib/ERC20Wrapper.sol",
        "id": 930,
        "nodeType": "ImportDirective",
        "scope": 1015,
        "sourceUnit": 3261,
        "src": "1175:72:6",
        "symbolAliases": [
          {
            "foreign": 929,
            "local": "ERC20"
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": "@title ZeroExExchangeWrapper\n@author Set Protocol\n * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2",
        "fullyImplemented": true,
        "id": 1014,
        "linearizedBaseContracts": [
          1014
        ],
        "name": "ZeroExExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 933,
            "libraryName": {
              "contractScope": null,
              "id": 931,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5803,
              "src": "1431:8:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$5803",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1425:27:6",
            "typeName": {
              "id": 932,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1444:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 935,
            "name": "ZERO_EX_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 1014,
            "src": "1511:31:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 934,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1511:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 937,
            "name": "ZERO_EX_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1014,
            "src": "1548:28:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 936,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1548:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 939,
            "name": "SET_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1014,
            "src": "1582:24:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 938,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1582:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 960,
              "nodeType": "Block",
              "src": "1790:120:6",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 950,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 948,
                      "name": "ZERO_EX_EXCHANGE",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 935,
                      "src": "1800:16:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 949,
                      "name": "_zeroExExchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 941,
                      "src": "1819:15:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1800:34:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 951,
                  "nodeType": "ExpressionStatement",
                  "src": "1800:34:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 954,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 952,
                      "name": "ZERO_EX_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 937,
                      "src": "1844:13:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 953,
                      "name": "_zeroExProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 943,
                      "src": "1860:12:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1844:28:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 955,
                  "nodeType": "ExpressionStatement",
                  "src": "1844:28:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 958,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 956,
                      "name": "SET_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 939,
                      "src": "1882:9:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 957,
                      "name": "_setProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 945,
                      "src": "1894:9:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1882:21:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 959,
                  "nodeType": "ExpressionStatement",
                  "src": "1882:21:6"
                }
              ]
            },
            "documentation": null,
            "id": 961,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 946,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 941,
                  "name": "_zeroExExchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 961,
                  "src": "1684:23:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 940,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1684:7:6",
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
                  "id": 943,
                  "name": "_zeroExProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 961,
                  "src": "1717:20:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 942,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1717:7:6",
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
                  "id": 945,
                  "name": "_setProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 961,
                  "src": "1747:17:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 944,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1747:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1674:96:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 947,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1790:0:6"
            },
            "scope": 1014,
            "src": "1663:247:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 968,
              "nodeType": "Block",
              "src": "2277:154:6",
              "statements": []
            },
            "documentation": null,
            "id": 969,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 966,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 963,
                  "name": "_tradeOriginator",
                  "nodeType": "VariableDeclaration",
                  "scope": 969,
                  "src": "2170:24:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 962,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2170:7:6",
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
                  "id": 965,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 969,
                  "src": "2204:16:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 964,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2204:5:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2160:66:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 967,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2277:0:6"
            },
            "scope": 1014,
            "src": "2143:288:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1012,
              "nodeType": "Block",
              "src": "2669:633:6",
              "statements": [
                {
                  "assignments": [
                    977
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 977,
                      "name": "fillAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1013,
                      "src": "2679:18:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 976,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2679:7:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 982,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 980,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 971,
                        "src": "2729:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 978,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1288,
                        "src": "2700:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1288_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 979,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseFillAmount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1093,
                      "src": "2700:28:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 981,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2700:46:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2679:67:6"
                },
                {
                  "assignments": [
                    984
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 984,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 1013,
                      "src": "2756:22:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 983,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "2756:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 989,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 987,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 971,
                        "src": "2809:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 985,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1288,
                        "src": "2781:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1288_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 986,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sliceSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1124,
                      "src": "2781:27:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (bytes memory)"
                      }
                    },
                    "id": 988,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2781:45:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2756:70:6"
                },
                {
                  "assignments": [
                    993
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 993,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1013,
                      "src": "2836:30:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 992,
                        "name": "ZeroExOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3986,
                        "src": "2836:17:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3986_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 998,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 996,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 971,
                        "src": "2899:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 994,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1288,
                        "src": "2869:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1288_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 995,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseZeroExOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1254,
                      "src": "2869:29:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_Order_$3986_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 997,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2869:47:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2836:80:6"
                },
                {
                  "assignments": [
                    1002
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1002,
                      "name": "fillResults",
                      "nodeType": "VariableDeclaration",
                      "scope": 1013,
                      "src": "3009:48:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                        "typeString": "struct LibFillResults.FillResults"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1001,
                        "name": "ZeroExFillResults.FillResults",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3919,
                        "src": "3009:29:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                          "typeString": "struct LibFillResults.FillResults"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1011,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1007,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 993,
                        "src": "3139:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1008,
                        "name": "fillAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 977,
                        "src": "3162:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1009,
                        "name": "signature",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 984,
                        "src": "3190:9:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_Order_$3986_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1004,
                            "name": "ZERO_EX_EXCHANGE",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 935,
                            "src": "3088:16:6",
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
                          "id": 1003,
                          "name": "ZeroExExchange",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3548,
                          "src": "3073:14:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IExchange_$3548_$",
                            "typeString": "type(contract IExchange)"
                          }
                        },
                        "id": 1005,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3073:32:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IExchange_$3548",
                          "typeString": "contract IExchange"
                        }
                      },
                      "id": 1006,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "fillOrKillOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3687,
                      "src": "3073:48:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_struct$_Order_$3986_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$_t_struct$_FillResults_$3919_memory_ptr_$",
                        "typeString": "function (struct LibOrder.Order memory,uint256,bytes memory) external returns (struct LibFillResults.FillResults memory)"
                      }
                    },
                    "id": 1010,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3073:140:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                      "typeString": "struct LibFillResults.FillResults memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3009:204:6"
                }
              ]
            },
            "documentation": null,
            "id": 1013,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 972,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 971,
                  "name": "_zeroExOrderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1013,
                  "src": "2565:22:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 970,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2565:5:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2555:38:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 975,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 974,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1013,
                  "src": "2627:29:6",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$3919_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 973,
                    "name": "ZeroExFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3919,
                    "src": "2627:29:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3919_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2626:38:6"
            },
            "scope": 1014,
            "src": "2531:771:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 1015,
        "src": "1388:1916:6"
      }
    ],
    "src": "597:2708:6"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.189Z"
}
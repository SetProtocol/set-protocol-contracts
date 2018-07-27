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
  "bytecode": "0x608060405234801561001057600080fd5b5060405160608061034a833981018060405261002f9190810190610084565b60008054600160a060020a03948516600160a060020a0319918216179091556001805493851693821693909317909255600280549190931691161790556100dd565b600061007d82516100d1565b9392505050565b60008060006060848603121561009957600080fd5b60006100a58686610071565b93505060206100b686828701610071565b92505060406100c786828701610071565b9150509250925092565b600160a060020a031690565b61025e806100ec6000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635da270fc8114610066578063881e142e14610091578063b6c8e453146100b3578063e5345524146100c8575b600080fd5b34801561007257600080fd5b5061007b6100dd565b60405161008891906101f7565b60405180910390f35b34801561009d57600080fd5b506100b16100ac366004610192565b6100f9565b005b3480156100bf57600080fd5b5061007b6100fe565b3480156100d457600080fd5b5061007b61011a565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b6000610142823561020b565b9392505050565b600080601f8301841361015b57600080fd5b50813567ffffffffffffffff81111561017357600080fd5b60208301915083600182028301111561018b57600080fd5b9250929050565b6000806000604084860312156101a757600080fd5b60006101b38686610136565b935050602084013567ffffffffffffffff8111156101d057600080fd5b6101dc86828701610149565b92509250509250925092565b6101f18161020b565b82525050565b6020810161020582846101e8565b92915050565b73ffffffffffffffffffffffffffffffffffffffff16905600a265627a7a7230582095895f8c153ed8d9fcdbbeb7dbcfdc2c3bce22e5a8ccd33164e9e07529f9b8d06c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x6080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635da270fc8114610066578063881e142e14610091578063b6c8e453146100b3578063e5345524146100c8575b600080fd5b34801561007257600080fd5b5061007b6100dd565b60405161008891906101f7565b60405180910390f35b34801561009d57600080fd5b506100b16100ac366004610192565b6100f9565b005b3480156100bf57600080fd5b5061007b6100fe565b3480156100d457600080fd5b5061007b61011a565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b6000610142823561020b565b9392505050565b600080601f8301841361015b57600080fd5b50813567ffffffffffffffff81111561017357600080fd5b60208301915083600182028301111561018b57600080fd5b9250929050565b6000806000604084860312156101a757600080fd5b60006101b38686610136565b935050602084013567ffffffffffffffff8111156101d057600080fd5b6101dc86828701610149565b92509250509250925092565b6101f18161020b565b82525050565b6020810161020582846101e8565b92915050565b73ffffffffffffffffffffffffffffffffffffffff16905600a265627a7a7230582095895f8c153ed8d9fcdbbeb7dbcfdc2c3bce22e5a8ccd33164e9e07529f9b8d06c6578706572696d656e74616cf50037",
  "sourceMap": "1383:2086:7:-;;;1658:247;8:9:-1;5:2;;;30:1;27;20:12;5:2;1658:247:7;;;;;;;;;;;;;;;;;;;;;;1795:16;:34;;-1:-1:-1;;;;;1795:34:7;;;-1:-1:-1;;;;;;1795:34:7;;;;;;;;1839:28;;;;;;;;;;;;;;;1877:9;:21;;;;;;;;;;;1383:2086;;5:122:-1;;83:39;114:6;108:13;83:39;;;74:48;68:59;-1:-1;;;68:59;134:535;;;;283:2;271:9;262:7;258:23;254:32;251:2;;;299:1;296;289:12;251:2;334:1;351:64;407:7;387:9;351:64;;;341:74;;313:108;452:2;470:64;526:7;517:6;506:9;502:22;470:64;;;460:74;;431:109;571:2;589:64;645:7;636:6;625:9;621:22;589:64;;;579:74;;550:109;245:424;;;;;;676:128;-1:-1;;;;;745:54;;728:76;;1383:2086:7;;;;;;",
  "deployedSourceMap": "1383:2086:7:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1506:31;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1506:31:7;;;;;;;;;;;;;;;;;;;;2137:288;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2137:288:7;;;;;;;;;;;1543:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1543:28:7;;;;1577:24;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1577:24:7;;;;1506:31;;;;;;:::o;2137:288::-;;;;:::o;1543:28::-;;;;;;:::o;1577:24::-;;;;;;:::o;5:118:-1:-;;72:46;110:6;97:20;72:46;;;63:55;57:66;-1:-1;;;57:66;144:335;;;251:4;239:17;;235:27;-1:-1;225:2;;276:1;273;266:12;225:2;-1:-1;296:20;;336:18;325:30;;322:2;;;368:1;365;358:12;322:2;402:4;394:6;390:17;378:29;;452:3;445;437:6;433:16;423:8;419:31;416:40;413:2;;;469:1;466;459:12;413:2;218:261;;;;;;487:490;;;;627:2;615:9;606:7;602:23;598:32;595:2;;;643:1;640;633:12;595:2;678:1;695:53;740:7;720:9;695:53;;;685:63;;657:97;813:2;802:9;798:18;785:32;837:18;829:6;826:30;823:2;;;869:1;866;859:12;823:2;897:64;953:7;944:6;933:9;929:22;897:64;;;879:82;;;;764:203;589:388;;;;;;984:110;1057:31;1082:5;1057:31;;;1052:3;1045:44;1039:55;;;1101:193;1209:2;1194:18;;1223:61;1198:9;1257:6;1223:61;;;1180:114;;;;;1301:128;1381:42;1370:54;;1353:76",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { ZeroExOrderDataHandler as OrderHandler } from \"./lib/ZeroExOrderDataHandler.sol\";\nimport { LibBytes } from \"../../external/0x/LibBytes.sol\";\nimport { LibOrder as ZeroExOrder } from \"../../external/0x/Exchange/libs/LibOrder.sol\";\nimport { LibFillResults as ZeroExFillResults } from \"../../external/0x/Exchange/libs/LibFillResults.sol\";\nimport { IExchange as ZeroExExchange } from \"../../external/0x/Exchange/interfaces/IExchange.sol\";\nimport { ERC20Wrapper as ERC20 } from \"../../lib/ERC20Wrapper.sol\";\n\n\n\n/**\n * @title ZeroExExchangeWrapper\n * @author Set Protocol\n *\n * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2\n */\ncontract ZeroExExchangeWrapper\n{\n    using SafeMath for uint256;\n\n    /* ============ State Variables ============ */\n\n    address public ZERO_EX_EXCHANGE;\n    address public ZERO_EX_PROXY;\n    address public SET_PROXY;\n\n\n    /* ============ Constructor ============ */\n\n    constructor(\n        address _zeroExExchange,\n        address _zeroExProxy,\n        address _setProxy\n    )\n        public\n    {\n        ZERO_EX_EXCHANGE = _zeroExExchange;\n        ZERO_EX_PROXY = _zeroExProxy;\n        SET_PROXY = _setProxy;\n    }\n\n    /* ============ Public Functions ============ */\n\n\n    // The purpose of this function is to decode the order data and execute the trade\n    // TODO - We are currently assuming no taker fee. Add in taker fee going forward\n    function exchange(\n        address _tradeOriginator,\n        bytes _orderData\n    )\n        external\n        // returns (uint256)\n    {\n        // Loop through order data and perform each order\n\n        // Approve the taker token for transfer to the Set Vault\n\n\n        // return 1;\n    }\n\n    /* ============ Getters ============ */\n\n    /* ============ Private ============ */\n\n    function fillZeroExOrder(\n        bytes _zeroExOrderData\n    )\n        private\n        returns (ZeroExFillResults.FillResults memory)\n    {\n        uint256 fillAmount = OrderHandler.parseFillAmount(_zeroExOrderData);\n        bytes memory signature = OrderHandler.sliceSignature(_zeroExOrderData);\n        ZeroExOrder.Order memory order = OrderHandler.parseZeroExOrder(_zeroExOrderData);\n\n        // Ensure the maker token is allowed to be approved to the ZeroEx proxy\n\n        // TODO: Still being handled in Felix's PR\n        /* solium-disable-next-line operator-whitespace */\n        ZeroExFillResults.FillResults memory fillResults =\n            ZeroExExchange(ZERO_EX_EXCHANGE).fillOrKillOrder(\n                order,\n                fillAmount,\n                signature\n            );\n\n        // Temporary to satisfy Solium\n        return fillResults;\n        // Ensure the taker token is allowed to be approved to the TransferProxy\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
    "exportedSymbols": {
      "ZeroExExchangeWrapper": [
        1157
      ]
    },
    "id": 1158,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1056,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:7"
      },
      {
        "id": 1057,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:7"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1059,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 6703,
        "src": "658:73:7",
        "symbolAliases": [
          {
            "foreign": 1058,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
        "file": "./lib/ZeroExOrderDataHandler.sol",
        "id": 1061,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 1432,
        "src": "732:90:7",
        "symbolAliases": [
          {
            "foreign": 1060,
            "local": "OrderHandler"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 1063,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 4793,
        "src": "823:58:7",
        "symbolAliases": [
          {
            "foreign": 1062,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1065,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 4644,
        "src": "882:87:7",
        "symbolAliases": [
          {
            "foreign": 1064,
            "local": "ZeroExOrder"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../../external/0x/Exchange/libs/LibFillResults.sol",
        "id": 1067,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 4577,
        "src": "970:105:7",
        "symbolAliases": [
          {
            "foreign": 1066,
            "local": "ZeroExFillResults"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 1069,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 4198,
        "src": "1076:98:7",
        "symbolAliases": [
          {
            "foreign": 1068,
            "local": "ZeroExExchange"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 1071,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 5201,
        "src": "1175:67:7",
        "symbolAliases": [
          {
            "foreign": 1070,
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
        "id": 1157,
        "linearizedBaseContracts": [
          1157
        ],
        "name": "ZeroExExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1074,
            "libraryName": {
              "contractScope": null,
              "id": 1072,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6702,
              "src": "1426:8:7",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6702",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1420:27:7",
            "typeName": {
              "id": 1073,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1439:7:7",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 1076,
            "name": "ZERO_EX_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 1157,
            "src": "1506:31:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1075,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1506:7:7",
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
            "id": 1078,
            "name": "ZERO_EX_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1157,
            "src": "1543:28:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1077,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1543:7:7",
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
            "id": 1080,
            "name": "SET_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1157,
            "src": "1577:24:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1079,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1577:7:7",
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
              "id": 1101,
              "nodeType": "Block",
              "src": "1785:120:7",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1091,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1089,
                      "name": "ZERO_EX_EXCHANGE",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1076,
                      "src": "1795:16:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1090,
                      "name": "_zeroExExchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1082,
                      "src": "1814:15:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1795:34:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1092,
                  "nodeType": "ExpressionStatement",
                  "src": "1795:34:7"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1095,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1093,
                      "name": "ZERO_EX_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1078,
                      "src": "1839:13:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1094,
                      "name": "_zeroExProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1084,
                      "src": "1855:12:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1839:28:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1096,
                  "nodeType": "ExpressionStatement",
                  "src": "1839:28:7"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1099,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1097,
                      "name": "SET_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1080,
                      "src": "1877:9:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1098,
                      "name": "_setProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1086,
                      "src": "1889:9:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1877:21:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1100,
                  "nodeType": "ExpressionStatement",
                  "src": "1877:21:7"
                }
              ]
            },
            "documentation": null,
            "id": 1102,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1087,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1082,
                  "name": "_zeroExExchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 1102,
                  "src": "1679:23:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1081,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:7",
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
                  "id": 1084,
                  "name": "_zeroExProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1102,
                  "src": "1712:20:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1083,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1712:7:7",
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
                  "id": 1086,
                  "name": "_setProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1102,
                  "src": "1742:17:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1085,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1742:7:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1669:96:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1088,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1785:0:7"
            },
            "scope": 1157,
            "src": "1658:247:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1109,
              "nodeType": "Block",
              "src": "2271:154:7",
              "statements": []
            },
            "documentation": null,
            "id": 1110,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1107,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1104,
                  "name": "_tradeOriginator",
                  "nodeType": "VariableDeclaration",
                  "scope": 1110,
                  "src": "2164:24:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1103,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2164:7:7",
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
                  "id": 1106,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1110,
                  "src": "2198:16:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1105,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2198:5:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2154:66:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1108,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2271:0:7"
            },
            "scope": 1157,
            "src": "2137:288:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1155,
              "nodeType": "Block",
              "src": "2659:808:7",
              "statements": [
                {
                  "assignments": [
                    1118
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1118,
                      "name": "fillAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1156,
                      "src": "2669:18:7",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1117,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2669:7:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1123,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1121,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1112,
                        "src": "2719:16:7",
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
                        "id": 1119,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1431,
                        "src": "2690:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1431_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1120,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseFillAmount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1236,
                      "src": "2690:28:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1122,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2690:46:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2669:67:7"
                },
                {
                  "assignments": [
                    1125
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1125,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 1156,
                      "src": "2746:22:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 1124,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "2746:5:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1130,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1128,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1112,
                        "src": "2799:16:7",
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
                        "id": 1126,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1431,
                        "src": "2771:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1431_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1127,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sliceSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1267,
                      "src": "2771:27:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (bytes memory)"
                      }
                    },
                    "id": 1129,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2771:45:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2746:70:7"
                },
                {
                  "assignments": [
                    1134
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1134,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1156,
                      "src": "2826:30:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1133,
                        "name": "ZeroExOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4635,
                        "src": "2826:17:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1139,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1137,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1112,
                        "src": "2889:16:7",
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
                        "id": 1135,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1431,
                        "src": "2859:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1431_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1136,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseZeroExOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1397,
                      "src": "2859:29:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_Order_$4635_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 1138,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2859:47:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2826:80:7"
                },
                {
                  "assignments": [
                    1143
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1143,
                      "name": "fillResults",
                      "nodeType": "VariableDeclaration",
                      "scope": 1156,
                      "src": "3108:48:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_FillResults_$4568_memory_ptr",
                        "typeString": "struct LibFillResults.FillResults"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1142,
                        "name": "ZeroExFillResults.FillResults",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4568,
                        "src": "3108:29:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_FillResults_$4568_storage_ptr",
                          "typeString": "struct LibFillResults.FillResults"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1152,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1148,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1134,
                        "src": "3237:5:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1149,
                        "name": "fillAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1118,
                        "src": "3260:10:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1150,
                        "name": "signature",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1125,
                        "src": "3288:9:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
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
                            "id": 1145,
                            "name": "ZERO_EX_EXCHANGE",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1076,
                            "src": "3186:16:7",
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
                          "id": 1144,
                          "name": "ZeroExExchange",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4197,
                          "src": "3171:14:7",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IExchange_$4197_$",
                            "typeString": "type(contract IExchange)"
                          }
                        },
                        "id": 1146,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3171:32:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IExchange_$4197",
                          "typeString": "contract IExchange"
                        }
                      },
                      "id": 1147,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "fillOrKillOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4336,
                      "src": "3171:48:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_struct$_Order_$4635_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$_t_struct$_FillResults_$4568_memory_ptr_$",
                        "typeString": "function (struct LibOrder.Order memory,uint256,bytes memory) external returns (struct LibFillResults.FillResults memory)"
                      }
                    },
                    "id": 1151,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3171:140:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4568_memory_ptr",
                      "typeString": "struct LibFillResults.FillResults memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3108:203:7"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1153,
                    "name": "fillResults",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1143,
                    "src": "3368:11:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4568_memory_ptr",
                      "typeString": "struct LibFillResults.FillResults memory"
                    }
                  },
                  "functionReturnParameters": 1116,
                  "id": 1154,
                  "nodeType": "Return",
                  "src": "3361:18:7"
                }
              ]
            },
            "documentation": null,
            "id": 1156,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1113,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1112,
                  "name": "_zeroExOrderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2555:22:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1111,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2555:5:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2545:38:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1116,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1115,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2617:29:7",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4568_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1114,
                    "name": "ZeroExFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4568,
                    "src": "2617:29:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4568_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2616:38:7"
            },
            "scope": 1157,
            "src": "2521:946:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 1158,
        "src": "1383:2086:7"
      }
    ],
    "src": "597:2873:7"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
    "exportedSymbols": {
      "ZeroExExchangeWrapper": [
        1157
      ]
    },
    "id": 1158,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1056,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:7"
      },
      {
        "id": 1057,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:7"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1059,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 6703,
        "src": "658:73:7",
        "symbolAliases": [
          {
            "foreign": 1058,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
        "file": "./lib/ZeroExOrderDataHandler.sol",
        "id": 1061,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 1432,
        "src": "732:90:7",
        "symbolAliases": [
          {
            "foreign": 1060,
            "local": "OrderHandler"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 1063,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 4793,
        "src": "823:58:7",
        "symbolAliases": [
          {
            "foreign": 1062,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1065,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 4644,
        "src": "882:87:7",
        "symbolAliases": [
          {
            "foreign": 1064,
            "local": "ZeroExOrder"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../../external/0x/Exchange/libs/LibFillResults.sol",
        "id": 1067,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 4577,
        "src": "970:105:7",
        "symbolAliases": [
          {
            "foreign": 1066,
            "local": "ZeroExFillResults"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 1069,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 4198,
        "src": "1076:98:7",
        "symbolAliases": [
          {
            "foreign": 1068,
            "local": "ZeroExExchange"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 1071,
        "nodeType": "ImportDirective",
        "scope": 1158,
        "sourceUnit": 5201,
        "src": "1175:67:7",
        "symbolAliases": [
          {
            "foreign": 1070,
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
        "id": 1157,
        "linearizedBaseContracts": [
          1157
        ],
        "name": "ZeroExExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1074,
            "libraryName": {
              "contractScope": null,
              "id": 1072,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6702,
              "src": "1426:8:7",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6702",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1420:27:7",
            "typeName": {
              "id": 1073,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1439:7:7",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 1076,
            "name": "ZERO_EX_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 1157,
            "src": "1506:31:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1075,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1506:7:7",
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
            "id": 1078,
            "name": "ZERO_EX_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1157,
            "src": "1543:28:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1077,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1543:7:7",
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
            "id": 1080,
            "name": "SET_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1157,
            "src": "1577:24:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1079,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1577:7:7",
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
              "id": 1101,
              "nodeType": "Block",
              "src": "1785:120:7",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1091,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1089,
                      "name": "ZERO_EX_EXCHANGE",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1076,
                      "src": "1795:16:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1090,
                      "name": "_zeroExExchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1082,
                      "src": "1814:15:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1795:34:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1092,
                  "nodeType": "ExpressionStatement",
                  "src": "1795:34:7"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1095,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1093,
                      "name": "ZERO_EX_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1078,
                      "src": "1839:13:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1094,
                      "name": "_zeroExProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1084,
                      "src": "1855:12:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1839:28:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1096,
                  "nodeType": "ExpressionStatement",
                  "src": "1839:28:7"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1099,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1097,
                      "name": "SET_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1080,
                      "src": "1877:9:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1098,
                      "name": "_setProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1086,
                      "src": "1889:9:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1877:21:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1100,
                  "nodeType": "ExpressionStatement",
                  "src": "1877:21:7"
                }
              ]
            },
            "documentation": null,
            "id": 1102,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1087,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1082,
                  "name": "_zeroExExchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 1102,
                  "src": "1679:23:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1081,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1679:7:7",
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
                  "id": 1084,
                  "name": "_zeroExProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1102,
                  "src": "1712:20:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1083,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1712:7:7",
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
                  "id": 1086,
                  "name": "_setProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1102,
                  "src": "1742:17:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1085,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1742:7:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1669:96:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1088,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1785:0:7"
            },
            "scope": 1157,
            "src": "1658:247:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1109,
              "nodeType": "Block",
              "src": "2271:154:7",
              "statements": []
            },
            "documentation": null,
            "id": 1110,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1107,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1104,
                  "name": "_tradeOriginator",
                  "nodeType": "VariableDeclaration",
                  "scope": 1110,
                  "src": "2164:24:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1103,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2164:7:7",
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
                  "id": 1106,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1110,
                  "src": "2198:16:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1105,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2198:5:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2154:66:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1108,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2271:0:7"
            },
            "scope": 1157,
            "src": "2137:288:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1155,
              "nodeType": "Block",
              "src": "2659:808:7",
              "statements": [
                {
                  "assignments": [
                    1118
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1118,
                      "name": "fillAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1156,
                      "src": "2669:18:7",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1117,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2669:7:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1123,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1121,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1112,
                        "src": "2719:16:7",
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
                        "id": 1119,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1431,
                        "src": "2690:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1431_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1120,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseFillAmount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1236,
                      "src": "2690:28:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1122,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2690:46:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2669:67:7"
                },
                {
                  "assignments": [
                    1125
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1125,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 1156,
                      "src": "2746:22:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 1124,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "2746:5:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1130,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1128,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1112,
                        "src": "2799:16:7",
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
                        "id": 1126,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1431,
                        "src": "2771:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1431_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1127,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sliceSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1267,
                      "src": "2771:27:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (bytes memory)"
                      }
                    },
                    "id": 1129,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2771:45:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2746:70:7"
                },
                {
                  "assignments": [
                    1134
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1134,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1156,
                      "src": "2826:30:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1133,
                        "name": "ZeroExOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4635,
                        "src": "2826:17:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1139,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1137,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1112,
                        "src": "2889:16:7",
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
                        "id": 1135,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1431,
                        "src": "2859:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1431_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1136,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseZeroExOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1397,
                      "src": "2859:29:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_Order_$4635_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 1138,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2859:47:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2826:80:7"
                },
                {
                  "assignments": [
                    1143
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1143,
                      "name": "fillResults",
                      "nodeType": "VariableDeclaration",
                      "scope": 1156,
                      "src": "3108:48:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_FillResults_$4568_memory_ptr",
                        "typeString": "struct LibFillResults.FillResults"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1142,
                        "name": "ZeroExFillResults.FillResults",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4568,
                        "src": "3108:29:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_FillResults_$4568_storage_ptr",
                          "typeString": "struct LibFillResults.FillResults"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1152,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1148,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1134,
                        "src": "3237:5:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1149,
                        "name": "fillAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1118,
                        "src": "3260:10:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1150,
                        "name": "signature",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1125,
                        "src": "3288:9:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
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
                            "id": 1145,
                            "name": "ZERO_EX_EXCHANGE",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1076,
                            "src": "3186:16:7",
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
                          "id": 1144,
                          "name": "ZeroExExchange",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4197,
                          "src": "3171:14:7",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IExchange_$4197_$",
                            "typeString": "type(contract IExchange)"
                          }
                        },
                        "id": 1146,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3171:32:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IExchange_$4197",
                          "typeString": "contract IExchange"
                        }
                      },
                      "id": 1147,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "fillOrKillOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4336,
                      "src": "3171:48:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_struct$_Order_$4635_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$_t_struct$_FillResults_$4568_memory_ptr_$",
                        "typeString": "function (struct LibOrder.Order memory,uint256,bytes memory) external returns (struct LibFillResults.FillResults memory)"
                      }
                    },
                    "id": 1151,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3171:140:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4568_memory_ptr",
                      "typeString": "struct LibFillResults.FillResults memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3108:203:7"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1153,
                    "name": "fillResults",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1143,
                    "src": "3368:11:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4568_memory_ptr",
                      "typeString": "struct LibFillResults.FillResults memory"
                    }
                  },
                  "functionReturnParameters": 1116,
                  "id": 1154,
                  "nodeType": "Return",
                  "src": "3361:18:7"
                }
              ]
            },
            "documentation": null,
            "id": 1156,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1113,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1112,
                  "name": "_zeroExOrderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2555:22:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1111,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2555:5:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2545:38:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1116,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1115,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2617:29:7",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4568_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1114,
                    "name": "ZeroExFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4568,
                    "src": "2617:29:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4568_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2616:38:7"
            },
            "scope": 1157,
            "src": "2521:946:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 1158,
        "src": "1383:2086:7"
      }
    ],
    "src": "597:2873:7"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.789Z"
}
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
  "bytecode": "0x608060405234801561001057600080fd5b5060405160608061034a833981018060405261002f9190810190610084565b60008054600160a060020a03948516600160a060020a0319918216179091556001805493851693821693909317909255600280549190931691161790556100dd565b600061007d82516100d1565b9392505050565b60008060006060848603121561009957600080fd5b60006100a58686610071565b93505060206100b686828701610071565b92505060406100c786828701610071565b9150509250925092565b600160a060020a031690565b61025e806100ec6000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635da270fc8114610066578063881e142e14610091578063b6c8e453146100b3578063e5345524146100c8575b600080fd5b34801561007257600080fd5b5061007b6100dd565b60405161008891906101f7565b60405180910390f35b34801561009d57600080fd5b506100b16100ac366004610192565b6100f9565b005b3480156100bf57600080fd5b5061007b6100fe565b3480156100d457600080fd5b5061007b61011a565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b6000610142823561020b565b9392505050565b600080601f8301841361015b57600080fd5b50813567ffffffffffffffff81111561017357600080fd5b60208301915083600182028301111561018b57600080fd5b9250929050565b6000806000604084860312156101a757600080fd5b60006101b38686610136565b935050602084013567ffffffffffffffff8111156101d057600080fd5b6101dc86828701610149565b92509250509250925092565b6101f18161020b565b82525050565b6020810161020582846101e8565b92915050565b73ffffffffffffffffffffffffffffffffffffffff16905600a265627a7a723058207d5fcdf1968532a6c611ffb93da73fb4a64333ecede95c8044e2d7c181d670306c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x6080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635da270fc8114610066578063881e142e14610091578063b6c8e453146100b3578063e5345524146100c8575b600080fd5b34801561007257600080fd5b5061007b6100dd565b60405161008891906101f7565b60405180910390f35b34801561009d57600080fd5b506100b16100ac366004610192565b6100f9565b005b3480156100bf57600080fd5b5061007b6100fe565b3480156100d457600080fd5b5061007b61011a565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b6000610142823561020b565b9392505050565b600080601f8301841361015b57600080fd5b50813567ffffffffffffffff81111561017357600080fd5b60208301915083600182028301111561018b57600080fd5b9250929050565b6000806000604084860312156101a757600080fd5b60006101b38686610136565b935050602084013567ffffffffffffffff8111156101d057600080fd5b6101dc86828701610149565b92509250509250925092565b6101f18161020b565b82525050565b6020810161020582846101e8565b92915050565b73ffffffffffffffffffffffffffffffffffffffff16905600a265627a7a723058207d5fcdf1968532a6c611ffb93da73fb4a64333ecede95c8044e2d7c181d670306c6578706572696d656e74616cf50037",
  "sourceMap": "1383:1916:7:-;;;1658:247;8:9:-1;5:2;;;30:1;27;20:12;5:2;1658:247:7;;;;;;;;;;;;;;;;;;;;;;1795:16;:34;;-1:-1:-1;;;;;1795:34:7;;;-1:-1:-1;;;;;;1795:34:7;;;;;;;;1839:28;;;;;;;;;;;;;;;1877:9;:21;;;;;;;;;;;1383:1916;;5:122:-1;;83:39;114:6;108:13;83:39;;;74:48;68:59;-1:-1;;;68:59;134:535;;;;283:2;271:9;262:7;258:23;254:32;251:2;;;299:1;296;289:12;251:2;334:1;351:64;407:7;387:9;351:64;;;341:74;;313:108;452:2;470:64;526:7;517:6;506:9;502:22;470:64;;;460:74;;431:109;571:2;589:64;645:7;636:6;625:9;621:22;589:64;;;579:74;;550:109;245:424;;;;;;676:128;-1:-1;;;;;745:54;;728:76;;1383:1916:7;;;;;;",
  "deployedSourceMap": "1383:1916:7:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1506:31;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1506:31:7;;;;;;;;;;;;;;;;;;;;2138:288;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2138:288:7;;;;;;;;;;;1543:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1543:28:7;;;;1577:24;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1577:24:7;;;;1506:31;;;;;;:::o;2138:288::-;;;;:::o;1543:28::-;;;;;;:::o;1577:24::-;;;;;;:::o;5:118:-1:-;;72:46;110:6;97:20;72:46;;;63:55;57:66;-1:-1;;;57:66;144:335;;;251:4;239:17;;235:27;-1:-1;225:2;;276:1;273;266:12;225:2;-1:-1;296:20;;336:18;325:30;;322:2;;;368:1;365;358:12;322:2;402:4;394:6;390:17;378:29;;452:3;445;437:6;433:16;423:8;419:31;416:40;413:2;;;469:1;466;459:12;413:2;218:261;;;;;;487:490;;;;627:2;615:9;606:7;602:23;598:32;595:2;;;643:1;640;633:12;595:2;678:1;695:53;740:7;720:9;695:53;;;685:63;;657:97;813:2;802:9;798:18;785:32;837:18;829:6;826:30;823:2;;;869:1;866;859:12;823:2;897:64;953:7;944:6;933:9;929:22;897:64;;;879:82;;;;764:203;589:388;;;;;;984:110;1057:31;1082:5;1057:31;;;1052:3;1045:44;1039:55;;;1101:193;1209:2;1194:18;;1223:61;1198:9;1257:6;1223:61;;;1180:114;;;;;1301:128;1381:42;1370:54;;1353:76",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { ZeroExOrderDataHandler as OrderHandler } from \"./lib/ZeroExOrderDataHandler.sol\";\nimport { LibBytes } from \"../../external/0x/LibBytes.sol\";\nimport { LibOrder as ZeroExOrder } from \"../../external/0x/Exchange/libs/LibOrder.sol\";\nimport { LibFillResults as ZeroExFillResults } from \"../../external/0x/Exchange/libs/LibFillResults.sol\";\nimport { IExchange as ZeroExExchange } from \"../../external/0x/Exchange/interfaces/IExchange.sol\";\nimport { ERC20Wrapper as ERC20 } from \"../../lib/ERC20Wrapper.sol\";\n\n\n\n/**\n * @title ZeroExExchangeWrapper\n * @author Set Protocol\n *\n * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2\n */\ncontract ZeroExExchangeWrapper\n{\n    using SafeMath for uint256;\n\n    /* ============ State Variables ============ */\n\n    address public ZERO_EX_EXCHANGE;\n    address public ZERO_EX_PROXY;\n    address public SET_PROXY;\n\n\n    /* ============ Constructor ============ */\n\n    constructor(\n        address _zeroExExchange,\n        address _zeroExProxy,\n        address _setProxy\n    )\n        public\n    {\n        ZERO_EX_EXCHANGE = _zeroExExchange;\n        ZERO_EX_PROXY = _zeroExProxy;\n        SET_PROXY = _setProxy;\n    }\n\n\n    /* ============ Public Functions ============ */\n\n\n    // The purpose of this function is to decode the order data and execute the trade\n    // TODO - We are currently assuming no taker fee. Add in taker fee going forward\n    function exchange(\n        address _tradeOriginator,\n        bytes _orderData\n    )\n        external\n        // returns (uint256)\n    {\n        // Loop through order data and perform each order\n\n        // Approve the taker token for transfer to the Set Vault\n\n\n        // return 1;\n    }\n\n    /* ============ Getters ============ */\n\n    /* ============ Private ============ */\n    \n    function fillZeroExOrder(\n        bytes _zeroExOrderData\n    )\n        private\n        returns (ZeroExFillResults.FillResults memory)\n    {\n        uint256 fillAmount = OrderHandler.parseFillAmount(_zeroExOrderData);\n        bytes memory signature = OrderHandler.sliceSignature(_zeroExOrderData);\n        ZeroExOrder.Order memory order = OrderHandler.parseZeroExOrder(_zeroExOrderData);\n\n        // Ensure the maker token is allowed to be approved to the ZeroEx proxy\n\n\n        ZeroExFillResults.FillResults memory fillResults = \n            ZeroExExchange(ZERO_EX_EXCHANGE).fillOrKillOrder(\n                order,\n                fillAmount,\n                signature\n            );\n\n        // Ensure the taker token is allowed to be approved to the TransferProxy\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
    "exportedSymbols": {
      "ZeroExExchangeWrapper": [
        1130
      ]
    },
    "id": 1131,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1031,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:7"
      },
      {
        "id": 1032,
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
        "id": 1034,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 6347,
        "src": "658:73:7",
        "symbolAliases": [
          {
            "foreign": 1033,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
        "file": "./lib/ZeroExOrderDataHandler.sol",
        "id": 1036,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 1405,
        "src": "732:90:7",
        "symbolAliases": [
          {
            "foreign": 1035,
            "local": "OrderHandler"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 1038,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 4491,
        "src": "823:58:7",
        "symbolAliases": [
          {
            "foreign": 1037,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1040,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 4342,
        "src": "882:87:7",
        "symbolAliases": [
          {
            "foreign": 1039,
            "local": "ZeroExOrder"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../../external/0x/Exchange/libs/LibFillResults.sol",
        "id": 1042,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 4275,
        "src": "970:105:7",
        "symbolAliases": [
          {
            "foreign": 1041,
            "local": "ZeroExFillResults"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 1044,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 3896,
        "src": "1076:98:7",
        "symbolAliases": [
          {
            "foreign": 1043,
            "local": "ZeroExExchange"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 1046,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 4866,
        "src": "1175:67:7",
        "symbolAliases": [
          {
            "foreign": 1045,
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
        "id": 1130,
        "linearizedBaseContracts": [
          1130
        ],
        "name": "ZeroExExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1049,
            "libraryName": {
              "contractScope": null,
              "id": 1047,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6346,
              "src": "1426:8:7",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6346",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1420:27:7",
            "typeName": {
              "id": 1048,
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
            "id": 1051,
            "name": "ZERO_EX_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 1130,
            "src": "1506:31:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1050,
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
            "id": 1053,
            "name": "ZERO_EX_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1130,
            "src": "1543:28:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1052,
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
            "id": 1055,
            "name": "SET_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1130,
            "src": "1577:24:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1054,
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
              "id": 1076,
              "nodeType": "Block",
              "src": "1785:120:7",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1066,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1064,
                      "name": "ZERO_EX_EXCHANGE",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1051,
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
                      "id": 1065,
                      "name": "_zeroExExchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1057,
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
                  "id": 1067,
                  "nodeType": "ExpressionStatement",
                  "src": "1795:34:7"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1070,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1068,
                      "name": "ZERO_EX_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1053,
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
                      "id": 1069,
                      "name": "_zeroExProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1059,
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
                  "id": 1071,
                  "nodeType": "ExpressionStatement",
                  "src": "1839:28:7"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1074,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1072,
                      "name": "SET_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1055,
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
                      "id": 1073,
                      "name": "_setProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1061,
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
                  "id": 1075,
                  "nodeType": "ExpressionStatement",
                  "src": "1877:21:7"
                }
              ]
            },
            "documentation": null,
            "id": 1077,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1062,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1057,
                  "name": "_zeroExExchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 1077,
                  "src": "1679:23:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1056,
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
                  "id": 1059,
                  "name": "_zeroExProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1077,
                  "src": "1712:20:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1058,
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
                  "id": 1061,
                  "name": "_setProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1077,
                  "src": "1742:17:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1060,
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
              "id": 1063,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1785:0:7"
            },
            "scope": 1130,
            "src": "1658:247:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1084,
              "nodeType": "Block",
              "src": "2272:154:7",
              "statements": []
            },
            "documentation": null,
            "id": 1085,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1082,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1079,
                  "name": "_tradeOriginator",
                  "nodeType": "VariableDeclaration",
                  "scope": 1085,
                  "src": "2165:24:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1078,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2165:7:7",
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
                  "id": 1081,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1085,
                  "src": "2199:16:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1080,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2199:5:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2155:66:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1083,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2272:0:7"
            },
            "scope": 1130,
            "src": "2138:288:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1128,
              "nodeType": "Block",
              "src": "2664:633:7",
              "statements": [
                {
                  "assignments": [
                    1093
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1093,
                      "name": "fillAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1129,
                      "src": "2674:18:7",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1092,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2674:7:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1098,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1096,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1087,
                        "src": "2724:16:7",
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
                        "id": 1094,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1404,
                        "src": "2695:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1404_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1095,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseFillAmount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1209,
                      "src": "2695:28:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1097,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2695:46:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2674:67:7"
                },
                {
                  "assignments": [
                    1100
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1100,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 1129,
                      "src": "2751:22:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 1099,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "2751:5:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1105,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1103,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1087,
                        "src": "2804:16:7",
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
                        "id": 1101,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1404,
                        "src": "2776:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1404_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1102,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sliceSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1240,
                      "src": "2776:27:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (bytes memory)"
                      }
                    },
                    "id": 1104,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2776:45:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2751:70:7"
                },
                {
                  "assignments": [
                    1109
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1109,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1129,
                      "src": "2831:30:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1108,
                        "name": "ZeroExOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4333,
                        "src": "2831:17:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1114,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1112,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1087,
                        "src": "2894:16:7",
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
                        "id": 1110,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1404,
                        "src": "2864:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1404_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1111,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseZeroExOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1370,
                      "src": "2864:29:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_Order_$4333_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 1113,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2864:47:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2831:80:7"
                },
                {
                  "assignments": [
                    1118
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1118,
                      "name": "fillResults",
                      "nodeType": "VariableDeclaration",
                      "scope": 1129,
                      "src": "3004:48:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                        "typeString": "struct LibFillResults.FillResults"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1117,
                        "name": "ZeroExFillResults.FillResults",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4266,
                        "src": "3004:29:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                          "typeString": "struct LibFillResults.FillResults"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1127,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1123,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1109,
                        "src": "3134:5:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1124,
                        "name": "fillAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1093,
                        "src": "3157:10:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1125,
                        "name": "signature",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1100,
                        "src": "3185:9:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
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
                            "id": 1120,
                            "name": "ZERO_EX_EXCHANGE",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1051,
                            "src": "3083:16:7",
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
                          "id": 1119,
                          "name": "ZeroExExchange",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3895,
                          "src": "3068:14:7",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IExchange_$3895_$",
                            "typeString": "type(contract IExchange)"
                          }
                        },
                        "id": 1121,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3068:32:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IExchange_$3895",
                          "typeString": "contract IExchange"
                        }
                      },
                      "id": 1122,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "fillOrKillOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4034,
                      "src": "3068:48:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_struct$_Order_$4333_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$_t_struct$_FillResults_$4266_memory_ptr_$",
                        "typeString": "function (struct LibOrder.Order memory,uint256,bytes memory) external returns (struct LibFillResults.FillResults memory)"
                      }
                    },
                    "id": 1126,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3068:140:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                      "typeString": "struct LibFillResults.FillResults memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3004:204:7"
                }
              ]
            },
            "documentation": null,
            "id": 1129,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1088,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1087,
                  "name": "_zeroExOrderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1129,
                  "src": "2560:22:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1086,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2560:5:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2550:38:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1091,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1090,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1129,
                  "src": "2622:29:7",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1089,
                    "name": "ZeroExFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "2622:29:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2621:38:7"
            },
            "scope": 1130,
            "src": "2526:771:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 1131,
        "src": "1383:1916:7"
      }
    ],
    "src": "597:2703:7"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
    "exportedSymbols": {
      "ZeroExExchangeWrapper": [
        1130
      ]
    },
    "id": 1131,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1031,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:7"
      },
      {
        "id": 1032,
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
        "id": 1034,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 6347,
        "src": "658:73:7",
        "symbolAliases": [
          {
            "foreign": 1033,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
        "file": "./lib/ZeroExOrderDataHandler.sol",
        "id": 1036,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 1405,
        "src": "732:90:7",
        "symbolAliases": [
          {
            "foreign": 1035,
            "local": "OrderHandler"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 1038,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 4491,
        "src": "823:58:7",
        "symbolAliases": [
          {
            "foreign": 1037,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1040,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 4342,
        "src": "882:87:7",
        "symbolAliases": [
          {
            "foreign": 1039,
            "local": "ZeroExOrder"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../../external/0x/Exchange/libs/LibFillResults.sol",
        "id": 1042,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 4275,
        "src": "970:105:7",
        "symbolAliases": [
          {
            "foreign": 1041,
            "local": "ZeroExFillResults"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 1044,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 3896,
        "src": "1076:98:7",
        "symbolAliases": [
          {
            "foreign": 1043,
            "local": "ZeroExExchange"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 1046,
        "nodeType": "ImportDirective",
        "scope": 1131,
        "sourceUnit": 4866,
        "src": "1175:67:7",
        "symbolAliases": [
          {
            "foreign": 1045,
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
        "id": 1130,
        "linearizedBaseContracts": [
          1130
        ],
        "name": "ZeroExExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1049,
            "libraryName": {
              "contractScope": null,
              "id": 1047,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6346,
              "src": "1426:8:7",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6346",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1420:27:7",
            "typeName": {
              "id": 1048,
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
            "id": 1051,
            "name": "ZERO_EX_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 1130,
            "src": "1506:31:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1050,
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
            "id": 1053,
            "name": "ZERO_EX_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1130,
            "src": "1543:28:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1052,
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
            "id": 1055,
            "name": "SET_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 1130,
            "src": "1577:24:7",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 1054,
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
              "id": 1076,
              "nodeType": "Block",
              "src": "1785:120:7",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1066,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1064,
                      "name": "ZERO_EX_EXCHANGE",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1051,
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
                      "id": 1065,
                      "name": "_zeroExExchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1057,
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
                  "id": 1067,
                  "nodeType": "ExpressionStatement",
                  "src": "1795:34:7"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1070,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1068,
                      "name": "ZERO_EX_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1053,
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
                      "id": 1069,
                      "name": "_zeroExProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1059,
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
                  "id": 1071,
                  "nodeType": "ExpressionStatement",
                  "src": "1839:28:7"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1074,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1072,
                      "name": "SET_PROXY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1055,
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
                      "id": 1073,
                      "name": "_setProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1061,
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
                  "id": 1075,
                  "nodeType": "ExpressionStatement",
                  "src": "1877:21:7"
                }
              ]
            },
            "documentation": null,
            "id": 1077,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1062,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1057,
                  "name": "_zeroExExchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 1077,
                  "src": "1679:23:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1056,
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
                  "id": 1059,
                  "name": "_zeroExProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1077,
                  "src": "1712:20:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1058,
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
                  "id": 1061,
                  "name": "_setProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1077,
                  "src": "1742:17:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1060,
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
              "id": 1063,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1785:0:7"
            },
            "scope": 1130,
            "src": "1658:247:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1084,
              "nodeType": "Block",
              "src": "2272:154:7",
              "statements": []
            },
            "documentation": null,
            "id": 1085,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1082,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1079,
                  "name": "_tradeOriginator",
                  "nodeType": "VariableDeclaration",
                  "scope": 1085,
                  "src": "2165:24:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1078,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2165:7:7",
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
                  "id": 1081,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1085,
                  "src": "2199:16:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1080,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2199:5:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2155:66:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1083,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2272:0:7"
            },
            "scope": 1130,
            "src": "2138:288:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1128,
              "nodeType": "Block",
              "src": "2664:633:7",
              "statements": [
                {
                  "assignments": [
                    1093
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1093,
                      "name": "fillAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1129,
                      "src": "2674:18:7",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1092,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2674:7:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1098,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1096,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1087,
                        "src": "2724:16:7",
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
                        "id": 1094,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1404,
                        "src": "2695:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1404_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1095,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseFillAmount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1209,
                      "src": "2695:28:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1097,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2695:46:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2674:67:7"
                },
                {
                  "assignments": [
                    1100
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1100,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 1129,
                      "src": "2751:22:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 1099,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "2751:5:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1105,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1103,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1087,
                        "src": "2804:16:7",
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
                        "id": 1101,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1404,
                        "src": "2776:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1404_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1102,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sliceSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1240,
                      "src": "2776:27:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (bytes memory)"
                      }
                    },
                    "id": 1104,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2776:45:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2751:70:7"
                },
                {
                  "assignments": [
                    1109
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1109,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1129,
                      "src": "2831:30:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1108,
                        "name": "ZeroExOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4333,
                        "src": "2831:17:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4333_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1114,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1112,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1087,
                        "src": "2894:16:7",
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
                        "id": 1110,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1404,
                        "src": "2864:12:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$1404_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 1111,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseZeroExOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1370,
                      "src": "2864:29:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_Order_$4333_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 1113,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2864:47:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2831:80:7"
                },
                {
                  "assignments": [
                    1118
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1118,
                      "name": "fillResults",
                      "nodeType": "VariableDeclaration",
                      "scope": 1129,
                      "src": "3004:48:7",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                        "typeString": "struct LibFillResults.FillResults"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1117,
                        "name": "ZeroExFillResults.FillResults",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4266,
                        "src": "3004:29:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                          "typeString": "struct LibFillResults.FillResults"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1127,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1123,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1109,
                        "src": "3134:5:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1124,
                        "name": "fillAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1093,
                        "src": "3157:10:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1125,
                        "name": "signature",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1100,
                        "src": "3185:9:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_Order_$4333_memory_ptr",
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
                            "id": 1120,
                            "name": "ZERO_EX_EXCHANGE",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1051,
                            "src": "3083:16:7",
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
                          "id": 1119,
                          "name": "ZeroExExchange",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3895,
                          "src": "3068:14:7",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IExchange_$3895_$",
                            "typeString": "type(contract IExchange)"
                          }
                        },
                        "id": 1121,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3068:32:7",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IExchange_$3895",
                          "typeString": "contract IExchange"
                        }
                      },
                      "id": 1122,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "fillOrKillOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4034,
                      "src": "3068:48:7",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_struct$_Order_$4333_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$_t_struct$_FillResults_$4266_memory_ptr_$",
                        "typeString": "function (struct LibOrder.Order memory,uint256,bytes memory) external returns (struct LibFillResults.FillResults memory)"
                      }
                    },
                    "id": 1126,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3068:140:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                      "typeString": "struct LibFillResults.FillResults memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3004:204:7"
                }
              ]
            },
            "documentation": null,
            "id": 1129,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1088,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1087,
                  "name": "_zeroExOrderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1129,
                  "src": "2560:22:7",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1086,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2560:5:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2550:38:7"
            },
            "payable": false,
            "returnParameters": {
              "id": 1091,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1090,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1129,
                  "src": "2622:29:7",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_FillResults_$4266_memory_ptr",
                    "typeString": "struct LibFillResults.FillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1089,
                    "name": "ZeroExFillResults.FillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4266,
                    "src": "2622:29:7",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$4266_storage_ptr",
                      "typeString": "struct LibFillResults.FillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2621:38:7"
            },
            "scope": 1130,
            "src": "2526:771:7",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 1131,
        "src": "1383:1916:7"
      }
    ],
    "src": "597:2703:7"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.168Z"
}
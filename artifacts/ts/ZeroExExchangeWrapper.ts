export const ZeroExExchangeWrapper = 
{
  "contractName": "ZeroExExchangeWrapper",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "zeroExExchange",
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
      "name": "setTransferProxy",
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
      "name": "zeroExProxy",
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
          "name": "_setTransferProxy",
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
          "name": "_taker",
          "type": "address"
        },
        {
          "name": "_orderCount",
          "type": "uint256"
        },
        {
          "name": "_orderData",
          "type": "bytes"
        }
      ],
      "name": "exchange",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        },
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506040516060806104c3833981018060405261002f9190810190610084565b60008054600160a060020a03948516600160a060020a0319918216179091556001805493851693821693909317909255600280549190931691161790556100dd565b600061007d82516100d1565b9392505050565b60008060006060848603121561009957600080fd5b60006100a58686610071565b93505060206100b686828701610071565b92505060406100c786828701610071565b9150509250925092565b600160a060020a031690565b6103d7806100ec6000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630b2d45aa81146100665780633f80cff814610091578063bd5b3046146100a6578063e6d39541146100d4575b600080fd5b34801561007257600080fd5b5061007b6100e9565b6040516100889190610336565b60405180910390f35b34801561009d57600080fd5b5061007b610105565b3480156100b257600080fd5b506100c66100c1366004610212565b610121565b60405161008892919061034a565b3480156100e057600080fd5b5061007b61018e565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b60608060608086604051908082528060200260200182016040528015610151578160200160208202803883390190505b5091508660405190808252806020026020018201604052801561017e578160200160208202803883390190505b5091989197509095505050505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60006101b68235610381565b9392505050565b600080601f830184136101cf57600080fd5b50813567ffffffffffffffff8111156101e757600080fd5b6020830191508360018202830111156101ff57600080fd5b9250929050565b60006101b6823561039a565b6000806000806060858703121561022857600080fd5b600061023487876101aa565b945050602061024587828801610206565b935050604085013567ffffffffffffffff81111561026257600080fd5b61026e878288016101bd565b95989497509550505050565b61028381610381565b82525050565b60006102948261037d565b8084526020840193506102a683610377565b60005b828110156102d6576102bc86835161027a565b6102c582610377565b6020969096019591506001016102a9565b5093949350505050565b60006102eb8261037d565b8084526020840193506102fd83610377565b60005b828110156102d65761031386835161032d565b61031c82610377565b602096909601959150600101610300565b6102838161039a565b60208101610344828461027a565b92915050565b6040808252810161035b8185610289565b9050818103602083015261036f81846102e0565b949350505050565b60200190565b5190565b73ffffffffffffffffffffffffffffffffffffffff1690565b905600a265627a7a723058206b180be6577ef51be900ed2c9d34683676226750c6bc7b76c296312eb2c2df036c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x6080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630b2d45aa81146100665780633f80cff814610091578063bd5b3046146100a6578063e6d39541146100d4575b600080fd5b34801561007257600080fd5b5061007b6100e9565b6040516100889190610336565b60405180910390f35b34801561009d57600080fd5b5061007b610105565b3480156100b257600080fd5b506100c66100c1366004610212565b610121565b60405161008892919061034a565b3480156100e057600080fd5b5061007b61018e565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b60608060608086604051908082528060200260200182016040528015610151578160200160208202803883390190505b5091508660405190808252806020026020018201604052801561017e578160200160208202803883390190505b5091989197509095505050505050565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60006101b68235610381565b9392505050565b600080601f830184136101cf57600080fd5b50813567ffffffffffffffff8111156101e757600080fd5b6020830191508360018202830111156101ff57600080fd5b9250929050565b60006101b6823561039a565b6000806000806060858703121561022857600080fd5b600061023487876101aa565b945050602061024587828801610206565b935050604085013567ffffffffffffffff81111561026257600080fd5b61026e878288016101bd565b95989497509550505050565b61028381610381565b82525050565b60006102948261037d565b8084526020840193506102a683610377565b60005b828110156102d6576102bc86835161027a565b6102c582610377565b6020969096019591506001016102a9565b5093949350505050565b60006102eb8261037d565b8084526020840193506102fd83610377565b60005b828110156102d65761031386835161032d565b61031c82610377565b602096909601959150600101610300565b6102838161039a565b60208101610344828461027a565b92915050565b6040808252810161035b8185610289565b9050818103602083015261036f81846102e0565b949350505050565b60200190565b5190565b73ffffffffffffffffffffffffffffffffffffffff1690565b905600a265627a7a723058206b180be6577ef51be900ed2c9d34683676226750c6bc7b76c296312eb2c2df036c6578706572696d656e74616cf50037",
  "sourceMap": "1382:4376:1:-;;;2115:266;8:9:-1;5:2;;;30:1;27;20:12;5:2;2115:266:1;;;;;;;;;;;;;;;;;;;;;;2260:14;:32;;-1:-1:-1;;;;;2260:32:1;;;-1:-1:-1;;;;;;2260:32:1;;;;;;;;2302:26;;;;;;;;;;;;;;;2338:16;:36;;;;;;;;;;;1382:4376;;5:122:-1;;83:39;114:6;108:13;83:39;;;74:48;68:59;-1:-1;;;68:59;134:535;;;;283:2;271:9;262:7;258:23;254:32;251:2;;;299:1;296;289:12;251:2;334:1;351:64;407:7;387:9;351:64;;;341:74;;313:108;452:2;470:64;526:7;517:6;506:9;502:22;470:64;;;460:74;;431:109;571:2;589:64;645:7;636:6;625:9;621:22;589:64;;;579:74;;550:109;245:424;;;;;;676:128;-1:-1;;;;;745:54;;728:76;;1382:4376:1;;;;;;",
  "deployedSourceMap": "1382:4376:1:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1638:29;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1638:29:1;;;;;;;;;;;;;;;;;;;;1705:31;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1705:31:1;;;;2985:1141;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2985:1141:1;;;;;;;;;;;;;;;;;;1673:26;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1673:26:1;;;;1638:29;;;;;;:::o;1705:31::-;;;;;;:::o;2985:1141::-;3119:9;3130;3155:28;3222:29;3200:11;3186:26;;;;;;;;;;;;;;;;;;;;;;29:2:-1;21:6;17:15;117:4;105:10;97:6;88:34;136:17;;-1:-1;3186:26:1;;3155:57;;3268:11;3254:26;;;;;;;;;;;;;;;;;;;;;;29:2:-1;21:6;17:15;117:4;105:10;97:6;88:34;136:17;;-1:-1;3254:26:1;-1:-1:-1;4072:11:1;;3222:58;;-1:-1:-1;2985:1141:1;;-1:-1:-1;;;;;;2985:1141:1:o;1673:26::-;;;;;;:::o;5:118:-1:-;;72:46;110:6;97:20;72:46;;;63:55;57:66;-1:-1;;;57:66;144:335;;;251:4;239:17;;235:27;-1:-1;225:2;;276:1;273;266:12;225:2;-1:-1;296:20;;336:18;325:30;;322:2;;;368:1;365;358:12;322:2;402:4;394:6;390:17;378:29;;452:3;445;437:6;433:16;423:8;419:31;416:40;413:2;;;469:1;466;459:12;413:2;218:261;;;;;;487:118;;554:46;592:6;579:20;554:46;;612:615;;;;;769:2;757:9;748:7;744:23;740:32;737:2;;;785:1;782;775:12;737:2;820:1;837:53;882:7;862:9;837:53;;;827:63;;799:97;927:2;945:53;990:7;981:6;970:9;966:22;945:53;;;935:63;;906:98;1063:2;1052:9;1048:18;1035:32;1087:18;1079:6;1076:30;1073:2;;;1119:1;1116;1109:12;1073:2;1147:64;1203:7;1194:6;1183:9;1179:22;1147:64;;;731:496;;;;-1:-1;1129:82;-1:-1;;;;731:496;1234:110;1307:31;1332:5;1307:31;;;1302:3;1295:44;1289:55;;;1382:590;;1517:54;1565:5;1517:54;;;1589:6;1584:3;1577:19;1613:4;1608:3;1604:14;1597:21;;1658:56;1708:5;1658:56;;;1735:1;1720:230;1745:6;1742:1;1739:13;1720:230;;;1785:53;1834:3;1825:6;1819:13;1785:53;;;1855:60;1908:6;1855:60;;;1938:4;1929:14;;;;;1845:70;-1:-1;1767:1;1760:9;1720:230;;;-1:-1;1963:3;;1496:476;-1:-1;;;;1496:476;2011:590;;2146:54;2194:5;2146:54;;;2218:6;2213:3;2206:19;2242:4;2237:3;2233:14;2226:21;;2287:56;2337:5;2287:56;;;2364:1;2349:230;2374:6;2371:1;2368:13;2349:230;;;2414:53;2463:3;2454:6;2448:13;2414:53;;;2484:60;2537:6;2484:60;;;2567:4;2558:14;;;;;2474:70;-1:-1;2396:1;2389:9;2349:230;;2609:110;2682:31;2707:5;2682:31;;2726:193;2834:2;2819:18;;2848:61;2823:9;2882:6;2848:61;;;2805:114;;;;;2926:590;3162:2;3176:47;;;3147:18;;3237:98;3147:18;3321:6;3237:98;;;3229:106;;3383:9;3377:4;3373:20;3368:2;3357:9;3353:18;3346:48;3408:98;3501:4;3492:6;3408:98;;;3400:106;3133:383;-1:-1;;;;3133:383;3525:121;3634:4;3622:17;;3603:43;3787:107;3877:12;;3861:33;4277:128;4357:42;4346:54;;4329:76;4412:79;4481:5;4464:27",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { ERC20Wrapper as ERC20 } from \"../../lib/ERC20Wrapper.sol\";\nimport { IExchange as ZeroExExchange } from \"../../external/0x/Exchange/interfaces/IExchange.sol\";\nimport { LibBytes } from \"../../external/0x/LibBytes.sol\";\nimport { LibFillResults as ZeroExFillResults } from \"../../external/0x/Exchange/libs/LibFillResults.sol\";\nimport { LibOrder as ZeroExOrder } from \"../../external/0x/Exchange/libs/LibOrder.sol\";\nimport { ZeroExOrderDataHandler as OrderHandler } from \"./lib/ZeroExOrderDataHandler.sol\";\n\n\n/**\n * @title ZeroExExchangeWrapper\n * @author Set Protocol\n *\n * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2\n */\ncontract ZeroExExchangeWrapper {\n    using SafeMath for uint256;\n\n    /* ============ Structs ============ */\n\n    struct TakerFillResults {\n        address token;\n        uint256 fillAmount;\n    }\n\n    /* ============ State Variables ============ */\n\n    address public zeroExExchange;\n    address public zeroExProxy;\n    address public setTransferProxy;\n\n    /* ============ Constructor ============ */\n\n    /**\n     * Initialize exchange wrapper with required addresses to facilitate 0x orders\n     *\n     * @param  _zeroExExchange     0x Exchange contract for filling orders\n     * @param  _zeroExProxy        0x Proxy contract for transferring\n     * @param  _setTransferProxy   Set Protocol transfer proxy contract\n     */\n    constructor(\n        address _zeroExExchange,\n        address _zeroExProxy,\n        address _setTransferProxy\n    )\n        public\n    {\n        zeroExExchange = _zeroExExchange;\n        zeroExProxy = _zeroExProxy;\n        setTransferProxy = _setTransferProxy;\n    }\n\n    /* ============ Public Functions ============ */\n\n    /**\n     * IExchange interface delegate method.\n     * Parses 0x exchange orders and transfers tokens from taker's wallet.\n     *\n     * TODO: We are currently assuming no taker fee. Add in taker fee going forward\n     *\n     * @param  _taker              Taker wallet address\n     * @param  _orderCount         Amount of orders in exchange request\n     * @param  _orderData          Encoded taker wallet order data\n     * @return Array of token addresses executed in orders\n     * @return Array of token amounts executed in orders\n     */\n    function exchange(\n        address _taker,\n        uint _orderCount,\n        bytes _orderData\n    )\n        external\n        returns (address[], uint256[])\n    {\n        address[] memory takerTokens = new address[](_orderCount);\n        uint256[] memory takerAmounts = new uint256[](_orderCount);\n\n        // First 32 bytes are reserved for the number of orders\n        // uint256 orderNum = 0;\n        // uint256 offset = 32;\n        // while (offset < _orderData.length) {\n        //     bytes memory zeroExOrder = OrderHandler.sliceOrderBody(_orderData, offset);\n            \n        //     TakerFillResults memory takerFillResults = fillZeroExOrder(zeroExOrder);\n\n        //     // TODO: optimize so that fill results are aggregated on a per-token basis\n        //     takerTokens[orderNum] = takerFillResults.token;\n        //     takerAmounts[orderNum] = takerFillResults.fillAmount;\n\n        //     // Update current bytes\n        //     offset += OrderHandler.getZeroExOrderDataLength(_orderData, offset);\n        //     orderNum += 1;\n        // }\n\n        return (\n            takerTokens,\n            takerAmounts\n        );\n    }\n\n    /* ============ Private ============ */\n\n    /**\n     * Executes 0x order from signed order data\n     *\n     * @param  _zeroExOrderData   Bytes array for a 0x order, its signature, and the fill amount\n     */\n    function fillZeroExOrder(\n        bytes memory _zeroExOrderData\n    )\n        private\n        returns (TakerFillResults memory)\n    {\n        OrderHandler.OrderHeader memory header = OrderHandler.parseOrderHeader(_zeroExOrderData);\n        bytes memory signature = OrderHandler.parseSignature(header.signatureLength, _zeroExOrderData);\n        ZeroExOrder.Order memory order = OrderHandler.parseZeroExOrder(_zeroExOrderData);\n\n        // Ensure the maker token is allowed to be transferred by ZeroEx Proxy\n        address takerToken = OrderHandler.parseERC20TokenAddress(order.takerAssetData);\n        ERC20.ensureAllowance(\n            takerToken,\n            address(this),\n            zeroExProxy,\n            order.takerAssetAmount\n        );\n\n        ZeroExFillResults.FillResults memory fillResults = ZeroExExchange(zeroExExchange).fillOrKillOrder(\n            order,\n            header.fillAmount,\n            signature\n        );\n\n        // Ensure the maker token is allowed to be transferred by Set TransferProxy\n        address makerToken = OrderHandler.parseERC20TokenAddress(order.makerAssetData);\n        ERC20.ensureAllowance(\n            makerToken,\n            address(this),\n            setTransferProxy,\n            order.makerAssetAmount\n        );\n\n        return TakerFillResults({\n            token: takerToken,\n            fillAmount: fillResults.takerAssetFilledAmount\n        });\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
    "exportedSymbols": {
      "ZeroExExchangeWrapper": [
        215
      ]
    },
    "id": 216,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 28,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:1"
      },
      {
        "id": 29,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:1"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 31,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 3619,
        "src": "658:73:1",
        "symbolAliases": [
          {
            "foreign": 30,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 33,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 3410,
        "src": "732:67:1",
        "symbolAliases": [
          {
            "foreign": 32,
            "local": "ERC20"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 35,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 2743,
        "src": "800:98:1",
        "symbolAliases": [
          {
            "foreign": 34,
            "local": "ZeroExExchange"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 37,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 3229,
        "src": "899:58:1",
        "symbolAliases": [
          {
            "foreign": 36,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../../external/0x/Exchange/libs/LibFillResults.sol",
        "id": 39,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 3013,
        "src": "958:105:1",
        "symbolAliases": [
          {
            "foreign": 38,
            "local": "ZeroExFillResults"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 41,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 3080,
        "src": "1064:87:1",
        "symbolAliases": [
          {
            "foreign": 40,
            "local": "ZeroExOrder"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
        "file": "./lib/ZeroExOrderDataHandler.sol",
        "id": 43,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 442,
        "src": "1152:90:1",
        "symbolAliases": [
          {
            "foreign": 42,
            "local": "OrderHandler"
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
        "id": 215,
        "linearizedBaseContracts": [
          215
        ],
        "name": "ZeroExExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 46,
            "libraryName": {
              "contractScope": null,
              "id": 44,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3618,
              "src": "1425:8:1",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$3618",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1419:27:1",
            "typeName": {
              "id": 45,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1438:7:1",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "canonicalName": "ZeroExExchangeWrapper.TakerFillResults",
            "id": 51,
            "members": [
              {
                "constant": false,
                "id": 48,
                "name": "token",
                "nodeType": "VariableDeclaration",
                "scope": 51,
                "src": "1531:13:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 47,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1531:7:1",
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
                "id": 50,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 51,
                "src": "1554:18:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 49,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1554:7:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "TakerFillResults",
            "nodeType": "StructDefinition",
            "scope": 215,
            "src": "1497:82:1",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 53,
            "name": "zeroExExchange",
            "nodeType": "VariableDeclaration",
            "scope": 215,
            "src": "1638:29:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 52,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1638:7:1",
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
            "id": 55,
            "name": "zeroExProxy",
            "nodeType": "VariableDeclaration",
            "scope": 215,
            "src": "1673:26:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 54,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1673:7:1",
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
            "id": 57,
            "name": "setTransferProxy",
            "nodeType": "VariableDeclaration",
            "scope": 215,
            "src": "1705:31:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 56,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1705:7:1",
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
              "id": 78,
              "nodeType": "Block",
              "src": "2250:131:1",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 68,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 66,
                      "name": "zeroExExchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 53,
                      "src": "2260:14:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 67,
                      "name": "_zeroExExchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 59,
                      "src": "2277:15:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "2260:32:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 69,
                  "nodeType": "ExpressionStatement",
                  "src": "2260:32:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 72,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 70,
                      "name": "zeroExProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 55,
                      "src": "2302:11:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 71,
                      "name": "_zeroExProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 61,
                      "src": "2316:12:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "2302:26:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 73,
                  "nodeType": "ExpressionStatement",
                  "src": "2302:26:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 76,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 74,
                      "name": "setTransferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 57,
                      "src": "2338:16:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 75,
                      "name": "_setTransferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 63,
                      "src": "2357:17:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "2338:36:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 77,
                  "nodeType": "ExpressionStatement",
                  "src": "2338:36:1"
                }
              ]
            },
            "documentation": "Initialize exchange wrapper with required addresses to facilitate 0x orders\n     * @param  _zeroExExchange     0x Exchange contract for filling orders\n@param  _zeroExProxy        0x Proxy contract for transferring\n@param  _setTransferProxy   Set Protocol transfer proxy contract",
            "id": 79,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 64,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 59,
                  "name": "_zeroExExchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 79,
                  "src": "2136:23:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 58,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2136:7:1",
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
                  "id": 61,
                  "name": "_zeroExProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 79,
                  "src": "2169:20:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 60,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2169:7:1",
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
                  "id": 63,
                  "name": "_setTransferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 79,
                  "src": "2199:25:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 62,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2199:7:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2126:104:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 65,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2250:0:1"
            },
            "scope": 215,
            "src": "2115:266:1",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 118,
              "nodeType": "Block",
              "src": "3145:981:1",
              "statements": [
                {
                  "assignments": [
                    97
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 97,
                      "name": "takerTokens",
                      "nodeType": "VariableDeclaration",
                      "scope": 119,
                      "src": "3155:28:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[]"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 95,
                          "name": "address",
                          "nodeType": "ElementaryTypeName",
                          "src": "3155:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "id": 96,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "3155:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                          "typeString": "address[]"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 103,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 101,
                        "name": "_orderCount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 83,
                        "src": "3200:11:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 100,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "NewExpression",
                      "src": "3186:13:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_address_$dyn_memory_$",
                        "typeString": "function (uint256) pure returns (address[] memory)"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 98,
                          "name": "address",
                          "nodeType": "ElementaryTypeName",
                          "src": "3190:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "id": 99,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "3190:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                          "typeString": "address[]"
                        }
                      }
                    },
                    "id": 102,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3186:26:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_memory",
                      "typeString": "address[] memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3155:57:1"
                },
                {
                  "assignments": [
                    107
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 107,
                      "name": "takerAmounts",
                      "nodeType": "VariableDeclaration",
                      "scope": 119,
                      "src": "3222:29:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                        "typeString": "uint256[]"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 105,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3222:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 106,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "3222:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 113,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 111,
                        "name": "_orderCount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 83,
                        "src": "3268:11:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 110,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "NewExpression",
                      "src": "3254:13:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
                        "typeString": "function (uint256) pure returns (uint256[] memory)"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 108,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3258:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 109,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "3258:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      }
                    },
                    "id": 112,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3254:26:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_memory",
                      "typeString": "uint256[] memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3222:58:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "components": [
                      {
                        "argumentTypes": null,
                        "id": 114,
                        "name": "takerTokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 97,
                        "src": "4072:11:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 115,
                        "name": "takerAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 107,
                        "src": "4097:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                          "typeString": "uint256[] memory"
                        }
                      }
                    ],
                    "id": 116,
                    "isConstant": false,
                    "isInlineArray": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "TupleExpression",
                    "src": "4058:61:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                      "typeString": "tuple(address[] memory,uint256[] memory)"
                    }
                  },
                  "functionReturnParameters": 93,
                  "id": 117,
                  "nodeType": "Return",
                  "src": "4051:68:1"
                }
              ]
            },
            "documentation": "IExchange interface delegate method.\nParses 0x exchange orders and transfers tokens from taker's wallet.\n     * TODO: We are currently assuming no taker fee. Add in taker fee going forward\n     * @param  _taker              Taker wallet address\n@param  _orderCount         Amount of orders in exchange request\n@param  _orderData          Encoded taker wallet order data\n@return Array of token addresses executed in orders\n@return Array of token amounts executed in orders",
            "id": 119,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 86,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 81,
                  "name": "_taker",
                  "nodeType": "VariableDeclaration",
                  "scope": 119,
                  "src": "3012:14:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 80,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3012:7:1",
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
                  "id": 83,
                  "name": "_orderCount",
                  "nodeType": "VariableDeclaration",
                  "scope": 119,
                  "src": "3036:16:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 82,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3036:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 85,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 119,
                  "src": "3062:16:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 84,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3062:5:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3002:82:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 93,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 89,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 119,
                  "src": "3119:9:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 87,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3119:7:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 88,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3119:9:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 92,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 119,
                  "src": "3130:9:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 90,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3130:7:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 91,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3130:9:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3118:22:1"
            },
            "scope": 215,
            "src": "2985:1141:1",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 213,
              "nodeType": "Block",
              "src": "4477:1279:1",
              "statements": [
                {
                  "assignments": [
                    129
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 129,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "4487:38:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 128,
                        "name": "OrderHandler.OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 250,
                        "src": "4487:24:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$250_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 134,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 132,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 121,
                        "src": "4558:16:1",
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
                        "id": 130,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 441,
                        "src": "4528:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$441_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 131,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseOrderHeader",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 293,
                      "src": "4528:29:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_OrderHeader_$250_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct ZeroExOrderDataHandler.OrderHeader memory)"
                      }
                    },
                    "id": 133,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4528:47:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4487:88:1"
                },
                {
                  "assignments": [
                    136
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 136,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "4585:22:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 135,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "4585:5:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 143,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 139,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 129,
                          "src": "4638:6:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 140,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "signatureLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 241,
                        "src": "4638:22:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 141,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 121,
                        "src": "4662:16:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
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
                        "id": 137,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 441,
                        "src": "4610:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$441_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 138,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 316,
                      "src": "4610:27:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_bytes_memory_ptr_$returns$_t_bytes_memory_ptr_$",
                        "typeString": "function (uint256,bytes memory) pure returns (bytes memory)"
                      }
                    },
                    "id": 142,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4610:69:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4585:94:1"
                },
                {
                  "assignments": [
                    147
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 147,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "4689:30:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 146,
                        "name": "ZeroExOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3071,
                        "src": "4689:17:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 152,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 150,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 121,
                        "src": "4752:16:1",
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
                        "id": 148,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 441,
                        "src": "4722:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$441_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 149,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseZeroExOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 350,
                      "src": "4722:29:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_Order_$3071_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 151,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4722:47:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4689:80:1"
                },
                {
                  "assignments": [
                    154
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 154,
                      "name": "takerToken",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "4859:18:1",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 153,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "4859:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 160,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 157,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 147,
                          "src": "4916:5:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                            "typeString": "struct LibOrder.Order memory"
                          }
                        },
                        "id": 158,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetData",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3070,
                        "src": "4916:20:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 155,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 441,
                        "src": "4880:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$441_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 156,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseERC20TokenAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 279,
                      "src": "4880:35:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (bytes memory) pure returns (address)"
                      }
                    },
                    "id": 159,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4880:57:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4859:78:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 164,
                        "name": "takerToken",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 154,
                        "src": "4982:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 166,
                            "name": "this",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3802,
                            "src": "5014:4:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_ZeroExExchangeWrapper_$215",
                              "typeString": "contract ZeroExExchangeWrapper"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_ZeroExExchangeWrapper_$215",
                              "typeString": "contract ZeroExExchangeWrapper"
                            }
                          ],
                          "id": 165,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "5006:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 167,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5006:13:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 168,
                        "name": "zeroExProxy",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 55,
                        "src": "5033:11:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 169,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 147,
                          "src": "5058:5:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                            "typeString": "struct LibOrder.Order memory"
                          }
                        },
                        "id": 170,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3058,
                        "src": "5058:22:1",
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
                        "id": 161,
                        "name": "ERC20",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3409,
                        "src": "4947:5:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$3409_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 163,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "ensureAllowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3393,
                      "src": "4947:21:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 171,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4947:143:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 172,
                  "nodeType": "ExpressionStatement",
                  "src": "4947:143:1"
                },
                {
                  "assignments": [
                    176
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 176,
                      "name": "fillResults",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "5101:48:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_FillResults_$3004_memory_ptr",
                        "typeString": "struct LibFillResults.FillResults"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 175,
                        "name": "ZeroExFillResults.FillResults",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3004,
                        "src": "5101:29:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_FillResults_$3004_storage_ptr",
                          "typeString": "struct LibFillResults.FillResults"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 186,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 181,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 147,
                        "src": "5212:5:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 182,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 129,
                          "src": "5231:6:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 183,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "fillAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 249,
                        "src": "5231:17:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 184,
                        "name": "signature",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 136,
                        "src": "5262:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
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
                            "id": 178,
                            "name": "zeroExExchange",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 53,
                            "src": "5167:14:1",
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
                          "id": 177,
                          "name": "ZeroExExchange",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2742,
                          "src": "5152:14:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IExchange_$2742_$",
                            "typeString": "type(contract IExchange)"
                          }
                        },
                        "id": 179,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5152:30:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IExchange_$2742",
                          "typeString": "contract IExchange"
                        }
                      },
                      "id": 180,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "fillOrKillOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2855,
                      "src": "5152:46:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_struct$_Order_$3071_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$_t_struct$_FillResults_$3004_memory_ptr_$",
                        "typeString": "function (struct LibOrder.Order memory,uint256,bytes memory) external returns (struct LibFillResults.FillResults memory)"
                      }
                    },
                    "id": 185,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5152:129:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3004_memory_ptr",
                      "typeString": "struct LibFillResults.FillResults memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5101:180:1"
                },
                {
                  "assignments": [
                    188
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 188,
                      "name": "makerToken",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "5376:18:1",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 187,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "5376:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 194,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 191,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 147,
                          "src": "5433:5:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                            "typeString": "struct LibOrder.Order memory"
                          }
                        },
                        "id": 192,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetData",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3068,
                        "src": "5433:20:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 189,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 441,
                        "src": "5397:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$441_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 190,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseERC20TokenAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 279,
                      "src": "5397:35:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (bytes memory) pure returns (address)"
                      }
                    },
                    "id": 193,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5397:57:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5376:78:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 198,
                        "name": "makerToken",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 188,
                        "src": "5499:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 200,
                            "name": "this",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3802,
                            "src": "5531:4:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_ZeroExExchangeWrapper_$215",
                              "typeString": "contract ZeroExExchangeWrapper"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_ZeroExExchangeWrapper_$215",
                              "typeString": "contract ZeroExExchangeWrapper"
                            }
                          ],
                          "id": 199,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "5523:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 201,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5523:13:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 202,
                        "name": "setTransferProxy",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 57,
                        "src": "5550:16:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 203,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 147,
                          "src": "5580:5:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                            "typeString": "struct LibOrder.Order memory"
                          }
                        },
                        "id": 204,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3056,
                        "src": "5580:22:1",
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
                        "id": 195,
                        "name": "ERC20",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3409,
                        "src": "5464:5:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$3409_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 197,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "ensureAllowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3393,
                      "src": "5464:21:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 205,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5464:148:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 206,
                  "nodeType": "ExpressionStatement",
                  "src": "5464:148:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 208,
                        "name": "takerToken",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 154,
                        "src": "5668:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 209,
                          "name": "fillResults",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 176,
                          "src": "5704:11:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_FillResults_$3004_memory_ptr",
                            "typeString": "struct LibFillResults.FillResults memory"
                          }
                        },
                        "id": 210,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetFilledAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2999,
                        "src": "5704:34:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": null,
                      "id": 207,
                      "name": "TakerFillResults",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 51,
                      "src": "5630:16:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_TakerFillResults_$51_storage_ptr_$",
                        "typeString": "type(struct ZeroExExchangeWrapper.TakerFillResults storage pointer)"
                      }
                    },
                    "id": 211,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "token",
                      "fillAmount"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "5630:119:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_TakerFillResults_$51_memory",
                      "typeString": "struct ZeroExExchangeWrapper.TakerFillResults memory"
                    }
                  },
                  "functionReturnParameters": 125,
                  "id": 212,
                  "nodeType": "Return",
                  "src": "5623:126:1"
                }
              ]
            },
            "documentation": "Executes 0x order from signed order data\n     * @param  _zeroExOrderData   Bytes array for a 0x order, its signature, and the fill amount",
            "id": 214,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 122,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 121,
                  "name": "_zeroExOrderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 214,
                  "src": "4379:29:1",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 120,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4379:5:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4369:45:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 125,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 124,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 214,
                  "src": "4448:16:1",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_TakerFillResults_$51_memory_ptr",
                    "typeString": "struct ZeroExExchangeWrapper.TakerFillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 123,
                    "name": "TakerFillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 51,
                    "src": "4448:16:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_TakerFillResults_$51_storage_ptr",
                      "typeString": "struct ZeroExExchangeWrapper.TakerFillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4447:25:1"
            },
            "scope": 215,
            "src": "4345:1411:1",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 216,
        "src": "1382:4376:1"
      }
    ],
    "src": "597:5162:1"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/ZeroExExchangeWrapper.sol",
    "exportedSymbols": {
      "ZeroExExchangeWrapper": [
        215
      ]
    },
    "id": 216,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 28,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:1"
      },
      {
        "id": 29,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:1"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 31,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 3619,
        "src": "658:73:1",
        "symbolAliases": [
          {
            "foreign": 30,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 33,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 3410,
        "src": "732:67:1",
        "symbolAliases": [
          {
            "foreign": 32,
            "local": "ERC20"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 35,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 2743,
        "src": "800:98:1",
        "symbolAliases": [
          {
            "foreign": 34,
            "local": "ZeroExExchange"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 37,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 3229,
        "src": "899:58:1",
        "symbolAliases": [
          {
            "foreign": 36,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibFillResults.sol",
        "file": "../../external/0x/Exchange/libs/LibFillResults.sol",
        "id": 39,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 3013,
        "src": "958:105:1",
        "symbolAliases": [
          {
            "foreign": 38,
            "local": "ZeroExFillResults"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 41,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 3080,
        "src": "1064:87:1",
        "symbolAliases": [
          {
            "foreign": 40,
            "local": "ZeroExOrder"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
        "file": "./lib/ZeroExOrderDataHandler.sol",
        "id": 43,
        "nodeType": "ImportDirective",
        "scope": 216,
        "sourceUnit": 442,
        "src": "1152:90:1",
        "symbolAliases": [
          {
            "foreign": 42,
            "local": "OrderHandler"
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
        "id": 215,
        "linearizedBaseContracts": [
          215
        ],
        "name": "ZeroExExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 46,
            "libraryName": {
              "contractScope": null,
              "id": 44,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3618,
              "src": "1425:8:1",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$3618",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1419:27:1",
            "typeName": {
              "id": 45,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1438:7:1",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "canonicalName": "ZeroExExchangeWrapper.TakerFillResults",
            "id": 51,
            "members": [
              {
                "constant": false,
                "id": 48,
                "name": "token",
                "nodeType": "VariableDeclaration",
                "scope": 51,
                "src": "1531:13:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 47,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1531:7:1",
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
                "id": 50,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 51,
                "src": "1554:18:1",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 49,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1554:7:1",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "TakerFillResults",
            "nodeType": "StructDefinition",
            "scope": 215,
            "src": "1497:82:1",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 53,
            "name": "zeroExExchange",
            "nodeType": "VariableDeclaration",
            "scope": 215,
            "src": "1638:29:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 52,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1638:7:1",
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
            "id": 55,
            "name": "zeroExProxy",
            "nodeType": "VariableDeclaration",
            "scope": 215,
            "src": "1673:26:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 54,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1673:7:1",
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
            "id": 57,
            "name": "setTransferProxy",
            "nodeType": "VariableDeclaration",
            "scope": 215,
            "src": "1705:31:1",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 56,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1705:7:1",
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
              "id": 78,
              "nodeType": "Block",
              "src": "2250:131:1",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 68,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 66,
                      "name": "zeroExExchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 53,
                      "src": "2260:14:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 67,
                      "name": "_zeroExExchange",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 59,
                      "src": "2277:15:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "2260:32:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 69,
                  "nodeType": "ExpressionStatement",
                  "src": "2260:32:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 72,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 70,
                      "name": "zeroExProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 55,
                      "src": "2302:11:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 71,
                      "name": "_zeroExProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 61,
                      "src": "2316:12:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "2302:26:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 73,
                  "nodeType": "ExpressionStatement",
                  "src": "2302:26:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 76,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 74,
                      "name": "setTransferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 57,
                      "src": "2338:16:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 75,
                      "name": "_setTransferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 63,
                      "src": "2357:17:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "2338:36:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 77,
                  "nodeType": "ExpressionStatement",
                  "src": "2338:36:1"
                }
              ]
            },
            "documentation": "Initialize exchange wrapper with required addresses to facilitate 0x orders\n     * @param  _zeroExExchange     0x Exchange contract for filling orders\n@param  _zeroExProxy        0x Proxy contract for transferring\n@param  _setTransferProxy   Set Protocol transfer proxy contract",
            "id": 79,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 64,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 59,
                  "name": "_zeroExExchange",
                  "nodeType": "VariableDeclaration",
                  "scope": 79,
                  "src": "2136:23:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 58,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2136:7:1",
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
                  "id": 61,
                  "name": "_zeroExProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 79,
                  "src": "2169:20:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 60,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2169:7:1",
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
                  "id": 63,
                  "name": "_setTransferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 79,
                  "src": "2199:25:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 62,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2199:7:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2126:104:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 65,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2250:0:1"
            },
            "scope": 215,
            "src": "2115:266:1",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 118,
              "nodeType": "Block",
              "src": "3145:981:1",
              "statements": [
                {
                  "assignments": [
                    97
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 97,
                      "name": "takerTokens",
                      "nodeType": "VariableDeclaration",
                      "scope": 119,
                      "src": "3155:28:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[]"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 95,
                          "name": "address",
                          "nodeType": "ElementaryTypeName",
                          "src": "3155:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "id": 96,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "3155:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                          "typeString": "address[]"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 103,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 101,
                        "name": "_orderCount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 83,
                        "src": "3200:11:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 100,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "NewExpression",
                      "src": "3186:13:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_address_$dyn_memory_$",
                        "typeString": "function (uint256) pure returns (address[] memory)"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 98,
                          "name": "address",
                          "nodeType": "ElementaryTypeName",
                          "src": "3190:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "id": 99,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "3190:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                          "typeString": "address[]"
                        }
                      }
                    },
                    "id": 102,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3186:26:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_memory",
                      "typeString": "address[] memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3155:57:1"
                },
                {
                  "assignments": [
                    107
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 107,
                      "name": "takerAmounts",
                      "nodeType": "VariableDeclaration",
                      "scope": 119,
                      "src": "3222:29:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                        "typeString": "uint256[]"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 105,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3222:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 106,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "3222:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 113,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 111,
                        "name": "_orderCount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 83,
                        "src": "3268:11:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 110,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "NewExpression",
                      "src": "3254:13:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
                        "typeString": "function (uint256) pure returns (uint256[] memory)"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 108,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3258:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 109,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "3258:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      }
                    },
                    "id": 112,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3254:26:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_memory",
                      "typeString": "uint256[] memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3222:58:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "components": [
                      {
                        "argumentTypes": null,
                        "id": 114,
                        "name": "takerTokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 97,
                        "src": "4072:11:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 115,
                        "name": "takerAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 107,
                        "src": "4097:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                          "typeString": "uint256[] memory"
                        }
                      }
                    ],
                    "id": 116,
                    "isConstant": false,
                    "isInlineArray": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "TupleExpression",
                    "src": "4058:61:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                      "typeString": "tuple(address[] memory,uint256[] memory)"
                    }
                  },
                  "functionReturnParameters": 93,
                  "id": 117,
                  "nodeType": "Return",
                  "src": "4051:68:1"
                }
              ]
            },
            "documentation": "IExchange interface delegate method.\nParses 0x exchange orders and transfers tokens from taker's wallet.\n     * TODO: We are currently assuming no taker fee. Add in taker fee going forward\n     * @param  _taker              Taker wallet address\n@param  _orderCount         Amount of orders in exchange request\n@param  _orderData          Encoded taker wallet order data\n@return Array of token addresses executed in orders\n@return Array of token amounts executed in orders",
            "id": 119,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 86,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 81,
                  "name": "_taker",
                  "nodeType": "VariableDeclaration",
                  "scope": 119,
                  "src": "3012:14:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 80,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3012:7:1",
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
                  "id": 83,
                  "name": "_orderCount",
                  "nodeType": "VariableDeclaration",
                  "scope": 119,
                  "src": "3036:16:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 82,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3036:4:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 85,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 119,
                  "src": "3062:16:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 84,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3062:5:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3002:82:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 93,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 89,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 119,
                  "src": "3119:9:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 87,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3119:7:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 88,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3119:9:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 92,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 119,
                  "src": "3130:9:1",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 90,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3130:7:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 91,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3130:9:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3118:22:1"
            },
            "scope": 215,
            "src": "2985:1141:1",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 213,
              "nodeType": "Block",
              "src": "4477:1279:1",
              "statements": [
                {
                  "assignments": [
                    129
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 129,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "4487:38:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 128,
                        "name": "OrderHandler.OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 250,
                        "src": "4487:24:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$250_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 134,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 132,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 121,
                        "src": "4558:16:1",
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
                        "id": 130,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 441,
                        "src": "4528:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$441_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 131,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseOrderHeader",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 293,
                      "src": "4528:29:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_OrderHeader_$250_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct ZeroExOrderDataHandler.OrderHeader memory)"
                      }
                    },
                    "id": 133,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4528:47:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4487:88:1"
                },
                {
                  "assignments": [
                    136
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 136,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "4585:22:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 135,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "4585:5:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 143,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 139,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 129,
                          "src": "4638:6:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 140,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "signatureLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 241,
                        "src": "4638:22:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 141,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 121,
                        "src": "4662:16:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
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
                        "id": 137,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 441,
                        "src": "4610:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$441_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 138,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 316,
                      "src": "4610:27:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_bytes_memory_ptr_$returns$_t_bytes_memory_ptr_$",
                        "typeString": "function (uint256,bytes memory) pure returns (bytes memory)"
                      }
                    },
                    "id": 142,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4610:69:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4585:94:1"
                },
                {
                  "assignments": [
                    147
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 147,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "4689:30:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 146,
                        "name": "ZeroExOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3071,
                        "src": "4689:17:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 152,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 150,
                        "name": "_zeroExOrderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 121,
                        "src": "4752:16:1",
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
                        "id": 148,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 441,
                        "src": "4722:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$441_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 149,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseZeroExOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 350,
                      "src": "4722:29:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_Order_$3071_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 151,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4722:47:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4689:80:1"
                },
                {
                  "assignments": [
                    154
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 154,
                      "name": "takerToken",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "4859:18:1",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 153,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "4859:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 160,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 157,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 147,
                          "src": "4916:5:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                            "typeString": "struct LibOrder.Order memory"
                          }
                        },
                        "id": 158,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetData",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3070,
                        "src": "4916:20:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 155,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 441,
                        "src": "4880:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$441_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 156,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseERC20TokenAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 279,
                      "src": "4880:35:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (bytes memory) pure returns (address)"
                      }
                    },
                    "id": 159,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4880:57:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4859:78:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 164,
                        "name": "takerToken",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 154,
                        "src": "4982:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 166,
                            "name": "this",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3802,
                            "src": "5014:4:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_ZeroExExchangeWrapper_$215",
                              "typeString": "contract ZeroExExchangeWrapper"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_ZeroExExchangeWrapper_$215",
                              "typeString": "contract ZeroExExchangeWrapper"
                            }
                          ],
                          "id": 165,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "5006:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 167,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5006:13:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 168,
                        "name": "zeroExProxy",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 55,
                        "src": "5033:11:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 169,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 147,
                          "src": "5058:5:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                            "typeString": "struct LibOrder.Order memory"
                          }
                        },
                        "id": 170,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3058,
                        "src": "5058:22:1",
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
                        "id": 161,
                        "name": "ERC20",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3409,
                        "src": "4947:5:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$3409_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 163,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "ensureAllowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3393,
                      "src": "4947:21:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 171,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4947:143:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 172,
                  "nodeType": "ExpressionStatement",
                  "src": "4947:143:1"
                },
                {
                  "assignments": [
                    176
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 176,
                      "name": "fillResults",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "5101:48:1",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_FillResults_$3004_memory_ptr",
                        "typeString": "struct LibFillResults.FillResults"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 175,
                        "name": "ZeroExFillResults.FillResults",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3004,
                        "src": "5101:29:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_FillResults_$3004_storage_ptr",
                          "typeString": "struct LibFillResults.FillResults"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 186,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 181,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 147,
                        "src": "5212:5:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 182,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 129,
                          "src": "5231:6:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 183,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "fillAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 249,
                        "src": "5231:17:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 184,
                        "name": "signature",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 136,
                        "src": "5262:9:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
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
                            "id": 178,
                            "name": "zeroExExchange",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 53,
                            "src": "5167:14:1",
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
                          "id": 177,
                          "name": "ZeroExExchange",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2742,
                          "src": "5152:14:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IExchange_$2742_$",
                            "typeString": "type(contract IExchange)"
                          }
                        },
                        "id": 179,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5152:30:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IExchange_$2742",
                          "typeString": "contract IExchange"
                        }
                      },
                      "id": 180,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "fillOrKillOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2855,
                      "src": "5152:46:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_struct$_Order_$3071_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$_t_struct$_FillResults_$3004_memory_ptr_$",
                        "typeString": "function (struct LibOrder.Order memory,uint256,bytes memory) external returns (struct LibFillResults.FillResults memory)"
                      }
                    },
                    "id": 185,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5152:129:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_FillResults_$3004_memory_ptr",
                      "typeString": "struct LibFillResults.FillResults memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5101:180:1"
                },
                {
                  "assignments": [
                    188
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 188,
                      "name": "makerToken",
                      "nodeType": "VariableDeclaration",
                      "scope": 214,
                      "src": "5376:18:1",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 187,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "5376:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 194,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 191,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 147,
                          "src": "5433:5:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                            "typeString": "struct LibOrder.Order memory"
                          }
                        },
                        "id": 192,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetData",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3068,
                        "src": "5433:20:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory",
                          "typeString": "bytes memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory",
                          "typeString": "bytes memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 189,
                        "name": "OrderHandler",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 441,
                        "src": "5397:12:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ZeroExOrderDataHandler_$441_$",
                          "typeString": "type(library ZeroExOrderDataHandler)"
                        }
                      },
                      "id": 190,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "parseERC20TokenAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 279,
                      "src": "5397:35:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (bytes memory) pure returns (address)"
                      }
                    },
                    "id": 193,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5397:57:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5376:78:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 198,
                        "name": "makerToken",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 188,
                        "src": "5499:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 200,
                            "name": "this",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3802,
                            "src": "5531:4:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_ZeroExExchangeWrapper_$215",
                              "typeString": "contract ZeroExExchangeWrapper"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_ZeroExExchangeWrapper_$215",
                              "typeString": "contract ZeroExExchangeWrapper"
                            }
                          ],
                          "id": 199,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "5523:7:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 201,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5523:13:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 202,
                        "name": "setTransferProxy",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 57,
                        "src": "5550:16:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 203,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 147,
                          "src": "5580:5:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                            "typeString": "struct LibOrder.Order memory"
                          }
                        },
                        "id": 204,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3056,
                        "src": "5580:22:1",
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
                        "id": 195,
                        "name": "ERC20",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3409,
                        "src": "5464:5:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$3409_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 197,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "ensureAllowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3393,
                      "src": "5464:21:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 205,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5464:148:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 206,
                  "nodeType": "ExpressionStatement",
                  "src": "5464:148:1"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 208,
                        "name": "takerToken",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 154,
                        "src": "5668:10:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 209,
                          "name": "fillResults",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 176,
                          "src": "5704:11:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_FillResults_$3004_memory_ptr",
                            "typeString": "struct LibFillResults.FillResults memory"
                          }
                        },
                        "id": 210,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetFilledAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2999,
                        "src": "5704:34:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": null,
                      "id": 207,
                      "name": "TakerFillResults",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 51,
                      "src": "5630:16:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_TakerFillResults_$51_storage_ptr_$",
                        "typeString": "type(struct ZeroExExchangeWrapper.TakerFillResults storage pointer)"
                      }
                    },
                    "id": 211,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "token",
                      "fillAmount"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "5630:119:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_TakerFillResults_$51_memory",
                      "typeString": "struct ZeroExExchangeWrapper.TakerFillResults memory"
                    }
                  },
                  "functionReturnParameters": 125,
                  "id": 212,
                  "nodeType": "Return",
                  "src": "5623:126:1"
                }
              ]
            },
            "documentation": "Executes 0x order from signed order data\n     * @param  _zeroExOrderData   Bytes array for a 0x order, its signature, and the fill amount",
            "id": 214,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 122,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 121,
                  "name": "_zeroExOrderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 214,
                  "src": "4379:29:1",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 120,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4379:5:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4369:45:1"
            },
            "payable": false,
            "returnParameters": {
              "id": 125,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 124,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 214,
                  "src": "4448:16:1",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_TakerFillResults_$51_memory_ptr",
                    "typeString": "struct ZeroExExchangeWrapper.TakerFillResults"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 123,
                    "name": "TakerFillResults",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 51,
                    "src": "4448:16:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_TakerFillResults_$51_storage_ptr",
                      "typeString": "struct ZeroExExchangeWrapper.TakerFillResults"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4447:25:1"
            },
            "scope": 215,
            "src": "4345:1411:1",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 216,
        "src": "1382:4376:1"
      }
    ],
    "src": "597:5162:1"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T02:05:30.469Z"
}
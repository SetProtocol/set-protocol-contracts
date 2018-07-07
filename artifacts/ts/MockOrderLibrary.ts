export const MockOrderLibrary = 
{
  "contractName": "MockOrderLibrary",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_addresses",
          "type": "address[4]"
        },
        {
          "name": "_values",
          "type": "uint256[5]"
        }
      ],
      "name": "testGenerateOrderHash",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_orderHash",
          "type": "bytes32"
        },
        {
          "name": "_signerAddress",
          "type": "address"
        },
        {
          "name": "_v",
          "type": "uint8"
        },
        {
          "name": "_r",
          "type": "bytes32"
        },
        {
          "name": "_s",
          "type": "bytes32"
        }
      ],
      "name": "testValidateSignature",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506108ad806100206000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806388759aeb14610051578063c4dec7b11461008e575b600080fd5b34801561005d57600080fd5b5061007860048036036100739190810190610642565b6100cb565b604051610085919061073e565b60405180910390f35b34801561009a57600080fd5b506100b560048036036100b0919081019061067f565b6100df565b6040516100c29190610723565b60405180910390f35b60006100d783836100f9565b905092915050565b60006100ee868686868661035c565b905095945050505050565b600082600060048110151561010a57fe5b602002015183600160048110151561011e57fe5b602002015184600260048110151561013257fe5b602002015185600360048110151561014657fe5b602002015185600060058110151561015a57fe5b602002015186600160058110151561016e57fe5b602002015187600260058110151561018257fe5b602002015188600360058110151561019657fe5b60200201518960046005811015156101aa57fe5b6020020151604051602001808a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140186815260200185815260200184815260200183815260200182815260200199505050505050505050506040516020818303038152906040526040518082805190602001908083835b6020831015156103275780518252602082019150602081019050602083039250610302565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040518091039020905092915050565b60008060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600181896040516020018083805190602001908083835b6020831015156103d557805182526020820191506020810190506020830392506103b0565b6001836020036101000a0380198251168184511680821785525050505050509050018260001916600019168152602001925050506040516020818303038152906040526040518082805190602001908083835b60208310151561044d5780518252602082019150602081019050602083039250610428565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390208787876040516000815260200160405260405161049a9493929190610759565b60206040516020810390808403906000865af11580156104be573d6000803e3d6000fd5b5050506020604051035191508673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149250505095945050505050565b60006105128235610832565b905092915050565b600082601f830112151561052d57600080fd5b600461054061053b826107cb565b61079e565b9150818385602084028201111561055657600080fd5b60005b83811015610586578161056c8882610506565b845260208401935060208301925050600181019050610559565b5050505092915050565b600082601f83011215156105a357600080fd5b60056105b66105b1826107ed565b61079e565b915081838560208402820111156105cc57600080fd5b60005b838110156105fc57816105e2888261061a565b8452602084019350602083019250506001810190506105cf565b5050505092915050565b60006106128235610852565b905092915050565b6000610626823561085c565b905092915050565b600061063a8235610866565b905092915050565b600080610120838503121561065657600080fd5b60006106648582860161051a565b925050608061067585828601610590565b9150509250929050565b600080600080600060a0868803121561069757600080fd5b60006106a588828901610606565b95505060206106b688828901610506565b94505060406106c78882890161062e565b93505060606106d888828901610606565b92505060806106e988828901610606565b9150509295509295909350565b6106ff8161080f565b82525050565b61070e8161081b565b82525050565b61071d81610825565b82525050565b600060208201905061073860008301846106f6565b92915050565b60006020820190506107536000830184610705565b92915050565b600060808201905061076e6000830187610705565b61077b6020830186610714565b6107886040830185610705565b6107956060830184610705565b95945050505050565b6000604051905081810181811067ffffffffffffffff821117156107c157600080fd5b8060405250919050565b600067ffffffffffffffff8211156107e257600080fd5b602082029050919050565b600067ffffffffffffffff82111561080457600080fd5b602082029050919050565b60008115159050919050565b6000819050919050565b600060ff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000819050919050565b600060ff821690509190505600a265627a7a7230582027a763099107722af98eebabfa6a0c3e801bf23e397e56412b2169a9056587a36c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806388759aeb14610051578063c4dec7b11461008e575b600080fd5b34801561005d57600080fd5b5061007860048036036100739190810190610642565b6100cb565b604051610085919061073e565b60405180910390f35b34801561009a57600080fd5b506100b560048036036100b0919081019061067f565b6100df565b6040516100c29190610723565b60405180910390f35b60006100d783836100f9565b905092915050565b60006100ee868686868661035c565b905095945050505050565b600082600060048110151561010a57fe5b602002015183600160048110151561011e57fe5b602002015184600260048110151561013257fe5b602002015185600360048110151561014657fe5b602002015185600060058110151561015a57fe5b602002015186600160058110151561016e57fe5b602002015187600260058110151561018257fe5b602002015188600360058110151561019657fe5b60200201518960046005811015156101aa57fe5b6020020151604051602001808a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140186815260200185815260200184815260200183815260200182815260200199505050505050505050506040516020818303038152906040526040518082805190602001908083835b6020831015156103275780518252602082019150602081019050602083039250610302565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040518091039020905092915050565b60008060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600181896040516020018083805190602001908083835b6020831015156103d557805182526020820191506020810190506020830392506103b0565b6001836020036101000a0380198251168184511680821785525050505050509050018260001916600019168152602001925050506040516020818303038152906040526040518082805190602001908083835b60208310151561044d5780518252602082019150602081019050602083039250610428565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390208787876040516000815260200160405260405161049a9493929190610759565b60206040516020810390808403906000865af11580156104be573d6000803e3d6000fd5b5050506020604051035191508673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149250505095945050505050565b60006105128235610832565b905092915050565b600082601f830112151561052d57600080fd5b600461054061053b826107cb565b61079e565b9150818385602084028201111561055657600080fd5b60005b83811015610586578161056c8882610506565b845260208401935060208301925050600181019050610559565b5050505092915050565b600082601f83011215156105a357600080fd5b60056105b66105b1826107ed565b61079e565b915081838560208402820111156105cc57600080fd5b60005b838110156105fc57816105e2888261061a565b8452602084019350602083019250506001810190506105cf565b5050505092915050565b60006106128235610852565b905092915050565b6000610626823561085c565b905092915050565b600061063a8235610866565b905092915050565b600080610120838503121561065657600080fd5b60006106648582860161051a565b925050608061067585828601610590565b9150509250929050565b600080600080600060a0868803121561069757600080fd5b60006106a588828901610606565b95505060206106b688828901610506565b94505060406106c78882890161062e565b93505060606106d888828901610606565b92505060806106e988828901610606565b9150509295509295909350565b6106ff8161080f565b82525050565b61070e8161081b565b82525050565b61071d81610825565b82525050565b600060208201905061073860008301846106f6565b92915050565b60006020820190506107536000830184610705565b92915050565b600060808201905061076e6000830187610705565b61077b6020830186610714565b6107886040830185610705565b6107956060830184610705565b95945050505050565b6000604051905081810181811067ffffffffffffffff821117156107c157600080fd5b8060405250919050565b600067ffffffffffffffff8211156107e257600080fd5b602082029050919050565b600067ffffffffffffffff82111561080457600080fd5b602082029050919050565b60008115159050919050565b6000819050919050565b600060ff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000819050919050565b600060ff821690509190505600a265627a7a7230582027a763099107722af98eebabfa6a0c3e801bf23e397e56412b2169a9056587a36c6578706572696d656e74616cf50037",
  "sourceMap": "184:672:36:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;184:672:36;;;;;;;",
  "deployedSourceMap": "184:672:36:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;216:259;;8:9:-1;5:2;;;30:1;27;20:12;5:2;216:259:36;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;481:373;;8:9:-1;5:2;;;30:1;27;20:12;5:2;481:373:36;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;216:259;353:7;383:85;427:10;451:7;383:30;:85::i;:::-;376:92;;216:259;;;;:::o;481:373::-;680:4;707:140;751:10;775:14;803:2;819;835;707:30;:140::i;:::-;700:147;;481:373;;;;;;;:::o;1706:688:25:-;1841:7;1965:10;1976:1;1965:13;;;;;;;;;;;;;2010:10;2021:1;2010:13;;;;;;;;;;;;;2057:10;2068:1;2057:13;;;;;;;;;;;;;2102:10;2113:1;2102:13;;;;;;;;;;;;;2149:7;2157:1;2149:10;;;;;;;;;;;;;2192:7;2200:1;2192:10;;;;;;;;;;;;;2243:7;2251:1;2243:10;;;;;;;;;;;;;2288:7;2296:1;2288:10;;;;;;;;;;;;;2341:7;2349:1;2341:10;;;;;;;;;;;;;1931:446;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;49:4:-1;39:7;30;26:21;22:32;13:7;6:49;1931:446:25;;;1908:479;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:11;51:19;36:153;;;182:3;176:10;171:3;164:23;98:2;93:3;89:12;82:19;;123:2;118:3;114:12;107:19;;148:2;143:3;139:12;132:19;;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;1908:479:25;;;;;;;;;;;;;;;;1901:486;;1706:688;;;;:::o;2758:647::-;2955:4;3032:18;3092:22;:59;;;;;;;;;;;;;;;;;;;;3221:131;3271:9;3282:10;3254:39;;;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:11;51:19;36:153;;;182:3;176:10;171:3;164:23;98:2;93:3;89:12;82:19;;123:2;118:3;114:12;107:19;;148:2;143:3;139:12;132:19;;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;3254:39:25;;;;;;;;;;;;;;;;;;;;;;;49:4:-1;39:7;30;26:21;22:32;13:7;6:49;3254:39:25;;;3244:50;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:11;51:19;36:153;;;182:3;176:10;171:3;164:23;98:2;93:3;89:12;82:19;;123:2;118:3;114:12;107:19;;148:2;143:3;139:12;132:19;;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;3244:50:25;;;;;;;;;;;;;;;;3308:2;3324;3340;3221:131;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3221:131:25;;;;;;;;3208:144;;3384:14;3370:28;;:10;:28;;;3363:35;;2758:647;;;;;;;;;:::o;5:118:-1:-;;72:46;110:6;97:20;72:46;;;63:55;;57:66;;;;;149:615;;264:3;257:4;249:6;245:17;241:27;234:35;231:2;;;282:1;279;272:12;231:2;306:3;324:78;339:62;394:6;339:62;;;324:78;;;315:87;;419:5;478:6;525:3;517:4;509:6;505:17;500:3;496:27;493:36;490:2;;;542:1;539;532:12;490:2;567:1;552:206;577:6;574:1;571:13;552:206;;;635:3;657:37;690:3;678:10;657:37;;;652:3;645:50;718:4;713:3;709:14;702:21;;746:4;741:3;737:14;730:21;;609:149;599:1;596;592:9;587:14;;552:206;;;556:14;224:540;;;;;;;;791:615;;906:3;899:4;891:6;887:17;883:27;876:35;873:2;;;924:1;921;914:12;873:2;948:3;966:78;981:62;1036:6;981:62;;;966:78;;;957:87;;1061:5;1120:6;1167:3;1159:4;1151:6;1147:17;1142:3;1138:27;1135:36;1132:2;;;1184:1;1181;1174:12;1132:2;1209:1;1194:206;1219:6;1216:1;1213:13;1194:206;;;1277:3;1299:37;1332:3;1320:10;1299:37;;;1294:3;1287:50;1360:4;1355:3;1351:14;1344:21;;1388:4;1383:3;1379:14;1372:21;;1251:149;1241:1;1238;1234:9;1229:14;;1194:206;;;1198:14;866:540;;;;;;;;1414:118;;1481:46;1519:6;1506:20;1481:46;;;1472:55;;1466:66;;;;;1539:118;;1606:46;1644:6;1631:20;1606:46;;;1597:55;;1591:66;;;;;1664:114;;1729:44;1765:6;1752:20;1729:44;;;1720:53;;1714:64;;;;;1785:460;;;1952:3;1940:9;1931:7;1927:23;1923:33;1920:2;;;1969:1;1966;1959:12;1920:2;2004:1;2021:76;2089:7;2080:6;2069:9;2065:22;2021:76;;;2011:86;;1983:120;2134:3;2153:76;2221:7;2212:6;2201:9;2197:22;2153:76;;;2143:86;;2113:122;1914:331;;;;;;2252:739;;;;;;2422:3;2410:9;2401:7;2397:23;2393:33;2390:2;;;2439:1;2436;2429:12;2390:2;2474:1;2491:53;2536:7;2527:6;2516:9;2512:22;2491:53;;;2481:63;;2453:97;2581:2;2599:53;2644:7;2635:6;2624:9;2620:22;2599:53;;;2589:63;;2560:98;2689:2;2707:51;2750:7;2741:6;2730:9;2726:22;2707:51;;;2697:61;;2668:96;2795:2;2813:53;2858:7;2849:6;2838:9;2834:22;2813:53;;;2803:63;;2774:98;2903:3;2922:53;2967:7;2958:6;2947:9;2943:22;2922:53;;;2912:63;;2882:99;2384:607;;;;;;;;;2998:101;3065:28;3087:5;3065:28;;;3060:3;3053:41;3047:52;;;3106:110;3179:31;3204:5;3179:31;;;3174:3;3167:44;3161:55;;;3223:104;3292:29;3315:5;3292:29;;;3287:3;3280:42;3274:53;;;3334:181;;3436:2;3425:9;3421:18;3413:26;;3450:55;3502:1;3491:9;3487:17;3478:6;3450:55;;;3407:108;;;;;3522:193;;3630:2;3619:9;3615:18;3607:26;;3644:61;3702:1;3691:9;3687:17;3678:6;3644:61;;;3601:114;;;;;3722:489;;3910:3;3899:9;3895:19;3887:27;;3925:61;3983:1;3972:9;3968:17;3959:6;3925:61;;;3997:58;4051:2;4040:9;4036:18;4027:6;3997:58;;;4066:62;4124:2;4113:9;4109:18;4100:6;4066:62;;;4139;4197:2;4186:9;4182:18;4173:6;4139:62;;;3881:330;;;;;;;;4218:256;;4280:2;4274:9;4264:19;;4318:4;4310:6;4306:17;4417:6;4405:10;4402:22;4381:18;4369:10;4366:34;4363:62;4360:2;;;4438:1;4435;4428:12;4360:2;4458:10;4454:2;4447:22;4258:216;;;;;4481:233;;4638:18;4630:6;4627:30;4624:2;;;4670:1;4667;4660:12;4624:2;4699:4;4691:6;4687:17;4679:25;;4561:153;;;;4721:233;;4878:18;4870:6;4867:30;4864:2;;;4910:1;4907;4900:12;4864:2;4939:4;4931:6;4927:17;4919:25;;4801:153;;;;4961:92;;5041:5;5034:13;5027:21;5016:32;;5010:43;;;;5060:79;;5129:5;5118:16;;5112:27;;;;5146:88;;5224:4;5217:5;5213:16;5202:27;;5196:38;;;;5241:128;;5321:42;5314:5;5310:54;5299:65;;5293:76;;;;5376:79;;5445:5;5434:16;;5428:27;;;;5462:79;;5531:5;5520:16;;5514:27;;;;5548:88;;5626:4;5619:5;5615:16;5604:27;;5598:38;;;",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { OrderLibrary } from \"../../core/lib/OrderLibrary.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract MockOrderLibrary {\n    function testGenerateOrderHash(\n        address[4] _addresses,\n        uint[5] _values\n    )\n        public\n        pure\n        returns(bytes32)\n    {\n        return OrderLibrary.generateOrderHash(\n            _addresses,\n            _values\n        );\n    }\n\n    function testValidateSignature(\n        bytes32 _orderHash,\n        address _signerAddress,\n        uint8 _v,\n        bytes32 _r,\n        bytes32 _s\n    )\n        public\n        pure\n        returns(bool)\n    {\n        return OrderLibrary.validateSignature(\n            _orderHash,\n            _signerAddress,\n            _v,\n            _r,\n            _s\n        );\n    }\n}\n\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/test/lib/MockOrderLibrary.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/test/lib/MockOrderLibrary.sol",
    "exportedSymbols": {
      "MockOrderLibrary": [
        4513
      ]
    },
    "id": 4514,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4464,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:36"
      },
      {
        "id": 4465,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:36"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../../core/lib/OrderLibrary.sol",
        "id": 4467,
        "nodeType": "ImportDirective",
        "scope": 4514,
        "sourceUnit": 2982,
        "src": "61:63:36",
        "symbolAliases": [
          {
            "foreign": 4466,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4513,
        "linearizedBaseContracts": [
          4513
        ],
        "name": "MockOrderLibrary",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 4486,
              "nodeType": "Block",
              "src": "366:109:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4482,
                        "name": "_addresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4471,
                        "src": "427:10:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$4_memory_ptr",
                          "typeString": "address[4] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4483,
                        "name": "_values",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4475,
                        "src": "451:7:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                          "typeString": "uint256[5] memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_array$_t_address_$4_memory_ptr",
                          "typeString": "address[4] memory"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                          "typeString": "uint256[5] memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 4480,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2981,
                        "src": "383:12:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 4481,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "generateOrderHash",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2938,
                      "src": "383:30:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$4_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                        "typeString": "function (address[4] memory,uint256[5] memory) pure returns (bytes32)"
                      }
                    },
                    "id": 4484,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "383:85:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 4479,
                  "id": 4485,
                  "nodeType": "Return",
                  "src": "376:92:36"
                }
              ]
            },
            "documentation": null,
            "id": 4487,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testGenerateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4476,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4471,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 4487,
                  "src": "256:21:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$4_memory_ptr",
                    "typeString": "address[4]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4468,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "256:7:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4470,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "34",
                      "id": 4469,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "264:1:36",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "4"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "256:10:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$4_storage_ptr",
                      "typeString": "address[4]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4475,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 4487,
                  "src": "287:15:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4472,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "287:4:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4474,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4473,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "292:1:36",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "287:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "246:62:36"
            },
            "payable": false,
            "returnParameters": {
              "id": 4479,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4478,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4487,
                  "src": "353:7:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4477,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "353:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "352:9:36"
            },
            "scope": 4513,
            "src": "216:259:36",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 4511,
              "nodeType": "Block",
              "src": "690:164:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4504,
                        "name": "_orderHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4489,
                        "src": "751:10:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4505,
                        "name": "_signerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4491,
                        "src": "775:14:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4506,
                        "name": "_v",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4493,
                        "src": "803:2:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4507,
                        "name": "_r",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4495,
                        "src": "819:2:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4508,
                        "name": "_s",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4497,
                        "src": "835:2:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 4502,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2981,
                        "src": "707:12:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 4503,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validateSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2980,
                      "src": "707:30:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                        "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                      }
                    },
                    "id": 4509,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "707:140:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 4501,
                  "id": 4510,
                  "nodeType": "Return",
                  "src": "700:147:36"
                }
              ]
            },
            "documentation": null,
            "id": 4512,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testValidateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4498,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4489,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "521:18:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4488,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "521:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4491,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "549:22:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4490,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "549:7:36",
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
                  "id": 4493,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "581:8:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 4492,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "581:5:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4495,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "599:10:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4494,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "599:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4497,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "619:10:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4496,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "619:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "511:124:36"
            },
            "payable": false,
            "returnParameters": {
              "id": 4501,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4500,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "680:4:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4499,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "680:4:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "679:6:36"
            },
            "scope": 4513,
            "src": "481:373:36",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4514,
        "src": "184:672:36"
      }
    ],
    "src": "0:858:36"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/test/lib/MockOrderLibrary.sol",
    "exportedSymbols": {
      "MockOrderLibrary": [
        4513
      ]
    },
    "id": 4514,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4464,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:36"
      },
      {
        "id": 4465,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:36"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../../core/lib/OrderLibrary.sol",
        "id": 4467,
        "nodeType": "ImportDirective",
        "scope": 4514,
        "sourceUnit": 2982,
        "src": "61:63:36",
        "symbolAliases": [
          {
            "foreign": 4466,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4513,
        "linearizedBaseContracts": [
          4513
        ],
        "name": "MockOrderLibrary",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 4486,
              "nodeType": "Block",
              "src": "366:109:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4482,
                        "name": "_addresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4471,
                        "src": "427:10:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$4_memory_ptr",
                          "typeString": "address[4] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4483,
                        "name": "_values",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4475,
                        "src": "451:7:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                          "typeString": "uint256[5] memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_array$_t_address_$4_memory_ptr",
                          "typeString": "address[4] memory"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                          "typeString": "uint256[5] memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 4480,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2981,
                        "src": "383:12:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 4481,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "generateOrderHash",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2938,
                      "src": "383:30:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$4_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                        "typeString": "function (address[4] memory,uint256[5] memory) pure returns (bytes32)"
                      }
                    },
                    "id": 4484,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "383:85:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 4479,
                  "id": 4485,
                  "nodeType": "Return",
                  "src": "376:92:36"
                }
              ]
            },
            "documentation": null,
            "id": 4487,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testGenerateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4476,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4471,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 4487,
                  "src": "256:21:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$4_memory_ptr",
                    "typeString": "address[4]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4468,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "256:7:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4470,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "34",
                      "id": 4469,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "264:1:36",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "4"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "256:10:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$4_storage_ptr",
                      "typeString": "address[4]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4475,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 4487,
                  "src": "287:15:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4472,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "287:4:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4474,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4473,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "292:1:36",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "287:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "246:62:36"
            },
            "payable": false,
            "returnParameters": {
              "id": 4479,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4478,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4487,
                  "src": "353:7:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4477,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "353:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "352:9:36"
            },
            "scope": 4513,
            "src": "216:259:36",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 4511,
              "nodeType": "Block",
              "src": "690:164:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4504,
                        "name": "_orderHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4489,
                        "src": "751:10:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4505,
                        "name": "_signerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4491,
                        "src": "775:14:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4506,
                        "name": "_v",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4493,
                        "src": "803:2:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4507,
                        "name": "_r",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4495,
                        "src": "819:2:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4508,
                        "name": "_s",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4497,
                        "src": "835:2:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 4502,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2981,
                        "src": "707:12:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 4503,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validateSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2980,
                      "src": "707:30:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                        "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                      }
                    },
                    "id": 4509,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "707:140:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 4501,
                  "id": 4510,
                  "nodeType": "Return",
                  "src": "700:147:36"
                }
              ]
            },
            "documentation": null,
            "id": 4512,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testValidateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4498,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4489,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "521:18:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4488,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "521:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4491,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "549:22:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4490,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "549:7:36",
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
                  "id": 4493,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "581:8:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 4492,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "581:5:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint8",
                      "typeString": "uint8"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4495,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "599:10:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4494,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "599:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 4497,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "619:10:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4496,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "619:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "511:124:36"
            },
            "payable": false,
            "returnParameters": {
              "id": 4501,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4500,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4512,
                  "src": "680:4:36",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4499,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "680:4:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "679:6:36"
            },
            "scope": 4513,
            "src": "481:373:36",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4514,
        "src": "184:672:36"
      }
    ],
    "src": "0:858:36"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.916Z"
}
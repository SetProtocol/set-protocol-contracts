export const OrderLibraryMock = 
{
  "contractName": "OrderLibraryMock",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_addresses",
          "type": "address[5]"
        },
        {
          "name": "_values",
          "type": "uint256[6]"
        },
        {
          "name": "_requiredComponents",
          "type": "address[]"
        },
        {
          "name": "_requiredComponentAmounts",
          "type": "uint256[]"
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
  "bytecode": "0x608060405234801561001057600080fd5b50610809806100206000396000f30060806040526004361061004b5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663c4dec7b18114610050578063e7e668a314610086575b600080fd5b34801561005c57600080fd5b5061007061006b36600461064c565b6100b3565b60405161007d91906106eb565b60405180910390f35b34801561009257600080fd5b506100a66100a1366004610592565b610168565b60405161007d91906106ff565b6040517fef4b688f00000000000000000000000000000000000000000000000000000000815260009073__OrderLibrary__________________________9063ef4b688f9061010e908990899089908990899060040161070d565b60206040518083038186803b15801561012657600080fd5b505af415801561013a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061015e9190810190610626565b9695505050505050565b60006101768585858561017f565b95945050505050565b6000848160200201518560016020020151866002602002015187600360200201518860046020020151886000602002015189600160200201518a600260200201518b600360200201518c600460200201518d600560200201518d8d604051602001808e600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018d600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018c600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018b600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018a600160a060020a0316600160a060020a03166c01000000000000000000000000028152601401898152602001888152602001878152602001868152602001858152602001848152602001838051906020019060200280838360005b838110156102f15781810151838201526020016102d9565b50505050905001828051906020019060200280838360005b83811015610321578181015183820152602001610309565b505050509050019d50505050505050505050505050506040516020818303038152906040526040518082805190602001908083835b602083106103755780518252601f199092019160209182019101610356565b5181516020939093036101000a6000190180199091169216919091179052604051920182900390912098975050505050505050565b60006103b682356107b5565b9392505050565b6000601f820183136103ce57600080fd5b60056103e16103dc82610776565b61074f565b915081838560208402820111156103f757600080fd5b60005b83811015610423578161040d88826103aa565b84525060209283019291909101906001016103fa565b5050505092915050565b6000601f8201831361043e57600080fd5b813561044c6103dc82610794565b9150818183526020840193506020810190508385602084028201111561047157600080fd5b60005b83811015610423578161048788826103aa565b8452506020928301929190910190600101610474565b6000601f820183136104ae57600080fd5b60066104bc6103dc82610776565b915081838560208402820111156104d257600080fd5b60005b8381101561042357816104e8888261057a565b84525060209283019291909101906001016104d5565b6000601f8201831361050f57600080fd5b813561051d6103dc82610794565b9150818183526020840193506020810190508385602084028201111561054257600080fd5b60005b838110156104235781610558888261057a565b8452506020928301929190910190600101610545565b60006103b682516107c1565b60006103b682356107c6565b60006103b682356107c9565b6000806000806101a085870312156105a957600080fd5b60006105b587876103bd565b94505060a06105c68782880161049d565b93505061016085013567ffffffffffffffff8111156105e457600080fd5b6105f08782880161042d565b92505061018085013567ffffffffffffffff81111561060e57600080fd5b61061a878288016104fe565b91505092959194509250565b60006020828403121561063857600080fd5b6000610644848461056e565b949350505050565b600080600080600060a0868803121561066457600080fd5b6000610670888861057a565b9550506020610681888289016103aa565b945050604061069288828901610586565b93505060606106a38882890161057a565b92505060806106b48882890161057a565b9150509295509295909350565b6106ca816107b5565b82525050565b6106ca816107c1565b6106ca816107c6565b6106ca816107c9565b602081016106f982846106d0565b92915050565b602081016106f982846106d9565b60a0810161071b82886106d9565b61072860208301876106c1565b61073560408301866106e2565b61074260608301856106d9565b61015e60808301846106d9565b60405181810167ffffffffffffffff8111828210171561076e57600080fd5b604052919050565b600067ffffffffffffffff82111561078d57600080fd5b5060200290565b600067ffffffffffffffff8211156107ab57600080fd5b5060209081020190565b600160a060020a031690565b151590565b90565b60ff16905600a265627a7a72305820b4222d95b34be681285eb3fd5f4cbac8d58bc2114c9e36141e28ebcc03de16486c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x60806040526004361061004b5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663c4dec7b18114610050578063e7e668a314610086575b600080fd5b34801561005c57600080fd5b5061007061006b36600461064c565b6100b3565b60405161007d91906106eb565b60405180910390f35b34801561009257600080fd5b506100a66100a1366004610592565b610168565b60405161007d91906106ff565b6040517fef4b688f00000000000000000000000000000000000000000000000000000000815260009073__OrderLibrary__________________________9063ef4b688f9061010e908990899089908990899060040161070d565b60206040518083038186803b15801561012657600080fd5b505af415801561013a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061015e9190810190610626565b9695505050505050565b60006101768585858561017f565b95945050505050565b6000848160200201518560016020020151866002602002015187600360200201518860046020020151886000602002015189600160200201518a600260200201518b600360200201518c600460200201518d600560200201518d8d604051602001808e600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018d600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018c600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018b600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018a600160a060020a0316600160a060020a03166c01000000000000000000000000028152601401898152602001888152602001878152602001868152602001858152602001848152602001838051906020019060200280838360005b838110156102f15781810151838201526020016102d9565b50505050905001828051906020019060200280838360005b83811015610321578181015183820152602001610309565b505050509050019d50505050505050505050505050506040516020818303038152906040526040518082805190602001908083835b602083106103755780518252601f199092019160209182019101610356565b5181516020939093036101000a6000190180199091169216919091179052604051920182900390912098975050505050505050565b60006103b682356107b5565b9392505050565b6000601f820183136103ce57600080fd5b60056103e16103dc82610776565b61074f565b915081838560208402820111156103f757600080fd5b60005b83811015610423578161040d88826103aa565b84525060209283019291909101906001016103fa565b5050505092915050565b6000601f8201831361043e57600080fd5b813561044c6103dc82610794565b9150818183526020840193506020810190508385602084028201111561047157600080fd5b60005b83811015610423578161048788826103aa565b8452506020928301929190910190600101610474565b6000601f820183136104ae57600080fd5b60066104bc6103dc82610776565b915081838560208402820111156104d257600080fd5b60005b8381101561042357816104e8888261057a565b84525060209283019291909101906001016104d5565b6000601f8201831361050f57600080fd5b813561051d6103dc82610794565b9150818183526020840193506020810190508385602084028201111561054257600080fd5b60005b838110156104235781610558888261057a565b8452506020928301929190910190600101610545565b60006103b682516107c1565b60006103b682356107c6565b60006103b682356107c9565b6000806000806101a085870312156105a957600080fd5b60006105b587876103bd565b94505060a06105c68782880161049d565b93505061016085013567ffffffffffffffff8111156105e457600080fd5b6105f08782880161042d565b92505061018085013567ffffffffffffffff81111561060e57600080fd5b61061a878288016104fe565b91505092959194509250565b60006020828403121561063857600080fd5b6000610644848461056e565b949350505050565b600080600080600060a0868803121561066457600080fd5b6000610670888861057a565b9550506020610681888289016103aa565b945050604061069288828901610586565b93505060606106a38882890161057a565b92505060806106b48882890161057a565b9150509295509295909350565b6106ca816107b5565b82525050565b6106ca816107c1565b6106ca816107c6565b6106ca816107c9565b602081016106f982846106d0565b92915050565b602081016106f982846106d9565b60a0810161071b82886106d9565b61072860208301876106c1565b61073560408301866106e2565b61074260608301856106d9565b61015e60808301846106d9565b60405181810167ffffffffffffffff8111828210171561076e57600080fd5b604052919050565b600067ffffffffffffffff82111561078d57600080fd5b5060200290565b600067ffffffffffffffff8211156107ab57600080fd5b5060209081020190565b600160a060020a031690565b151590565b90565b60ff16905600a265627a7a72305820b4222d95b34be681285eb3fd5f4cbac8d58bc2114c9e36141e28ebcc03de16486c6578706572696d656e74616cf50037",
  "sourceMap": "187:825:42:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;187:825:42;;;;;;;",
  "deployedSourceMap": "187:825:42:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;637:373;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;637:373:42;;;;;;;;;;;;;;;;;;;;;;;;;219:412;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;219:412:42;;;;;;;;;;;;;;;;;637:373;863:140;;;;;836:4;;863:12;;:30;;:140;;907:10;;931:14;;959:2;;975;;991;;863:140;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;863:140:42;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;863:140:42;;;;;;;101:4:-1;97:9;90:4;84;80:15;76:31;69:5;65:43;126:6;120:4;113:20;0:138;863:140:42;;;;;;;;;856:147;637:373;-1:-1:-1;;;;;;637:373:42:o;219:412::-;437:7;467:157;511:10;535:7;556:19;589:25;467:30;:157::i;:::-;460:164;219:412;-1:-1:-1;;;;;219:412:42:o;3863:1154:25:-;4085:7;4209:10;4085:7;4209:13;;;;4267:10;4278:1;4267:13;;;;4327:10;4338:1;4327:13;;;;4385:10;4396:1;4385:13;;;;4447:10;4458:1;4447:13;;;;4507:7;4515:1;4507:10;;;;4563:7;4571:1;4563:10;;;;4627:7;4635:1;4627:10;;;;4685:7;4693:1;4685:10;;;;4748:7;4756:1;4748:10;;;;4811:7;4819:1;4811:10;;;;4863:19;4930:25;4175:825;;;;;;-1:-1:-1;;;;;4175:825:25;-1:-1:-1;;;;;4175:825:25;;;;;;;;-1:-1:-1;;;;;4175:825:25;-1:-1:-1;;;;;4175:825:25;;;;;;;;-1:-1:-1;;;;;4175:825:25;-1:-1:-1;;;;;4175:825:25;;;;;;;;-1:-1:-1;;;;;4175:825:25;-1:-1:-1;;;;;4175:825:25;;;;;;;;-1:-1:-1;;;;;4175:825:25;-1:-1:-1;;;;;4175:825:25;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;4175:825:25;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;4175:825:25;;;;;;;;;;;;;;;;;;;;;;;49:4:-1;39:7;30;26:21;22:32;13:7;6:49;4175:825:25;;;4152:858;;;;;;;;;;;;;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;299:10;344;;263:2;259:12;;;;254:3;250:22;-1:-1;;246:30;311:9;;295:26;;;340:21;;377:20;;;;365:33;;4152:858:25;;;;;;;;;;;;-1:-1:-1;;;;;;;;3863:1154:25:o;5:118:-1:-;;72:46;110:6;97:20;72:46;;;63:55;57:66;-1:-1;;;57:66;149:615;;257:4;245:17;;241:27;-1:-1;231:2;;282:1;279;272:12;231:2;306:3;324:78;339:62;394:6;339:62;;;324:78;;;315:87;;419:5;478:6;525:3;517:4;509:6;505:17;500:3;496:27;493:36;490:2;;;542:1;539;532:12;490:2;567:1;552:206;577:6;574:1;571:13;552:206;;;635:3;657:37;690:3;678:10;657:37;;;645:50;;-1:-1;718:4;709:14;;;;737;;;;;599:1;592:9;552:206;;;556:14;224:540;;;;;;;;790:707;;900:4;888:17;;884:27;-1:-1;874:2;;925:1;922;915:12;874:2;962:6;949:20;984:80;999:64;1056:6;999:64;;984:80;975:89;;1081:5;1106:6;1099:5;1092:21;1136:4;1128:6;1124:17;1114:27;;1158:4;1153:3;1149:14;1142:21;;1211:6;1258:3;1250:4;1242:6;1238:17;1233:3;1229:27;1226:36;1223:2;;;1275:1;1272;1265:12;1223:2;1300:1;1285:206;1310:6;1307:1;1304:13;1285:206;;;1368:3;1390:37;1423:3;1411:10;1390:37;;;1378:50;;-1:-1;1451:4;1442:14;;;;1470;;;;;1332:1;1325:9;1285:206;;1524:615;;1632:4;1620:17;;1616:27;-1:-1;1606:2;;1657:1;1654;1647:12;1606:2;1681:3;1699:78;1714:62;1769:6;1714:62;;1699:78;1690:87;;1794:5;1853:6;1900:3;1892:4;1884:6;1880:17;1875:3;1871:27;1868:36;1865:2;;;1917:1;1914;1907:12;1865:2;1942:1;1927:206;1952:6;1949:1;1946:13;1927:206;;;2010:3;2032:37;2065:3;2053:10;2032:37;;;2020:50;;-1:-1;2093:4;2084:14;;;;2112;;;;;1974:1;1967:9;1927:206;;2165:707;;2275:4;2263:17;;2259:27;-1:-1;2249:2;;2300:1;2297;2290:12;2249:2;2337:6;2324:20;2359:80;2374:64;2431:6;2374:64;;2359:80;2350:89;;2456:5;2481:6;2474:5;2467:21;2511:4;2503:6;2499:17;2489:27;;2533:4;2528:3;2524:14;2517:21;;2586:6;2633:3;2625:4;2617:6;2613:17;2608:3;2604:27;2601:36;2598:2;;;2650:1;2647;2640:12;2598:2;2675:1;2660:206;2685:6;2682:1;2679:13;2660:206;;;2743:3;2765:37;2798:3;2786:10;2765:37;;;2753:50;;-1:-1;2826:4;2817:14;;;;2845;;;;;2707:1;2700:9;2660:206;;2880:116;;2955:36;2983:6;2977:13;2955:36;;3003:118;;3070:46;3108:6;3095:20;3070:46;;3253:114;;3318:44;3354:6;3341:20;3318:44;;3374:984;;;;;3625:3;3613:9;3604:7;3600:23;3596:33;3593:2;;;3642:1;3639;3632:12;3593:2;3677:1;3694:76;3762:7;3742:9;3694:76;;;3684:86;;3656:120;3807:3;3826:76;3894:7;3885:6;3874:9;3870:22;3826:76;;;3816:86;;3786:122;3967:3;3956:9;3952:19;3939:33;3992:18;3984:6;3981:30;3978:2;;;4024:1;4021;4014:12;3978:2;4044:78;4114:7;4105:6;4094:9;4090:22;4044:78;;;4034:88;;3918:210;4187:3;4176:9;4172:19;4159:33;4212:18;4204:6;4201:30;4198:2;;;4244:1;4241;4234:12;4198:2;4264:78;4334:7;4325:6;4314:9;4310:22;4264:78;;;4254:88;;4138:210;3587:771;;;;;;;;4365:257;;4477:2;4465:9;4456:7;4452:23;4448:32;4445:2;;;4493:1;4490;4483:12;4445:2;4528:1;4545:61;4598:7;4578:9;4545:61;;;4535:71;4439:183;-1:-1;;;;4439:183;4629:739;;;;;;4799:3;4787:9;4778:7;4774:23;4770:33;4767:2;;;4816:1;4813;4806:12;4767:2;4851:1;4868:53;4913:7;4893:9;4868:53;;;4858:63;;4830:97;4958:2;4976:53;5021:7;5012:6;5001:9;4997:22;4976:53;;;4966:63;;4937:98;5066:2;5084:51;5127:7;5118:6;5107:9;5103:22;5084:51;;;5074:61;;5045:96;5172:2;5190:53;5235:7;5226:6;5215:9;5211:22;5190:53;;;5180:63;;5151:98;5280:3;5299:53;5344:7;5335:6;5324:9;5320:22;5299:53;;;5289:63;;5259:99;4761:607;;;;;;;;;5375:118;5456:31;5481:5;5456:31;;;5451:3;5444:44;5438:55;;;5500:101;5567:28;5589:5;5567:28;;5608:110;5681:31;5706:5;5681:31;;5850:112;5927:29;5950:5;5927:29;;5969:181;6071:2;6056:18;;6085:55;6060:9;6113:6;6085:55;;;6042:108;;;;;6157:193;6265:2;6250:18;;6279:61;6254:9;6313:6;6279:61;;6357:639;6581:3;6566:19;;6596:69;6570:9;6638:6;6596:69;;;6676:70;6742:2;6731:9;6727:18;6718:6;6676:70;;;6757:66;6819:2;6808:9;6804:18;6795:6;6757:66;;;6834:70;6900:2;6889:9;6885:18;6876:6;6834:70;;;6915:71;6981:3;6970:9;6966:19;6957:6;6915:71;;7003:256;7065:2;7059:9;7091:17;;;7166:18;7151:34;;7187:22;;;7148:62;7145:2;;;7223:1;7220;7213:12;7145:2;7239;7232:22;7043:216;;-1:-1;7043:216;7266:233;;7423:18;7415:6;7412:30;7409:2;;;7455:1;7452;7445:12;7409:2;-1:-1;7484:4;7472:17;;7346:153;7506:258;;7665:18;7657:6;7654:30;7651:2;;;7697:1;7694;7687:12;7651:2;-1:-1;7726:4;7714:17;;;7744:15;;7588:176;8276:128;-1:-1;;;;;8345:54;;8328:76;8411:92;8484:13;8477:21;;8460:43;8510:79;8579:5;8562:27;8596:88;8674:4;8663:16;;8646:38",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { OrderLibrary } from \"../../../core/lib/OrderLibrary.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract OrderLibraryMock {\n    function testGenerateOrderHash(\n        address[5] _addresses,\n        uint[6] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts\n    )\n        public\n        pure\n        returns(bytes32)\n    {\n        return OrderLibrary.generateOrderHash(\n            _addresses,\n            _values,\n            _requiredComponents,\n            _requiredComponentAmounts\n        );\n    }\n\n    function testValidateSignature(\n        bytes32 _orderHash,\n        address _signerAddress,\n        uint8 _v,\n        bytes32 _r,\n        bytes32 _s\n    )\n        public\n        pure\n        returns(bool)\n    {\n        return OrderLibrary.validateSignature(\n            _orderHash,\n            _signerAddress,\n            _v,\n            _r,\n            _s\n        );\n    }\n}\n\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/core/lib/OrderLibraryMock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/core/lib/OrderLibraryMock.sol",
    "exportedSymbols": {
      "OrderLibraryMock": [
        5279
      ]
    },
    "id": 5280,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5222,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:42"
      },
      {
        "id": 5223,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:42"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../../../core/lib/OrderLibrary.sol",
        "id": 5225,
        "nodeType": "ImportDirective",
        "scope": 5280,
        "sourceUnit": 4115,
        "src": "61:66:42",
        "symbolAliases": [
          {
            "foreign": 5224,
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
        "id": 5279,
        "linearizedBaseContracts": [
          5279
        ],
        "name": "OrderLibraryMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5252,
              "nodeType": "Block",
              "src": "450:181:42",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5246,
                        "name": "_addresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5229,
                        "src": "511:10:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                          "typeString": "address[5] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5247,
                        "name": "_values",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5233,
                        "src": "535:7:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                          "typeString": "uint256[6] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5248,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5236,
                        "src": "556:19:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5249,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5239,
                        "src": "589:25:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                          "typeString": "uint256[] memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                          "typeString": "address[5] memory"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                          "typeString": "uint256[6] memory"
                        },
                        {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                          "typeString": "uint256[] memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5244,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4114,
                        "src": "467:12:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$4114_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 5245,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "generateOrderHash",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4010,
                      "src": "467:30:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$6_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                        "typeString": "function (address[5] memory,uint256[6] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                      }
                    },
                    "id": 5250,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "467:157:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 5243,
                  "id": 5251,
                  "nodeType": "Return",
                  "src": "460:164:42"
                }
              ]
            },
            "documentation": null,
            "id": 5253,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testGenerateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5240,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5229,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 5253,
                  "src": "259:21:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5226,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "259:7:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5228,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 5227,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "267:1:42",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "259:10:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5233,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 5253,
                  "src": "290:15:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                    "typeString": "uint256[6]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5230,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "290:4:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 5232,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "36",
                      "id": 5231,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "295:1:42",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "6"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "290:7:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$6_storage_ptr",
                      "typeString": "uint256[6]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5236,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 5253,
                  "src": "315:29:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5234,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "315:7:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5235,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "315:9:42",
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
                  "id": 5239,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 5253,
                  "src": "354:32:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5237,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "354:4:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 5238,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "354:6:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "249:143:42"
            },
            "payable": false,
            "returnParameters": {
              "id": 5243,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5242,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5253,
                  "src": "437:7:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5241,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "437:7:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "436:9:42"
            },
            "scope": 5279,
            "src": "219:412:42",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5277,
              "nodeType": "Block",
              "src": "846:164:42",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5270,
                        "name": "_orderHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5255,
                        "src": "907:10:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5271,
                        "name": "_signerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5257,
                        "src": "931:14:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5272,
                        "name": "_v",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5259,
                        "src": "959:2:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5273,
                        "name": "_r",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5261,
                        "src": "975:2:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5274,
                        "name": "_s",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5263,
                        "src": "991:2:42",
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
                        "id": 5268,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4114,
                        "src": "863:12:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$4114_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 5269,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validateSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4052,
                      "src": "863:30:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                        "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                      }
                    },
                    "id": 5275,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "863:140:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 5267,
                  "id": 5276,
                  "nodeType": "Return",
                  "src": "856:147:42"
                }
              ]
            },
            "documentation": null,
            "id": 5278,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testValidateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5264,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5255,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "677:18:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5254,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "677:7:42",
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
                  "id": 5257,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "705:22:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5256,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "705:7:42",
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
                  "id": 5259,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "737:8:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 5258,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "737:5:42",
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
                  "id": 5261,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "755:10:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5260,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "755:7:42",
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
                  "id": 5263,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "775:10:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5262,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "775:7:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "667:124:42"
            },
            "payable": false,
            "returnParameters": {
              "id": 5267,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5266,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "836:4:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5265,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "836:4:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "835:6:42"
            },
            "scope": 5279,
            "src": "637:373:42",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5280,
        "src": "187:825:42"
      }
    ],
    "src": "0:1014:42"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/core/lib/OrderLibraryMock.sol",
    "exportedSymbols": {
      "OrderLibraryMock": [
        5279
      ]
    },
    "id": 5280,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5222,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:42"
      },
      {
        "id": 5223,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:42"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../../../core/lib/OrderLibrary.sol",
        "id": 5225,
        "nodeType": "ImportDirective",
        "scope": 5280,
        "sourceUnit": 4115,
        "src": "61:66:42",
        "symbolAliases": [
          {
            "foreign": 5224,
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
        "id": 5279,
        "linearizedBaseContracts": [
          5279
        ],
        "name": "OrderLibraryMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5252,
              "nodeType": "Block",
              "src": "450:181:42",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5246,
                        "name": "_addresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5229,
                        "src": "511:10:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                          "typeString": "address[5] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5247,
                        "name": "_values",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5233,
                        "src": "535:7:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                          "typeString": "uint256[6] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5248,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5236,
                        "src": "556:19:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5249,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5239,
                        "src": "589:25:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                          "typeString": "uint256[] memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                          "typeString": "address[5] memory"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                          "typeString": "uint256[6] memory"
                        },
                        {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                          "typeString": "uint256[] memory"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5244,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4114,
                        "src": "467:12:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$4114_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 5245,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "generateOrderHash",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4010,
                      "src": "467:30:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$6_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                        "typeString": "function (address[5] memory,uint256[6] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                      }
                    },
                    "id": 5250,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "467:157:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 5243,
                  "id": 5251,
                  "nodeType": "Return",
                  "src": "460:164:42"
                }
              ]
            },
            "documentation": null,
            "id": 5253,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testGenerateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5240,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5229,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 5253,
                  "src": "259:21:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5226,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "259:7:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5228,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 5227,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "267:1:42",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "259:10:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5233,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 5253,
                  "src": "290:15:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$6_memory_ptr",
                    "typeString": "uint256[6]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5230,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "290:4:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 5232,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "36",
                      "id": 5231,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "295:1:42",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "6"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "290:7:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$6_storage_ptr",
                      "typeString": "uint256[6]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5236,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 5253,
                  "src": "315:29:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5234,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "315:7:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5235,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "315:9:42",
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
                  "id": 5239,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 5253,
                  "src": "354:32:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5237,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "354:4:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 5238,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "354:6:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "249:143:42"
            },
            "payable": false,
            "returnParameters": {
              "id": 5243,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5242,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5253,
                  "src": "437:7:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5241,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "437:7:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "436:9:42"
            },
            "scope": 5279,
            "src": "219:412:42",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5277,
              "nodeType": "Block",
              "src": "846:164:42",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5270,
                        "name": "_orderHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5255,
                        "src": "907:10:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5271,
                        "name": "_signerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5257,
                        "src": "931:14:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5272,
                        "name": "_v",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5259,
                        "src": "959:2:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5273,
                        "name": "_r",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5261,
                        "src": "975:2:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5274,
                        "name": "_s",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5263,
                        "src": "991:2:42",
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
                        "id": 5268,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4114,
                        "src": "863:12:42",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$4114_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 5269,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validateSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4052,
                      "src": "863:30:42",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                        "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                      }
                    },
                    "id": 5275,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "863:140:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 5267,
                  "id": 5276,
                  "nodeType": "Return",
                  "src": "856:147:42"
                }
              ]
            },
            "documentation": null,
            "id": 5278,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testValidateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5264,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5255,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "677:18:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5254,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "677:7:42",
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
                  "id": 5257,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "705:22:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5256,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "705:7:42",
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
                  "id": 5259,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "737:8:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 5258,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "737:5:42",
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
                  "id": 5261,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "755:10:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5260,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "755:7:42",
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
                  "id": 5263,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "775:10:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5262,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "775:7:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "667:124:42"
            },
            "payable": false,
            "returnParameters": {
              "id": 5267,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5266,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5278,
                  "src": "836:4:42",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5265,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "836:4:42",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "835:6:42"
            },
            "scope": 5279,
            "src": "637:373:42",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5280,
        "src": "187:825:42"
      }
    ],
    "src": "0:1014:42"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T03:42:05.782Z"
}
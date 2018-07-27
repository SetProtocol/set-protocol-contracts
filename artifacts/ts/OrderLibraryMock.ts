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
          "type": "uint256[5]"
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
  "bytecode": "0x608060405234801561001057600080fd5b50610878806100206000396000f30060806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416637063d86a8114610050578063c4dec7b114610086575b600080fd5b34801561005c57600080fd5b5061007061006b36600461063d565b6100b3565b60405161007d919061077b565b60405180910390f35b34801561009257600080fd5b506100a66100a13660046106d1565b6100ca565b60405161007d9190610767565b60006100c1858585856100e3565b95945050505050565b60006100d986868686866102ff565b9695505050505050565b6000848160200201518560016020020151866002602002015187600360200201518860046020020151886000602002015189600160200201518a600260200201518b600360200201518c600460200201518c8c604051602001808d600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018c600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018b600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018a600160a060020a0316600160a060020a03166c0100000000000000000000000002815260140189600160a060020a0316600160a060020a03166c01000000000000000000000000028152601401888152602001878152602001868152602001858152602001848152602001838051906020019060200280838360005b8381101561024757818101518382015260200161022f565b50505050905001828051906020019060200280838360005b8381101561027757818101518382015260200161025f565b505050509050019c505050505050505050505050506040516020818303038152906040526040518082805190602001908083835b602083106102ca5780518252601f1990920191602091820191016102ab565b5181516020939093036101000a6000190180199091169216919091179052604051920182900390912098975050505050505050565b60008060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600181896040516020018083805190602001908083835b602083106103725780518252601f199092019160209182019101610353565b51815160209384036101000a600019018019909216911617905292019384525060408051808503815293820190819052835193945092839250908401908083835b602083106103d25780518252601f1990920191602091820191016103b3565b51815160209384036101000a60001901801990921691161790526040805192909401829003822060008352910192839052610416945092508a918a91508990610789565b60206040516020810390808403906000865af115801561043a573d6000803e3d6000fd5b5050604051601f190151600160a060020a0390811698169790971498975050505050505050565b600061046d8235610832565b9392505050565b6000601f8201831361048557600080fd5b6005610498610493826107e5565b6107be565b915081838560208402820111156104ae57600080fd5b60005b838110156104da57816104c48882610461565b84525060209283019291909101906001016104b1565b5050505092915050565b6000601f820183136104f557600080fd5b813561050361049382610803565b9150818183526020840193506020810190508385602084028201111561052857600080fd5b60005b838110156104da578161053e8882610461565b845250602092830192919091019060010161052b565b6000601f8201831361056557600080fd5b6005610573610493826107e5565b9150818385602084028201111561058957600080fd5b60005b838110156104da578161059f8882610625565b845250602092830192919091019060010161058c565b6000601f820183136105c657600080fd5b81356105d461049382610803565b915081818352602084019350602081019050838560208402820111156105f957600080fd5b60005b838110156104da578161060f8882610625565b84525060209283019291909101906001016105fc565b600061046d8235610829565b600061046d823561082c565b600080600080610180858703121561065457600080fd5b60006106608787610474565b94505060a061067187828801610554565b93505061014085013567ffffffffffffffff81111561068f57600080fd5b61069b878288016104e4565b92505061016085013567ffffffffffffffff8111156106b957600080fd5b6106c5878288016105b5565b91505092959194509250565b600080600080600060a086880312156106e957600080fd5b60006106f58888610625565b955050602061070688828901610461565b945050604061071788828901610631565b935050606061072888828901610625565b925050608061073988828901610625565b9150509295509295909350565b61074f81610824565b82525050565b61074f81610829565b61074f8161082c565b602081016107758284610746565b92915050565b602081016107758284610755565b608081016107978287610755565b6107a4602083018661075e565b6107b16040830185610755565b6100c16060830184610755565b60405181810167ffffffffffffffff811182821017156107dd57600080fd5b604052919050565b600067ffffffffffffffff8211156107fc57600080fd5b5060200290565b600067ffffffffffffffff82111561081a57600080fd5b5060209081020190565b151590565b90565b60ff1690565b600160a060020a0316905600a265627a7a7230582096f13ae30997417054727026f317c2186ab5bb69e0cb0c113a8b077b77f58c956c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x60806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416637063d86a8114610050578063c4dec7b114610086575b600080fd5b34801561005c57600080fd5b5061007061006b36600461063d565b6100b3565b60405161007d919061077b565b60405180910390f35b34801561009257600080fd5b506100a66100a13660046106d1565b6100ca565b60405161007d9190610767565b60006100c1858585856100e3565b95945050505050565b60006100d986868686866102ff565b9695505050505050565b6000848160200201518560016020020151866002602002015187600360200201518860046020020151886000602002015189600160200201518a600260200201518b600360200201518c600460200201518c8c604051602001808d600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018c600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018b600160a060020a0316600160a060020a03166c010000000000000000000000000281526014018a600160a060020a0316600160a060020a03166c0100000000000000000000000002815260140189600160a060020a0316600160a060020a03166c01000000000000000000000000028152601401888152602001878152602001868152602001858152602001848152602001838051906020019060200280838360005b8381101561024757818101518382015260200161022f565b50505050905001828051906020019060200280838360005b8381101561027757818101518382015260200161025f565b505050509050019c505050505050505050505050506040516020818303038152906040526040518082805190602001908083835b602083106102ca5780518252601f1990920191602091820191016102ab565b5181516020939093036101000a6000190180199091169216919091179052604051920182900390912098975050505050505050565b60008060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600181896040516020018083805190602001908083835b602083106103725780518252601f199092019160209182019101610353565b51815160209384036101000a600019018019909216911617905292019384525060408051808503815293820190819052835193945092839250908401908083835b602083106103d25780518252601f1990920191602091820191016103b3565b51815160209384036101000a60001901801990921691161790526040805192909401829003822060008352910192839052610416945092508a918a91508990610789565b60206040516020810390808403906000865af115801561043a573d6000803e3d6000fd5b5050604051601f190151600160a060020a0390811698169790971498975050505050505050565b600061046d8235610832565b9392505050565b6000601f8201831361048557600080fd5b6005610498610493826107e5565b6107be565b915081838560208402820111156104ae57600080fd5b60005b838110156104da57816104c48882610461565b84525060209283019291909101906001016104b1565b5050505092915050565b6000601f820183136104f557600080fd5b813561050361049382610803565b9150818183526020840193506020810190508385602084028201111561052857600080fd5b60005b838110156104da578161053e8882610461565b845250602092830192919091019060010161052b565b6000601f8201831361056557600080fd5b6005610573610493826107e5565b9150818385602084028201111561058957600080fd5b60005b838110156104da578161059f8882610625565b845250602092830192919091019060010161058c565b6000601f820183136105c657600080fd5b81356105d461049382610803565b915081818352602084019350602081019050838560208402820111156105f957600080fd5b60005b838110156104da578161060f8882610625565b84525060209283019291909101906001016105fc565b600061046d8235610829565b600061046d823561082c565b600080600080610180858703121561065457600080fd5b60006106608787610474565b94505060a061067187828801610554565b93505061014085013567ffffffffffffffff81111561068f57600080fd5b61069b878288016104e4565b92505061016085013567ffffffffffffffff8111156106b957600080fd5b6106c5878288016105b5565b91505092959194509250565b600080600080600060a086880312156106e957600080fd5b60006106f58888610625565b955050602061070688828901610461565b945050604061071788828901610631565b935050606061072888828901610625565b925050608061073988828901610625565b9150509295509295909350565b61074f81610824565b82525050565b61074f81610829565b61074f8161082c565b602081016107758284610746565b92915050565b602081016107758284610755565b608081016107978287610755565b6107a4602083018661075e565b6107b16040830185610755565b6100c16060830184610755565b60405181810167ffffffffffffffff811182821017156107dd57600080fd5b604052919050565b600067ffffffffffffffff8211156107fc57600080fd5b5060200290565b600067ffffffffffffffff82111561081a57600080fd5b5060209081020190565b151590565b90565b60ff1690565b600160a060020a0316905600a265627a7a7230582096f13ae30997417054727026f317c2186ab5bb69e0cb0c113a8b077b77f58c956c6578706572696d656e74616cf50037",
  "sourceMap": "187:825:51:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;187:825:51;;;;;;;",
  "deployedSourceMap": "187:825:51:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;219:412;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;219:412:51;;;;;;;;;;;;;;;;;;;;;;;;;637:373;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;637:373:51;;;;;;;;;;;;;;;;;219:412;437:7;467:157;511:10;535:7;556:19;589:25;467:30;:157::i;:::-;460:164;219:412;-1:-1:-1;;;;;219:412:51:o;637:373::-;836:4;863:140;907:10;931:14;959:2;975;991;863:30;:140::i;:::-;856:147;637:373;-1:-1:-1;;;;;;637:373:51:o;3684:1088:26:-;3900:7;4024:10;3900:7;4024:13;;;;4082:10;4093:1;4082:13;;;;4142:10;4153:1;4142:13;;;;4200:10;4211:1;4200:13;;;;4262:10;4273:1;4262:13;;;;4322:7;4330:1;4322:10;;;;4378:7;4386:1;4378:10;;;;4442:7;4450:1;4442:10;;;;4500:7;4508:1;4500:10;;;;4566:7;4574:1;4566:10;;;;4618:19;4685:25;3990:765;;;;;;-1:-1:-1;;;;;3990:765:26;-1:-1:-1;;;;;3990:765:26;;;;;;;;-1:-1:-1;;;;;3990:765:26;-1:-1:-1;;;;;3990:765:26;;;;;;;;-1:-1:-1;;;;;3990:765:26;-1:-1:-1;;;;;3990:765:26;;;;;;;;-1:-1:-1;;;;;3990:765:26;-1:-1:-1;;;;;3990:765:26;;;;;;;;-1:-1:-1;;;;;3990:765:26;-1:-1:-1;;;;;3990:765:26;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3990:765:26;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3990:765:26;;;;;;;;;;;;;;;;;;;;;;49:4:-1;39:7;30;26:21;22:32;13:7;6:49;3990:765:26;;;3967:798;;;;;;;;;;;;;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;299:10;344;;263:2;259:12;;;;254:3;250:22;-1:-1;;246:30;311:9;;295:26;;;340:21;;377:20;;;;365:33;;3967:798:26;;;;;;;;;;;;-1:-1:-1;;;;;;;;3684:1088:26:o;5136:647::-;5333:4;5410:18;5470:22;:59;;;;;;;;;;;;;;;;;;;;5599:131;5649:9;5660:10;5632:39;;;;;;;;;;;;;;;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;299:10;344;;263:2;259:12;;;254:3;250:22;-1:-1;;246:30;311:9;;295:26;;;340:21;;377:20;365:33;;5632:39:26;;;;;-1:-1:-1;5632:39:26;;;26:21:-1;;;6:49;;5632:39:26;;;;;;;5622:50;;5632:39;;-1:-1:-1;5632:39:26;;;-1:-1:-1;5622:50:26;;;;;5632:39;5622:50;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;299:10;344;;263:2;259:12;;;254:3;250:22;-1:-1;;246:30;311:9;;295:26;;;340:21;;377:20;365:33;;5622:50:26;;;;;;;;;;;;-1:-1:-1;5599:131:26;;;;;;;;;;-1:-1:-1;5622:50:26;-1:-1:-1;5686:2:26;;5702;;-1:-1:-1;5718:2:26;;5599:131;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;5599:131:26;;-1:-1:-1;;5599:131:26;;-1:-1:-1;;;;;5748:28:26;;;;;;;;;;5136:647;-1:-1:-1;;;;;;;;5136:647:26:o;5:118:-1:-;;72:46;110:6;97:20;72:46;;;63:55;57:66;-1:-1;;;57:66;149:615;;257:4;245:17;;241:27;-1:-1;231:2;;282:1;279;272:12;231:2;306:3;324:78;339:62;394:6;339:62;;;324:78;;;315:87;;419:5;478:6;525:3;517:4;509:6;505:17;500:3;496:27;493:36;490:2;;;542:1;539;532:12;490:2;567:1;552:206;577:6;574:1;571:13;552:206;;;635:3;657:37;690:3;678:10;657:37;;;645:50;;-1:-1;718:4;709:14;;;;737;;;;;599:1;592:9;552:206;;;556:14;224:540;;;;;;;;790:707;;900:4;888:17;;884:27;-1:-1;874:2;;925:1;922;915:12;874:2;962:6;949:20;984:80;999:64;1056:6;999:64;;984:80;975:89;;1081:5;1106:6;1099:5;1092:21;1136:4;1128:6;1124:17;1114:27;;1158:4;1153:3;1149:14;1142:21;;1211:6;1258:3;1250:4;1242:6;1238:17;1233:3;1229:27;1226:36;1223:2;;;1275:1;1272;1265:12;1223:2;1300:1;1285:206;1310:6;1307:1;1304:13;1285:206;;;1368:3;1390:37;1423:3;1411:10;1390:37;;;1378:50;;-1:-1;1451:4;1442:14;;;;1470;;;;;1332:1;1325:9;1285:206;;1524:615;;1632:4;1620:17;;1616:27;-1:-1;1606:2;;1657:1;1654;1647:12;1606:2;1681:3;1699:78;1714:62;1769:6;1714:62;;1699:78;1690:87;;1794:5;1853:6;1900:3;1892:4;1884:6;1880:17;1875:3;1871:27;1868:36;1865:2;;;1917:1;1914;1907:12;1865:2;1942:1;1927:206;1952:6;1949:1;1946:13;1927:206;;;2010:3;2032:37;2065:3;2053:10;2032:37;;;2020:50;;-1:-1;2093:4;2084:14;;;;2112;;;;;1974:1;1967:9;1927:206;;2165:707;;2275:4;2263:17;;2259:27;-1:-1;2249:2;;2300:1;2297;2290:12;2249:2;2337:6;2324:20;2359:80;2374:64;2431:6;2374:64;;2359:80;2350:89;;2456:5;2481:6;2474:5;2467:21;2511:4;2503:6;2499:17;2489:27;;2533:4;2528:3;2524:14;2517:21;;2586:6;2633:3;2625:4;2617:6;2613:17;2608:3;2604:27;2601:36;2598:2;;;2650:1;2647;2640:12;2598:2;2675:1;2660:206;2685:6;2682:1;2679:13;2660:206;;;2743:3;2765:37;2798:3;2786:10;2765:37;;;2753:50;;-1:-1;2826:4;2817:14;;;;2845;;;;;2707:1;2700:9;2660:206;;2880:118;;2947:46;2985:6;2972:20;2947:46;;3130:114;;3195:44;3231:6;3218:20;3195:44;;3251:984;;;;;3502:3;3490:9;3481:7;3477:23;3473:33;3470:2;;;3519:1;3516;3509:12;3470:2;3554:1;3571:76;3639:7;3619:9;3571:76;;;3561:86;;3533:120;3684:3;3703:76;3771:7;3762:6;3751:9;3747:22;3703:76;;;3693:86;;3663:122;3844:3;3833:9;3829:19;3816:33;3869:18;3861:6;3858:30;3855:2;;;3901:1;3898;3891:12;3855:2;3921:78;3991:7;3982:6;3971:9;3967:22;3921:78;;;3911:88;;3795:210;4064:3;4053:9;4049:19;4036:33;4089:18;4081:6;4078:30;4075:2;;;4121:1;4118;4111:12;4075:2;4141:78;4211:7;4202:6;4191:9;4187:22;4141:78;;;4131:88;;4015:210;3464:771;;;;;;;;4242:739;;;;;;4412:3;4400:9;4391:7;4387:23;4383:33;4380:2;;;4429:1;4426;4419:12;4380:2;4464:1;4481:53;4526:7;4506:9;4481:53;;;4471:63;;4443:97;4571:2;4589:53;4634:7;4625:6;4614:9;4610:22;4589:53;;;4579:63;;4550:98;4679:2;4697:51;4740:7;4731:6;4720:9;4716:22;4697:51;;;4687:61;;4658:96;4785:2;4803:53;4848:7;4839:6;4828:9;4824:22;4803:53;;;4793:63;;4764:98;4893:3;4912:53;4957:7;4948:6;4937:9;4933:22;4912:53;;;4902:63;;4872:99;4374:607;;;;;;;;;4988:101;5055:28;5077:5;5055:28;;;5050:3;5043:41;5037:52;;;5096:110;5169:31;5194:5;5169:31;;5213:104;5282:29;5305:5;5282:29;;5324:181;5426:2;5411:18;;5440:55;5415:9;5468:6;5440:55;;;5397:108;;;;;5512:193;5620:2;5605:18;;5634:61;5609:9;5668:6;5634:61;;5712:489;5900:3;5885:19;;5915:61;5889:9;5949:6;5915:61;;;5987:58;6041:2;6030:9;6026:18;6017:6;5987:58;;;6056:62;6114:2;6103:9;6099:18;6090:6;6056:62;;;6129;6187:2;6176:9;6172:18;6163:6;6129:62;;6208:256;6270:2;6264:9;6296:17;;;6371:18;6356:34;;6392:22;;;6353:62;6350:2;;;6428:1;6425;6418:12;6350:2;6444;6437:22;6248:216;;-1:-1;6248:216;6471:233;;6628:18;6620:6;6617:30;6614:2;;;6660:1;6657;6650:12;6614:2;-1:-1;6689:4;6677:17;;6551:153;6711:258;;6870:18;6862:6;6859:30;6856:2;;;6902:1;6899;6892:12;6856:2;-1:-1;6931:4;6919:17;;;6949:15;;6793:176;7481:92;7554:13;7547:21;;7530:43;7580:79;7649:5;7632:27;7666:88;7744:4;7733:16;;7716:38;7761:128;-1:-1;;;;;7830:54;;7813:76",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { OrderLibrary } from \"../../../core/lib/OrderLibrary.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract OrderLibraryMock {\n    function testGenerateOrderHash(\n        address[5] _addresses,\n        uint[5] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts\n    )\n        public\n        pure\n        returns(bytes32)\n    {\n        return OrderLibrary.generateOrderHash(\n            _addresses,\n            _values,\n            _requiredComponents,\n            _requiredComponentAmounts\n        );\n    }\n\n    function testValidateSignature(\n        bytes32 _orderHash,\n        address _signerAddress,\n        uint8 _v,\n        bytes32 _r,\n        bytes32 _s\n    )\n        public\n        pure\n        returns(bool)\n    {\n        return OrderLibrary.validateSignature(\n            _orderHash,\n            _signerAddress,\n            _v,\n            _r,\n            _s\n        );\n    }\n}\n\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/core/lib/OrderLibraryMock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/core/lib/OrderLibraryMock.sol",
    "exportedSymbols": {
      "OrderLibraryMock": [
        5443
      ]
    },
    "id": 5444,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5386,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:51"
      },
      {
        "id": 5387,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:51"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../../../core/lib/OrderLibrary.sol",
        "id": 5389,
        "nodeType": "ImportDirective",
        "scope": 5444,
        "sourceUnit": 4055,
        "src": "61:66:51",
        "symbolAliases": [
          {
            "foreign": 5388,
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
        "id": 5443,
        "linearizedBaseContracts": [
          5443
        ],
        "name": "OrderLibraryMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5416,
              "nodeType": "Block",
              "src": "450:181:51",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5410,
                        "name": "_addresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5393,
                        "src": "511:10:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                          "typeString": "address[5] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5411,
                        "name": "_values",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5397,
                        "src": "535:7:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                          "typeString": "uint256[5] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5412,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5400,
                        "src": "556:19:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5413,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5403,
                        "src": "589:25:51",
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
                          "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                          "typeString": "uint256[5] memory"
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
                        "id": 5408,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4054,
                        "src": "467:12:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$4054_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 5409,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "generateOrderHash",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3950,
                      "src": "467:30:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                        "typeString": "function (address[5] memory,uint256[5] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                      }
                    },
                    "id": 5414,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "467:157:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 5407,
                  "id": 5415,
                  "nodeType": "Return",
                  "src": "460:164:51"
                }
              ]
            },
            "documentation": null,
            "id": 5417,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testGenerateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5404,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5393,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 5417,
                  "src": "259:21:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5390,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "259:7:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5392,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 5391,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "267:1:51",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "259:10:51",
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
                  "id": 5397,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 5417,
                  "src": "290:15:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5394,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "290:4:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 5396,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 5395,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "295:1:51",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "290:7:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5400,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 5417,
                  "src": "315:29:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5398,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "315:7:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5399,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "315:9:51",
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
                  "id": 5403,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 5417,
                  "src": "354:32:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5401,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "354:4:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 5402,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "354:6:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "249:143:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 5407,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5406,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5417,
                  "src": "437:7:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5405,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "437:7:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "436:9:51"
            },
            "scope": 5443,
            "src": "219:412:51",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5441,
              "nodeType": "Block",
              "src": "846:164:51",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5434,
                        "name": "_orderHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5419,
                        "src": "907:10:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5435,
                        "name": "_signerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5421,
                        "src": "931:14:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5436,
                        "name": "_v",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5423,
                        "src": "959:2:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5437,
                        "name": "_r",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5425,
                        "src": "975:2:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5438,
                        "name": "_s",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5427,
                        "src": "991:2:51",
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
                        "id": 5432,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4054,
                        "src": "863:12:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$4054_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 5433,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validateSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3992,
                      "src": "863:30:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                        "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                      }
                    },
                    "id": 5439,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "863:140:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 5431,
                  "id": 5440,
                  "nodeType": "Return",
                  "src": "856:147:51"
                }
              ]
            },
            "documentation": null,
            "id": 5442,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testValidateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5428,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5419,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "677:18:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5418,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "677:7:51",
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
                  "id": 5421,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "705:22:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5420,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "705:7:51",
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
                  "id": 5423,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "737:8:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 5422,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "737:5:51",
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
                  "id": 5425,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "755:10:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5424,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "755:7:51",
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
                  "id": 5427,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "775:10:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5426,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "775:7:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "667:124:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 5431,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5430,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "836:4:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5429,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "836:4:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "835:6:51"
            },
            "scope": 5443,
            "src": "637:373:51",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5444,
        "src": "187:825:51"
      }
    ],
    "src": "0:1014:51"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/core/lib/OrderLibraryMock.sol",
    "exportedSymbols": {
      "OrderLibraryMock": [
        5443
      ]
    },
    "id": 5444,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5386,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:51"
      },
      {
        "id": 5387,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:51"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../../../core/lib/OrderLibrary.sol",
        "id": 5389,
        "nodeType": "ImportDirective",
        "scope": 5444,
        "sourceUnit": 4055,
        "src": "61:66:51",
        "symbolAliases": [
          {
            "foreign": 5388,
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
        "id": 5443,
        "linearizedBaseContracts": [
          5443
        ],
        "name": "OrderLibraryMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5416,
              "nodeType": "Block",
              "src": "450:181:51",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5410,
                        "name": "_addresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5393,
                        "src": "511:10:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                          "typeString": "address[5] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5411,
                        "name": "_values",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5397,
                        "src": "535:7:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                          "typeString": "uint256[5] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5412,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5400,
                        "src": "556:19:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5413,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5403,
                        "src": "589:25:51",
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
                          "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                          "typeString": "uint256[5] memory"
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
                        "id": 5408,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4054,
                        "src": "467:12:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$4054_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 5409,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "generateOrderHash",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3950,
                      "src": "467:30:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                        "typeString": "function (address[5] memory,uint256[5] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                      }
                    },
                    "id": 5414,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "467:157:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 5407,
                  "id": 5415,
                  "nodeType": "Return",
                  "src": "460:164:51"
                }
              ]
            },
            "documentation": null,
            "id": 5417,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testGenerateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5404,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5393,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 5417,
                  "src": "259:21:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5390,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "259:7:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5392,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 5391,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "267:1:51",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "259:10:51",
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
                  "id": 5397,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 5417,
                  "src": "290:15:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5394,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "290:4:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 5396,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 5395,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "295:1:51",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "290:7:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5400,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 5417,
                  "src": "315:29:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5398,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "315:7:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5399,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "315:9:51",
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
                  "id": 5403,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 5417,
                  "src": "354:32:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5401,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "354:4:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 5402,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "354:6:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "249:143:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 5407,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5406,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5417,
                  "src": "437:7:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5405,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "437:7:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "436:9:51"
            },
            "scope": 5443,
            "src": "219:412:51",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5441,
              "nodeType": "Block",
              "src": "846:164:51",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5434,
                        "name": "_orderHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5419,
                        "src": "907:10:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5435,
                        "name": "_signerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5421,
                        "src": "931:14:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5436,
                        "name": "_v",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5423,
                        "src": "959:2:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5437,
                        "name": "_r",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5425,
                        "src": "975:2:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5438,
                        "name": "_s",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5427,
                        "src": "991:2:51",
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
                        "id": 5432,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4054,
                        "src": "863:12:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$4054_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 5433,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validateSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3992,
                      "src": "863:30:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                        "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                      }
                    },
                    "id": 5439,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "863:140:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 5431,
                  "id": 5440,
                  "nodeType": "Return",
                  "src": "856:147:51"
                }
              ]
            },
            "documentation": null,
            "id": 5442,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testValidateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5428,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5419,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "677:18:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5418,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "677:7:51",
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
                  "id": 5421,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "705:22:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5420,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "705:7:51",
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
                  "id": 5423,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "737:8:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 5422,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "737:5:51",
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
                  "id": 5425,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "755:10:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5424,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "755:7:51",
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
                  "id": 5427,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "775:10:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5426,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "775:7:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "667:124:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 5431,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5430,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5442,
                  "src": "836:4:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5429,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "836:4:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "835:6:51"
            },
            "scope": 5443,
            "src": "637:373:51",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5444,
        "src": "187:825:51"
      }
    ],
    "src": "0:1014:51"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.844Z"
}
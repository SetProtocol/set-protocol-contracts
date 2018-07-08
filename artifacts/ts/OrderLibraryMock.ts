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
  "bytecode": "0x608060405234801561001057600080fd5b50610630806100206000396000f30060806040526004361061004b5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663c4dec7b18114610050578063efe3abfa14610086575b600080fd5b34801561005c57600080fd5b5061007061006b3660046104a3565b6100b3565b60405161007d9190610539565b60405180910390f35b34801561009257600080fd5b506100a66100a1366004610468565b6100ce565b60405161007d9190610547565b60006100c286868686866100e3565b90505b95945050505050565b60006100da8383610252565b90505b92915050565b60008060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600181896040516020018083805190602001908083835b602083106101565780518252601f199092019160209182019101610137565b51815160209384036101000a600019018019909216911617905292019384525060408051808503815293820190819052835193945092839250908401908083835b602083106101b65780518252601f199092019160209182019101610197565b51815160209384036101000a600019018019909216911617905260408051929094018290038220600083529101928390526101fa945092508a918a91508990610555565b60206040516020810390808403906000865af115801561021e573d6000803e3d6000fd5b5050604051601f19015173ffffffffffffffffffffffffffffffffffffffff90811698169790971498975050505050505050565b81516020808401516040808601516060808801516080808a015189518a8901518b880151958c0151938c015188516c0100000000000000000000000073ffffffffffffffffffffffffffffffffffffffff9d8e168102828e01529a8d168b026034820152978c168a026048890152948b168902605c880152999091169096026070850152608484019590955260a483019690965260c482015260e48101929092526101048083019490945280518083039094018452610124909101908190528251600093928291908401908083835b602083106103405780518252601f199092019160209182019101610321565b5181516020939093036101000a600019018019909116921691909117905260405192018290039091209695505050505050565b60006100da82356105dd565b6000601f8201831361039057600080fd5b60056103a361039e826105b1565b61058a565b915081838560208402820111156103b957600080fd5b60005b838110156103e557816103cf8882610373565b84525060209283019291909101906001016103bc565b5050505092915050565b6000601f8201831361040057600080fd5b600561040e61039e826105b1565b9150818385602084028201111561042457600080fd5b60005b838110156103e5578161043a8882610450565b8452506020928301929190910190600101610427565b60006100da82356105d4565b60006100da82356105d7565b600080610140838503121561047c57600080fd5b6000610488858561037f565b92505060a0610499858286016103ef565b9150509250929050565b600080600080600060a086880312156104bb57600080fd5b60006104c78888610450565b95505060206104d888828901610373565b94505060406104e98882890161045c565b93505060606104fa88828901610450565b925050608061050b88828901610450565b9150509295509295909350565b610521816105cf565b82525050565b610521816105d4565b610521816105d7565b602081016100dd8284610518565b602081016100dd8284610527565b608081016105638287610527565b6105706020830186610530565b61057d6040830185610527565b6100c56060830184610527565b60405181810167ffffffffffffffff811182821017156105a957600080fd5b604052919050565b600067ffffffffffffffff8211156105c857600080fd5b5060200290565b151590565b90565b60ff1690565b73ffffffffffffffffffffffffffffffffffffffff16905600a265627a7a72305820df6b21146a589aff40da34bdf75917ff556b9ab974199603b2954c90b3b0d11c6c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x60806040526004361061004b5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663c4dec7b18114610050578063efe3abfa14610086575b600080fd5b34801561005c57600080fd5b5061007061006b3660046104a3565b6100b3565b60405161007d9190610539565b60405180910390f35b34801561009257600080fd5b506100a66100a1366004610468565b6100ce565b60405161007d9190610547565b60006100c286868686866100e3565b90505b95945050505050565b60006100da8383610252565b90505b92915050565b60008060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600181896040516020018083805190602001908083835b602083106101565780518252601f199092019160209182019101610137565b51815160209384036101000a600019018019909216911617905292019384525060408051808503815293820190819052835193945092839250908401908083835b602083106101b65780518252601f199092019160209182019101610197565b51815160209384036101000a600019018019909216911617905260408051929094018290038220600083529101928390526101fa945092508a918a91508990610555565b60206040516020810390808403906000865af115801561021e573d6000803e3d6000fd5b5050604051601f19015173ffffffffffffffffffffffffffffffffffffffff90811698169790971498975050505050505050565b81516020808401516040808601516060808801516080808a015189518a8901518b880151958c0151938c015188516c0100000000000000000000000073ffffffffffffffffffffffffffffffffffffffff9d8e168102828e01529a8d168b026034820152978c168a026048890152948b168902605c880152999091169096026070850152608484019590955260a483019690965260c482015260e48101929092526101048083019490945280518083039094018452610124909101908190528251600093928291908401908083835b602083106103405780518252601f199092019160209182019101610321565b5181516020939093036101000a600019018019909116921691909117905260405192018290039091209695505050505050565b60006100da82356105dd565b6000601f8201831361039057600080fd5b60056103a361039e826105b1565b61058a565b915081838560208402820111156103b957600080fd5b60005b838110156103e557816103cf8882610373565b84525060209283019291909101906001016103bc565b5050505092915050565b6000601f8201831361040057600080fd5b600561040e61039e826105b1565b9150818385602084028201111561042457600080fd5b60005b838110156103e5578161043a8882610450565b8452506020928301929190910190600101610427565b60006100da82356105d4565b60006100da82356105d7565b600080610140838503121561047c57600080fd5b6000610488858561037f565b92505060a0610499858286016103ef565b9150509250929050565b600080600080600060a086880312156104bb57600080fd5b60006104c78888610450565b95505060206104d888828901610373565b94505060406104e98882890161045c565b93505060606104fa88828901610450565b925050608061050b88828901610450565b9150509295509295909350565b610521816105cf565b82525050565b610521816105d4565b610521816105d7565b602081016100dd8284610518565b602081016100dd8284610527565b608081016105638287610527565b6105706020830186610530565b61057d6040830185610527565b6100c56060830184610527565b60405181810167ffffffffffffffff811182821017156105a957600080fd5b604052919050565b600067ffffffffffffffff8211156105c857600080fd5b5060200290565b151590565b90565b60ff1690565b73ffffffffffffffffffffffffffffffffffffffff16905600a265627a7a72305820df6b21146a589aff40da34bdf75917ff556b9ab974199603b2954c90b3b0d11c6c6578706572696d656e74616cf50037",
  "sourceMap": "187:672:49:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;187:672:49;;;;;;;",
  "deployedSourceMap": "187:672:49:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;484:373;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;484:373:49;;;;;;;;;;;;;;;;;;;;;;;;;219:259;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;219:259:49;;;;;;;;;;;;;;;;;484:373;683:4;710:140;754:10;778:14;806:2;822;838;710:30;:140::i;:::-;703:147;;484:373;;;;;;;;:::o;219:259::-;356:7;386:85;430:10;454:7;386:30;:85::i;:::-;379:92;;219:259;;;;;:::o;2880:647:25:-;3077:4;3154:18;3214:22;:59;;;;;;;;;;;;;;;;;;;;3343:131;3393:9;3404:10;3376:39;;;;;;;;;;;;;;;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;299:10;344;;263:2;259:12;;;254:3;250:22;-1:-1;;246:30;311:9;;295:26;;;340:21;;377:20;365:33;;3376:39:25;;;;;-1:-1:-1;3376:39:25;;;26:21:-1;;;6:49;;3376:39:25;;;;;;;3366:50;;3376:39;;-1:-1:-1;3376:39:25;;;-1:-1:-1;3366:50:25;;;;;3376:39;3366:50;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;299:10;344;;263:2;259:12;;;254:3;250:22;-1:-1;;246:30;311:9;;295:26;;;340:21;;377:20;365:33;;3366:50:25;;;;;;;;;;;;-1:-1:-1;3343:131:25;;;;;;;;;;-1:-1:-1;3366:50:25;-1:-1:-1;3430:2:25;;3446;;-1:-1:-1;3462:2:25;;3343:131;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;3343:131:25;;-1:-1:-1;;3343:131:25;;3492:28;;;;;;;;;;;2880:647;-1:-1:-1;;;;;;;;2880:647:25:o;1779:737::-;2038:13;;;2083;;;;2130;;;;;2175;;;;;2224;;;;;2271:10;;2314;;;;2365;;;;2410;;;;2463;;;;2004:495;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;26:21:-1;;;22:32;;;6:49;;2004:495:25;;;;;;;;1981:528;;-1:-1:-1;;2004:495:25;;;1981:528;;;;;2004:495;1981:528;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;299:10;344;;263:2;259:12;;;;254:3;250:22;-1:-1;;246:30;311:9;;295:26;;;340:21;;377:20;;;;365:33;;1981:528:25;;;;;;;;;;;;-1:-1:-1;;;;;;1779:737:25:o;5:118:-1:-;;72:46;110:6;97:20;72:46;;149:615;;257:4;245:17;;241:27;-1:-1;231:2;;282:1;279;272:12;231:2;306:3;324:78;339:62;394:6;339:62;;;324:78;;;315:87;;419:5;478:6;525:3;517:4;509:6;505:17;500:3;496:27;493:36;490:2;;;542:1;539;532:12;490:2;567:1;552:206;577:6;574:1;571:13;552:206;;;635:3;657:37;690:3;678:10;657:37;;;645:50;;-1:-1;718:4;709:14;;;;737;;;;;599:1;592:9;552:206;;;556:14;224:540;;;;;;;;791:615;;899:4;887:17;;883:27;-1:-1;873:2;;924:1;921;914:12;873:2;948:3;966:78;981:62;1036:6;981:62;;966:78;957:87;;1061:5;1120:6;1167:3;1159:4;1151:6;1147:17;1142:3;1138:27;1135:36;1132:2;;;1184:1;1181;1174:12;1132:2;1209:1;1194:206;1219:6;1216:1;1213:13;1194:206;;;1277:3;1299:37;1332:3;1320:10;1299:37;;;1287:50;;-1:-1;1360:4;1351:14;;;;1379;;;;;1241:1;1234:9;1194:206;;1414:118;;1481:46;1519:6;1506:20;1481:46;;1664:114;;1729:44;1765:6;1752:20;1729:44;;1785:460;;;1952:3;1940:9;1931:7;1927:23;1923:33;1920:2;;;1969:1;1966;1959:12;1920:2;2004:1;2021:76;2089:7;2069:9;2021:76;;;2011:86;;1983:120;2134:3;2153:76;2221:7;2212:6;2201:9;2197:22;2153:76;;;2143:86;;2113:122;1914:331;;;;;;2252:739;;;;;;2422:3;2410:9;2401:7;2397:23;2393:33;2390:2;;;2439:1;2436;2429:12;2390:2;2474:1;2491:53;2536:7;2516:9;2491:53;;;2481:63;;2453:97;2581:2;2599:53;2644:7;2635:6;2624:9;2620:22;2599:53;;;2589:63;;2560:98;2689:2;2707:51;2750:7;2741:6;2730:9;2726:22;2707:51;;;2697:61;;2668:96;2795:2;2813:53;2858:7;2849:6;2838:9;2834:22;2813:53;;;2803:63;;2774:98;2903:3;2922:53;2967:7;2958:6;2947:9;2943:22;2922:53;;;2912:63;;2882:99;2384:607;;;;;;;;;2998:101;3065:28;3087:5;3065:28;;;3060:3;3053:41;3047:52;;;3106:110;3179:31;3204:5;3179:31;;3223:104;3292:29;3315:5;3292:29;;3334:181;3436:2;3421:18;;3450:55;3425:9;3478:6;3450:55;;3522:193;3630:2;3615:18;;3644:61;3619:9;3678:6;3644:61;;3722:489;3910:3;3895:19;;3925:61;3899:9;3959:6;3925:61;;;3997:58;4051:2;4040:9;4036:18;4027:6;3997:58;;;4066:62;4124:2;4113:9;4109:18;4100:6;4066:62;;;4139;4197:2;4186:9;4182:18;4173:6;4139:62;;4218:256;4280:2;4274:9;4306:17;;;4381:18;4366:34;;4402:22;;;4363:62;4360:2;;;4438:1;4435;4428:12;4360:2;4454;4447:22;4258:216;;-1:-1;4258:216;4481:233;;4638:18;4630:6;4627:30;4624:2;;;4670:1;4667;4660:12;4624:2;-1:-1;4699:4;4687:17;;4561:153;4961:92;5034:13;5027:21;;5010:43;5060:79;5129:5;5112:27;5146:88;5224:4;5213:16;;5196:38;5241:128;5321:42;5310:54;;5293:76",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { OrderLibrary } from \"../../../core/lib/OrderLibrary.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract OrderLibraryMock {\n    function testGenerateOrderHash(\n        address[5] _addresses,\n        uint[5] _values\n    )\n        public\n        pure\n        returns(bytes32)\n    {\n        return OrderLibrary.generateOrderHash(\n            _addresses,\n            _values\n        );\n    }\n\n    function testValidateSignature(\n        bytes32 _orderHash,\n        address _signerAddress,\n        uint8 _v,\n        bytes32 _r,\n        bytes32 _s\n    )\n        public\n        pure\n        returns(bool)\n    {\n        return OrderLibrary.validateSignature(\n            _orderHash,\n            _signerAddress,\n            _v,\n            _r,\n            _s\n        );\n    }\n}\n\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/core/lib/OrderLibraryMock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/core/lib/OrderLibraryMock.sol",
    "exportedSymbols": {
      "OrderLibraryMock": [
        4608
      ]
    },
    "id": 4609,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4559,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:49"
      },
      {
        "id": 4560,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:49"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../../../core/lib/OrderLibrary.sol",
        "id": 4562,
        "nodeType": "ImportDirective",
        "scope": 4609,
        "sourceUnit": 3406,
        "src": "61:66:49",
        "symbolAliases": [
          {
            "foreign": 4561,
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
        "id": 4608,
        "linearizedBaseContracts": [
          4608
        ],
        "name": "OrderLibraryMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 4581,
              "nodeType": "Block",
              "src": "369:109:49",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4577,
                        "name": "_addresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4566,
                        "src": "430:10:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                          "typeString": "address[5] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4578,
                        "name": "_values",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4570,
                        "src": "454:7:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                          "typeString": "uint256[5] memory"
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
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 4575,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3405,
                        "src": "386:12:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 4576,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "generateOrderHash",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3362,
                      "src": "386:30:49",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                        "typeString": "function (address[5] memory,uint256[5] memory) pure returns (bytes32)"
                      }
                    },
                    "id": 4579,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "386:85:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 4574,
                  "id": 4580,
                  "nodeType": "Return",
                  "src": "379:92:49"
                }
              ]
            },
            "documentation": null,
            "id": 4582,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testGenerateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4571,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4566,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 4582,
                  "src": "259:21:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4563,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "259:7:49",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4565,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4564,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "267:1:49",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "259:10:49",
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
                  "id": 4570,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 4582,
                  "src": "290:15:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4567,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "290:4:49",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4569,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4568,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "295:1:49",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "290:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "249:62:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 4574,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4573,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4582,
                  "src": "356:7:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4572,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "356:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "355:9:49"
            },
            "scope": 4608,
            "src": "219:259:49",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 4606,
              "nodeType": "Block",
              "src": "693:164:49",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4599,
                        "name": "_orderHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4584,
                        "src": "754:10:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4600,
                        "name": "_signerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4586,
                        "src": "778:14:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4601,
                        "name": "_v",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4588,
                        "src": "806:2:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4602,
                        "name": "_r",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4590,
                        "src": "822:2:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4603,
                        "name": "_s",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4592,
                        "src": "838:2:49",
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
                        "id": 4597,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3405,
                        "src": "710:12:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 4598,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validateSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3404,
                      "src": "710:30:49",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                        "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                      }
                    },
                    "id": 4604,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "710:140:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 4596,
                  "id": 4605,
                  "nodeType": "Return",
                  "src": "703:147:49"
                }
              ]
            },
            "documentation": null,
            "id": 4607,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testValidateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4593,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4584,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "524:18:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4583,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "524:7:49",
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
                  "id": 4586,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "552:22:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4585,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "552:7:49",
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
                  "id": 4588,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "584:8:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 4587,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "584:5:49",
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
                  "id": 4590,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "602:10:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4589,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "602:7:49",
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
                  "id": 4592,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "622:10:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4591,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "622:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "514:124:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 4596,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4595,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "683:4:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4594,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "683:4:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "682:6:49"
            },
            "scope": 4608,
            "src": "484:373:49",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4609,
        "src": "187:672:49"
      }
    ],
    "src": "0:861:49"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/core/lib/OrderLibraryMock.sol",
    "exportedSymbols": {
      "OrderLibraryMock": [
        4608
      ]
    },
    "id": 4609,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4559,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:49"
      },
      {
        "id": 4560,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:49"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../../../core/lib/OrderLibrary.sol",
        "id": 4562,
        "nodeType": "ImportDirective",
        "scope": 4609,
        "sourceUnit": 3406,
        "src": "61:66:49",
        "symbolAliases": [
          {
            "foreign": 4561,
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
        "id": 4608,
        "linearizedBaseContracts": [
          4608
        ],
        "name": "OrderLibraryMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 4581,
              "nodeType": "Block",
              "src": "369:109:49",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4577,
                        "name": "_addresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4566,
                        "src": "430:10:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                          "typeString": "address[5] memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4578,
                        "name": "_values",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4570,
                        "src": "454:7:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                          "typeString": "uint256[5] memory"
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
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 4575,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3405,
                        "src": "386:12:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 4576,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "generateOrderHash",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3362,
                      "src": "386:30:49",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                        "typeString": "function (address[5] memory,uint256[5] memory) pure returns (bytes32)"
                      }
                    },
                    "id": 4579,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "386:85:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 4574,
                  "id": 4580,
                  "nodeType": "Return",
                  "src": "379:92:49"
                }
              ]
            },
            "documentation": null,
            "id": 4582,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testGenerateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4571,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4566,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 4582,
                  "src": "259:21:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4563,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "259:7:49",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4565,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4564,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "267:1:49",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "259:10:49",
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
                  "id": 4570,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 4582,
                  "src": "290:15:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4567,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "290:4:49",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 4569,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 4568,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "295:1:49",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "290:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "249:62:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 4574,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4573,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4582,
                  "src": "356:7:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4572,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "356:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "355:9:49"
            },
            "scope": 4608,
            "src": "219:259:49",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 4606,
              "nodeType": "Block",
              "src": "693:164:49",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4599,
                        "name": "_orderHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4584,
                        "src": "754:10:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4600,
                        "name": "_signerAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4586,
                        "src": "778:14:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4601,
                        "name": "_v",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4588,
                        "src": "806:2:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint8",
                          "typeString": "uint8"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4602,
                        "name": "_r",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4590,
                        "src": "822:2:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4603,
                        "name": "_s",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4592,
                        "src": "838:2:49",
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
                        "id": 4597,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3405,
                        "src": "710:12:49",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 4598,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "validateSignature",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3404,
                      "src": "710:30:49",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                        "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                      }
                    },
                    "id": 4604,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "710:140:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 4596,
                  "id": 4605,
                  "nodeType": "Return",
                  "src": "703:147:49"
                }
              ]
            },
            "documentation": null,
            "id": 4607,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "testValidateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4593,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4584,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "524:18:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4583,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "524:7:49",
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
                  "id": 4586,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "552:22:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4585,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "552:7:49",
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
                  "id": 4588,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "584:8:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 4587,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "584:5:49",
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
                  "id": 4590,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "602:10:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4589,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "602:7:49",
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
                  "id": 4592,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "622:10:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 4591,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "622:7:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "514:124:49"
            },
            "payable": false,
            "returnParameters": {
              "id": 4596,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4595,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4607,
                  "src": "683:4:49",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4594,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "683:4:49",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "682:6:49"
            },
            "scope": 4608,
            "src": "484:373:49",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 4609,
        "src": "187:672:49"
      }
    ],
    "src": "0:861:49"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.204Z"
}
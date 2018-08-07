export const ERC20WrapperMock = 
{
  "contractName": "ERC20WrapperMock",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
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
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "approve",
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
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "ensureAllowance",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506104fc806100206000396000f3006080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630f1bd38c811461005b578063927da1051461007d578063e1f21c67146100b3575b600080fd5b34801561006757600080fd5b5061007b610076366004610357565b6100d3565b005b34801561008957600080fd5b5061009d61009836600461030a565b6100e5565b6040516100aa919061048d565b60405180910390f35b3480156100bf57600080fd5b5061007b6100ce3660046103b8565b6100fc565b6100df8484848461010c565b50505050565b60006100f284848461013c565b90505b9392505050565b6101078383836101e5565b505050565b600061011985858561013c565b90508181101561013557610135858461013061029f565b6101e5565b5050505050565b6040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063dd62ed3e906101939086908690600401610457565b602060405180830381600087803b1580156101ad57600080fd5b505af11580156101c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506100f29190810190610421565b6040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063095ea7b3906102399085908590600401610472565b602060405180830381600087803b15801561025357600080fd5b505af1158015610267573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061028b91908101906103fb565b506102946102a5565b151561010757600080fd5b60001990565b6000803d80156102bc57602081146102c5576102d1565b600191506102d1565b60206000803e60005191505b50600114919050565b60006100f582356104a1565b60006100f582516104bd565b60006100f582356104ba565b60006100f582516104ba565b60008060006060848603121561031f57600080fd5b600061032b86866102da565b935050602061033c868287016102da565b925050604061034d868287016102da565b9150509250925092565b6000806000806080858703121561036d57600080fd5b600061037987876102da565b945050602061038a878288016102da565b935050604061039b878288016102da565b92505060606103ac878288016102f2565b91505092959194509250565b6000806000606084860312156103cd57600080fd5b60006103d986866102da565b93505060206103ea868287016102da565b925050604061034d868287016102f2565b60006020828403121561040d57600080fd5b600061041984846102e6565b949350505050565b60006020828403121561043357600080fd5b600061041984846102fe565b610448816104a1565b82525050565b610448816104ba565b60408101610465828561043f565b6100f5602083018461043f565b60408101610480828561043f565b6100f5602083018461044e565b6020810161049b828461044e565b92915050565b73ffffffffffffffffffffffffffffffffffffffff1690565b90565b1515905600a265627a7a723058207790aaa15ca7511808884c699bb4b9f4ed807b6355a0ccddb57cfee2409524c66c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x6080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630f1bd38c811461005b578063927da1051461007d578063e1f21c67146100b3575b600080fd5b34801561006757600080fd5b5061007b610076366004610357565b6100d3565b005b34801561008957600080fd5b5061009d61009836600461030a565b6100e5565b6040516100aa919061048d565b60405180910390f35b3480156100bf57600080fd5b5061007b6100ce3660046103b8565b6100fc565b6100df8484848461010c565b50505050565b60006100f284848461013c565b90505b9392505050565b6101078383836101e5565b505050565b600061011985858561013c565b90508181101561013557610135858461013061029f565b6101e5565b5050505050565b6040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063dd62ed3e906101939086908690600401610457565b602060405180830381600087803b1580156101ad57600080fd5b505af11580156101c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506100f29190810190610421565b6040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063095ea7b3906102399085908590600401610472565b602060405180830381600087803b15801561025357600080fd5b505af1158015610267573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061028b91908101906103fb565b506102946102a5565b151561010757600080fd5b60001990565b6000803d80156102bc57602081146102c5576102d1565b600191506102d1565b60206000803e60005191505b50600114919050565b60006100f582356104a1565b60006100f582516104bd565b60006100f582356104ba565b60006100f582516104ba565b60008060006060848603121561031f57600080fd5b600061032b86866102da565b935050602061033c868287016102da565b925050604061034d868287016102da565b9150509250925092565b6000806000806080858703121561036d57600080fd5b600061037987876102da565b945050602061038a878288016102da565b935050604061039b878288016102da565b92505060606103ac878288016102f2565b91505092959194509250565b6000806000606084860312156103cd57600080fd5b60006103d986866102da565b93505060206103ea868287016102da565b925050604061034d868287016102f2565b60006020828403121561040d57600080fd5b600061041984846102e6565b949350505050565b60006020828403121561043357600080fd5b600061041984846102fe565b610448816104a1565b82525050565b610448816104ba565b60408101610465828561043f565b6100f5602083018461043f565b60408101610480828561043f565b6100f5602083018461044e565b6020810161049b828461044e565b92915050565b73ffffffffffffffffffffffffffffffffffffffff1690565b90565b1515905600a265627a7a723058207790aaa15ca7511808884c699bb4b9f4ed807b6355a0ccddb57cfee2409524c66c6578706572696d656e74616cf50037",
  "sourceMap": "179:680:52:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;179:680:52;;;;;;;",
  "deployedSourceMap": "179:680:52:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;624:233;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;624:233:52;;;;;;;;;;;211:216;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;211:216:52;;;;;;;;;;;;;;;;;;;;;;;;;433:185;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;433:185:52;;;;;;;;;624:233;785:65;814:6;822;830:8;840:9;785:28;:65::i;:::-;624:233;;;;:::o;211:216::-;342:7;372:48;395:6;403;411:8;372:22;:48::i;:::-;365:55;;211:216;;;;;;:::o;433:185::-;562:49;583:6;591:8;601:9;562:20;:49::i;:::-;433:185;;;:::o;4492:409:47:-;4655:21;4679:35;4689:6;4697;4705:8;4679:9;:35::i;:::-;4655:59;;4747:9;4728:16;:28;4724:171;;;4772:112;4797:6;4821:8;4847:23;:21;:23::i;:::-;4772:7;:112::i;:::-;4492:409;;;;;:::o;1913:225::-;2089:42;;;;;2059:7;;2089:24;;;;;;:42;;2114:6;;2122:8;;2089:42;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2089:42:47;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2089:42:47;;;;;;;101:4:-1;97:9;90:4;84;80:15;76:31;69:5;65:43;126:6;120:4;113:20;0:138;2089:42:47;;;;;;;;3844:266;3975:43;;;;;:22;;;;;;:43;;3998:8;;4008:9;;3975:43;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3975:43:47;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3975:43:47;;;;;;;101:4:-1;97:9;90:4;84;80:15;76:31;69:5;65:43;126:6;120:4;113:20;0:138;3975:43:47;;;;;;;;;;4088:14;:12;:14::i;:::-;4080:23;;;;;;;854:118:46;-1:-1:-1;;854:118:46;:::o;5115:852:47:-;5190:4;;5374:14;5451:57;;;;5560:4;5555:220;;;;5367:497;;5451:57;5493:1;5478:16;;5451:57;;5555:220;5660:4;5655:3;5650;5635:30;5757:3;5751:10;5736:25;;5367:497;-1:-1:-1;5959:1:47;5944:16;;5115:852;-1:-1:-1;5115:852:47:o;5:118:-1:-;;72:46;110:6;97:20;72:46;;130:116;;205:36;233:6;227:13;205:36;;253:118;;320:46;358:6;345:20;320:46;;378:122;;456:39;487:6;481:13;456:39;;507:491;;;;645:2;633:9;624:7;620:23;616:32;613:2;;;661:1;658;651:12;613:2;696:1;713:53;758:7;738:9;713:53;;;703:63;;675:97;803:2;821:53;866:7;857:6;846:9;842:22;821:53;;;811:63;;782:98;911:2;929:53;974:7;965:6;954:9;950:22;929:53;;;919:63;;890:98;607:391;;;;;;1005:617;;;;;1160:3;1148:9;1139:7;1135:23;1131:33;1128:2;;;1177:1;1174;1167:12;1128:2;1212:1;1229:53;1274:7;1254:9;1229:53;;;1219:63;;1191:97;1319:2;1337:53;1382:7;1373:6;1362:9;1358:22;1337:53;;;1327:63;;1298:98;1427:2;1445:53;1490:7;1481:6;1470:9;1466:22;1445:53;;;1435:63;;1406:98;1535:2;1553:53;1598:7;1589:6;1578:9;1574:22;1553:53;;;1543:63;;1514:98;1122:500;;;;;;;;1629:491;;;;1767:2;1755:9;1746:7;1742:23;1738:32;1735:2;;;1783:1;1780;1773:12;1735:2;1818:1;1835:53;1880:7;1860:9;1835:53;;;1825:63;;1797:97;1925:2;1943:53;1988:7;1979:6;1968:9;1964:22;1943:53;;;1933:63;;1904:98;2033:2;2051:53;2096:7;2087:6;2076:9;2072:22;2051:53;;2127:257;;2239:2;2227:9;2218:7;2214:23;2210:32;2207:2;;;2255:1;2252;2245:12;2207:2;2290:1;2307:61;2360:7;2340:9;2307:61;;;2297:71;2201:183;-1:-1;;;;2201:183;2391:263;;2506:2;2494:9;2485:7;2481:23;2477:32;2474:2;;;2522:1;2519;2512:12;2474:2;2557:1;2574:64;2630:7;2610:9;2574:64;;2661:110;2734:31;2759:5;2734:31;;;2729:3;2722:44;2716:55;;;2778:110;2851:31;2876:5;2851:31;;2895:294;3031:2;3016:18;;3045:61;3020:9;3079:6;3045:61;;;3117:62;3175:2;3164:9;3160:18;3151:6;3117:62;;3196:294;3332:2;3317:18;;3346:61;3321:9;3380:6;3346:61;;;3418:62;3476:2;3465:9;3461:18;3452:6;3418:62;;3497:193;3605:2;3590:18;;3619:61;3594:9;3653:6;3619:61;;;3576:114;;;;;3697:128;3777:42;3766:54;;3749:76;3832:79;3901:5;3884:27;4053:92;4126:13;4119:21;;4102:43",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { ERC20Wrapper } from \"../../lib/ERC20Wrapper.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract ERC20WrapperMock {\n    function allowance(\n        address _token,\n        address _owner,\n        address _spender\n    )\n        public\n        returns (uint256)\n    {\n        return ERC20Wrapper.allowance(_token, _owner, _spender);\n    }\n\n    function approve(\n        address _token,\n        address _spender,\n        uint256 _quantity\n    )\n        public\n    {\n        ERC20Wrapper.approve(_token, _spender, _quantity);\n    }\n\n    function ensureAllowance(\n        address _token,\n        address _owner,\n        address _spender,\n        uint256 _quantity\n    )\n        public\n    {\n        ERC20Wrapper.ensureAllowance(_token, _owner, _spender, _quantity);\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/ERC20WrapperMock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/ERC20WrapperMock.sol",
    "exportedSymbols": {
      "ERC20WrapperMock": [
        5241
      ]
    },
    "id": 5242,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5179,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:52"
      },
      {
        "id": 5180,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:52"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 5182,
        "nodeType": "ImportDirective",
        "scope": 5242,
        "sourceUnit": 4931,
        "src": "61:58:52",
        "symbolAliases": [
          {
            "foreign": 5181,
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
        "id": 5241,
        "linearizedBaseContracts": [
          5241
        ],
        "name": "ERC20WrapperMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5200,
              "nodeType": "Block",
              "src": "355:72:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5195,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5184,
                        "src": "395:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5196,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5186,
                        "src": "403:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5197,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5188,
                        "src": "411:8:52",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 5193,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "372:12:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5194,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4809,
                      "src": "372:22:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 5198,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "372:48:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 5192,
                  "id": 5199,
                  "nodeType": "Return",
                  "src": "365:55:52"
                }
              ]
            },
            "documentation": null,
            "id": 5201,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5189,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5184,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5201,
                  "src": "239:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5183,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "239:7:52",
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
                  "id": 5186,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5201,
                  "src": "263:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5185,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "263:7:52",
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
                  "id": 5188,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5201,
                  "src": "287:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5187,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "287:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "229:80:52"
            },
            "payable": false,
            "returnParameters": {
              "id": 5192,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5191,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5201,
                  "src": "342:7:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5190,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "342:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "341:9:52"
            },
            "scope": 5241,
            "src": "211:216:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5218,
              "nodeType": "Block",
              "src": "552:66:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5213,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5203,
                        "src": "583:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5214,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5205,
                        "src": "591:8:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5215,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5207,
                        "src": "601:9:52",
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
                        "id": 5210,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "562:12:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5212,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4881,
                      "src": "562:20:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 5216,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "562:49:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5217,
                  "nodeType": "ExpressionStatement",
                  "src": "562:49:52"
                }
              ]
            },
            "documentation": null,
            "id": 5219,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5208,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5203,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5219,
                  "src": "459:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5202,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "459:7:52",
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
                  "id": 5205,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5219,
                  "src": "483:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5204,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "483:7:52",
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
                  "id": 5207,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5219,
                  "src": "509:17:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5206,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "449:83:52"
            },
            "payable": false,
            "returnParameters": {
              "id": 5209,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "552:0:52"
            },
            "scope": 5241,
            "src": "433:185:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5239,
              "nodeType": "Block",
              "src": "775:82:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5233,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5221,
                        "src": "814:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5234,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5223,
                        "src": "822:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5235,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5225,
                        "src": "830:8:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5236,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5227,
                        "src": "840:9:52",
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
                        "id": 5230,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "785:12:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5232,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "ensureAllowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4914,
                      "src": "785:28:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 5237,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "785:65:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5238,
                  "nodeType": "ExpressionStatement",
                  "src": "785:65:52"
                }
              ]
            },
            "documentation": null,
            "id": 5240,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5228,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5221,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5240,
                  "src": "658:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5220,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "658:7:52",
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
                  "id": 5223,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5240,
                  "src": "682:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5222,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "682:7:52",
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
                  "id": 5225,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5240,
                  "src": "706:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5224,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "706:7:52",
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
                  "id": 5227,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5240,
                  "src": "732:17:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5226,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "732:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "648:107:52"
            },
            "payable": false,
            "returnParameters": {
              "id": 5229,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "775:0:52"
            },
            "scope": 5241,
            "src": "624:233:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5242,
        "src": "179:680:52"
      }
    ],
    "src": "0:860:52"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/ERC20WrapperMock.sol",
    "exportedSymbols": {
      "ERC20WrapperMock": [
        5241
      ]
    },
    "id": 5242,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5179,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:52"
      },
      {
        "id": 5180,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:52"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 5182,
        "nodeType": "ImportDirective",
        "scope": 5242,
        "sourceUnit": 4931,
        "src": "61:58:52",
        "symbolAliases": [
          {
            "foreign": 5181,
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
        "id": 5241,
        "linearizedBaseContracts": [
          5241
        ],
        "name": "ERC20WrapperMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5200,
              "nodeType": "Block",
              "src": "355:72:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5195,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5184,
                        "src": "395:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5196,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5186,
                        "src": "403:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5197,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5188,
                        "src": "411:8:52",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 5193,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "372:12:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5194,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4809,
                      "src": "372:22:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 5198,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "372:48:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 5192,
                  "id": 5199,
                  "nodeType": "Return",
                  "src": "365:55:52"
                }
              ]
            },
            "documentation": null,
            "id": 5201,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5189,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5184,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5201,
                  "src": "239:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5183,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "239:7:52",
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
                  "id": 5186,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5201,
                  "src": "263:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5185,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "263:7:52",
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
                  "id": 5188,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5201,
                  "src": "287:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5187,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "287:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "229:80:52"
            },
            "payable": false,
            "returnParameters": {
              "id": 5192,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5191,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5201,
                  "src": "342:7:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5190,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "342:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "341:9:52"
            },
            "scope": 5241,
            "src": "211:216:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5218,
              "nodeType": "Block",
              "src": "552:66:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5213,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5203,
                        "src": "583:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5214,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5205,
                        "src": "591:8:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5215,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5207,
                        "src": "601:9:52",
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
                        "id": 5210,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "562:12:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5212,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4881,
                      "src": "562:20:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 5216,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "562:49:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5217,
                  "nodeType": "ExpressionStatement",
                  "src": "562:49:52"
                }
              ]
            },
            "documentation": null,
            "id": 5219,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5208,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5203,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5219,
                  "src": "459:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5202,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "459:7:52",
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
                  "id": 5205,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5219,
                  "src": "483:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5204,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "483:7:52",
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
                  "id": 5207,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5219,
                  "src": "509:17:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5206,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "449:83:52"
            },
            "payable": false,
            "returnParameters": {
              "id": 5209,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "552:0:52"
            },
            "scope": 5241,
            "src": "433:185:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5239,
              "nodeType": "Block",
              "src": "775:82:52",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5233,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5221,
                        "src": "814:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5234,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5223,
                        "src": "822:6:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5235,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5225,
                        "src": "830:8:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5236,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5227,
                        "src": "840:9:52",
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
                        "id": 5230,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "785:12:52",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5232,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "ensureAllowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4914,
                      "src": "785:28:52",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 5237,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "785:65:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5238,
                  "nodeType": "ExpressionStatement",
                  "src": "785:65:52"
                }
              ]
            },
            "documentation": null,
            "id": 5240,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5228,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5221,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5240,
                  "src": "658:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5220,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "658:7:52",
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
                  "id": 5223,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5240,
                  "src": "682:14:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5222,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "682:7:52",
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
                  "id": 5225,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5240,
                  "src": "706:16:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5224,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "706:7:52",
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
                  "id": 5227,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5240,
                  "src": "732:17:52",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5226,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "732:7:52",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "648:107:52"
            },
            "payable": false,
            "returnParameters": {
              "id": 5229,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "775:0:52"
            },
            "scope": 5241,
            "src": "624:233:52",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5242,
        "src": "179:680:52"
      }
    ],
    "src": "0:860:52"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-06T13:39:43.017Z"
}
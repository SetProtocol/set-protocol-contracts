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
  "bytecode": "0x608060405234801561001057600080fd5b506104fc806100206000396000f3006080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630f1bd38c811461005b578063927da1051461007d578063e1f21c67146100b3575b600080fd5b34801561006757600080fd5b5061007b610076366004610357565b6100d3565b005b34801561008957600080fd5b5061009d61009836600461030a565b6100e5565b6040516100aa919061048d565b60405180910390f35b3480156100bf57600080fd5b5061007b6100ce3660046103b8565b6100fc565b6100df8484848461010c565b50505050565b60006100f284848461013c565b90505b9392505050565b6101078383836101e5565b505050565b600061011985858561013c565b90508181101561013557610135858461013061029f565b6101e5565b5050505050565b6040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063dd62ed3e906101939086908690600401610457565b602060405180830381600087803b1580156101ad57600080fd5b505af11580156101c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506100f29190810190610421565b6040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063095ea7b3906102399085908590600401610472565b602060405180830381600087803b15801561025357600080fd5b505af1158015610267573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061028b91908101906103fb565b506102946102a5565b151561010757600080fd5b60001990565b6000803d80156102bc57602081146102c5576102d1565b600191506102d1565b60206000803e60005191505b50600114919050565b60006100f582356104a1565b60006100f582516104bd565b60006100f582356104ba565b60006100f582516104ba565b60008060006060848603121561031f57600080fd5b600061032b86866102da565b935050602061033c868287016102da565b925050604061034d868287016102da565b9150509250925092565b6000806000806080858703121561036d57600080fd5b600061037987876102da565b945050602061038a878288016102da565b935050604061039b878288016102da565b92505060606103ac878288016102f2565b91505092959194509250565b6000806000606084860312156103cd57600080fd5b60006103d986866102da565b93505060206103ea868287016102da565b925050604061034d868287016102f2565b60006020828403121561040d57600080fd5b600061041984846102e6565b949350505050565b60006020828403121561043357600080fd5b600061041984846102fe565b610448816104a1565b82525050565b610448816104ba565b60408101610465828561043f565b6100f5602083018461043f565b60408101610480828561043f565b6100f5602083018461044e565b6020810161049b828461044e565b92915050565b73ffffffffffffffffffffffffffffffffffffffff1690565b90565b1515905600a265627a7a7230582077aa4c0e56e9b49765f57053fffc75752cb6de686a15fba68fb109bffe8b6e036c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x6080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630f1bd38c811461005b578063927da1051461007d578063e1f21c67146100b3575b600080fd5b34801561006757600080fd5b5061007b610076366004610357565b6100d3565b005b34801561008957600080fd5b5061009d61009836600461030a565b6100e5565b6040516100aa919061048d565b60405180910390f35b3480156100bf57600080fd5b5061007b6100ce3660046103b8565b6100fc565b6100df8484848461010c565b50505050565b60006100f284848461013c565b90505b9392505050565b6101078383836101e5565b505050565b600061011985858561013c565b90508181101561013557610135858461013061029f565b6101e5565b5050505050565b6040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063dd62ed3e906101939086908690600401610457565b602060405180830381600087803b1580156101ad57600080fd5b505af11580156101c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506100f29190810190610421565b6040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063095ea7b3906102399085908590600401610472565b602060405180830381600087803b15801561025357600080fd5b505af1158015610267573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061028b91908101906103fb565b506102946102a5565b151561010757600080fd5b60001990565b6000803d80156102bc57602081146102c5576102d1565b600191506102d1565b60206000803e60005191505b50600114919050565b60006100f582356104a1565b60006100f582516104bd565b60006100f582356104ba565b60006100f582516104ba565b60008060006060848603121561031f57600080fd5b600061032b86866102da565b935050602061033c868287016102da565b925050604061034d868287016102da565b9150509250925092565b6000806000806080858703121561036d57600080fd5b600061037987876102da565b945050602061038a878288016102da565b935050604061039b878288016102da565b92505060606103ac878288016102f2565b91505092959194509250565b6000806000606084860312156103cd57600080fd5b60006103d986866102da565b93505060206103ea868287016102da565b925050604061034d868287016102f2565b60006020828403121561040d57600080fd5b600061041984846102e6565b949350505050565b60006020828403121561043357600080fd5b600061041984846102fe565b610448816104a1565b82525050565b610448816104ba565b60408101610465828561043f565b6100f5602083018461043f565b60408101610480828561043f565b6100f5602083018461044e565b6020810161049b828461044e565b92915050565b73ffffffffffffffffffffffffffffffffffffffff1690565b90565b1515905600a265627a7a7230582077aa4c0e56e9b49765f57053fffc75752cb6de686a15fba68fb109bffe8b6e036c6578706572696d656e74616cf50037",
  "sourceMap": "179:680:58:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;179:680:58;;;;;;;",
  "deployedSourceMap": "179:680:58:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;624:233;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;624:233:58;;;;;;;;;;;211:216;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;211:216:58;;;;;;;;;;;;;;;;;;;;;;;;;433:185;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;433:185:58;;;;;;;;;624:233;785:65;814:6;822;830:8;840:9;785:28;:65::i;:::-;624:233;;;;:::o;211:216::-;342:7;372:48;395:6;403;411:8;372:22;:48::i;:::-;365:55;;211:216;;;;;;:::o;433:185::-;562:49;583:6;591:8;601:9;562:20;:49::i;:::-;433:185;;;:::o;4492:412:52:-;4655:24;4682:35;4692:6;4700;4708:8;4682:9;:35::i;:::-;4655:62;;4750:9;4731:16;:28;4727:171;;;4775:112;4800:6;4824:8;4850:23;:21;:23::i;:::-;4775:7;:112::i;:::-;4492:412;;;;;:::o;1913:225::-;2089:42;;;;;2059:7;;2089:24;;;;;;:42;;2114:6;;2122:8;;2089:42;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2089:42:52;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2089:42:52;;;;;;;101:4:-1;97:9;90:4;84;80:15;76:31;69:5;65:43;126:6;120:4;113:20;0:138;2089:42:52;;;;;;;;3844:266;3975:43;;;;;:22;;;;;;:43;;3998:8;;4008:9;;3975:43;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3975:43:52;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3975:43:52;;;;;;;101:4:-1;97:9;90:4;84;80:15;76:31;69:5;65:43;126:6;120:4;113:20;0:138;3975:43:52;;;;;;;;;;4088:14;:12;:14::i;:::-;4080:23;;;;;;;779:118:51;-1:-1:-1;;779:118:51;:::o;5118:852:52:-;5193:4;;5377:14;5454:57;;;;5563:4;5558:220;;;;5370:497;;5454:57;5496:1;5481:16;;5454:57;;5558:220;5663:4;5658:3;5653;5638:30;5760:3;5754:10;5739:25;;5370:497;-1:-1:-1;5962:1:52;5947:16;;5118:852;-1:-1:-1;5118:852:52:o;5:118:-1:-;;72:46;110:6;97:20;72:46;;130:116;;205:36;233:6;227:13;205:36;;253:118;;320:46;358:6;345:20;320:46;;378:122;;456:39;487:6;481:13;456:39;;507:491;;;;645:2;633:9;624:7;620:23;616:32;613:2;;;661:1;658;651:12;613:2;696:1;713:53;758:7;738:9;713:53;;;703:63;;675:97;803:2;821:53;866:7;857:6;846:9;842:22;821:53;;;811:63;;782:98;911:2;929:53;974:7;965:6;954:9;950:22;929:53;;;919:63;;890:98;607:391;;;;;;1005:617;;;;;1160:3;1148:9;1139:7;1135:23;1131:33;1128:2;;;1177:1;1174;1167:12;1128:2;1212:1;1229:53;1274:7;1254:9;1229:53;;;1219:63;;1191:97;1319:2;1337:53;1382:7;1373:6;1362:9;1358:22;1337:53;;;1327:63;;1298:98;1427:2;1445:53;1490:7;1481:6;1470:9;1466:22;1445:53;;;1435:63;;1406:98;1535:2;1553:53;1598:7;1589:6;1578:9;1574:22;1553:53;;;1543:63;;1514:98;1122:500;;;;;;;;1629:491;;;;1767:2;1755:9;1746:7;1742:23;1738:32;1735:2;;;1783:1;1780;1773:12;1735:2;1818:1;1835:53;1880:7;1860:9;1835:53;;;1825:63;;1797:97;1925:2;1943:53;1988:7;1979:6;1968:9;1964:22;1943:53;;;1933:63;;1904:98;2033:2;2051:53;2096:7;2087:6;2076:9;2072:22;2051:53;;2127:257;;2239:2;2227:9;2218:7;2214:23;2210:32;2207:2;;;2255:1;2252;2245:12;2207:2;2290:1;2307:61;2360:7;2340:9;2307:61;;;2297:71;2201:183;-1:-1;;;;2201:183;2391:263;;2506:2;2494:9;2485:7;2481:23;2477:32;2474:2;;;2522:1;2519;2512:12;2474:2;2557:1;2574:64;2630:7;2610:9;2574:64;;2661:110;2734:31;2759:5;2734:31;;;2729:3;2722:44;2716:55;;;2778:110;2851:31;2876:5;2851:31;;2895:294;3031:2;3016:18;;3045:61;3020:9;3079:6;3045:61;;;3117:62;3175:2;3164:9;3160:18;3151:6;3117:62;;3196:294;3332:2;3317:18;;3346:61;3321:9;3380:6;3346:61;;;3418:62;3476:2;3465:9;3461:18;3452:6;3418:62;;3497:193;3605:2;3590:18;;3619:61;3594:9;3653:6;3619:61;;;3576:114;;;;;3697:128;3777:42;3766:54;;3749:76;3832:79;3901:5;3884:27;4053:92;4126:13;4119:21;;4102:43",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { ERC20Wrapper } from \"../../lib/ERC20Wrapper.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract ERC20WrapperMock {\n    function allowance(\n        address _token,\n        address _owner,\n        address _spender\n    )\n        public\n        returns (uint256)\n    {\n        return ERC20Wrapper.allowance(_token, _owner, _spender);\n    }\n\n    function approve(\n        address _token,\n        address _spender,\n        uint256 _quantity\n    )\n        public\n    {\n        ERC20Wrapper.approve(_token, _spender, _quantity);\n    }\n\n    function ensureAllowance(\n        address _token,\n        address _owner,\n        address _spender,\n        uint256 _quantity\n    )\n        public\n    {\n        ERC20Wrapper.ensureAllowance(_token, _owner, _spender, _quantity);\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/ERC20WrapperMock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/ERC20WrapperMock.sol",
    "exportedSymbols": {
      "ERC20WrapperMock": [
        7552
      ]
    },
    "id": 7553,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 7490,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:58"
      },
      {
        "id": 7491,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:58"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 7493,
        "nodeType": "ImportDirective",
        "scope": 7553,
        "sourceUnit": 7198,
        "src": "61:58:58",
        "symbolAliases": [
          {
            "foreign": 7492,
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
        "id": 7552,
        "linearizedBaseContracts": [
          7552
        ],
        "name": "ERC20WrapperMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 7511,
              "nodeType": "Block",
              "src": "355:72:58",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 7506,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7495,
                        "src": "395:6:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7507,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7497,
                        "src": "403:6:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7508,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7499,
                        "src": "411:8:58",
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
                        "id": 7504,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7197,
                        "src": "372:12:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$7197_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 7505,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7076,
                      "src": "372:22:58",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 7509,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "372:48:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 7503,
                  "id": 7510,
                  "nodeType": "Return",
                  "src": "365:55:58"
                }
              ]
            },
            "documentation": null,
            "id": 7512,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7500,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7495,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 7512,
                  "src": "239:14:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7494,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "239:7:58",
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
                  "id": 7497,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 7512,
                  "src": "263:14:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7496,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "263:7:58",
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
                  "id": 7499,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 7512,
                  "src": "287:16:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7498,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "287:7:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "229:80:58"
            },
            "payable": false,
            "returnParameters": {
              "id": 7503,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7502,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7512,
                  "src": "342:7:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7501,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "342:7:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "341:9:58"
            },
            "scope": 7552,
            "src": "211:216:58",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 7529,
              "nodeType": "Block",
              "src": "552:66:58",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 7524,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7514,
                        "src": "583:6:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7525,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7516,
                        "src": "591:8:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7526,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7518,
                        "src": "601:9:58",
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
                        "id": 7521,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7197,
                        "src": "562:12:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$7197_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 7523,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7148,
                      "src": "562:20:58",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 7527,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "562:49:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 7528,
                  "nodeType": "ExpressionStatement",
                  "src": "562:49:58"
                }
              ]
            },
            "documentation": null,
            "id": 7530,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7519,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7514,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 7530,
                  "src": "459:14:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7513,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "459:7:58",
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
                  "id": 7516,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 7530,
                  "src": "483:16:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7515,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "483:7:58",
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
                  "id": 7518,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 7530,
                  "src": "509:17:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7517,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "449:83:58"
            },
            "payable": false,
            "returnParameters": {
              "id": 7520,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "552:0:58"
            },
            "scope": 7552,
            "src": "433:185:58",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 7550,
              "nodeType": "Block",
              "src": "775:82:58",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 7544,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7532,
                        "src": "814:6:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7545,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7534,
                        "src": "822:6:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7546,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7536,
                        "src": "830:8:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7547,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7538,
                        "src": "840:9:58",
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
                        "id": 7541,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7197,
                        "src": "785:12:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$7197_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 7543,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "ensureAllowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7181,
                      "src": "785:28:58",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 7548,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "785:65:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 7549,
                  "nodeType": "ExpressionStatement",
                  "src": "785:65:58"
                }
              ]
            },
            "documentation": null,
            "id": 7551,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7539,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7532,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 7551,
                  "src": "658:14:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7531,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "658:7:58",
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
                  "id": 7534,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 7551,
                  "src": "682:14:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7533,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "682:7:58",
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
                  "id": 7536,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 7551,
                  "src": "706:16:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7535,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "706:7:58",
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
                  "id": 7538,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 7551,
                  "src": "732:17:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7537,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "732:7:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "648:107:58"
            },
            "payable": false,
            "returnParameters": {
              "id": 7540,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "775:0:58"
            },
            "scope": 7552,
            "src": "624:233:58",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 7553,
        "src": "179:680:58"
      }
    ],
    "src": "0:860:58"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/ERC20WrapperMock.sol",
    "exportedSymbols": {
      "ERC20WrapperMock": [
        7552
      ]
    },
    "id": 7553,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 7490,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:58"
      },
      {
        "id": 7491,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:58"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 7493,
        "nodeType": "ImportDirective",
        "scope": 7553,
        "sourceUnit": 7198,
        "src": "61:58:58",
        "symbolAliases": [
          {
            "foreign": 7492,
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
        "id": 7552,
        "linearizedBaseContracts": [
          7552
        ],
        "name": "ERC20WrapperMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 7511,
              "nodeType": "Block",
              "src": "355:72:58",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 7506,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7495,
                        "src": "395:6:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7507,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7497,
                        "src": "403:6:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7508,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7499,
                        "src": "411:8:58",
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
                        "id": 7504,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7197,
                        "src": "372:12:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$7197_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 7505,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7076,
                      "src": "372:22:58",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 7509,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "372:48:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 7503,
                  "id": 7510,
                  "nodeType": "Return",
                  "src": "365:55:58"
                }
              ]
            },
            "documentation": null,
            "id": 7512,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7500,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7495,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 7512,
                  "src": "239:14:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7494,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "239:7:58",
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
                  "id": 7497,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 7512,
                  "src": "263:14:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7496,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "263:7:58",
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
                  "id": 7499,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 7512,
                  "src": "287:16:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7498,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "287:7:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "229:80:58"
            },
            "payable": false,
            "returnParameters": {
              "id": 7503,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7502,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 7512,
                  "src": "342:7:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7501,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "342:7:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "341:9:58"
            },
            "scope": 7552,
            "src": "211:216:58",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 7529,
              "nodeType": "Block",
              "src": "552:66:58",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 7524,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7514,
                        "src": "583:6:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7525,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7516,
                        "src": "591:8:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7526,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7518,
                        "src": "601:9:58",
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
                        "id": 7521,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7197,
                        "src": "562:12:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$7197_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 7523,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7148,
                      "src": "562:20:58",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 7527,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "562:49:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 7528,
                  "nodeType": "ExpressionStatement",
                  "src": "562:49:58"
                }
              ]
            },
            "documentation": null,
            "id": 7530,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7519,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7514,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 7530,
                  "src": "459:14:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7513,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "459:7:58",
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
                  "id": 7516,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 7530,
                  "src": "483:16:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7515,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "483:7:58",
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
                  "id": 7518,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 7530,
                  "src": "509:17:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7517,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "449:83:58"
            },
            "payable": false,
            "returnParameters": {
              "id": 7520,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "552:0:58"
            },
            "scope": 7552,
            "src": "433:185:58",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 7550,
              "nodeType": "Block",
              "src": "775:82:58",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 7544,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7532,
                        "src": "814:6:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7545,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7534,
                        "src": "822:6:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7546,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7536,
                        "src": "830:8:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 7547,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7538,
                        "src": "840:9:58",
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
                        "id": 7541,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7197,
                        "src": "785:12:58",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$7197_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 7543,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "ensureAllowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7181,
                      "src": "785:28:58",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 7548,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "785:65:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 7549,
                  "nodeType": "ExpressionStatement",
                  "src": "785:65:58"
                }
              ]
            },
            "documentation": null,
            "id": 7551,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 7539,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 7532,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 7551,
                  "src": "658:14:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7531,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "658:7:58",
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
                  "id": 7534,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 7551,
                  "src": "682:14:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7533,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "682:7:58",
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
                  "id": 7536,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 7551,
                  "src": "706:16:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 7535,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "706:7:58",
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
                  "id": 7538,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 7551,
                  "src": "732:17:58",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 7537,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "732:7:58",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "648:107:58"
            },
            "payable": false,
            "returnParameters": {
              "id": 7540,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "775:0:58"
            },
            "scope": 7552,
            "src": "624:233:58",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 7553,
        "src": "179:680:58"
      }
    ],
    "src": "0:860:58"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.211Z"
}
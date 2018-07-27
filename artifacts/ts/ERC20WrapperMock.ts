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
  "bytecode": "0x608060405234801561001057600080fd5b50610637806100206000396000f3006080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630f1bd38c811461005b578063927da1051461007d578063e1f21c67146100b3575b600080fd5b34801561006757600080fd5b5061007b610076366004610412565b6100d3565b005b34801561008957600080fd5b5061009d6100983660046103c5565b6100e5565b6040516100aa919061058e565b60405180910390f35b3480156100bf57600080fd5b5061007b6100ce366004610473565b6100fc565b6100df8484848461010c565b50505050565b60006100f284848461013c565b90505b9392505050565b6101078383836101e5565b505050565b600061011985858561013c565b90508181101561013557610135858461013061035a565b6101e5565b5050505050565b6040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063dd62ed3e906101939086908690600401610547565b602060405180830381600087803b1580156101ad57600080fd5b505af11580156101c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506100f291908101906104dc565b6040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063095ea7b3906102399085908590600401610562565b602060405180830381600087803b15801561025357600080fd5b505af1158015610267573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061028b91908101906104b6565b50610294610360565b608060405190810160405280604281526020017f417070726f76656420746f6b656e20646f6573206e6f742072657475726e206e81526020017f756c6c206f722074727565206f6e207375636365737366756c20617070726f7681526020017f652e0000000000000000000000000000000000000000000000000000000000008152509015156100df576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610351919061057d565b60405180910390fd5b60001990565b6000803d801561037757602081146103805761038c565b6001915061038c565b60206000803e60005191505b50600114919050565b60006100f582356105a6565b60006100f582516105c2565b60006100f582356105bf565b60006100f582516105bf565b6000806000606084860312156103da57600080fd5b60006103e68686610395565b93505060206103f786828701610395565b925050604061040886828701610395565b9150509250925092565b6000806000806080858703121561042857600080fd5b60006104348787610395565b945050602061044587828801610395565b935050604061045687828801610395565b9250506060610467878288016103ad565b91505092959194509250565b60008060006060848603121561048857600080fd5b60006104948686610395565b93505060206104a586828701610395565b9250506040610408868287016103ad565b6000602082840312156104c857600080fd5b60006104d484846103a1565b949350505050565b6000602082840312156104ee57600080fd5b60006104d484846103b9565b610503816105a6565b82525050565b6000610514826105a2565b8084526105288160208601602086016105c7565b610531816105f3565b9093016020019392505050565b610503816105bf565b6040810161055582856104fa565b6100f560208301846104fa565b6040810161057082856104fa565b6100f5602083018461053e565b602080825281016100f58184610509565b6020810161059c828461053e565b92915050565b5190565b73ffffffffffffffffffffffffffffffffffffffff1690565b90565b151590565b60005b838110156105e25781810151838201526020016105ca565b838111156100df5750506000910152565b601f01601f1916905600a265627a7a72305820a099f21c5d7da684b3a078a52387fe85e98ab188ec919b2f295f85cc87ca3dbb6c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x6080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630f1bd38c811461005b578063927da1051461007d578063e1f21c67146100b3575b600080fd5b34801561006757600080fd5b5061007b610076366004610412565b6100d3565b005b34801561008957600080fd5b5061009d6100983660046103c5565b6100e5565b6040516100aa919061058e565b60405180910390f35b3480156100bf57600080fd5b5061007b6100ce366004610473565b6100fc565b6100df8484848461010c565b50505050565b60006100f284848461013c565b90505b9392505050565b6101078383836101e5565b505050565b600061011985858561013c565b90508181101561013557610135858461013061035a565b6101e5565b5050505050565b6040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063dd62ed3e906101939086908690600401610547565b602060405180830381600087803b1580156101ad57600080fd5b505af11580156101c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506100f291908101906104dc565b6040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063095ea7b3906102399085908590600401610562565b602060405180830381600087803b15801561025357600080fd5b505af1158015610267573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061028b91908101906104b6565b50610294610360565b608060405190810160405280604281526020017f417070726f76656420746f6b656e20646f6573206e6f742072657475726e206e81526020017f756c6c206f722074727565206f6e207375636365737366756c20617070726f7681526020017f652e0000000000000000000000000000000000000000000000000000000000008152509015156100df576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610351919061057d565b60405180910390fd5b60001990565b6000803d801561037757602081146103805761038c565b6001915061038c565b60206000803e60005191505b50600114919050565b60006100f582356105a6565b60006100f582516105c2565b60006100f582356105bf565b60006100f582516105bf565b6000806000606084860312156103da57600080fd5b60006103e68686610395565b93505060206103f786828701610395565b925050604061040886828701610395565b9150509250925092565b6000806000806080858703121561042857600080fd5b60006104348787610395565b945050602061044587828801610395565b935050604061045687828801610395565b9250506060610467878288016103ad565b91505092959194509250565b60008060006060848603121561048857600080fd5b60006104948686610395565b93505060206104a586828701610395565b9250506040610408868287016103ad565b6000602082840312156104c857600080fd5b60006104d484846103a1565b949350505050565b6000602082840312156104ee57600080fd5b60006104d484846103b9565b610503816105a6565b82525050565b6000610514826105a2565b8084526105288160208601602086016105c7565b610531816105f3565b9093016020019392505050565b610503816105bf565b6040810161055582856104fa565b6100f560208301846104fa565b6040810161057082856104fa565b6100f5602083018461053e565b602080825281016100f58184610509565b6020810161059c828461053e565b92915050565b5190565b73ffffffffffffffffffffffffffffffffffffffff1690565b90565b151590565b60005b838110156105e25781810151838201526020016105ca565b838111156100df5750506000910152565b601f01601f1916905600a265627a7a72305820a099f21c5d7da684b3a078a52387fe85e98ab188ec919b2f295f85cc87ca3dbb6c6578706572696d656e74616cf50037",
  "sourceMap": "179:680:53:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;179:680:53;;;;;;;",
  "deployedSourceMap": "179:680:53:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;624:233;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;624:233:53;;;;;;;;;;;211:216;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;211:216:53;;;;;;;;;;;;;;;;;;;;;;;;;433:185;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;433:185:53;;;;;;;;;624:233;785:65;814:6;822;830:8;840:9;785:28;:65::i;:::-;624:233;;;;:::o;211:216::-;342:7;372:48;395:6;403;411:8;372:22;:48::i;:::-;365:55;;211:216;;;;;;:::o;433:185::-;562:49;583:6;591:8;601:9;562:20;:49::i;:::-;433:185;;;:::o;2925:409:48:-;3088:21;3112:35;3122:6;3130;3138:8;3112:9;:35::i;:::-;3088:59;;3180:9;3161:16;:28;3157:171;;;3205:112;3230:6;3254:8;3280:23;:21;:23::i;:::-;3205:7;:112::i;:::-;2925:409;;;;;:::o;1763:249::-;1951:54;;;;;1921:7;;1951:31;;;;;;:54;;1983:11;;1996:8;;1951:54;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1951:54:48;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1951:54:48;;;;;;;101:4:-1;97:9;90:4;84;80:15;76:31;69:5;65:43;126:6;120:4;113:20;0:138;1951:54:48;;;;;;;;2632:287;2770:50;;;;;:29;;;;;;:50;;2800:8;;2810:9;;2770:50;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2770:50:48;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2770:50:48;;;;;;;101:4:-1;97:9;90:4;84;80:15;76:31;69:5;65:43;126:6;120:4;113:20;0:138;2770:50:48;;;;;;;;;;2852:14;:12;:14::i;:::-;2880:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;2831:81;;;;;;;;;;;;;;;;;;;;;;;;;854:118:47;-1:-1:-1;;854:118:47;:::o;3548:852:48:-;3623:4;;3807:14;3884:57;;;;3993:4;3988:220;;;;3800:497;;3884:57;3926:1;3911:16;;3884:57;;3988:220;4093:4;4088:3;4083;4068:30;4190:3;4184:10;4169:25;;3800:497;-1:-1:-1;4392:1:48;4377:16;;3548:852;-1:-1:-1;3548:852:48:o;5:118:-1:-;;72:46;110:6;97:20;72:46;;130:116;;205:36;233:6;227:13;205:36;;253:118;;320:46;358:6;345:20;320:46;;378:122;;456:39;487:6;481:13;456:39;;507:491;;;;645:2;633:9;624:7;620:23;616:32;613:2;;;661:1;658;651:12;613:2;696:1;713:53;758:7;738:9;713:53;;;703:63;;675:97;803:2;821:53;866:7;857:6;846:9;842:22;821:53;;;811:63;;782:98;911:2;929:53;974:7;965:6;954:9;950:22;929:53;;;919:63;;890:98;607:391;;;;;;1005:617;;;;;1160:3;1148:9;1139:7;1135:23;1131:33;1128:2;;;1177:1;1174;1167:12;1128:2;1212:1;1229:53;1274:7;1254:9;1229:53;;;1219:63;;1191:97;1319:2;1337:53;1382:7;1373:6;1362:9;1358:22;1337:53;;;1327:63;;1298:98;1427:2;1445:53;1490:7;1481:6;1470:9;1466:22;1445:53;;;1435:63;;1406:98;1535:2;1553:53;1598:7;1589:6;1578:9;1574:22;1553:53;;;1543:63;;1514:98;1122:500;;;;;;;;1629:491;;;;1767:2;1755:9;1746:7;1742:23;1738:32;1735:2;;;1783:1;1780;1773:12;1735:2;1818:1;1835:53;1880:7;1860:9;1835:53;;;1825:63;;1797:97;1925:2;1943:53;1988:7;1979:6;1968:9;1964:22;1943:53;;;1933:63;;1904:98;2033:2;2051:53;2096:7;2087:6;2076:9;2072:22;2051:53;;2127:257;;2239:2;2227:9;2218:7;2214:23;2210:32;2207:2;;;2255:1;2252;2245:12;2207:2;2290:1;2307:61;2360:7;2340:9;2307:61;;;2297:71;2201:183;-1:-1;;;;2201:183;2391:263;;2506:2;2494:9;2485:7;2481:23;2477:32;2474:2;;;2522:1;2519;2512:12;2474:2;2557:1;2574:64;2630:7;2610:9;2574:64;;2661:110;2734:31;2759:5;2734:31;;;2729:3;2722:44;2716:55;;;2778:292;;2876:35;2905:5;2876:35;;;2928:6;2923:3;2916:19;2940:63;2996:6;2989:4;2984:3;2980:14;2973:4;2966:5;2962:16;2940:63;;;3035:29;3057:6;3035:29;;;3015:50;;;3028:4;3015:50;;2856:214;-1:-1;;;2856:214;3077:110;3150:31;3175:5;3150:31;;3194:294;3330:2;3315:18;;3344:61;3319:9;3378:6;3344:61;;;3416:62;3474:2;3463:9;3459:18;3450:6;3416:62;;3495:294;3631:2;3616:18;;3645:61;3620:9;3679:6;3645:61;;;3717:62;3775:2;3764:9;3760:18;3751:6;3717:62;;3796:273;3920:2;3934:47;;;3905:18;;3995:64;3905:18;4045:6;3995:64;;4076:193;4184:2;4169:18;;4198:61;4173:9;4232:6;4198:61;;;4155:114;;;;;4276:88;4347:12;;4331:33;4371:128;4451:42;4440:54;;4423:76;4506:79;4575:5;4558:27;4727:92;4800:13;4793:21;;4776:43;4913:268;4978:1;4985:101;4999:6;4996:1;4993:13;4985:101;;;5066:11;;;5060:18;5047:11;;;5040:39;5021:2;5014:10;4985:101;;;5101:6;5098:1;5095:13;5092:2;;;-1:-1;;5166:1;5148:16;;5141:27;4962:219;5189:97;5277:2;5257:14;-1:-1;;5253:28;;5237:49",
  "source": "pragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { ERC20Wrapper } from \"../../lib/ERC20Wrapper.sol\";\n\n// Mock contract implementation of OrderLibrary functions\ncontract ERC20WrapperMock {\n    function allowance(\n        address _token,\n        address _owner,\n        address _spender\n    )\n        public\n        returns (uint256)\n    {\n        return ERC20Wrapper.allowance(_token, _owner, _spender);\n    }\n\n    function approve(\n        address _token,\n        address _spender,\n        uint256 _quantity\n    )\n        public\n    {\n        ERC20Wrapper.approve(_token, _spender, _quantity);\n    }\n\n    function ensureAllowance(\n        address _token,\n        address _owner,\n        address _spender,\n        uint256 _quantity\n    )\n        public\n    {\n        ERC20Wrapper.ensureAllowance(_token, _owner, _spender, _quantity);\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/ERC20WrapperMock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/ERC20WrapperMock.sol",
    "exportedSymbols": {
      "ERC20WrapperMock": [
        5523
      ]
    },
    "id": 5524,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5461,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:53"
      },
      {
        "id": 5462,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:53"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 5464,
        "nodeType": "ImportDirective",
        "scope": 5524,
        "sourceUnit": 5201,
        "src": "61:58:53",
        "symbolAliases": [
          {
            "foreign": 5463,
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
        "id": 5523,
        "linearizedBaseContracts": [
          5523
        ],
        "name": "ERC20WrapperMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5482,
              "nodeType": "Block",
              "src": "355:72:53",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5477,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5466,
                        "src": "395:6:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5478,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5468,
                        "src": "403:6:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5479,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5470,
                        "src": "411:8:53",
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
                        "id": 5475,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5200,
                        "src": "372:12:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5200_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5476,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5076,
                      "src": "372:22:53",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 5480,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "372:48:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 5474,
                  "id": 5481,
                  "nodeType": "Return",
                  "src": "365:55:53"
                }
              ]
            },
            "documentation": null,
            "id": 5483,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5471,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5466,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5483,
                  "src": "239:14:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5465,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "239:7:53",
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
                  "id": 5468,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5483,
                  "src": "263:14:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5467,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "263:7:53",
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
                  "id": 5470,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5483,
                  "src": "287:16:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5469,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "287:7:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "229:80:53"
            },
            "payable": false,
            "returnParameters": {
              "id": 5474,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5473,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5483,
                  "src": "342:7:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5472,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "342:7:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "341:9:53"
            },
            "scope": 5523,
            "src": "211:216:53",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5500,
              "nodeType": "Block",
              "src": "552:66:53",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5495,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5485,
                        "src": "583:6:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5496,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5487,
                        "src": "591:8:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5497,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5489,
                        "src": "601:9:53",
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
                        "id": 5492,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5200,
                        "src": "562:12:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5200_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5494,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5151,
                      "src": "562:20:53",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 5498,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "562:49:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5499,
                  "nodeType": "ExpressionStatement",
                  "src": "562:49:53"
                }
              ]
            },
            "documentation": null,
            "id": 5501,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5490,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5485,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5501,
                  "src": "459:14:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5484,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "459:7:53",
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
                  "id": 5487,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5501,
                  "src": "483:16:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5486,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "483:7:53",
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
                  "id": 5489,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5501,
                  "src": "509:17:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5488,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "449:83:53"
            },
            "payable": false,
            "returnParameters": {
              "id": 5491,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "552:0:53"
            },
            "scope": 5523,
            "src": "433:185:53",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5521,
              "nodeType": "Block",
              "src": "775:82:53",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5515,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5503,
                        "src": "814:6:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5516,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5505,
                        "src": "822:6:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5517,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5507,
                        "src": "830:8:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5518,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5509,
                        "src": "840:9:53",
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
                        "id": 5512,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5200,
                        "src": "785:12:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5200_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5514,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "ensureAllowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5184,
                      "src": "785:28:53",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 5519,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "785:65:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5520,
                  "nodeType": "ExpressionStatement",
                  "src": "785:65:53"
                }
              ]
            },
            "documentation": null,
            "id": 5522,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5510,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5503,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5522,
                  "src": "658:14:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5502,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "658:7:53",
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
                  "id": 5505,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5522,
                  "src": "682:14:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5504,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "682:7:53",
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
                  "id": 5507,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5522,
                  "src": "706:16:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5506,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "706:7:53",
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
                  "id": 5509,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5522,
                  "src": "732:17:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5508,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "732:7:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "648:107:53"
            },
            "payable": false,
            "returnParameters": {
              "id": 5511,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "775:0:53"
            },
            "scope": 5523,
            "src": "624:233:53",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5524,
        "src": "179:680:53"
      }
    ],
    "src": "0:860:53"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/lib/ERC20WrapperMock.sol",
    "exportedSymbols": {
      "ERC20WrapperMock": [
        5523
      ]
    },
    "id": 5524,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5461,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:53"
      },
      {
        "id": 5462,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "24:35:53"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../../lib/ERC20Wrapper.sol",
        "id": 5464,
        "nodeType": "ImportDirective",
        "scope": 5524,
        "sourceUnit": 5201,
        "src": "61:58:53",
        "symbolAliases": [
          {
            "foreign": 5463,
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
        "id": 5523,
        "linearizedBaseContracts": [
          5523
        ],
        "name": "ERC20WrapperMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 5482,
              "nodeType": "Block",
              "src": "355:72:53",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5477,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5466,
                        "src": "395:6:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5478,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5468,
                        "src": "403:6:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5479,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5470,
                        "src": "411:8:53",
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
                        "id": 5475,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5200,
                        "src": "372:12:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5200_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5476,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "allowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5076,
                      "src": "372:22:53",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address,address) view returns (uint256)"
                      }
                    },
                    "id": 5480,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "372:48:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 5474,
                  "id": 5481,
                  "nodeType": "Return",
                  "src": "365:55:53"
                }
              ]
            },
            "documentation": null,
            "id": 5483,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5471,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5466,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5483,
                  "src": "239:14:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5465,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "239:7:53",
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
                  "id": 5468,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5483,
                  "src": "263:14:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5467,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "263:7:53",
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
                  "id": 5470,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5483,
                  "src": "287:16:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5469,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "287:7:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "229:80:53"
            },
            "payable": false,
            "returnParameters": {
              "id": 5474,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5473,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5483,
                  "src": "342:7:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5472,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "342:7:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "341:9:53"
            },
            "scope": 5523,
            "src": "211:216:53",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5500,
              "nodeType": "Block",
              "src": "552:66:53",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5495,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5485,
                        "src": "583:6:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5496,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5487,
                        "src": "591:8:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5497,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5489,
                        "src": "601:9:53",
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
                        "id": 5492,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5200,
                        "src": "562:12:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5200_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5494,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "approve",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5151,
                      "src": "562:20:53",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 5498,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "562:49:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5499,
                  "nodeType": "ExpressionStatement",
                  "src": "562:49:53"
                }
              ]
            },
            "documentation": null,
            "id": 5501,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5490,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5485,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5501,
                  "src": "459:14:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5484,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "459:7:53",
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
                  "id": 5487,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5501,
                  "src": "483:16:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5486,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "483:7:53",
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
                  "id": 5489,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5501,
                  "src": "509:17:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5488,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:7:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "449:83:53"
            },
            "payable": false,
            "returnParameters": {
              "id": 5491,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "552:0:53"
            },
            "scope": 5523,
            "src": "433:185:53",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5521,
              "nodeType": "Block",
              "src": "775:82:53",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5515,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5503,
                        "src": "814:6:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5516,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5505,
                        "src": "822:6:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5517,
                        "name": "_spender",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5507,
                        "src": "830:8:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5518,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5509,
                        "src": "840:9:53",
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
                        "id": 5512,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5200,
                        "src": "785:12:53",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5200_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 5514,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "ensureAllowance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5184,
                      "src": "785:28:53",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 5519,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "785:65:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5520,
                  "nodeType": "ExpressionStatement",
                  "src": "785:65:53"
                }
              ]
            },
            "documentation": null,
            "id": 5522,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "ensureAllowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5510,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5503,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 5522,
                  "src": "658:14:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5502,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "658:7:53",
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
                  "id": 5505,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5522,
                  "src": "682:14:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5504,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "682:7:53",
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
                  "id": 5507,
                  "name": "_spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5522,
                  "src": "706:16:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5506,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "706:7:53",
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
                  "id": 5509,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 5522,
                  "src": "732:17:53",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5508,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "732:7:53",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "648:107:53"
            },
            "payable": false,
            "returnParameters": {
              "id": 5511,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "775:0:53"
            },
            "scope": 5523,
            "src": "624:233:53",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5524,
        "src": "179:680:53"
      }
    ],
    "src": "0:860:53"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.845Z"
}
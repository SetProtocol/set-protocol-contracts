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
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "tradeOriginator",
          "type": "address"
        },
        {
          "name": "orderData",
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
  "bytecode": "0x608060405234801561001057600080fd5b50610287806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635da270fc1461005c578063881e142e14610087578063b6c8e453146100b0575b600080fd5b34801561006857600080fd5b506100716100db565b60405161007e91906101f2565b60405180910390f35b34801561009357600080fd5b506100ae60048036036100a9919081019061018b565b610100565b005b3480156100bc57600080fd5b506100c5610105565b6040516100d291906101f2565b60405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000610137823561022d565b905092915050565b60008083601f840112151561015357600080fd5b8235905067ffffffffffffffff81111561016c57600080fd5b60208301915083600182028301111561018457600080fd5b9250929050565b6000806000604084860312156101a057600080fd5b60006101ae8682870161012b565b935050602084013567ffffffffffffffff8111156101cb57600080fd5b6101d78682870161013f565b92509250509250925092565b6101ec8161020d565b82525050565b600060208201905061020760008301846101e3565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff821690509190505600a265627a7a7230582044caa55fc1c15e7799632f2263d942805e5a3aa3cd31cc0ba034cd9976c6bc966c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635da270fc1461005c578063881e142e14610087578063b6c8e453146100b0575b600080fd5b34801561006857600080fd5b506100716100db565b60405161007e91906101f2565b60405180910390f35b34801561009357600080fd5b506100ae60048036036100a9919081019061018b565b610100565b005b3480156100bc57600080fd5b506100c5610105565b6040516100d291906101f2565b60405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000610137823561022d565b905092915050565b60008083601f840112151561015357600080fd5b8235905067ffffffffffffffff81111561016c57600080fd5b60208301915083600182028301111561018457600080fd5b9250929050565b6000806000604084860312156101a057600080fd5b60006101ae8682870161012b565b935050602084013567ffffffffffffffff8111156101cb57600080fd5b6101d78682870161013f565b92509250509250925092565b6101ec8161020d565b82525050565b600060208201905061020760008301846101e3565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff821690509190505600a265627a7a7230582044caa55fc1c15e7799632f2263d942805e5a3aa3cd31cc0ba034cd9976c6bc966c6578706572696d656e74616cf50037",
  "sourceMap": "1012:1106:12:-;;;1257:202;8:9:-1;5:2;;;30:1;27;20:12;5:2;1257:202:12;1012:1106;;;;;;",
  "deployedSourceMap": "1012:1106:12:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1135:31;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1135:31:12;;;;;;;;;;;;;;;;;;;;1520:506;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1520:506:12;;;;;;;;;;;;;;;;;;;1172:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1172:28:12;;;;;;;;;;;;;;;;;;;;1135:31;;;;;;;;;;;;;:::o;1520:506::-;;;;:::o;1172:28::-;;;;;;;;;;;;;:::o;5:118:-1:-;;72:46;110:6;97:20;72:46;;;63:55;;57:66;;;;;144:335;;;258:3;251:4;243:6;239:17;235:27;228:35;225:2;;;276:1;273;266:12;225:2;309:6;296:20;286:30;;336:18;328:6;325:30;322:2;;;368:1;365;358:12;322:2;402:4;394:6;390:17;378:29;;452:3;445;437:6;433:16;423:8;419:31;416:40;413:2;;;469:1;466;459:12;413:2;218:261;;;;;;487:490;;;;627:2;615:9;606:7;602:23;598:32;595:2;;;643:1;640;633:12;595:2;678:1;695:53;740:7;731:6;720:9;716:22;695:53;;;685:63;;657:97;813:2;802:9;798:18;785:32;837:18;829:6;826:30;823:2;;;869:1;866;859:12;823:2;897:64;953:7;944:6;933:9;929:22;897:64;;;879:82;;;;764:203;589:388;;;;;;984:110;1057:31;1082:5;1057:31;;;1052:3;1045:44;1039:55;;;1101:193;;1209:2;1198:9;1194:18;1186:26;;1223:61;1281:1;1270:9;1266:17;1257:6;1223:61;;;1180:114;;;;;1301:128;;1381:42;1374:5;1370:54;1359:65;;1353:76;;;;1436:128;;1516:42;1509:5;1505:54;1494:65;;1488:76;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { LibBytes } from \"../../external/LibBytes.sol\";\nimport { ZeroExOrderDataHandler as ZeroEx } from \"./lib/ZeroExOrderDataHandler.sol\";\n\n\n/**\n * @title ZeroExExchangeWrapper\n * @author Set Protocol\n *\n * The ZeroExExchangeWrapper contract wrapper to interface with 0x V2\n */\ncontract ZeroExExchangeWrapper\n{\n    using SafeMath for uint256;\n\n    /* ============ State Variables ============ */\n\n    address public ZERO_EX_EXCHANGE;\n    address public ZERO_EX_PROXY;\n\n\n    /* ============ Constructor ============ */\n\n    constructor(\n        // address _zeroExExchange,\n        // address _zeroExProxy,\n    )\n        public\n    {\n        // ZERO_EX_EXCHANGE = _zeroExExchange;\n        // ZERO_EX_PROXY = _zeroExProxy;\n    }\n\n\n    /* ============ Public Functions ============ */\n\n    function exchange(\n        address tradeOriginator,\n        bytes orderData\n    )\n        external\n        // returns (uint256)\n    {\n        \n        // Parse fill Amount\n        // uint256 fillAmount = parseFillAmount(_orderData);\n\n        // Slice the signature out.\n\n        // Slice the Order\n\n        // Construct the order\n        // Order memory order = parseZeroExOrder(orderData);\n\n        // Move the required takerToken into the wrapper\n\n        // Ensure allowance\n\n\n        // return 1;\n    }\n\n    /* ============ Getters ============ */\n\n    /* ============ Private ============ */\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/external/ZeroExExchangeWrapper.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/external/ZeroExExchangeWrapper.sol",
    "exportedSymbols": {
      "ZeroExExchangeWrapper": [
        2093
      ]
    },
    "id": 2094,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2066,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:12"
      },
      {
        "id": 2067,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:12"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 2069,
        "nodeType": "ImportDirective",
        "scope": 2094,
        "sourceUnit": 4739,
        "src": "658:73:12",
        "symbolAliases": [
          {
            "foreign": 2068,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/LibBytes.sol",
        "file": "../../external/LibBytes.sol",
        "id": 2071,
        "nodeType": "ImportDirective",
        "scope": 2094,
        "sourceUnit": 3108,
        "src": "732:55:12",
        "symbolAliases": [
          {
            "foreign": 2070,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/external/lib/ZeroExOrderDataHandler.sol",
        "file": "./lib/ZeroExOrderDataHandler.sol",
        "id": 2073,
        "nodeType": "ImportDirective",
        "scope": 2094,
        "sourceUnit": 2331,
        "src": "788:84:12",
        "symbolAliases": [
          {
            "foreign": 2072,
            "local": "ZeroEx"
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
        "id": 2093,
        "linearizedBaseContracts": [
          2093
        ],
        "name": "ZeroExExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2076,
            "libraryName": {
              "contractScope": null,
              "id": 2074,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4738,
              "src": "1055:8:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$4738",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1049:27:12",
            "typeName": {
              "id": 2075,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1068:7:12",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 2078,
            "name": "ZERO_EX_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 2093,
            "src": "1135:31:12",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 2077,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1135:7:12",
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
            "id": 2080,
            "name": "ZERO_EX_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 2093,
            "src": "1172:28:12",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 2079,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1172:7:12",
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
              "id": 2083,
              "nodeType": "Block",
              "src": "1364:95:12",
              "statements": []
            },
            "documentation": null,
            "id": 2084,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2081,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1268:76:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 2082,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1364:0:12"
            },
            "scope": 2093,
            "src": "1257:202:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2091,
              "nodeType": "Block",
              "src": "1652:374:12",
              "statements": []
            },
            "documentation": null,
            "id": 2092,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2089,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2086,
                  "name": "tradeOriginator",
                  "nodeType": "VariableDeclaration",
                  "scope": 2092,
                  "src": "1547:23:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2085,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1547:7:12",
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
                  "id": 2088,
                  "name": "orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2092,
                  "src": "1580:15:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2087,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1580:5:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1537:64:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 2090,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1652:0:12"
            },
            "scope": 2093,
            "src": "1520:506:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2094,
        "src": "1012:1106:12"
      }
    ],
    "src": "597:1522:12"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/external/ZeroExExchangeWrapper.sol",
    "exportedSymbols": {
      "ZeroExExchangeWrapper": [
        2093
      ]
    },
    "id": 2094,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2066,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:12"
      },
      {
        "id": 2067,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:12"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 2069,
        "nodeType": "ImportDirective",
        "scope": 2094,
        "sourceUnit": 4739,
        "src": "658:73:12",
        "symbolAliases": [
          {
            "foreign": 2068,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/LibBytes.sol",
        "file": "../../external/LibBytes.sol",
        "id": 2071,
        "nodeType": "ImportDirective",
        "scope": 2094,
        "sourceUnit": 3108,
        "src": "732:55:12",
        "symbolAliases": [
          {
            "foreign": 2070,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/external/lib/ZeroExOrderDataHandler.sol",
        "file": "./lib/ZeroExOrderDataHandler.sol",
        "id": 2073,
        "nodeType": "ImportDirective",
        "scope": 2094,
        "sourceUnit": 2331,
        "src": "788:84:12",
        "symbolAliases": [
          {
            "foreign": 2072,
            "local": "ZeroEx"
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
        "id": 2093,
        "linearizedBaseContracts": [
          2093
        ],
        "name": "ZeroExExchangeWrapper",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2076,
            "libraryName": {
              "contractScope": null,
              "id": 2074,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4738,
              "src": "1055:8:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$4738",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1049:27:12",
            "typeName": {
              "id": 2075,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1068:7:12",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 2078,
            "name": "ZERO_EX_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 2093,
            "src": "1135:31:12",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 2077,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1135:7:12",
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
            "id": 2080,
            "name": "ZERO_EX_PROXY",
            "nodeType": "VariableDeclaration",
            "scope": 2093,
            "src": "1172:28:12",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 2079,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "1172:7:12",
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
              "id": 2083,
              "nodeType": "Block",
              "src": "1364:95:12",
              "statements": []
            },
            "documentation": null,
            "id": 2084,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2081,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1268:76:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 2082,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1364:0:12"
            },
            "scope": 2093,
            "src": "1257:202:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 2091,
              "nodeType": "Block",
              "src": "1652:374:12",
              "statements": []
            },
            "documentation": null,
            "id": 2092,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "exchange",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2089,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2086,
                  "name": "tradeOriginator",
                  "nodeType": "VariableDeclaration",
                  "scope": 2092,
                  "src": "1547:23:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2085,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1547:7:12",
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
                  "id": 2088,
                  "name": "orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2092,
                  "src": "1580:15:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2087,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "1580:5:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1537:64:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 2090,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1652:0:12"
            },
            "scope": 2093,
            "src": "1520:506:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2094,
        "src": "1012:1106:12"
      }
    ],
    "src": "597:1522:12"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.902Z"
}
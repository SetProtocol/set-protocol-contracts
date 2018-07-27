export const ZeroExOrderDataHandler = 
{
  "contractName": "ZeroExOrderDataHandler",
  "abi": [],
  "bytecode": "0x605a602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a265627a7a723058203b6991308420698080eedca672bc7145872f40c417d8b0b634bcbdd1819a9adf6c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a265627a7a723058203b6991308420698080eedca672bc7145872f40c417d8b0b634bcbdd1819a9adf6c6578706572696d656e74616cf50037",
  "sourceMap": "1031:7122:8:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "1031:7122:8:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { LibBytes } from \"../../../external/0x/LibBytes.sol\";\nimport { LibOrder } from \"../../../external/0x/Exchange/libs/LibOrder.sol\";\n\n\n/**\n * @title ZeroExOrderDataHandler\n * @author Set Protocol\n *\n * This library contains functions and structs to assist with parsing exchange orders data\n */\nlibrary ZeroExOrderDataHandler {\n    using SafeMath for uint256;\n    using LibBytes for bytes;\n\n    // ============ Constants ============\n\n    bytes4 constant ERC20_SELECTOR = bytes4(keccak256(\"ERC20Token(address)\"));\n\n    string constant INVALID_TOKEN_ADDRESS = \"Address is not for ERC20 asset.\";\n\n    // ============ Structs ============\n\n    struct ZeroExHeader {\n        uint256 signatureLength;\n        uint256 orderLength;\n        uint256 makerAssetDataLength;\n        uint256 takerAssetDataLength;\n    }\n\n    struct AssetDataAddresses {\n        address makerTokenAddress;\n        address takerTokenAddress;\n    }\n\n    // ============ Internal Functions ============\n\n    // We construct the following to allow calling fillOrder on ZeroEx V2 Exchange\n    // The layout of this orderData is in the table below.\n    // \n    // | Section | Data                  | Offset              | Length          | Contents                      |\n    // |---------|-----------------------|---------------------|-----------------|-------------------------------|\n    // | Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |\n    // |         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |\n    // |         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |\n    // |         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |\n    // | Body    | fillAmount            | 128                 | 32              | taker asset fill amouint      |\n    // |         | signature             | 160                 | signatureLength | signature in bytes            |\n    // |         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |\n\n    /*\n     * Parses the header of the orderData\n     * Can only be called by authorized contracts.\n     *\n     * @param  _orderData   \n     * @return ZeroExHeader\n     */\n    function parseOrderHeader(bytes _orderData)\n        internal\n        pure\n        returns (ZeroExHeader)\n    {\n        ZeroExHeader memory header;\n\n        uint256 orderDataAddr = _orderData.contentAddress();\n\n        assembly {\n            mstore(header,          mload(orderDataAddr)) // signatureLength\n            mstore(add(header, 32), mload(add(orderDataAddr, 32))) // orderLength\n            mstore(add(header, 64), mload(add(orderDataAddr, 64))) // makerAssetDataLength\n            mstore(add(header, 96), mload(add(orderDataAddr, 96))) // takerAssetDataLength\n        }\n\n        return header;\n    }\n\n    function parseFillAmount(bytes _orderData)\n        internal\n        pure\n        returns (uint256)\n    {\n        uint256 orderDataAddr = _orderData.contentAddress();\n        uint256 fillAmount;\n\n        assembly {\n            fillAmount := mload(add(orderDataAddr, 128))\n        }\n\n        return fillAmount;\n    }\n\n    function sliceSignature(bytes _orderData)\n        internal\n        pure\n        returns (bytes)\n    {\n        uint256 orderDataAddr = _orderData.contentAddress();\n        uint256 signatureLength;\n        assembly {\n            signatureLength := mload(orderDataAddr)\n        }\n\n        bytes memory signature = _orderData.slice(160, signatureLength.add(160));\n        return signature;\n    }\n\n    function sliceZeroExOrder(bytes _orderData, uint _signatureLength, uint _orderLength)\n        internal\n        pure\n        returns (bytes)\n    {\n        uint256 orderDataAddr = _orderData.contentAddress();\n        uint256 orderStartAddress = orderDataAddr.add(_signatureLength);\n        bytes memory order = _orderData.slice(\n            orderStartAddress,\n            orderStartAddress.add(_orderLength)\n        );\n        return order;\n    }\n\n    function constructZeroExOrder(\n        bytes _zeroExOrder,\n        uint _makerAssetDataLength,\n        uint _takerAssetDataLength\n    )\n        internal\n        pure\n        returns (LibOrder.Order memory)\n    {\n        LibOrder.Order memory order;\n        uint256 orderDataAddr = _zeroExOrder.contentAddress();\n\n        // | Data                       | Location | Length |\n        // |----------------------------|----------|--------|\n        // | maker                      | 0        |        |\n        // | taker                      | 32       |        |\n        // | feeRecipient               | 64       |        |\n        // | senderAddress              | 96       |        |\n        // | makerAssetAmount           | 128      |        |\n        // | takerAssetAmount           | 160      |        |\n        // | makerFee                   | 192      |        |\n        // | takerFee                   | 224      |        |\n        // | expirationUnixTimeStampSec | 256      |        |\n        // | salt                       | 288      |        |\n        // | makerAssetData             | 320      | **     |\n        // | takerAssetData             | 320 + ** | ***    |\n        // ** - Maker Asset Data Length\n        // *** - Taker Asset Data Length\n        assembly {\n            mstore(order,           mload(orderDataAddr))           // maker\n            mstore(add(order, 32),  mload(add(orderDataAddr, 32)))  // taker\n            mstore(add(order, 64),  mload(add(orderDataAddr, 64)))  // feeRecipient\n            mstore(add(order, 96),  mload(add(orderDataAddr, 96)))  // senderAddress\n            mstore(add(order, 128), mload(add(orderDataAddr, 128))) // makerAssetAmount\n            mstore(add(order, 160), mload(add(orderDataAddr, 160))) // takerAssetAmount\n            mstore(add(order, 192), mload(add(orderDataAddr, 192))) // makerFee\n            mstore(add(order, 224), mload(add(orderDataAddr, 224))) // takerFee\n            mstore(add(order, 256), mload(add(orderDataAddr, 256))) // expirationUnixTimestampSec\n            mstore(add(order, 288), mload(add(orderDataAddr, 288))) // salt\n        }\n\n        order.makerAssetData = _zeroExOrder.slice(320, _makerAssetDataLength.add(320));\n        order.takerAssetData = _zeroExOrder.slice(\n            _makerAssetDataLength.add(320),\n            _makerAssetDataLength.add(320).add(_takerAssetDataLength)\n        );\n\n        return order;       \n    }\n\n    function parseZeroExOrder(bytes _orderData)\n        internal\n        pure\n        returns(LibOrder.Order memory)\n    {\n        ZeroExHeader memory header = parseOrderHeader(_orderData);\n\n        LibOrder.Order memory order = constructZeroExOrder(\n            sliceZeroExOrder(_orderData, header.signatureLength, header.orderLength),\n            header.makerAssetDataLength,\n            header.takerAssetDataLength\n        );\n\n        return order;\n    }\n\n    function parseERC20TokenAddress(bytes _assetData)\n        internal\n        pure\n        returns(address)\n    {\n        // Ensure that the asset is ERC20\n        bytes4 assetType = _assetData.readBytes4(0);\n        require(\n            ERC20_SELECTOR == assetType,\n            INVALID_TOKEN_ADDRESS\n        );\n\n        address tokenAddress = address(_assetData.readBytes32(4));\n\n        return tokenAddress;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        1431
      ]
    },
    "id": 1432,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1159,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:8"
      },
      {
        "id": 1160,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:8"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1162,
        "nodeType": "ImportDirective",
        "scope": 1432,
        "sourceUnit": 6703,
        "src": "658:73:8",
        "symbolAliases": [
          {
            "foreign": 1161,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 1164,
        "nodeType": "ImportDirective",
        "scope": 1432,
        "sourceUnit": 4793,
        "src": "732:61:8",
        "symbolAliases": [
          {
            "foreign": 1163,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1166,
        "nodeType": "ImportDirective",
        "scope": 1432,
        "sourceUnit": 4644,
        "src": "794:75:8",
        "symbolAliases": [
          {
            "foreign": 1165,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title ZeroExOrderDataHandler\n@author Set Protocol\n * This library contains functions and structs to assist with parsing exchange orders data",
        "fullyImplemented": true,
        "id": 1431,
        "linearizedBaseContracts": [
          1431
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1169,
            "libraryName": {
              "contractScope": null,
              "id": 1167,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6702,
              "src": "1074:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6702",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1068:27:8",
            "typeName": {
              "id": 1168,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1087:7:8",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 1172,
            "libraryName": {
              "contractScope": null,
              "id": 1170,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4792,
              "src": "1106:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$4792",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1100:25:8",
            "typeName": {
              "id": 1171,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "1119:5:8",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "constant": true,
            "id": 1179,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 1431,
            "src": "1175:73:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 1173,
              "name": "bytes4",
              "nodeType": "ElementaryTypeName",
              "src": "1175:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "value": {
              "argumentTypes": null,
              "arguments": [
                {
                  "argumentTypes": null,
                  "arguments": [
                    {
                      "argumentTypes": null,
                      "hexValue": "4552433230546f6b656e286164647265737329",
                      "id": 1176,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1225:21:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_f47261b06eedbfce68afd46d0f3c27c60b03faad319eaf33103611cf8f6456ad",
                        "typeString": "literal_string \"ERC20Token(address)\""
                      },
                      "value": "ERC20Token(address)"
                    }
                  ],
                  "expression": {
                    "argumentTypes": [
                      {
                        "typeIdentifier": "t_stringliteral_f47261b06eedbfce68afd46d0f3c27c60b03faad319eaf33103611cf8f6456ad",
                        "typeString": "literal_string \"ERC20Token(address)\""
                      }
                    ],
                    "id": 1175,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 7249,
                    "src": "1215:9:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 1177,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "1215:32:8",
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
                  }
                ],
                "id": 1174,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "ElementaryTypeNameExpression",
                "src": "1208:6:8",
                "typeDescriptions": {
                  "typeIdentifier": "t_type$_t_bytes4_$",
                  "typeString": "type(bytes4)"
                },
                "typeName": "bytes4"
              },
              "id": 1178,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "typeConversion",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "1208:40:8",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1182,
            "name": "INVALID_TOKEN_ADDRESS",
            "nodeType": "VariableDeclaration",
            "scope": 1431,
            "src": "1255:73:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1180,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1255:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41646472657373206973206e6f7420666f722045524332302061737365742e",
              "id": 1181,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1295:33:8",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_86bd15f736bfc35ffa26d5b270c6a610858a1cd544a317069255ba4a0f5dda71",
                "typeString": "literal_string \"Address is not for ERC20 asset.\""
              },
              "value": "Address is not for ERC20 asset."
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.ZeroExHeader",
            "id": 1191,
            "members": [
              {
                "constant": false,
                "id": 1184,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 1191,
                "src": "1407:23:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1183,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1407:7:8",
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
                "id": 1186,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 1191,
                "src": "1440:19:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1185,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1440:7:8",
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
                "id": 1188,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1191,
                "src": "1469:28:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1187,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1469:7:8",
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
                "id": 1190,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1191,
                "src": "1507:28:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1189,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1507:7:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "ZeroExHeader",
            "nodeType": "StructDefinition",
            "scope": 1431,
            "src": "1377:165:8",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 1196,
            "members": [
              {
                "constant": false,
                "id": 1193,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "1584:25:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1192,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1584:7:8",
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
                "id": 1195,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "1619:25:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1194,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1619:7:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "AssetDataAddresses",
            "nodeType": "StructDefinition",
            "scope": 1431,
            "src": "1548:103:8",
            "visibility": "public"
          },
          {
            "body": {
              "id": 1215,
              "nodeType": "Block",
              "src": "3177:500:8",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1204,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 1216,
                      "src": "3187:26:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1203,
                        "name": "ZeroExHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1191,
                        "src": "3187:12:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_ZeroExHeader_$1191_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1205,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3187:26:8"
                },
                {
                  "assignments": [
                    1207
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1207,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 1216,
                      "src": "3224:21:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1206,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3224:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1211,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1208,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1198,
                        "src": "3248:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1209,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4659,
                      "src": "3248:25:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1210,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3248:27:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3224:51:8"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 1204,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3316:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1207,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3339:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1204,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3397:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1207,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3420:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1204,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3479:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1207,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3502:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1204,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3570:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1207,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3593:13:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1212,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataAddr))\n    mstore(add(header, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(header, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(header, 96), mload(add(orderDataAddr, 96)))\n}",
                  "src": "3286:377:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1213,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1204,
                    "src": "3664:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                    }
                  },
                  "functionReturnParameters": 1202,
                  "id": 1214,
                  "nodeType": "Return",
                  "src": "3657:13:8"
                }
              ]
            },
            "documentation": null,
            "id": 1216,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1199,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1198,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1216,
                  "src": "3094:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1197,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3094:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3093:18:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1202,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1201,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1216,
                  "src": "3159:12:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1200,
                    "name": "ZeroExHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1191,
                    "src": "3159:12:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$1191_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3158:14:8"
            },
            "scope": 1431,
            "src": "3068:609:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1235,
              "nodeType": "Block",
              "src": "3786:211:8",
              "statements": [
                {
                  "assignments": [
                    1224
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1224,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 1236,
                      "src": "3796:21:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1223,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3796:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1228,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1225,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1218,
                        "src": "3820:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1226,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4659,
                      "src": "3820:25:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1227,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3820:27:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3796:51:8"
                },
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1230,
                      "name": "fillAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1236,
                      "src": "3857:18:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1229,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3857:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1231,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3857:18:8"
                },
                {
                  "externalReferences": [
                    {
                      "fillAmount": {
                        "declaration": 1230,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3909:10:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1224,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3933:13:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1232,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    fillAmount := mload(add(orderDataAddr, 128))\n}",
                  "src": "3886:93:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1233,
                    "name": "fillAmount",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1230,
                    "src": "3980:10:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 1222,
                  "id": 1234,
                  "nodeType": "Return",
                  "src": "3973:17:8"
                }
              ]
            },
            "documentation": null,
            "id": 1236,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseFillAmount",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1219,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1218,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1236,
                  "src": "3708:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1217,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3708:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3707:18:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1222,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1221,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1236,
                  "src": "3773:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1220,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3773:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3772:9:8"
            },
            "scope": 1431,
            "src": "3683:314:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1266,
              "nodeType": "Block",
              "src": "4103:291:8",
              "statements": [
                {
                  "assignments": [
                    1244
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1244,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 1267,
                      "src": "4113:21:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1243,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4113:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1248,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1245,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1238,
                        "src": "4137:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1246,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4659,
                      "src": "4137:25:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1247,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4137:27:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4113:51:8"
                },
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1250,
                      "name": "signatureLength",
                      "nodeType": "VariableDeclaration",
                      "scope": 1267,
                      "src": "4174:23:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1249,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4174:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1251,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4174:23:8"
                },
                {
                  "externalReferences": [
                    {
                      "signatureLength": {
                        "declaration": 1250,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4230:15:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1244,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4255:13:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1252,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    signatureLength := mload(orderDataAddr)\n}",
                  "src": "4207:87:8"
                },
                {
                  "assignments": [
                    1254
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1254,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 1267,
                      "src": "4289:22:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 1253,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "4289:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1263,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 1257,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4331:3:8",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_160_by_1",
                          "typeString": "int_const 160"
                        },
                        "value": "160"
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "313630",
                            "id": 1260,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "4356:3:8",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_160_by_1",
                              "typeString": "int_const 160"
                            },
                            "value": "160"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_160_by_1",
                              "typeString": "int_const 160"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1258,
                            "name": "signatureLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1250,
                            "src": "4336:15:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 1259,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6701,
                          "src": "4336:19:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 1261,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4336:24:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_rational_160_by_1",
                          "typeString": "int_const 160"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1255,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1238,
                        "src": "4314:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1256,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4791,
                      "src": "4314:16:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 1262,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4314:47:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4289:72:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1264,
                    "name": "signature",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1254,
                    "src": "4378:9:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 1242,
                  "id": 1265,
                  "nodeType": "Return",
                  "src": "4371:16:8"
                }
              ]
            },
            "documentation": null,
            "id": 1267,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1239,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1238,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1267,
                  "src": "4027:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1237,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4027:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4026:18:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1242,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1241,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1267,
                  "src": "4092:5:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1240,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4092:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4091:7:8"
            },
            "scope": 1431,
            "src": "4003:391:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1304,
              "nodeType": "Block",
              "src": "4544:300:8",
              "statements": [
                {
                  "assignments": [
                    1279
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1279,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 1305,
                      "src": "4554:21:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1278,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4554:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1283,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1280,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1269,
                        "src": "4578:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1281,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4659,
                      "src": "4578:25:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1282,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4578:27:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4554:51:8"
                },
                {
                  "assignments": [
                    1285
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1285,
                      "name": "orderStartAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1305,
                      "src": "4615:25:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1284,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4615:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1290,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1288,
                        "name": "_signatureLength",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1271,
                        "src": "4661:16:8",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 1286,
                        "name": "orderDataAddr",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1279,
                        "src": "4643:13:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1287,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6701,
                      "src": "4643:17:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1289,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4643:35:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4615:63:8"
                },
                {
                  "assignments": [
                    1292
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1292,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1305,
                      "src": "4688:18:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 1291,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "4688:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1301,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1295,
                        "name": "orderStartAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1285,
                        "src": "4739:17:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1298,
                            "name": "_orderLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1273,
                            "src": "4792:12:8",
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 1296,
                            "name": "orderStartAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1285,
                            "src": "4770:17:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 1297,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6701,
                          "src": "4770:21:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 1299,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4770:35:8",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1293,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1269,
                        "src": "4709:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1294,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4791,
                      "src": "4709:16:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 1300,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4709:106:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4688:127:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1302,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1292,
                    "src": "4832:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 1277,
                  "id": 1303,
                  "nodeType": "Return",
                  "src": "4825:12:8"
                }
              ]
            },
            "documentation": null,
            "id": 1305,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1274,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1269,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1305,
                  "src": "4426:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1268,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4426:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1271,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 1305,
                  "src": "4444:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1270,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4444:4:8",
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
                  "id": 1273,
                  "name": "_orderLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 1305,
                  "src": "4467:17:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1272,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4467:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4425:60:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1277,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1276,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1305,
                  "src": "4533:5:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1275,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4533:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4532:7:8"
            },
            "scope": 1431,
            "src": "4400:444:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1362,
              "nodeType": "Block",
              "src": "5060:2214:8",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1319,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1363,
                      "src": "5070:27:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1318,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4635,
                        "src": "5070:14:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1320,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5070:27:8"
                },
                {
                  "assignments": [
                    1322
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1322,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 1363,
                      "src": "5107:21:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1321,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5107:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1326,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1323,
                        "name": "_zeroExOrder",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1307,
                        "src": "5131:12:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1324,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4659,
                      "src": "5131:27:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1325,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5131:29:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5107:53:8"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6150:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6173:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6231:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6254:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6308:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6331:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6653:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6392:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6477:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6415:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6565:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6588:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6500:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6911:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6934:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6733:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6676:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6813:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6756:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6836:13:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1327,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataAddr))\n    mstore(add(order, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(order, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(order, 96), mload(add(orderDataAddr, 96)))\n    mstore(add(order, 128), mload(add(orderDataAddr, 128)))\n    mstore(add(order, 160), mload(add(orderDataAddr, 160)))\n    mstore(add(order, 192), mload(add(orderDataAddr, 192)))\n    mstore(add(order, 224), mload(add(orderDataAddr, 224)))\n    mstore(add(order, 256), mload(add(orderDataAddr, 256)))\n    mstore(add(order, 288), mload(add(orderDataAddr, 288)))\n}",
                  "src": "6120:868:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1339,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1328,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1319,
                        "src": "6983:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1330,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4632,
                      "src": "6983:20:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "hexValue": "333230",
                          "id": 1333,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "7025:3:8",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_320_by_1",
                            "typeString": "int_const 320"
                          },
                          "value": "320"
                        },
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "333230",
                              "id": 1336,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7056:3:8",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_320_by_1",
                                "typeString": "int_const 320"
                              },
                              "value": "320"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_320_by_1",
                                "typeString": "int_const 320"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 1334,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1309,
                              "src": "7030:21:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1335,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6701,
                            "src": "7030:25:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1337,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7030:30:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_rational_320_by_1",
                            "typeString": "int_const 320"
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "id": 1331,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1307,
                          "src": "7006:12:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1332,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4791,
                        "src": "7006:18:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1338,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7006:55:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "6983:78:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1340,
                  "nodeType": "ExpressionStatement",
                  "src": "6983:78:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1358,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1341,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1319,
                        "src": "7071:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1343,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4634,
                      "src": "7071:20:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "333230",
                              "id": 1348,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7152:3:8",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_320_by_1",
                                "typeString": "int_const 320"
                              },
                              "value": "320"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_320_by_1",
                                "typeString": "int_const 320"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 1346,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1309,
                              "src": "7126:21:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1347,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6701,
                            "src": "7126:25:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1349,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7126:30:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1355,
                              "name": "_takerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1311,
                              "src": "7205:21:8",
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
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "hexValue": "333230",
                                  "id": 1352,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "7196:3:8",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_320_by_1",
                                    "typeString": "int_const 320"
                                  },
                                  "value": "320"
                                }
                              ],
                              "expression": {
                                "argumentTypes": [
                                  {
                                    "typeIdentifier": "t_rational_320_by_1",
                                    "typeString": "int_const 320"
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 1350,
                                  "name": "_makerAssetDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1309,
                                  "src": "7170:21:8",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1351,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6701,
                                "src": "7170:25:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1353,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7170:30:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1354,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6701,
                            "src": "7170:34:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1356,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7170:57:8",
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
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "id": 1344,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1307,
                          "src": "7094:12:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1345,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4791,
                        "src": "7094:18:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1357,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7094:143:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7071:166:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1359,
                  "nodeType": "ExpressionStatement",
                  "src": "7071:166:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1360,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1319,
                    "src": "7255:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 1315,
                  "id": 1361,
                  "nodeType": "Return",
                  "src": "7248:12:8"
                }
              ]
            },
            "documentation": null,
            "id": 1363,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "constructZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1312,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1307,
                  "name": "_zeroExOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 1363,
                  "src": "4889:18:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1306,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4889:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1309,
                  "name": "_makerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 1363,
                  "src": "4917:26:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1308,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4917:4:8",
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
                  "id": 1311,
                  "name": "_takerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 1363,
                  "src": "4953:26:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1310,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4953:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4879:106:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1315,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1314,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1363,
                  "src": "5033:14:8",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1313,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4635,
                    "src": "5033:14:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5032:23:8"
            },
            "scope": 1431,
            "src": "4850:2424:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1396,
              "nodeType": "Block",
              "src": "7397:336:8",
              "statements": [
                {
                  "assignments": [
                    1371
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1371,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 1397,
                      "src": "7407:26:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1370,
                        "name": "ZeroExHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1191,
                        "src": "7407:12:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_ZeroExHeader_$1191_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1375,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1373,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1365,
                        "src": "7453:10:8",
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
                      "id": 1372,
                      "name": "parseOrderHeader",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1216,
                      "src": "7436:16:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_ZeroExHeader_$1191_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct ZeroExOrderDataHandler.ZeroExHeader memory)"
                      }
                    },
                    "id": 1374,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7436:28:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7407:57:8"
                },
                {
                  "assignments": [
                    1379
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1379,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1397,
                      "src": "7475:27:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1378,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4635,
                        "src": "7475:14:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1393,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1382,
                            "name": "_orderData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1365,
                            "src": "7556:10:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1383,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1371,
                              "src": "7568:6:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                              }
                            },
                            "id": 1384,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "signatureLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 1184,
                            "src": "7568:22:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1385,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1371,
                              "src": "7592:6:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                              }
                            },
                            "id": 1386,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 1186,
                            "src": "7592:18:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          ],
                          "id": 1381,
                          "name": "sliceZeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1305,
                          "src": "7539:16:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                          }
                        },
                        "id": 1387,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7539:72:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1388,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1371,
                          "src": "7625:6:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                          }
                        },
                        "id": 1389,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1188,
                        "src": "7625:27:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1390,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1371,
                          "src": "7666:6:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                          }
                        },
                        "id": 1391,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1190,
                        "src": "7666:27:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1380,
                      "name": "constructZeroExOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1363,
                      "src": "7505:20:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_struct$_Order_$4635_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 1392,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7505:198:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7475:228:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1394,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1379,
                    "src": "7721:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 1369,
                  "id": 1395,
                  "nodeType": "Return",
                  "src": "7714:12:8"
                }
              ]
            },
            "documentation": null,
            "id": 1397,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1366,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1365,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1397,
                  "src": "7306:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1364,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7306:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7305:18:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1369,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1368,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1397,
                  "src": "7370:14:8",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1367,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4635,
                    "src": "7370:14:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7369:23:8"
            },
            "scope": 1431,
            "src": "7280:453:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1429,
              "nodeType": "Block",
              "src": "7848:303:8",
              "statements": [
                {
                  "assignments": [
                    1405
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1405,
                      "name": "assetType",
                      "nodeType": "VariableDeclaration",
                      "scope": 1430,
                      "src": "7900:16:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes4",
                        "typeString": "bytes4"
                      },
                      "typeName": {
                        "id": 1404,
                        "name": "bytes4",
                        "nodeType": "ElementaryTypeName",
                        "src": "7900:6:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes4",
                          "typeString": "bytes4"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1410,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 1408,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7941:1:8",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1406,
                        "name": "_assetData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1399,
                        "src": "7919:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1407,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "readBytes4",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4682,
                      "src": "7919:21:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
                      }
                    },
                    "id": 1409,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7919:24:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7900:43:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bytes4",
                          "typeString": "bytes4"
                        },
                        "id": 1414,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 1412,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1179,
                          "src": "7974:14:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 1413,
                          "name": "assetType",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1405,
                          "src": "7992:9:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "src": "7974:27:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1415,
                        "name": "INVALID_TOKEN_ADDRESS",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1182,
                        "src": "8015:21:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 1411,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "7953:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1416,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7953:93:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1417,
                  "nodeType": "ExpressionStatement",
                  "src": "7953:93:8"
                },
                {
                  "assignments": [
                    1419
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1419,
                      "name": "tokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1430,
                      "src": "8057:20:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 1418,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "8057:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1426,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "34",
                            "id": 1423,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "8111:1:8",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_4_by_1",
                              "typeString": "int_const 4"
                            },
                            "value": "4"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_4_by_1",
                              "typeString": "int_const 4"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1421,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1399,
                            "src": "8088:10:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1422,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4709,
                          "src": "8088:22:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 1424,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "8088:25:8",
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
                        }
                      ],
                      "id": 1420,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "8080:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": "address"
                    },
                    "id": 1425,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "8080:34:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "8057:57:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1427,
                    "name": "tokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1419,
                    "src": "8132:12:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1403,
                  "id": 1428,
                  "nodeType": "Return",
                  "src": "8125:19:8"
                }
              ]
            },
            "documentation": null,
            "id": 1430,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1400,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1399,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1430,
                  "src": "7771:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1398,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7771:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7770:18:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1403,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1402,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1430,
                  "src": "7835:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1401,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "7835:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7834:9:8"
            },
            "scope": 1431,
            "src": "7739:412:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 1432,
        "src": "1031:7122:8"
      }
    ],
    "src": "597:7557:8"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        1431
      ]
    },
    "id": 1432,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1159,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:8"
      },
      {
        "id": 1160,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:8"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1162,
        "nodeType": "ImportDirective",
        "scope": 1432,
        "sourceUnit": 6703,
        "src": "658:73:8",
        "symbolAliases": [
          {
            "foreign": 1161,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 1164,
        "nodeType": "ImportDirective",
        "scope": 1432,
        "sourceUnit": 4793,
        "src": "732:61:8",
        "symbolAliases": [
          {
            "foreign": 1163,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1166,
        "nodeType": "ImportDirective",
        "scope": 1432,
        "sourceUnit": 4644,
        "src": "794:75:8",
        "symbolAliases": [
          {
            "foreign": 1165,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title ZeroExOrderDataHandler\n@author Set Protocol\n * This library contains functions and structs to assist with parsing exchange orders data",
        "fullyImplemented": true,
        "id": 1431,
        "linearizedBaseContracts": [
          1431
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1169,
            "libraryName": {
              "contractScope": null,
              "id": 1167,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6702,
              "src": "1074:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6702",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1068:27:8",
            "typeName": {
              "id": 1168,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1087:7:8",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 1172,
            "libraryName": {
              "contractScope": null,
              "id": 1170,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4792,
              "src": "1106:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$4792",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1100:25:8",
            "typeName": {
              "id": 1171,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "1119:5:8",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "constant": true,
            "id": 1179,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 1431,
            "src": "1175:73:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 1173,
              "name": "bytes4",
              "nodeType": "ElementaryTypeName",
              "src": "1175:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "value": {
              "argumentTypes": null,
              "arguments": [
                {
                  "argumentTypes": null,
                  "arguments": [
                    {
                      "argumentTypes": null,
                      "hexValue": "4552433230546f6b656e286164647265737329",
                      "id": 1176,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1225:21:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_f47261b06eedbfce68afd46d0f3c27c60b03faad319eaf33103611cf8f6456ad",
                        "typeString": "literal_string \"ERC20Token(address)\""
                      },
                      "value": "ERC20Token(address)"
                    }
                  ],
                  "expression": {
                    "argumentTypes": [
                      {
                        "typeIdentifier": "t_stringliteral_f47261b06eedbfce68afd46d0f3c27c60b03faad319eaf33103611cf8f6456ad",
                        "typeString": "literal_string \"ERC20Token(address)\""
                      }
                    ],
                    "id": 1175,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 7249,
                    "src": "1215:9:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 1177,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "1215:32:8",
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
                  }
                ],
                "id": 1174,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "ElementaryTypeNameExpression",
                "src": "1208:6:8",
                "typeDescriptions": {
                  "typeIdentifier": "t_type$_t_bytes4_$",
                  "typeString": "type(bytes4)"
                },
                "typeName": "bytes4"
              },
              "id": 1178,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "typeConversion",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "1208:40:8",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1182,
            "name": "INVALID_TOKEN_ADDRESS",
            "nodeType": "VariableDeclaration",
            "scope": 1431,
            "src": "1255:73:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1180,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1255:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41646472657373206973206e6f7420666f722045524332302061737365742e",
              "id": 1181,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1295:33:8",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_86bd15f736bfc35ffa26d5b270c6a610858a1cd544a317069255ba4a0f5dda71",
                "typeString": "literal_string \"Address is not for ERC20 asset.\""
              },
              "value": "Address is not for ERC20 asset."
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.ZeroExHeader",
            "id": 1191,
            "members": [
              {
                "constant": false,
                "id": 1184,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 1191,
                "src": "1407:23:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1183,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1407:7:8",
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
                "id": 1186,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 1191,
                "src": "1440:19:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1185,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1440:7:8",
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
                "id": 1188,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1191,
                "src": "1469:28:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1187,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1469:7:8",
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
                "id": 1190,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1191,
                "src": "1507:28:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1189,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1507:7:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "ZeroExHeader",
            "nodeType": "StructDefinition",
            "scope": 1431,
            "src": "1377:165:8",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 1196,
            "members": [
              {
                "constant": false,
                "id": 1193,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "1584:25:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1192,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1584:7:8",
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
                "id": 1195,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "1619:25:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1194,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1619:7:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "AssetDataAddresses",
            "nodeType": "StructDefinition",
            "scope": 1431,
            "src": "1548:103:8",
            "visibility": "public"
          },
          {
            "body": {
              "id": 1215,
              "nodeType": "Block",
              "src": "3177:500:8",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1204,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 1216,
                      "src": "3187:26:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1203,
                        "name": "ZeroExHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1191,
                        "src": "3187:12:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_ZeroExHeader_$1191_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1205,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3187:26:8"
                },
                {
                  "assignments": [
                    1207
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1207,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 1216,
                      "src": "3224:21:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1206,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3224:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1211,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1208,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1198,
                        "src": "3248:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1209,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4659,
                      "src": "3248:25:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1210,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3248:27:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3224:51:8"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 1204,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3316:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1207,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3339:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1204,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3397:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1207,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3420:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1204,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3479:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1207,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3502:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1204,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3570:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1207,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3593:13:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1212,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataAddr))\n    mstore(add(header, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(header, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(header, 96), mload(add(orderDataAddr, 96)))\n}",
                  "src": "3286:377:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1213,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1204,
                    "src": "3664:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                    }
                  },
                  "functionReturnParameters": 1202,
                  "id": 1214,
                  "nodeType": "Return",
                  "src": "3657:13:8"
                }
              ]
            },
            "documentation": null,
            "id": 1216,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1199,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1198,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1216,
                  "src": "3094:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1197,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3094:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3093:18:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1202,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1201,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1216,
                  "src": "3159:12:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1200,
                    "name": "ZeroExHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1191,
                    "src": "3159:12:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$1191_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3158:14:8"
            },
            "scope": 1431,
            "src": "3068:609:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1235,
              "nodeType": "Block",
              "src": "3786:211:8",
              "statements": [
                {
                  "assignments": [
                    1224
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1224,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 1236,
                      "src": "3796:21:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1223,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3796:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1228,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1225,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1218,
                        "src": "3820:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1226,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4659,
                      "src": "3820:25:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1227,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3820:27:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3796:51:8"
                },
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1230,
                      "name": "fillAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1236,
                      "src": "3857:18:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1229,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3857:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1231,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3857:18:8"
                },
                {
                  "externalReferences": [
                    {
                      "fillAmount": {
                        "declaration": 1230,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3909:10:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1224,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3933:13:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1232,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    fillAmount := mload(add(orderDataAddr, 128))\n}",
                  "src": "3886:93:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1233,
                    "name": "fillAmount",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1230,
                    "src": "3980:10:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 1222,
                  "id": 1234,
                  "nodeType": "Return",
                  "src": "3973:17:8"
                }
              ]
            },
            "documentation": null,
            "id": 1236,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseFillAmount",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1219,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1218,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1236,
                  "src": "3708:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1217,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3708:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3707:18:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1222,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1221,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1236,
                  "src": "3773:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1220,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3773:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3772:9:8"
            },
            "scope": 1431,
            "src": "3683:314:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1266,
              "nodeType": "Block",
              "src": "4103:291:8",
              "statements": [
                {
                  "assignments": [
                    1244
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1244,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 1267,
                      "src": "4113:21:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1243,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4113:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1248,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1245,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1238,
                        "src": "4137:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1246,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4659,
                      "src": "4137:25:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1247,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4137:27:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4113:51:8"
                },
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1250,
                      "name": "signatureLength",
                      "nodeType": "VariableDeclaration",
                      "scope": 1267,
                      "src": "4174:23:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1249,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4174:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1251,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4174:23:8"
                },
                {
                  "externalReferences": [
                    {
                      "signatureLength": {
                        "declaration": 1250,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4230:15:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1244,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4255:13:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1252,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    signatureLength := mload(orderDataAddr)\n}",
                  "src": "4207:87:8"
                },
                {
                  "assignments": [
                    1254
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1254,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 1267,
                      "src": "4289:22:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 1253,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "4289:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1263,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 1257,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4331:3:8",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_160_by_1",
                          "typeString": "int_const 160"
                        },
                        "value": "160"
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "313630",
                            "id": 1260,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "4356:3:8",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_160_by_1",
                              "typeString": "int_const 160"
                            },
                            "value": "160"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_160_by_1",
                              "typeString": "int_const 160"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1258,
                            "name": "signatureLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1250,
                            "src": "4336:15:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 1259,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6701,
                          "src": "4336:19:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 1261,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4336:24:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_rational_160_by_1",
                          "typeString": "int_const 160"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1255,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1238,
                        "src": "4314:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1256,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4791,
                      "src": "4314:16:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 1262,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4314:47:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4289:72:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1264,
                    "name": "signature",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1254,
                    "src": "4378:9:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 1242,
                  "id": 1265,
                  "nodeType": "Return",
                  "src": "4371:16:8"
                }
              ]
            },
            "documentation": null,
            "id": 1267,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1239,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1238,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1267,
                  "src": "4027:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1237,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4027:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4026:18:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1242,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1241,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1267,
                  "src": "4092:5:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1240,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4092:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4091:7:8"
            },
            "scope": 1431,
            "src": "4003:391:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1304,
              "nodeType": "Block",
              "src": "4544:300:8",
              "statements": [
                {
                  "assignments": [
                    1279
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1279,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 1305,
                      "src": "4554:21:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1278,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4554:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1283,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1280,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1269,
                        "src": "4578:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1281,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4659,
                      "src": "4578:25:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1282,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4578:27:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4554:51:8"
                },
                {
                  "assignments": [
                    1285
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1285,
                      "name": "orderStartAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1305,
                      "src": "4615:25:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1284,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4615:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1290,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1288,
                        "name": "_signatureLength",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1271,
                        "src": "4661:16:8",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 1286,
                        "name": "orderDataAddr",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1279,
                        "src": "4643:13:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1287,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6701,
                      "src": "4643:17:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1289,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4643:35:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4615:63:8"
                },
                {
                  "assignments": [
                    1292
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1292,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1305,
                      "src": "4688:18:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 1291,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "4688:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1301,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1295,
                        "name": "orderStartAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1285,
                        "src": "4739:17:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1298,
                            "name": "_orderLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1273,
                            "src": "4792:12:8",
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 1296,
                            "name": "orderStartAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1285,
                            "src": "4770:17:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 1297,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6701,
                          "src": "4770:21:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 1299,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4770:35:8",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1293,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1269,
                        "src": "4709:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1294,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4791,
                      "src": "4709:16:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 1300,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4709:106:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4688:127:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1302,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1292,
                    "src": "4832:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 1277,
                  "id": 1303,
                  "nodeType": "Return",
                  "src": "4825:12:8"
                }
              ]
            },
            "documentation": null,
            "id": 1305,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1274,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1269,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1305,
                  "src": "4426:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1268,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4426:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1271,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 1305,
                  "src": "4444:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1270,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4444:4:8",
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
                  "id": 1273,
                  "name": "_orderLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 1305,
                  "src": "4467:17:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1272,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4467:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4425:60:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1277,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1276,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1305,
                  "src": "4533:5:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1275,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4533:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4532:7:8"
            },
            "scope": 1431,
            "src": "4400:444:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1362,
              "nodeType": "Block",
              "src": "5060:2214:8",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1319,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1363,
                      "src": "5070:27:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1318,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4635,
                        "src": "5070:14:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1320,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5070:27:8"
                },
                {
                  "assignments": [
                    1322
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1322,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 1363,
                      "src": "5107:21:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1321,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5107:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1326,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1323,
                        "name": "_zeroExOrder",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1307,
                        "src": "5131:12:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1324,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4659,
                      "src": "5131:27:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 1325,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5131:29:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5107:53:8"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6150:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6173:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6231:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6254:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6308:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6331:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6653:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6392:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6477:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6415:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6565:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6588:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6500:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6911:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6934:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6733:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6676:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1319,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6813:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6756:13:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 1322,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6836:13:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1327,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataAddr))\n    mstore(add(order, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(order, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(order, 96), mload(add(orderDataAddr, 96)))\n    mstore(add(order, 128), mload(add(orderDataAddr, 128)))\n    mstore(add(order, 160), mload(add(orderDataAddr, 160)))\n    mstore(add(order, 192), mload(add(orderDataAddr, 192)))\n    mstore(add(order, 224), mload(add(orderDataAddr, 224)))\n    mstore(add(order, 256), mload(add(orderDataAddr, 256)))\n    mstore(add(order, 288), mload(add(orderDataAddr, 288)))\n}",
                  "src": "6120:868:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1339,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1328,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1319,
                        "src": "6983:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1330,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4632,
                      "src": "6983:20:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "hexValue": "333230",
                          "id": 1333,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "7025:3:8",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_320_by_1",
                            "typeString": "int_const 320"
                          },
                          "value": "320"
                        },
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "333230",
                              "id": 1336,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7056:3:8",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_320_by_1",
                                "typeString": "int_const 320"
                              },
                              "value": "320"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_320_by_1",
                                "typeString": "int_const 320"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 1334,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1309,
                              "src": "7030:21:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1335,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6701,
                            "src": "7030:25:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1337,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7030:30:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_rational_320_by_1",
                            "typeString": "int_const 320"
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "id": 1331,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1307,
                          "src": "7006:12:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1332,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4791,
                        "src": "7006:18:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1338,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7006:55:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "6983:78:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1340,
                  "nodeType": "ExpressionStatement",
                  "src": "6983:78:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1358,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1341,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1319,
                        "src": "7071:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1343,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4634,
                      "src": "7071:20:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory",
                        "typeString": "bytes memory"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "333230",
                              "id": 1348,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7152:3:8",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_320_by_1",
                                "typeString": "int_const 320"
                              },
                              "value": "320"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_320_by_1",
                                "typeString": "int_const 320"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 1346,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1309,
                              "src": "7126:21:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1347,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6701,
                            "src": "7126:25:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1349,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7126:30:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1355,
                              "name": "_takerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1311,
                              "src": "7205:21:8",
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
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "hexValue": "333230",
                                  "id": 1352,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "7196:3:8",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_320_by_1",
                                    "typeString": "int_const 320"
                                  },
                                  "value": "320"
                                }
                              ],
                              "expression": {
                                "argumentTypes": [
                                  {
                                    "typeIdentifier": "t_rational_320_by_1",
                                    "typeString": "int_const 320"
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 1350,
                                  "name": "_makerAssetDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1309,
                                  "src": "7170:21:8",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1351,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6701,
                                "src": "7170:25:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1353,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7170:30:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1354,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6701,
                            "src": "7170:34:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1356,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7170:57:8",
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
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "id": 1344,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1307,
                          "src": "7094:12:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1345,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4791,
                        "src": "7094:18:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1357,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7094:143:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7071:166:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1359,
                  "nodeType": "ExpressionStatement",
                  "src": "7071:166:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1360,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1319,
                    "src": "7255:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 1315,
                  "id": 1361,
                  "nodeType": "Return",
                  "src": "7248:12:8"
                }
              ]
            },
            "documentation": null,
            "id": 1363,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "constructZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1312,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1307,
                  "name": "_zeroExOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 1363,
                  "src": "4889:18:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1306,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4889:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1309,
                  "name": "_makerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 1363,
                  "src": "4917:26:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1308,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4917:4:8",
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
                  "id": 1311,
                  "name": "_takerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 1363,
                  "src": "4953:26:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1310,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4953:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4879:106:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1315,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1314,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1363,
                  "src": "5033:14:8",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1313,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4635,
                    "src": "5033:14:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5032:23:8"
            },
            "scope": 1431,
            "src": "4850:2424:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1396,
              "nodeType": "Block",
              "src": "7397:336:8",
              "statements": [
                {
                  "assignments": [
                    1371
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1371,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 1397,
                      "src": "7407:26:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1370,
                        "name": "ZeroExHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1191,
                        "src": "7407:12:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_ZeroExHeader_$1191_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1375,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1373,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1365,
                        "src": "7453:10:8",
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
                      "id": 1372,
                      "name": "parseOrderHeader",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1216,
                      "src": "7436:16:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_ZeroExHeader_$1191_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct ZeroExOrderDataHandler.ZeroExHeader memory)"
                      }
                    },
                    "id": 1374,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7436:28:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7407:57:8"
                },
                {
                  "assignments": [
                    1379
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1379,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1397,
                      "src": "7475:27:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1378,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4635,
                        "src": "7475:14:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1393,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1382,
                            "name": "_orderData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1365,
                            "src": "7556:10:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1383,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1371,
                              "src": "7568:6:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                              }
                            },
                            "id": 1384,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "signatureLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 1184,
                            "src": "7568:22:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1385,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1371,
                              "src": "7592:6:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                              }
                            },
                            "id": 1386,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 1186,
                            "src": "7592:18:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          ],
                          "id": 1381,
                          "name": "sliceZeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1305,
                          "src": "7539:16:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                          }
                        },
                        "id": 1387,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "7539:72:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1388,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1371,
                          "src": "7625:6:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                          }
                        },
                        "id": 1389,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1188,
                        "src": "7625:27:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1390,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1371,
                          "src": "7666:6:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ZeroExHeader_$1191_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                          }
                        },
                        "id": 1391,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1190,
                        "src": "7666:27:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1380,
                      "name": "constructZeroExOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1363,
                      "src": "7505:20:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_struct$_Order_$4635_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 1392,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7505:198:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7475:228:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1394,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1379,
                    "src": "7721:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 1369,
                  "id": 1395,
                  "nodeType": "Return",
                  "src": "7714:12:8"
                }
              ]
            },
            "documentation": null,
            "id": 1397,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1366,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1365,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1397,
                  "src": "7306:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1364,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7306:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7305:18:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1369,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1368,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1397,
                  "src": "7370:14:8",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4635_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1367,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4635,
                    "src": "7370:14:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4635_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7369:23:8"
            },
            "scope": 1431,
            "src": "7280:453:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1429,
              "nodeType": "Block",
              "src": "7848:303:8",
              "statements": [
                {
                  "assignments": [
                    1405
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1405,
                      "name": "assetType",
                      "nodeType": "VariableDeclaration",
                      "scope": 1430,
                      "src": "7900:16:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes4",
                        "typeString": "bytes4"
                      },
                      "typeName": {
                        "id": 1404,
                        "name": "bytes4",
                        "nodeType": "ElementaryTypeName",
                        "src": "7900:6:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes4",
                          "typeString": "bytes4"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1410,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 1408,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7941:1:8",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1406,
                        "name": "_assetData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1399,
                        "src": "7919:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1407,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "readBytes4",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4682,
                      "src": "7919:21:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
                      }
                    },
                    "id": 1409,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7919:24:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes4",
                      "typeString": "bytes4"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7900:43:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bytes4",
                          "typeString": "bytes4"
                        },
                        "id": 1414,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 1412,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1179,
                          "src": "7974:14:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 1413,
                          "name": "assetType",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1405,
                          "src": "7992:9:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "src": "7974:27:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1415,
                        "name": "INVALID_TOKEN_ADDRESS",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1182,
                        "src": "8015:21:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 1411,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "7953:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1416,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7953:93:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1417,
                  "nodeType": "ExpressionStatement",
                  "src": "7953:93:8"
                },
                {
                  "assignments": [
                    1419
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1419,
                      "name": "tokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1430,
                      "src": "8057:20:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 1418,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "8057:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1426,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "34",
                            "id": 1423,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "8111:1:8",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_4_by_1",
                              "typeString": "int_const 4"
                            },
                            "value": "4"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_4_by_1",
                              "typeString": "int_const 4"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1421,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1399,
                            "src": "8088:10:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1422,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4709,
                          "src": "8088:22:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 1424,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "8088:25:8",
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
                        }
                      ],
                      "id": 1420,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "8080:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": "address"
                    },
                    "id": 1425,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "8080:34:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "8057:57:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1427,
                    "name": "tokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1419,
                    "src": "8132:12:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1403,
                  "id": 1428,
                  "nodeType": "Return",
                  "src": "8125:19:8"
                }
              ]
            },
            "documentation": null,
            "id": 1430,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1400,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1399,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1430,
                  "src": "7771:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1398,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7771:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7770:18:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1403,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1402,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1430,
                  "src": "7835:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1401,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "7835:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7834:9:8"
            },
            "scope": 1431,
            "src": "7739:412:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 1432,
        "src": "1031:7122:8"
      }
    ],
    "src": "597:7557:8"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.796Z"
}
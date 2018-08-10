export const ZeroExOrderDataHandler = 
{
  "contractName": "ZeroExOrderDataHandler",
  "abi": [],
  "bytecode": "0x605a602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a265627a7a72305820f50f60c3a7d654581175168836544189a5c32207111913537b6cc723093d348f6c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a265627a7a72305820f50f60c3a7d654581175168836544189a5c32207111913537b6cc723093d348f6c6578706572696d656e74616cf50037",
  "sourceMap": "2472:5141:8:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "2472:5141:8:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { LibBytes } from \"../../../external/0x/LibBytes.sol\";\nimport { LibOrder } from \"../../../external/0x/Exchange/libs/LibOrder.sol\";\n\n\n/**\n * @title ZeroExOrderDataHandler\n * @author Set Protocol\n *\n * This library contains functions and structs to assist with parsing 0x wrapper order data\n *\n * The layout of each wrapper order is in the table below. \"ordersData\" always refers to one or more byte strings,\n * each containing all of these columns concatenated together. Each of the parse methods (header/body) below takes\n * the entire ordersData along with an offset to parse the next (header/body) specified by the offset. This saves\n * from having to do redudant memCopies to isolate the bytes containing the data to parse.\n *\n * | Section | Data                  | Offset              | Length          | Contents                      |\n * |---------|-----------------------|---------------------|-----------------|-------------------------------|\n * | Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |\n * |         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |\n * |         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |\n * |         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |\n * |         | fillAmount            | 128                 | 32              | taker asset fill amouint      |\n * | Body    | signature             | 160                 | signatureLength | signature in bytes            |\n * |         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |\n */\nlibrary ZeroExOrderDataHandler {\n    using LibBytes for bytes;\n    using SafeMath for uint256;\n\n    // ============ Constants ============\n\n    bytes4 constant ERC20_SELECTOR = bytes4(keccak256(\"ERC20Token(address)\"));\n\n    // ============ Structs ============\n\n    struct OrderHeader {\n        uint256 signatureLength;\n        uint256 orderLength;\n        uint256 makerAssetDataLength;\n        uint256 takerAssetDataLength;\n        uint256 fillAmount;\n    }\n\n    struct AssetDataAddresses {\n        address makerTokenAddress;\n        address takerTokenAddress;\n    }\n\n    // ============ Internal Functions ============\n\n    /**\n     * Parse token address from asset data\n     *\n     * @param _assetData   Encoded asset data\n     * @return address     Address of ERC20 asset address\n     */\n    function parseERC20TokenAddress(\n        bytes _assetData\n    )\n        internal\n        pure\n        returns(address)\n    {\n        // Ensure that the asset is ERC20\n        require(_assetData.readBytes4(0) == ERC20_SELECTOR);\n\n        // Return address\n        return address(_assetData.readBytes32(4));\n    }\n\n    /*\n     * Parses the header from order byte array\n     * Can only be called by authorized contracts.\n     *\n     * @param  _ordersData   Byte array of order data\n     * @param  _offset       Offset to start scanning for order header\n     * @return OrderHeader   Struct containing wrapper order header data\n     */\n    function parseOrderHeader(\n        bytes _ordersData,\n        uint256 _offset\n    )\n        internal\n        pure\n        returns (OrderHeader)\n    {\n        OrderHeader memory header;\n\n        uint256 orderDataStart = _ordersData.contentAddress().add(_offset);\n\n        assembly {\n            mstore(header,           mload(orderDataStart))           // signatureLength\n            mstore(add(header, 32),  mload(add(orderDataStart, 32)))  // orderLength\n            mstore(add(header, 64),  mload(add(orderDataStart, 64)))  // makerAssetDataLength\n            mstore(add(header, 96),  mload(add(orderDataStart, 96)))  // takerAssetDataLength\n            mstore(add(header, 128), mload(add(orderDataStart, 128))) // fillAmmount\n        }\n\n        return header;\n    }\n\n    /*\n     * Parses the bytes array into ZeroEx order\n     *\n     * | Data                       | Location                      |\n     * |----------------------------|-------------------------------|\n     * | makerAddress               | 0                             |\n     * | takerAddress               | 32                            |\n     * | feeRecipientAddress        | 64                            |\n     * | senderAddress              | 96                            |\n     * | makerAssetAmount           | 128                           |\n     * | takerAssetAmount           | 160                           |\n     * | makerFee                   | 192                           |\n     * | takerFee                   | 224                           |\n     * | expirationTimeSeconds      | 256                           |\n     * | salt                       | 288                           |\n     * | makerAssetData             | 320                           |\n     * | takerAssetData             | 320 + header.makerAssetLength |\n     *\n     * @param  _ordersData      Byte array of (multiple) 0x wrapper orders\n     * @param  _header          Header associated with current 0x order body to scan\n     * @param  _offset          Offset to start scanning for 0x order body\n     * @return LibOrder.Order   0x order struct\n     */\n    function parseZeroExOrder(\n        bytes _ordersData,\n        OrderHeader memory _header,\n        uint256 _offset\n    )\n        internal\n        pure\n        returns(LibOrder.Order memory)\n    {\n        LibOrder.Order memory order;\n\n        uint256 orderDataStart = _ordersData.contentAddress().add(_offset);\n\n        assembly {\n            mstore(order,           mload(orderDataStart))           // maker\n            mstore(add(order, 32),  mload(add(orderDataStart, 32)))  // taker\n            mstore(add(order, 64),  mload(add(orderDataStart, 64)))  // feeRecipient\n            mstore(add(order, 96),  mload(add(orderDataStart, 96)))  // senderAddress\n            mstore(add(order, 128), mload(add(orderDataStart, 128))) // makerAssetAmount\n            mstore(add(order, 160), mload(add(orderDataStart, 160))) // takerAssetAmount\n            mstore(add(order, 192), mload(add(orderDataStart, 192))) // makerFee\n            mstore(add(order, 224), mload(add(orderDataStart, 224))) // takerFee\n            mstore(add(order, 256), mload(add(orderDataStart, 256))) // expirationUnixTimestampSec\n            mstore(add(order, 288), mload(add(orderDataStart, 288))) // salt\n        }\n\n        uint256 takerAssetStart = _header.makerAssetDataLength.add(320);\n        order.makerAssetData = _ordersData.slice(\n            _offset.add(320),\n            _offset.add(takerAssetStart)\n        );\n        order.takerAssetData = _ordersData.slice(\n            _offset.add(takerAssetStart),\n            _offset.add(takerAssetStart).add(_header.takerAssetDataLength)\n        );\n\n        return order;\n    }\n}\n",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        1412
      ]
    },
    "id": 1413,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1253,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:8"
      },
      {
        "id": 1254,
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
        "id": 1256,
        "nodeType": "ImportDirective",
        "scope": 1413,
        "sourceUnit": 6746,
        "src": "658:73:8",
        "symbolAliases": [
          {
            "foreign": 1255,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 1258,
        "nodeType": "ImportDirective",
        "scope": 1413,
        "sourceUnit": 4854,
        "src": "732:61:8",
        "symbolAliases": [
          {
            "foreign": 1257,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1260,
        "nodeType": "ImportDirective",
        "scope": 1413,
        "sourceUnit": 4705,
        "src": "794:75:8",
        "symbolAliases": [
          {
            "foreign": 1259,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title ZeroExOrderDataHandler\n@author Set Protocol\n * This library contains functions and structs to assist with parsing 0x wrapper order data\n * The layout of each wrapper order is in the table below. \"ordersData\" always refers to one or more byte strings,\neach containing all of these columns concatenated together. Each of the parse methods (header/body) below takes\nthe entire ordersData along with an offset to parse the next (header/body) specified by the offset. This saves\nfrom having to do redudant memCopies to isolate the bytes containing the data to parse.\n * | Section | Data                  | Offset              | Length          | Contents                      |\n|---------|-----------------------|---------------------|-----------------|-------------------------------|\n| Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |\n|         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |\n|         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |\n|         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |\n|         | fillAmount            | 128                 | 32              | taker asset fill amouint      |\n| Body    | signature             | 160                 | signatureLength | signature in bytes            |\n|         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |",
        "fullyImplemented": true,
        "id": 1412,
        "linearizedBaseContracts": [
          1412
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1263,
            "libraryName": {
              "contractScope": null,
              "id": 1261,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4853,
              "src": "2515:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$4853",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2509:25:8",
            "typeName": {
              "id": 1262,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "2528:5:8",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "id": 1266,
            "libraryName": {
              "contractScope": null,
              "id": 1264,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6745,
              "src": "2545:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6745",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2539:27:8",
            "typeName": {
              "id": 1265,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "2558:7:8",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1273,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 1412,
            "src": "2616:73:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 1267,
              "name": "bytes4",
              "nodeType": "ElementaryTypeName",
              "src": "2616:6:8",
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
                      "id": 1270,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2666:21:8",
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
                    "id": 1269,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 7292,
                    "src": "2656:9:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 1271,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "2656:32:8",
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
                "id": 1268,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "ElementaryTypeNameExpression",
                "src": "2649:6:8",
                "typeDescriptions": {
                  "typeIdentifier": "t_type$_t_bytes4_$",
                  "typeString": "type(bytes4)"
                },
                "typeName": "bytes4"
              },
              "id": 1272,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "typeConversion",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "2649:40:8",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.OrderHeader",
            "id": 1284,
            "members": [
              {
                "constant": false,
                "id": 1275,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 1284,
                "src": "2767:23:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1274,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2767:7:8",
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
                "id": 1277,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 1284,
                "src": "2800:19:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1276,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2800:7:8",
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
                "id": 1279,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1284,
                "src": "2829:28:8",
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
                  "src": "2829:7:8",
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
                "id": 1281,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1284,
                "src": "2867:28:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1280,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2867:7:8",
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
                "id": 1283,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 1284,
                "src": "2905:18:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1282,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2905:7:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "OrderHeader",
            "nodeType": "StructDefinition",
            "scope": 1412,
            "src": "2738:192:8",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 1289,
            "members": [
              {
                "constant": false,
                "id": 1286,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1289,
                "src": "2972:25:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1285,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2972:7:8",
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
                "id": 1288,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1289,
                "src": "3007:25:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1287,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "3007:7:8",
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
            "scope": 1412,
            "src": "2936:103:8",
            "visibility": "public"
          },
          {
            "body": {
              "id": 1312,
              "nodeType": "Block",
              "src": "3391:188:8",
              "statements": [
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
                        "id": 1302,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 1299,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3473:1:8",
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
                              "id": 1297,
                              "name": "_assetData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1291,
                              "src": "3451:10:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 1298,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "readBytes4",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4743,
                            "src": "3451:21:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
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
                          "src": "3451:24:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 1301,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1273,
                          "src": "3479:14:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "src": "3451:42:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 1296,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "3443:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1303,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3443:51:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1304,
                  "nodeType": "ExpressionStatement",
                  "src": "3443:51:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "34",
                            "id": 1308,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3569:1:8",
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
                            "id": 1306,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1291,
                            "src": "3546:10:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1307,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4770,
                          "src": "3546:22:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 1309,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3546:25:8",
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
                      "id": 1305,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "3538:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": "address"
                    },
                    "id": 1310,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3538:34:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1295,
                  "id": 1311,
                  "nodeType": "Return",
                  "src": "3531:41:8"
                }
              ]
            },
            "documentation": "Parse token address from asset data\n     * @param _assetData   Encoded asset data\n@return address     Address of ERC20 asset address",
            "id": 1313,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1292,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1291,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1313,
                  "src": "3309:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1290,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3309:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3299:32:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1295,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1294,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1313,
                  "src": "3378:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1293,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3378:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3377:9:8"
            },
            "scope": 1412,
            "src": "3268:311:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1337,
              "nodeType": "Block",
              "src": "4051:620:8",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1323,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 1338,
                      "src": "4061:25:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1322,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1284,
                        "src": "4061:11:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$1284_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1324,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4061:25:8"
                },
                {
                  "assignments": [
                    1326
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1326,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1338,
                      "src": "4097:22:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1325,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4097:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1333,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1331,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1317,
                        "src": "4155:7:8",
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
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1327,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1315,
                            "src": "4122:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1328,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4720,
                          "src": "4122:26:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 1329,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4122:28:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1330,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6744,
                      "src": "4122:32:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1332,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4122:41:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4097:66:8"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 1323,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4204:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1326,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4228:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1323,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4297:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1326,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4321:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1323,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4382:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1326,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4406:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1323,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4476:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1323,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4570:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1326,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4500:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1326,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4594:14:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1334,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataStart))\n    mstore(add(header, 32), mload(add(orderDataStart, 32)))\n    mstore(add(header, 64), mload(add(orderDataStart, 64)))\n    mstore(add(header, 96), mload(add(orderDataStart, 96)))\n    mstore(add(header, 128), mload(add(orderDataStart, 128)))\n}",
                  "src": "4174:483:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1335,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1323,
                    "src": "4658:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "functionReturnParameters": 1321,
                  "id": 1336,
                  "nodeType": "Return",
                  "src": "4651:13:8"
                }
              ]
            },
            "documentation": null,
            "id": 1338,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1318,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1315,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1338,
                  "src": "3938:17:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1314,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3938:5:8",
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
                  "id": 1317,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 1338,
                  "src": "3965:15:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1316,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3965:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3928:58:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1321,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1320,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1338,
                  "src": "4034:11:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1319,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1284,
                    "src": "4034:11:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1284_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4033:13:8"
            },
            "scope": 1412,
            "src": "3903:768:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1410,
              "nodeType": "Block",
              "src": "6210:1401:8",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1352,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1411,
                      "src": "6220:27:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4696_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1351,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4696,
                        "src": "6220:14:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4696_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1353,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6220:27:8"
                },
                {
                  "assignments": [
                    1355
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1355,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1411,
                      "src": "6258:22:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1354,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6258:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1362,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1360,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1344,
                        "src": "6316:7:8",
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
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1356,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1340,
                            "src": "6283:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1357,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4720,
                          "src": "6283:26:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 1358,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6283:28:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1359,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6744,
                      "src": "6283:32:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1361,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6283:41:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6258:66:8"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6365:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6388:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6447:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6470:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6525:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6548:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6874:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6610:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6696:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6633:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6785:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6808:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6719:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7135:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7158:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6955:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6897:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7036:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6978:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7059:14:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1363,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataStart))\n    mstore(add(order, 32), mload(add(orderDataStart, 32)))\n    mstore(add(order, 64), mload(add(orderDataStart, 64)))\n    mstore(add(order, 96), mload(add(orderDataStart, 96)))\n    mstore(add(order, 128), mload(add(orderDataStart, 128)))\n    mstore(add(order, 160), mload(add(orderDataStart, 160)))\n    mstore(add(order, 192), mload(add(orderDataStart, 192)))\n    mstore(add(order, 224), mload(add(orderDataStart, 224)))\n    mstore(add(order, 256), mload(add(orderDataStart, 256)))\n    mstore(add(order, 288), mload(add(orderDataStart, 288)))\n}",
                  "src": "6335:880:8"
                },
                {
                  "assignments": [
                    1365
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1365,
                      "name": "takerAssetStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1411,
                      "src": "7208:23:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1364,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7208:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1371,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "333230",
                        "id": 1369,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7267:3:8",
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
                        "expression": {
                          "argumentTypes": null,
                          "id": 1366,
                          "name": "_header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1342,
                          "src": "7234:7:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 1367,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1279,
                        "src": "7234:28:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1368,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6744,
                      "src": "7234:32:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1370,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7234:37:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7208:63:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1386,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1372,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1352,
                        "src": "7281:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4696_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1374,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4693,
                      "src": "7281:20:8",
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
                              "id": 1379,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7347:3:8",
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
                              "id": 1377,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1344,
                              "src": "7335:7:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1378,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6744,
                            "src": "7335:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1380,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7335:16:8",
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
                              "id": 1383,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1365,
                              "src": "7377:15:8",
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
                              "id": 1381,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1344,
                              "src": "7365:7:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1382,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6744,
                            "src": "7365:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1384,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7365:28:8",
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
                          "id": 1375,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1340,
                          "src": "7304:11:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1376,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4852,
                        "src": "7304:17:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1385,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7304:99:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7281:122:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1387,
                  "nodeType": "ExpressionStatement",
                  "src": "7281:122:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1406,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1388,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1352,
                        "src": "7413:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4696_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1390,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4695,
                      "src": "7413:20:8",
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
                              "id": 1395,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1365,
                              "src": "7479:15:8",
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
                              "id": 1393,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1344,
                              "src": "7467:7:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1394,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6744,
                            "src": "7467:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1396,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7467:28:8",
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
                              "expression": {
                                "argumentTypes": null,
                                "id": 1402,
                                "name": "_header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1342,
                                "src": "7542:7:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                                  "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                                }
                              },
                              "id": 1403,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "takerAssetDataLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1281,
                              "src": "7542:28:8",
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
                                  "id": 1399,
                                  "name": "takerAssetStart",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1365,
                                  "src": "7521:15:8",
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
                                  "id": 1397,
                                  "name": "_offset",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1344,
                                  "src": "7509:7:8",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1398,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6744,
                                "src": "7509:11:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1400,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7509:28:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1401,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6744,
                            "src": "7509:32:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1404,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7509:62:8",
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
                          "id": 1391,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1340,
                          "src": "7436:11:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1392,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4852,
                        "src": "7436:17:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1405,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7436:145:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7413:168:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1407,
                  "nodeType": "ExpressionStatement",
                  "src": "7413:168:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1408,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1352,
                    "src": "7599:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4696_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 1348,
                  "id": 1409,
                  "nodeType": "Return",
                  "src": "7592:12:8"
                }
              ]
            },
            "documentation": null,
            "id": 1411,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1345,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1340,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "6052:17:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1339,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6052:5:8",
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
                  "id": 1342,
                  "name": "_header",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "6079:26:8",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1341,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1284,
                    "src": "6079:11:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1284_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1344,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "6115:15:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1343,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6115:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6042:94:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1348,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1347,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "6183:14:8",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4696_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1346,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4696,
                    "src": "6183:14:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4696_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6182:23:8"
            },
            "scope": 1412,
            "src": "6017:1594:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 1413,
        "src": "2472:5141:8"
      }
    ],
    "src": "597:7017:8"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        1412
      ]
    },
    "id": 1413,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1253,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:8"
      },
      {
        "id": 1254,
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
        "id": 1256,
        "nodeType": "ImportDirective",
        "scope": 1413,
        "sourceUnit": 6746,
        "src": "658:73:8",
        "symbolAliases": [
          {
            "foreign": 1255,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 1258,
        "nodeType": "ImportDirective",
        "scope": 1413,
        "sourceUnit": 4854,
        "src": "732:61:8",
        "symbolAliases": [
          {
            "foreign": 1257,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1260,
        "nodeType": "ImportDirective",
        "scope": 1413,
        "sourceUnit": 4705,
        "src": "794:75:8",
        "symbolAliases": [
          {
            "foreign": 1259,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title ZeroExOrderDataHandler\n@author Set Protocol\n * This library contains functions and structs to assist with parsing 0x wrapper order data\n * The layout of each wrapper order is in the table below. \"ordersData\" always refers to one or more byte strings,\neach containing all of these columns concatenated together. Each of the parse methods (header/body) below takes\nthe entire ordersData along with an offset to parse the next (header/body) specified by the offset. This saves\nfrom having to do redudant memCopies to isolate the bytes containing the data to parse.\n * | Section | Data                  | Offset              | Length          | Contents                      |\n|---------|-----------------------|---------------------|-----------------|-------------------------------|\n| Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |\n|         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |\n|         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |\n|         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |\n|         | fillAmount            | 128                 | 32              | taker asset fill amouint      |\n| Body    | signature             | 160                 | signatureLength | signature in bytes            |\n|         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |",
        "fullyImplemented": true,
        "id": 1412,
        "linearizedBaseContracts": [
          1412
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1263,
            "libraryName": {
              "contractScope": null,
              "id": 1261,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4853,
              "src": "2515:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$4853",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2509:25:8",
            "typeName": {
              "id": 1262,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "2528:5:8",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "id": 1266,
            "libraryName": {
              "contractScope": null,
              "id": 1264,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6745,
              "src": "2545:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6745",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2539:27:8",
            "typeName": {
              "id": 1265,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "2558:7:8",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1273,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 1412,
            "src": "2616:73:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 1267,
              "name": "bytes4",
              "nodeType": "ElementaryTypeName",
              "src": "2616:6:8",
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
                      "id": 1270,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2666:21:8",
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
                    "id": 1269,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 7292,
                    "src": "2656:9:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 1271,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "2656:32:8",
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
                "id": 1268,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "ElementaryTypeNameExpression",
                "src": "2649:6:8",
                "typeDescriptions": {
                  "typeIdentifier": "t_type$_t_bytes4_$",
                  "typeString": "type(bytes4)"
                },
                "typeName": "bytes4"
              },
              "id": 1272,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "typeConversion",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "2649:40:8",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.OrderHeader",
            "id": 1284,
            "members": [
              {
                "constant": false,
                "id": 1275,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 1284,
                "src": "2767:23:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1274,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2767:7:8",
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
                "id": 1277,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 1284,
                "src": "2800:19:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1276,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2800:7:8",
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
                "id": 1279,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1284,
                "src": "2829:28:8",
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
                  "src": "2829:7:8",
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
                "id": 1281,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1284,
                "src": "2867:28:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1280,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2867:7:8",
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
                "id": 1283,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 1284,
                "src": "2905:18:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1282,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2905:7:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "OrderHeader",
            "nodeType": "StructDefinition",
            "scope": 1412,
            "src": "2738:192:8",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 1289,
            "members": [
              {
                "constant": false,
                "id": 1286,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1289,
                "src": "2972:25:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1285,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2972:7:8",
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
                "id": 1288,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1289,
                "src": "3007:25:8",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1287,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "3007:7:8",
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
            "scope": 1412,
            "src": "2936:103:8",
            "visibility": "public"
          },
          {
            "body": {
              "id": 1312,
              "nodeType": "Block",
              "src": "3391:188:8",
              "statements": [
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
                        "id": 1302,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 1299,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3473:1:8",
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
                              "id": 1297,
                              "name": "_assetData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1291,
                              "src": "3451:10:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 1298,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "readBytes4",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4743,
                            "src": "3451:21:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
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
                          "src": "3451:24:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 1301,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1273,
                          "src": "3479:14:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "src": "3451:42:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 1296,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "3443:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1303,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3443:51:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1304,
                  "nodeType": "ExpressionStatement",
                  "src": "3443:51:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "34",
                            "id": 1308,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3569:1:8",
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
                            "id": 1306,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1291,
                            "src": "3546:10:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1307,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4770,
                          "src": "3546:22:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 1309,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3546:25:8",
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
                      "id": 1305,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "3538:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": "address"
                    },
                    "id": 1310,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3538:34:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1295,
                  "id": 1311,
                  "nodeType": "Return",
                  "src": "3531:41:8"
                }
              ]
            },
            "documentation": "Parse token address from asset data\n     * @param _assetData   Encoded asset data\n@return address     Address of ERC20 asset address",
            "id": 1313,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1292,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1291,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1313,
                  "src": "3309:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1290,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3309:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3299:32:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1295,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1294,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1313,
                  "src": "3378:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1293,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3378:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3377:9:8"
            },
            "scope": 1412,
            "src": "3268:311:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1337,
              "nodeType": "Block",
              "src": "4051:620:8",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1323,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 1338,
                      "src": "4061:25:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1322,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1284,
                        "src": "4061:11:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$1284_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1324,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4061:25:8"
                },
                {
                  "assignments": [
                    1326
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1326,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1338,
                      "src": "4097:22:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1325,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4097:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1333,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1331,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1317,
                        "src": "4155:7:8",
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
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1327,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1315,
                            "src": "4122:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1328,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4720,
                          "src": "4122:26:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 1329,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4122:28:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1330,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6744,
                      "src": "4122:32:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1332,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4122:41:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4097:66:8"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 1323,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4204:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1326,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4228:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1323,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4297:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1326,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4321:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1323,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4382:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1326,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4406:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1323,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4476:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1323,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4570:6:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1326,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4500:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1326,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4594:14:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1334,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataStart))\n    mstore(add(header, 32), mload(add(orderDataStart, 32)))\n    mstore(add(header, 64), mload(add(orderDataStart, 64)))\n    mstore(add(header, 96), mload(add(orderDataStart, 96)))\n    mstore(add(header, 128), mload(add(orderDataStart, 128)))\n}",
                  "src": "4174:483:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1335,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1323,
                    "src": "4658:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "functionReturnParameters": 1321,
                  "id": 1336,
                  "nodeType": "Return",
                  "src": "4651:13:8"
                }
              ]
            },
            "documentation": null,
            "id": 1338,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1318,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1315,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1338,
                  "src": "3938:17:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1314,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3938:5:8",
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
                  "id": 1317,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 1338,
                  "src": "3965:15:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1316,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3965:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3928:58:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1321,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1320,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1338,
                  "src": "4034:11:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1319,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1284,
                    "src": "4034:11:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1284_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4033:13:8"
            },
            "scope": 1412,
            "src": "3903:768:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1410,
              "nodeType": "Block",
              "src": "6210:1401:8",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1352,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1411,
                      "src": "6220:27:8",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4696_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1351,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4696,
                        "src": "6220:14:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4696_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1353,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6220:27:8"
                },
                {
                  "assignments": [
                    1355
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1355,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1411,
                      "src": "6258:22:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1354,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6258:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1362,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1360,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1344,
                        "src": "6316:7:8",
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
                        "arguments": [],
                        "expression": {
                          "argumentTypes": [],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1356,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1340,
                            "src": "6283:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1357,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4720,
                          "src": "6283:26:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 1358,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6283:28:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1359,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6744,
                      "src": "6283:32:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1361,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6283:41:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6258:66:8"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6365:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6388:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6447:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6470:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6525:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6548:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6874:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6610:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6696:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6633:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6785:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6808:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6719:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7135:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7158:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6955:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6897:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1352,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7036:5:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6978:14:8",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1355,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7059:14:8",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1363,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataStart))\n    mstore(add(order, 32), mload(add(orderDataStart, 32)))\n    mstore(add(order, 64), mload(add(orderDataStart, 64)))\n    mstore(add(order, 96), mload(add(orderDataStart, 96)))\n    mstore(add(order, 128), mload(add(orderDataStart, 128)))\n    mstore(add(order, 160), mload(add(orderDataStart, 160)))\n    mstore(add(order, 192), mload(add(orderDataStart, 192)))\n    mstore(add(order, 224), mload(add(orderDataStart, 224)))\n    mstore(add(order, 256), mload(add(orderDataStart, 256)))\n    mstore(add(order, 288), mload(add(orderDataStart, 288)))\n}",
                  "src": "6335:880:8"
                },
                {
                  "assignments": [
                    1365
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1365,
                      "name": "takerAssetStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1411,
                      "src": "7208:23:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1364,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7208:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1371,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "333230",
                        "id": 1369,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7267:3:8",
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
                        "expression": {
                          "argumentTypes": null,
                          "id": 1366,
                          "name": "_header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1342,
                          "src": "7234:7:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 1367,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1279,
                        "src": "7234:28:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1368,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6744,
                      "src": "7234:32:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1370,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7234:37:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7208:63:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1386,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1372,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1352,
                        "src": "7281:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4696_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1374,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4693,
                      "src": "7281:20:8",
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
                              "id": 1379,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7347:3:8",
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
                              "id": 1377,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1344,
                              "src": "7335:7:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1378,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6744,
                            "src": "7335:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1380,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7335:16:8",
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
                              "id": 1383,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1365,
                              "src": "7377:15:8",
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
                              "id": 1381,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1344,
                              "src": "7365:7:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1382,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6744,
                            "src": "7365:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1384,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7365:28:8",
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
                          "id": 1375,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1340,
                          "src": "7304:11:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1376,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4852,
                        "src": "7304:17:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1385,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7304:99:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7281:122:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1387,
                  "nodeType": "ExpressionStatement",
                  "src": "7281:122:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1406,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1388,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1352,
                        "src": "7413:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4696_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1390,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4695,
                      "src": "7413:20:8",
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
                              "id": 1395,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1365,
                              "src": "7479:15:8",
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
                              "id": 1393,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1344,
                              "src": "7467:7:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1394,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6744,
                            "src": "7467:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1396,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7467:28:8",
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
                              "expression": {
                                "argumentTypes": null,
                                "id": 1402,
                                "name": "_header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1342,
                                "src": "7542:7:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                                  "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                                }
                              },
                              "id": 1403,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "takerAssetDataLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1281,
                              "src": "7542:28:8",
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
                                  "id": 1399,
                                  "name": "takerAssetStart",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1365,
                                  "src": "7521:15:8",
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
                                  "id": 1397,
                                  "name": "_offset",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1344,
                                  "src": "7509:7:8",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1398,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6744,
                                "src": "7509:11:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1400,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7509:28:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1401,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6744,
                            "src": "7509:32:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1404,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7509:62:8",
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
                          "id": 1391,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1340,
                          "src": "7436:11:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1392,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4852,
                        "src": "7436:17:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1405,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7436:145:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7413:168:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1407,
                  "nodeType": "ExpressionStatement",
                  "src": "7413:168:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1408,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1352,
                    "src": "7599:5:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4696_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 1348,
                  "id": 1409,
                  "nodeType": "Return",
                  "src": "7592:12:8"
                }
              ]
            },
            "documentation": null,
            "id": 1411,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1345,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1340,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "6052:17:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1339,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6052:5:8",
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
                  "id": 1342,
                  "name": "_header",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "6079:26:8",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1284_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1341,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1284,
                    "src": "6079:11:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1284_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1344,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "6115:15:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1343,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6115:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6042:94:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1348,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1347,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "6183:14:8",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4696_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1346,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4696,
                    "src": "6183:14:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4696_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6182:23:8"
            },
            "scope": 1412,
            "src": "6017:1594:8",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 1413,
        "src": "2472:5141:8"
      }
    ],
    "src": "597:7017:8"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.344Z"
}
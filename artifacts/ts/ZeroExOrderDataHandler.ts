export const ZeroExOrderDataHandler = 
{
  "contractName": "ZeroExOrderDataHandler",
  "abi": [],
  "bytecode": "0x605a602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a265627a7a72305820cdfb4e9b1b86d0c58dc678612f0897d59ef7cd7444e5443a93b4cc582a305aff6c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a265627a7a72305820cdfb4e9b1b86d0c58dc678612f0897d59ef7cd7444e5443a93b4cc582a305aff6c6578706572696d656e74616cf50037",
  "sourceMap": "2472:5142:4:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "2472:5142:4:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { LibBytes } from \"../../../external/0x/LibBytes.sol\";\nimport { LibOrder } from \"../../../external/0x/Exchange/libs/LibOrder.sol\";\n\n\n/**\n * @title ZeroExOrderDataHandler\n * @author Set Protocol\n *\n * This library contains functions and structs to assist with parsing 0x wrapper order data\n *\n * The layout of each wrapper order is in the table below. \"ordersData\" always refers to one or more byte strings,\n * each containing all of these columns concatenated together. Each of the parse methods (header/body) below takes\n * the entire ordersData along with an offset to parse the next (header/body) specified by the offset. This saves\n * from having to do redudant memCopies to isolate the bytes containing the data to parse.\n *\n * | Section | Data                  | Offset              | Length          | Contents                      |\n * |---------|-----------------------|---------------------|-----------------|-------------------------------|\n * | Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |\n * |         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |\n * |         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |\n * |         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |\n * |         | fillAmount            | 128                 | 32              | taker asset fill amouint      |\n * | Body    | signature             | 160                 | signatureLength | signature in bytes            |\n * |         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |\n */\nlibrary ZeroExOrderDataHandler {\n    using LibBytes for bytes;\n    using SafeMath for uint256;\n\n    // ============ Constants ============\n\n    bytes4 constant ERC20_SELECTOR = bytes4(keccak256(\"ERC20Token(address)\"));\n\n    // ============ Structs ============\n\n    struct OrderHeader {\n        uint256 signatureLength;\n        uint256 orderLength;\n        uint256 makerAssetDataLength;\n        uint256 takerAssetDataLength;\n        uint256 fillAmount;\n    }\n\n    struct AssetDataAddresses {\n        address makerTokenAddress;\n        address takerTokenAddress;\n    }\n\n    // ============ Internal Functions ============\n\n    /**\n     * Parse token address from asset data\n     *\n     * @param _assetData   Encoded asset data\n     * @return address     Address of ERC20 asset address\n     */\n    function parseERC20TokenAddress(\n        bytes _assetData\n    )\n        internal\n        pure\n        returns(address)\n    {\n        // Ensure that the asset is ERC20\n        require(_assetData.readBytes4(0) == ERC20_SELECTOR);\n\n        // Return address\n        return address(_assetData.readBytes32(4));\n    }\n\n    /*\n     * Parses the header from order byte array\n     * Can only be called by authorized contracts.\n     *\n     * @param  _ordersData   Byte array of order data\n     * @param  _offset       Offset to start scanning for order header\n     * @return OrderHeader   Struct containing wrapper order header data\n     */\n    function parseOrderHeader(\n        bytes _ordersData,\n        uint256 _offset\n    )\n        internal\n        pure\n        returns (OrderHeader)\n    {\n        OrderHeader memory header;\n\n        uint256 orderDataStart = _ordersData.contentAddress().add(_offset);\n\n        assembly {\n            mstore(header,           mload(orderDataStart))           // signatureLength\n            mstore(add(header, 32),  mload(add(orderDataStart, 32)))  // orderLength\n            mstore(add(header, 64),  mload(add(orderDataStart, 64)))  // makerAssetDataLength\n            mstore(add(header, 96),  mload(add(orderDataStart, 96)))  // takerAssetDataLength\n            mstore(add(header, 128), mload(add(orderDataStart, 128))) // fillAmmount\n        }\n\n        return header;\n    }\n\n    /*\n     * Parses the bytes array into ZeroEx order\n     *\n     * | Data                       | Location                      |\n     * |----------------------------|-------------------------------|\n     * | makerAddress               | 0                             |\n     * | takerAddress               | 32                            |\n     * | feeRecipientAddress        | 64                            |\n     * | senderAddress              | 96                            |\n     * | makerAssetAmount           | 128                           |\n     * | takerAssetAmount           | 160                           |\n     * | makerFee                   | 192                           |\n     * | takerFee                   | 224                           |\n     * | expirationTimeSeconds      | 256                           |\n     * | salt                       | 288                           |\n     * | makerAssetData             | 320                           |\n     * | takerAssetData             | 320 + header.makerAssetLength |\n     *\n     * @param  _ordersData      Byte array of (multiple) 0x wrapper orders\n     * @param  _header          Header associated with current 0x order body to scan\n     * @param  _offset          Offset to start scanning for 0x order body\n     * @return LibOrder.Order   0x order struct\n     */\n    function parseZeroExOrder(\n        bytes _ordersData,\n        OrderHeader memory _header,\n        uint256 _offset\n    )\n        internal\n        pure\n        returns (LibOrder.Order memory)\n    {\n        LibOrder.Order memory order;\n\n        uint256 orderDataStart = _ordersData.contentAddress().add(_offset);\n\n        assembly {\n            mstore(order,           mload(orderDataStart))           // maker\n            mstore(add(order, 32),  mload(add(orderDataStart, 32)))  // taker\n            mstore(add(order, 64),  mload(add(orderDataStart, 64)))  // feeRecipient\n            mstore(add(order, 96),  mload(add(orderDataStart, 96)))  // senderAddress\n            mstore(add(order, 128), mload(add(orderDataStart, 128))) // makerAssetAmount\n            mstore(add(order, 160), mload(add(orderDataStart, 160))) // takerAssetAmount\n            mstore(add(order, 192), mload(add(orderDataStart, 192))) // makerFee\n            mstore(add(order, 224), mload(add(orderDataStart, 224))) // takerFee\n            mstore(add(order, 256), mload(add(orderDataStart, 256))) // expirationUnixTimestampSec\n            mstore(add(order, 288), mload(add(orderDataStart, 288))) // salt\n        }\n\n        uint256 takerAssetStart = _header.makerAssetDataLength.add(320);\n        order.makerAssetData = _ordersData.slice(\n            _offset.add(320),\n            _offset.add(takerAssetStart)\n        );\n        order.takerAssetData = _ordersData.slice(\n            _offset.add(takerAssetStart),\n            _offset.add(takerAssetStart).add(_header.takerAssetDataLength)\n        );\n\n        return order;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        1324
      ]
    },
    "id": 1325,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1165,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:4"
      },
      {
        "id": 1166,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:4"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1168,
        "nodeType": "ImportDirective",
        "scope": 1325,
        "sourceUnit": 6518,
        "src": "658:73:4",
        "symbolAliases": [
          {
            "foreign": 1167,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 1170,
        "nodeType": "ImportDirective",
        "scope": 1325,
        "sourceUnit": 4529,
        "src": "732:61:4",
        "symbolAliases": [
          {
            "foreign": 1169,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1172,
        "nodeType": "ImportDirective",
        "scope": 1325,
        "sourceUnit": 4380,
        "src": "794:75:4",
        "symbolAliases": [
          {
            "foreign": 1171,
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
        "id": 1324,
        "linearizedBaseContracts": [
          1324
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1175,
            "libraryName": {
              "contractScope": null,
              "id": 1173,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4528,
              "src": "2515:8:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$4528",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2509:25:4",
            "typeName": {
              "id": 1174,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "2528:5:4",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "id": 1178,
            "libraryName": {
              "contractScope": null,
              "id": 1176,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6517,
              "src": "2545:8:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6517",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2539:27:4",
            "typeName": {
              "id": 1177,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "2558:7:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1185,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 1324,
            "src": "2616:73:4",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 1179,
              "name": "bytes4",
              "nodeType": "ElementaryTypeName",
              "src": "2616:6:4",
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
                      "id": 1182,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2666:21:4",
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
                    "id": 1181,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 7064,
                    "src": "2656:9:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 1183,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "2656:32:4",
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
                "id": 1180,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "ElementaryTypeNameExpression",
                "src": "2649:6:4",
                "typeDescriptions": {
                  "typeIdentifier": "t_type$_t_bytes4_$",
                  "typeString": "type(bytes4)"
                },
                "typeName": "bytes4"
              },
              "id": 1184,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "typeConversion",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "2649:40:4",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.OrderHeader",
            "id": 1196,
            "members": [
              {
                "constant": false,
                "id": 1187,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "2767:23:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1186,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2767:7:4",
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
                "id": 1189,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "2800:19:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1188,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2800:7:4",
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
                "id": 1191,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "2829:28:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1190,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2829:7:4",
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
                "id": 1193,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "2867:28:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1192,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2867:7:4",
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
                "id": 1195,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "2905:18:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1194,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2905:7:4",
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
            "scope": 1324,
            "src": "2738:192:4",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 1201,
            "members": [
              {
                "constant": false,
                "id": 1198,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1201,
                "src": "2972:25:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1197,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2972:7:4",
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
                "id": 1200,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1201,
                "src": "3007:25:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1199,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "3007:7:4",
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
            "scope": 1324,
            "src": "2936:103:4",
            "visibility": "public"
          },
          {
            "body": {
              "id": 1224,
              "nodeType": "Block",
              "src": "3391:188:4",
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
                        "id": 1214,
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
                              "id": 1211,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3473:1:4",
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
                              "id": 1209,
                              "name": "_assetData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1203,
                              "src": "3451:10:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 1210,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "readBytes4",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4418,
                            "src": "3451:21:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
                            }
                          },
                          "id": 1212,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3451:24:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 1213,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1185,
                          "src": "3479:14:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "src": "3451:42:4",
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
                      "id": 1208,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "3443:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1215,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3443:51:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1216,
                  "nodeType": "ExpressionStatement",
                  "src": "3443:51:4"
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
                            "id": 1220,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3569:1:4",
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
                            "id": 1218,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1203,
                            "src": "3546:10:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1219,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4445,
                          "src": "3546:22:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 1221,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3546:25:4",
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
                      "id": 1217,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "3538:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": "address"
                    },
                    "id": 1222,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3538:34:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1207,
                  "id": 1223,
                  "nodeType": "Return",
                  "src": "3531:41:4"
                }
              ]
            },
            "documentation": "Parse token address from asset data\n     * @param _assetData   Encoded asset data\n@return address     Address of ERC20 asset address",
            "id": 1225,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1204,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1203,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1225,
                  "src": "3309:16:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1202,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3309:5:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3299:32:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 1207,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1206,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1225,
                  "src": "3378:7:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1205,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3378:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3377:9:4"
            },
            "scope": 1324,
            "src": "3268:311:4",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1249,
              "nodeType": "Block",
              "src": "4051:620:4",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1235,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 1250,
                      "src": "4061:25:4",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1234,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1196,
                        "src": "4061:11:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$1196_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1236,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4061:25:4"
                },
                {
                  "assignments": [
                    1238
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1238,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1250,
                      "src": "4097:22:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1237,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4097:7:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1245,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1243,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1229,
                        "src": "4155:7:4",
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
                            "id": 1239,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1227,
                            "src": "4122:11:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1240,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4395,
                          "src": "4122:26:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 1241,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4122:28:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1242,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6516,
                      "src": "4122:32:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1244,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4122:41:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4097:66:4"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 1235,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4204:6:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1238,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4228:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1235,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4297:6:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1238,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4321:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1235,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4382:6:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1238,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4406:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1235,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4476:6:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1235,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4570:6:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1238,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4500:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1238,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4594:14:4",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1246,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataStart))\n    mstore(add(header, 32), mload(add(orderDataStart, 32)))\n    mstore(add(header, 64), mload(add(orderDataStart, 64)))\n    mstore(add(header, 96), mload(add(orderDataStart, 96)))\n    mstore(add(header, 128), mload(add(orderDataStart, 128)))\n}",
                  "src": "4174:483:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1247,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1235,
                    "src": "4658:6:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "functionReturnParameters": 1233,
                  "id": 1248,
                  "nodeType": "Return",
                  "src": "4651:13:4"
                }
              ]
            },
            "documentation": null,
            "id": 1250,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1230,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1227,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1250,
                  "src": "3938:17:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1226,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3938:5:4",
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
                  "id": 1229,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 1250,
                  "src": "3965:15:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1228,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3965:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3928:58:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 1233,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1232,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1250,
                  "src": "4034:11:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1231,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1196,
                    "src": "4034:11:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1196_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4033:13:4"
            },
            "scope": 1324,
            "src": "3903:768:4",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1322,
              "nodeType": "Block",
              "src": "6211:1401:4",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1264,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1323,
                      "src": "6221:27:4",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4371_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1263,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4371,
                        "src": "6221:14:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4371_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1265,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6221:27:4"
                },
                {
                  "assignments": [
                    1267
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1267,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1323,
                      "src": "6259:22:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1266,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6259:7:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1274,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1272,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1256,
                        "src": "6317:7:4",
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
                            "id": 1268,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1252,
                            "src": "6284:11:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1269,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4395,
                          "src": "6284:26:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 1270,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6284:28:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1271,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6516,
                      "src": "6284:32:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1273,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6284:41:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6259:66:4"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6366:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6389:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6448:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6471:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6526:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6549:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6875:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6611:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6697:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6634:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6786:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6809:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6720:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7136:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7159:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6956:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6898:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7037:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6979:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7060:14:4",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1275,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataStart))\n    mstore(add(order, 32), mload(add(orderDataStart, 32)))\n    mstore(add(order, 64), mload(add(orderDataStart, 64)))\n    mstore(add(order, 96), mload(add(orderDataStart, 96)))\n    mstore(add(order, 128), mload(add(orderDataStart, 128)))\n    mstore(add(order, 160), mload(add(orderDataStart, 160)))\n    mstore(add(order, 192), mload(add(orderDataStart, 192)))\n    mstore(add(order, 224), mload(add(orderDataStart, 224)))\n    mstore(add(order, 256), mload(add(orderDataStart, 256)))\n    mstore(add(order, 288), mload(add(orderDataStart, 288)))\n}",
                  "src": "6336:880:4"
                },
                {
                  "assignments": [
                    1277
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1277,
                      "name": "takerAssetStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1323,
                      "src": "7209:23:4",
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
                        "src": "7209:7:4",
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
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "333230",
                        "id": 1281,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7268:3:4",
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
                          "id": 1278,
                          "name": "_header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1254,
                          "src": "7235:7:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 1279,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1191,
                        "src": "7235:28:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1280,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6516,
                      "src": "7235:32:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
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
                    "src": "7235:37:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7209:63:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1298,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1284,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1264,
                        "src": "7282:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4371_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1286,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4368,
                      "src": "7282:20:4",
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
                              "id": 1291,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7348:3:4",
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
                              "id": 1289,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1256,
                              "src": "7336:7:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1290,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6516,
                            "src": "7336:11:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1292,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7336:16:4",
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
                              "id": 1295,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1277,
                              "src": "7378:15:4",
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
                              "id": 1293,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1256,
                              "src": "7366:7:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1294,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6516,
                            "src": "7366:11:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1296,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7366:28:4",
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
                          "id": 1287,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1252,
                          "src": "7305:11:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1288,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4527,
                        "src": "7305:17:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1297,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7305:99:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7282:122:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1299,
                  "nodeType": "ExpressionStatement",
                  "src": "7282:122:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1318,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1300,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1264,
                        "src": "7414:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4371_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1302,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4370,
                      "src": "7414:20:4",
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
                              "id": 1307,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1277,
                              "src": "7480:15:4",
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
                              "id": 1305,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1256,
                              "src": "7468:7:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1306,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6516,
                            "src": "7468:11:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1308,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7468:28:4",
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
                                "id": 1314,
                                "name": "_header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1254,
                                "src": "7543:7:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                                  "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                                }
                              },
                              "id": 1315,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "takerAssetDataLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1193,
                              "src": "7543:28:4",
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
                                  "id": 1311,
                                  "name": "takerAssetStart",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1277,
                                  "src": "7522:15:4",
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
                                  "id": 1309,
                                  "name": "_offset",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1256,
                                  "src": "7510:7:4",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1310,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6516,
                                "src": "7510:11:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1312,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7510:28:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1313,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6516,
                            "src": "7510:32:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1316,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7510:62:4",
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
                          "id": 1303,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1252,
                          "src": "7437:11:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1304,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4527,
                        "src": "7437:17:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1317,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7437:145:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7414:168:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1319,
                  "nodeType": "ExpressionStatement",
                  "src": "7414:168:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1320,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1264,
                    "src": "7600:5:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4371_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 1260,
                  "id": 1321,
                  "nodeType": "Return",
                  "src": "7593:12:4"
                }
              ]
            },
            "documentation": null,
            "id": 1323,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1257,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1252,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1323,
                  "src": "6052:17:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1251,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6052:5:4",
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
                  "id": 1254,
                  "name": "_header",
                  "nodeType": "VariableDeclaration",
                  "scope": 1323,
                  "src": "6079:26:4",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1253,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1196,
                    "src": "6079:11:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1196_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1256,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 1323,
                  "src": "6115:15:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1255,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6115:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6042:94:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 1260,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1259,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1323,
                  "src": "6184:14:4",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4371_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1258,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4371,
                    "src": "6184:14:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4371_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6183:23:4"
            },
            "scope": 1324,
            "src": "6017:1595:4",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 1325,
        "src": "2472:5142:4"
      }
    ],
    "src": "597:7018:4"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        1324
      ]
    },
    "id": 1325,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1165,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:4"
      },
      {
        "id": 1166,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:4"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1168,
        "nodeType": "ImportDirective",
        "scope": 1325,
        "sourceUnit": 6518,
        "src": "658:73:4",
        "symbolAliases": [
          {
            "foreign": 1167,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 1170,
        "nodeType": "ImportDirective",
        "scope": 1325,
        "sourceUnit": 4529,
        "src": "732:61:4",
        "symbolAliases": [
          {
            "foreign": 1169,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1172,
        "nodeType": "ImportDirective",
        "scope": 1325,
        "sourceUnit": 4380,
        "src": "794:75:4",
        "symbolAliases": [
          {
            "foreign": 1171,
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
        "id": 1324,
        "linearizedBaseContracts": [
          1324
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1175,
            "libraryName": {
              "contractScope": null,
              "id": 1173,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4528,
              "src": "2515:8:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$4528",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2509:25:4",
            "typeName": {
              "id": 1174,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "2528:5:4",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "id": 1178,
            "libraryName": {
              "contractScope": null,
              "id": 1176,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6517,
              "src": "2545:8:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6517",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2539:27:4",
            "typeName": {
              "id": 1177,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "2558:7:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1185,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 1324,
            "src": "2616:73:4",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 1179,
              "name": "bytes4",
              "nodeType": "ElementaryTypeName",
              "src": "2616:6:4",
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
                      "id": 1182,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2666:21:4",
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
                    "id": 1181,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 7064,
                    "src": "2656:9:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 1183,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "2656:32:4",
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
                "id": 1180,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "ElementaryTypeNameExpression",
                "src": "2649:6:4",
                "typeDescriptions": {
                  "typeIdentifier": "t_type$_t_bytes4_$",
                  "typeString": "type(bytes4)"
                },
                "typeName": "bytes4"
              },
              "id": 1184,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "typeConversion",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "2649:40:4",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.OrderHeader",
            "id": 1196,
            "members": [
              {
                "constant": false,
                "id": 1187,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "2767:23:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1186,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2767:7:4",
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
                "id": 1189,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "2800:19:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1188,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2800:7:4",
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
                "id": 1191,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "2829:28:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1190,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2829:7:4",
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
                "id": 1193,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "2867:28:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1192,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2867:7:4",
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
                "id": 1195,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 1196,
                "src": "2905:18:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1194,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2905:7:4",
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
            "scope": 1324,
            "src": "2738:192:4",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 1201,
            "members": [
              {
                "constant": false,
                "id": 1198,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1201,
                "src": "2972:25:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1197,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2972:7:4",
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
                "id": 1200,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1201,
                "src": "3007:25:4",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1199,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "3007:7:4",
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
            "scope": 1324,
            "src": "2936:103:4",
            "visibility": "public"
          },
          {
            "body": {
              "id": 1224,
              "nodeType": "Block",
              "src": "3391:188:4",
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
                        "id": 1214,
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
                              "id": 1211,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3473:1:4",
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
                              "id": 1209,
                              "name": "_assetData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1203,
                              "src": "3451:10:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 1210,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "readBytes4",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4418,
                            "src": "3451:21:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
                            }
                          },
                          "id": 1212,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3451:24:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 1213,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1185,
                          "src": "3479:14:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "src": "3451:42:4",
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
                      "id": 1208,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "3443:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1215,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3443:51:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1216,
                  "nodeType": "ExpressionStatement",
                  "src": "3443:51:4"
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
                            "id": 1220,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3569:1:4",
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
                            "id": 1218,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1203,
                            "src": "3546:10:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1219,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4445,
                          "src": "3546:22:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 1221,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3546:25:4",
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
                      "id": 1217,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "3538:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": "address"
                    },
                    "id": 1222,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3538:34:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1207,
                  "id": 1223,
                  "nodeType": "Return",
                  "src": "3531:41:4"
                }
              ]
            },
            "documentation": "Parse token address from asset data\n     * @param _assetData   Encoded asset data\n@return address     Address of ERC20 asset address",
            "id": 1225,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1204,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1203,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1225,
                  "src": "3309:16:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1202,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3309:5:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3299:32:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 1207,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1206,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1225,
                  "src": "3378:7:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1205,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3378:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3377:9:4"
            },
            "scope": 1324,
            "src": "3268:311:4",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1249,
              "nodeType": "Block",
              "src": "4051:620:4",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1235,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 1250,
                      "src": "4061:25:4",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1234,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1196,
                        "src": "4061:11:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$1196_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1236,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4061:25:4"
                },
                {
                  "assignments": [
                    1238
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1238,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1250,
                      "src": "4097:22:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1237,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4097:7:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1245,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1243,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1229,
                        "src": "4155:7:4",
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
                            "id": 1239,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1227,
                            "src": "4122:11:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1240,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4395,
                          "src": "4122:26:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 1241,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4122:28:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1242,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6516,
                      "src": "4122:32:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1244,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4122:41:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4097:66:4"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 1235,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4204:6:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1238,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4228:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1235,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4297:6:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1238,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4321:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1235,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4382:6:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1238,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4406:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1235,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4476:6:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1235,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4570:6:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1238,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4500:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1238,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4594:14:4",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1246,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataStart))\n    mstore(add(header, 32), mload(add(orderDataStart, 32)))\n    mstore(add(header, 64), mload(add(orderDataStart, 64)))\n    mstore(add(header, 96), mload(add(orderDataStart, 96)))\n    mstore(add(header, 128), mload(add(orderDataStart, 128)))\n}",
                  "src": "4174:483:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1247,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1235,
                    "src": "4658:6:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "functionReturnParameters": 1233,
                  "id": 1248,
                  "nodeType": "Return",
                  "src": "4651:13:4"
                }
              ]
            },
            "documentation": null,
            "id": 1250,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1230,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1227,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1250,
                  "src": "3938:17:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1226,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3938:5:4",
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
                  "id": 1229,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 1250,
                  "src": "3965:15:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1228,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3965:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3928:58:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 1233,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1232,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1250,
                  "src": "4034:11:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1231,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1196,
                    "src": "4034:11:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1196_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4033:13:4"
            },
            "scope": 1324,
            "src": "3903:768:4",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1322,
              "nodeType": "Block",
              "src": "6211:1401:4",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1264,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1323,
                      "src": "6221:27:4",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$4371_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1263,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 4371,
                        "src": "6221:14:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4371_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1265,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6221:27:4"
                },
                {
                  "assignments": [
                    1267
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1267,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1323,
                      "src": "6259:22:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1266,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6259:7:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1274,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1272,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1256,
                        "src": "6317:7:4",
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
                            "id": 1268,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1252,
                            "src": "6284:11:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1269,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4395,
                          "src": "6284:26:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 1270,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6284:28:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1271,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6516,
                      "src": "6284:32:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1273,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6284:41:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6259:66:4"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6366:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6389:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6448:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6471:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6526:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6549:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6875:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6611:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6697:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6634:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6786:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6809:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6720:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7136:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7159:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6956:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6898:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 1264,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7037:5:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6979:14:4",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1267,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7060:14:4",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 1275,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataStart))\n    mstore(add(order, 32), mload(add(orderDataStart, 32)))\n    mstore(add(order, 64), mload(add(orderDataStart, 64)))\n    mstore(add(order, 96), mload(add(orderDataStart, 96)))\n    mstore(add(order, 128), mload(add(orderDataStart, 128)))\n    mstore(add(order, 160), mload(add(orderDataStart, 160)))\n    mstore(add(order, 192), mload(add(orderDataStart, 192)))\n    mstore(add(order, 224), mload(add(orderDataStart, 224)))\n    mstore(add(order, 256), mload(add(orderDataStart, 256)))\n    mstore(add(order, 288), mload(add(orderDataStart, 288)))\n}",
                  "src": "6336:880:4"
                },
                {
                  "assignments": [
                    1277
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1277,
                      "name": "takerAssetStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 1323,
                      "src": "7209:23:4",
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
                        "src": "7209:7:4",
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
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "333230",
                        "id": 1281,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7268:3:4",
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
                          "id": 1278,
                          "name": "_header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1254,
                          "src": "7235:7:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 1279,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1191,
                        "src": "7235:28:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1280,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6516,
                      "src": "7235:32:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
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
                    "src": "7235:37:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7209:63:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1298,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1284,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1264,
                        "src": "7282:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4371_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1286,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4368,
                      "src": "7282:20:4",
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
                              "id": 1291,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7348:3:4",
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
                              "id": 1289,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1256,
                              "src": "7336:7:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1290,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6516,
                            "src": "7336:11:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1292,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7336:16:4",
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
                              "id": 1295,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1277,
                              "src": "7378:15:4",
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
                              "id": 1293,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1256,
                              "src": "7366:7:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1294,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6516,
                            "src": "7366:11:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1296,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7366:28:4",
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
                          "id": 1287,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1252,
                          "src": "7305:11:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1288,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4527,
                        "src": "7305:17:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1297,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7305:99:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7282:122:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1299,
                  "nodeType": "ExpressionStatement",
                  "src": "7282:122:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1318,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1300,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1264,
                        "src": "7414:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$4371_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 1302,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4370,
                      "src": "7414:20:4",
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
                              "id": 1307,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1277,
                              "src": "7480:15:4",
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
                              "id": 1305,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1256,
                              "src": "7468:7:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1306,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6516,
                            "src": "7468:11:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1308,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7468:28:4",
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
                                "id": 1314,
                                "name": "_header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1254,
                                "src": "7543:7:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                                  "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                                }
                              },
                              "id": 1315,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "takerAssetDataLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1193,
                              "src": "7543:28:4",
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
                                  "id": 1311,
                                  "name": "takerAssetStart",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1277,
                                  "src": "7522:15:4",
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
                                  "id": 1309,
                                  "name": "_offset",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1256,
                                  "src": "7510:7:4",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1310,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6516,
                                "src": "7510:11:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1312,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7510:28:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1313,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6516,
                            "src": "7510:32:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1316,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7510:62:4",
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
                          "id": 1303,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1252,
                          "src": "7437:11:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 1304,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4527,
                        "src": "7437:17:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 1317,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7437:145:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7414:168:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 1319,
                  "nodeType": "ExpressionStatement",
                  "src": "7414:168:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1320,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1264,
                    "src": "7600:5:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4371_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 1260,
                  "id": 1321,
                  "nodeType": "Return",
                  "src": "7593:12:4"
                }
              ]
            },
            "documentation": null,
            "id": 1323,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1257,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1252,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1323,
                  "src": "6052:17:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1251,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6052:5:4",
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
                  "id": 1254,
                  "name": "_header",
                  "nodeType": "VariableDeclaration",
                  "scope": 1323,
                  "src": "6079:26:4",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1196_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1253,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1196,
                    "src": "6079:11:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1196_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1256,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 1323,
                  "src": "6115:15:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1255,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6115:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6042:94:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 1260,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1259,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1323,
                  "src": "6184:14:4",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$4371_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1258,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 4371,
                    "src": "6184:14:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$4371_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6183:23:4"
            },
            "scope": 1324,
            "src": "6017:1595:4",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 1325,
        "src": "2472:5142:4"
      }
    ],
    "src": "597:7018:4"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-25T17:34:39.479Z"
}
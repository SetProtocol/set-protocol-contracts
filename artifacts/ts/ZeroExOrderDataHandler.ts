export const ZeroExOrderDataHandler = 
{
  "contractName": "ZeroExOrderDataHandler",
  "abi": [],
  "bytecode": "0x605a602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a265627a7a723058209847701062e6030d04c1ee9eeb7fa9d225c5b65dbcf5074d684a0ba98ec58a986c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a265627a7a723058209847701062e6030d04c1ee9eeb7fa9d225c5b65dbcf5074d684a0ba98ec58a986c6578706572696d656e74616cf50037",
  "sourceMap": "2472:5142:10:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "2472:5142:10:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { LibBytes } from \"../../../external/0x/LibBytes.sol\";\nimport { LibOrder } from \"../../../external/0x/Exchange/libs/LibOrder.sol\";\n\n\n/**\n * @title ZeroExOrderDataHandler\n * @author Set Protocol\n *\n * This library contains functions and structs to assist with parsing 0x wrapper order data\n *\n * The layout of each wrapper order is in the table below. \"ordersData\" always refers to one or more byte strings,\n * each containing all of these columns concatenated together. Each of the parse methods (header/body) below takes\n * the entire ordersData along with an offset to parse the next (header/body) specified by the offset. This saves\n * from having to do redudant memCopies to isolate the bytes containing the data to parse.\n *\n * | Section | Data                  | Offset              | Length          | Contents                      |\n * |---------|-----------------------|---------------------|-----------------|-------------------------------|\n * | Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |\n * |         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |\n * |         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |\n * |         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |\n * |         | fillAmount            | 128                 | 32              | taker asset fill amouint      |\n * | Body    | signature             | 160                 | signatureLength | signature in bytes            |\n * |         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |\n */\nlibrary ZeroExOrderDataHandler {\n    using LibBytes for bytes;\n    using SafeMath for uint256;\n\n    // ============ Constants ============\n\n    bytes4 constant ERC20_SELECTOR = bytes4(keccak256(\"ERC20Token(address)\"));\n\n    // ============ Structs ============\n\n    struct OrderHeader {\n        uint256 signatureLength;\n        uint256 orderLength;\n        uint256 makerAssetDataLength;\n        uint256 takerAssetDataLength;\n        uint256 fillAmount;\n    }\n\n    struct AssetDataAddresses {\n        address makerTokenAddress;\n        address takerTokenAddress;\n    }\n\n    // ============ Internal Functions ============\n\n    /**\n     * Parse token address from asset data\n     *\n     * @param _assetData   Encoded asset data\n     * @return address     Address of ERC20 asset address\n     */\n    function parseERC20TokenAddress(\n        bytes _assetData\n    )\n        internal\n        pure\n        returns(address)\n    {\n        // Ensure that the asset is ERC20\n        require(_assetData.readBytes4(0) == ERC20_SELECTOR);\n\n        // Return address\n        return address(_assetData.readBytes32(4));\n    }\n\n    /*\n     * Parses the header from order byte array\n     * Can only be called by authorized contracts.\n     *\n     * @param  _ordersData   Byte array of order data\n     * @param  _offset       Offset to start scanning for order header\n     * @return OrderHeader   Struct containing wrapper order header data\n     */\n    function parseOrderHeader(\n        bytes _ordersData,\n        uint256 _offset\n    )\n        internal\n        pure\n        returns (OrderHeader)\n    {\n        OrderHeader memory header;\n\n        uint256 orderDataStart = _ordersData.contentAddress().add(_offset);\n\n        assembly {\n            mstore(header,           mload(orderDataStart))           // signatureLength\n            mstore(add(header, 32),  mload(add(orderDataStart, 32)))  // orderLength\n            mstore(add(header, 64),  mload(add(orderDataStart, 64)))  // makerAssetDataLength\n            mstore(add(header, 96),  mload(add(orderDataStart, 96)))  // takerAssetDataLength\n            mstore(add(header, 128), mload(add(orderDataStart, 128))) // fillAmmount\n        }\n\n        return header;\n    }\n\n    /*\n     * Parses the bytes array into ZeroEx order\n     *\n     * | Data                       | Location                      |\n     * |----------------------------|-------------------------------|\n     * | makerAddress               | 0                             |\n     * | takerAddress               | 32                            |\n     * | feeRecipientAddress        | 64                            |\n     * | senderAddress              | 96                            |\n     * | makerAssetAmount           | 128                           |\n     * | takerAssetAmount           | 160                           |\n     * | makerFee                   | 192                           |\n     * | takerFee                   | 224                           |\n     * | expirationTimeSeconds      | 256                           |\n     * | salt                       | 288                           |\n     * | makerAssetData             | 320                           |\n     * | takerAssetData             | 320 + header.makerAssetLength |\n     *\n     * @param  _ordersData      Byte array of (multiple) 0x wrapper orders\n     * @param  _header          Header associated with current 0x order body to scan\n     * @param  _offset          Offset to start scanning for 0x order body\n     * @return LibOrder.Order   0x order struct\n     */\n    function parseZeroExOrder(\n        bytes _ordersData,\n        OrderHeader memory _header,\n        uint256 _offset\n    )\n        internal\n        pure\n        returns (LibOrder.Order memory)\n    {\n        LibOrder.Order memory order;\n\n        uint256 orderDataStart = _ordersData.contentAddress().add(_offset);\n\n        assembly {\n            mstore(order,           mload(orderDataStart))           // maker\n            mstore(add(order, 32),  mload(add(orderDataStart, 32)))  // taker\n            mstore(add(order, 64),  mload(add(orderDataStart, 64)))  // feeRecipient\n            mstore(add(order, 96),  mload(add(orderDataStart, 96)))  // senderAddress\n            mstore(add(order, 128), mload(add(orderDataStart, 128))) // makerAssetAmount\n            mstore(add(order, 160), mload(add(orderDataStart, 160))) // takerAssetAmount\n            mstore(add(order, 192), mload(add(orderDataStart, 192))) // makerFee\n            mstore(add(order, 224), mload(add(orderDataStart, 224))) // takerFee\n            mstore(add(order, 256), mload(add(orderDataStart, 256))) // expirationUnixTimestampSec\n            mstore(add(order, 288), mload(add(orderDataStart, 288))) // salt\n        }\n\n        uint256 takerAssetStart = _header.makerAssetDataLength.add(320);\n        order.makerAssetData = _ordersData.slice(\n            _offset.add(320),\n            _offset.add(takerAssetStart)\n        );\n        order.takerAssetData = _ordersData.slice(\n            _offset.add(takerAssetStart),\n            _offset.add(takerAssetStart).add(_header.takerAssetDataLength)\n        );\n\n        return order;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        2079
      ]
    },
    "id": 2080,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1920,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:10"
      },
      {
        "id": 1921,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:10"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1923,
        "nodeType": "ImportDirective",
        "scope": 2080,
        "sourceUnit": 8755,
        "src": "658:73:10",
        "symbolAliases": [
          {
            "foreign": 1922,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 1925,
        "nodeType": "ImportDirective",
        "scope": 2080,
        "sourceUnit": 5515,
        "src": "732:61:10",
        "symbolAliases": [
          {
            "foreign": 1924,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1927,
        "nodeType": "ImportDirective",
        "scope": 2080,
        "sourceUnit": 5366,
        "src": "794:75:10",
        "symbolAliases": [
          {
            "foreign": 1926,
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
        "id": 2079,
        "linearizedBaseContracts": [
          2079
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1930,
            "libraryName": {
              "contractScope": null,
              "id": 1928,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5514,
              "src": "2515:8:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$5514",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2509:25:10",
            "typeName": {
              "id": 1929,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "2528:5:10",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "id": 1933,
            "libraryName": {
              "contractScope": null,
              "id": 1931,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 8754,
              "src": "2545:8:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$8754",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2539:27:10",
            "typeName": {
              "id": 1932,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "2558:7:10",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1940,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 2079,
            "src": "2616:73:10",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 1934,
              "name": "bytes4",
              "nodeType": "ElementaryTypeName",
              "src": "2616:6:10",
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
                      "id": 1937,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2666:21:10",
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
                    "id": 1936,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 9301,
                    "src": "2656:9:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 1938,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "2656:32:10",
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
                "id": 1935,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "ElementaryTypeNameExpression",
                "src": "2649:6:10",
                "typeDescriptions": {
                  "typeIdentifier": "t_type$_t_bytes4_$",
                  "typeString": "type(bytes4)"
                },
                "typeName": "bytes4"
              },
              "id": 1939,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "typeConversion",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "2649:40:10",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.OrderHeader",
            "id": 1951,
            "members": [
              {
                "constant": false,
                "id": 1942,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 1951,
                "src": "2767:23:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1941,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2767:7:10",
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
                "id": 1944,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 1951,
                "src": "2800:19:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1943,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2800:7:10",
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
                "id": 1946,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1951,
                "src": "2829:28:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1945,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2829:7:10",
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
                "id": 1948,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1951,
                "src": "2867:28:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1947,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2867:7:10",
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
                "id": 1950,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 1951,
                "src": "2905:18:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1949,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2905:7:10",
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
            "scope": 2079,
            "src": "2738:192:10",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 1956,
            "members": [
              {
                "constant": false,
                "id": 1953,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1956,
                "src": "2972:25:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1952,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2972:7:10",
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
                "id": 1955,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1956,
                "src": "3007:25:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1954,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "3007:7:10",
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
            "scope": 2079,
            "src": "2936:103:10",
            "visibility": "public"
          },
          {
            "body": {
              "id": 1979,
              "nodeType": "Block",
              "src": "3391:188:10",
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
                        "id": 1969,
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
                              "id": 1966,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3473:1:10",
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
                              "id": 1964,
                              "name": "_assetData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1958,
                              "src": "3451:10:10",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 1965,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "readBytes4",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 5404,
                            "src": "3451:21:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
                            }
                          },
                          "id": 1967,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3451:24:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 1968,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1940,
                          "src": "3479:14:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "src": "3451:42:10",
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
                      "id": 1963,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "3443:7:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1970,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3443:51:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1971,
                  "nodeType": "ExpressionStatement",
                  "src": "3443:51:10"
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
                            "id": 1975,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3569:1:10",
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
                            "id": 1973,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1958,
                            "src": "3546:10:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1974,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 5431,
                          "src": "3546:22:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 1976,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3546:25:10",
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
                      "id": 1972,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "3538:7:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": "address"
                    },
                    "id": 1977,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3538:34:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1962,
                  "id": 1978,
                  "nodeType": "Return",
                  "src": "3531:41:10"
                }
              ]
            },
            "documentation": "Parse token address from asset data\n     * @param _assetData   Encoded asset data\n@return address     Address of ERC20 asset address",
            "id": 1980,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1959,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1958,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1980,
                  "src": "3309:16:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1957,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3309:5:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3299:32:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 1962,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1961,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1980,
                  "src": "3378:7:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1960,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3378:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3377:9:10"
            },
            "scope": 2079,
            "src": "3268:311:10",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2004,
              "nodeType": "Block",
              "src": "4051:620:10",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1990,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 2005,
                      "src": "4061:25:10",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1989,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1951,
                        "src": "4061:11:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$1951_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1991,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4061:25:10"
                },
                {
                  "assignments": [
                    1993
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1993,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 2005,
                      "src": "4097:22:10",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1992,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4097:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2000,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1998,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1984,
                        "src": "4155:7:10",
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
                            "id": 1994,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1982,
                            "src": "4122:11:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1995,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 5381,
                          "src": "4122:26:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 1996,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4122:28:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1997,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 8753,
                      "src": "4122:32:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1999,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4122:41:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4097:66:10"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 1990,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4204:6:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1993,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4228:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1990,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4297:6:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1993,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4321:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1990,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4382:6:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1993,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4406:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1990,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4476:6:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1990,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4570:6:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1993,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4500:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1993,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4594:14:10",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2001,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataStart))\n    mstore(add(header, 32), mload(add(orderDataStart, 32)))\n    mstore(add(header, 64), mload(add(orderDataStart, 64)))\n    mstore(add(header, 96), mload(add(orderDataStart, 96)))\n    mstore(add(header, 128), mload(add(orderDataStart, 128)))\n}",
                  "src": "4174:483:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2002,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1990,
                    "src": "4658:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "functionReturnParameters": 1988,
                  "id": 2003,
                  "nodeType": "Return",
                  "src": "4651:13:10"
                }
              ]
            },
            "documentation": null,
            "id": 2005,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1985,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1982,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2005,
                  "src": "3938:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1981,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3938:5:10",
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
                  "id": 1984,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 2005,
                  "src": "3965:15:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1983,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3965:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3928:58:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 1988,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1987,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2005,
                  "src": "4034:11:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1986,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1951,
                    "src": "4034:11:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1951_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4033:13:10"
            },
            "scope": 2079,
            "src": "3903:768:10",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2077,
              "nodeType": "Block",
              "src": "6211:1401:10",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2019,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2078,
                      "src": "6221:27:10",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$5357_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2018,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 5357,
                        "src": "6221:14:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$5357_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2020,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6221:27:10"
                },
                {
                  "assignments": [
                    2022
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2022,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 2078,
                      "src": "6259:22:10",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2021,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6259:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2029,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2027,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2011,
                        "src": "6317:7:10",
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
                            "id": 2023,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2007,
                            "src": "6284:11:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 2024,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 5381,
                          "src": "6284:26:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 2025,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6284:28:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2026,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 8753,
                      "src": "6284:32:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2028,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6284:41:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6259:66:10"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6366:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6389:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6448:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6471:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6526:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6549:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6875:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6611:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6697:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6634:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6786:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6809:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6720:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7136:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7159:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6956:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6898:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7037:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6979:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7060:14:10",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2030,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataStart))\n    mstore(add(order, 32), mload(add(orderDataStart, 32)))\n    mstore(add(order, 64), mload(add(orderDataStart, 64)))\n    mstore(add(order, 96), mload(add(orderDataStart, 96)))\n    mstore(add(order, 128), mload(add(orderDataStart, 128)))\n    mstore(add(order, 160), mload(add(orderDataStart, 160)))\n    mstore(add(order, 192), mload(add(orderDataStart, 192)))\n    mstore(add(order, 224), mload(add(orderDataStart, 224)))\n    mstore(add(order, 256), mload(add(orderDataStart, 256)))\n    mstore(add(order, 288), mload(add(orderDataStart, 288)))\n}",
                  "src": "6336:880:10"
                },
                {
                  "assignments": [
                    2032
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2032,
                      "name": "takerAssetStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 2078,
                      "src": "7209:23:10",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2031,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7209:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2038,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "333230",
                        "id": 2036,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7268:3:10",
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
                          "id": 2033,
                          "name": "_header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2009,
                          "src": "7235:7:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 2034,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1946,
                        "src": "7235:28:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2035,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 8753,
                      "src": "7235:32:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2037,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7235:37:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7209:63:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2053,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2039,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2019,
                        "src": "7282:5:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$5357_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 2041,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5354,
                      "src": "7282:20:10",
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
                              "id": 2046,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7348:3:10",
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
                              "id": 2044,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2011,
                              "src": "7336:7:10",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2045,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 8753,
                            "src": "7336:11:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2047,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7336:16:10",
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
                              "id": 2050,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2032,
                              "src": "7378:15:10",
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
                              "id": 2048,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2011,
                              "src": "7366:7:10",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2049,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 8753,
                            "src": "7366:11:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2051,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7366:28:10",
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
                          "id": 2042,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2007,
                          "src": "7305:11:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 2043,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5513,
                        "src": "7305:17:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 2052,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7305:99:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7282:122:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 2054,
                  "nodeType": "ExpressionStatement",
                  "src": "7282:122:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2073,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2055,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2019,
                        "src": "7414:5:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$5357_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 2057,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5356,
                      "src": "7414:20:10",
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
                              "id": 2062,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2032,
                              "src": "7480:15:10",
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
                              "id": 2060,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2011,
                              "src": "7468:7:10",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2061,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 8753,
                            "src": "7468:11:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2063,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7468:28:10",
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
                                "id": 2069,
                                "name": "_header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2009,
                                "src": "7543:7:10",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                                  "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                                }
                              },
                              "id": 2070,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "takerAssetDataLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1948,
                              "src": "7543:28:10",
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
                                  "id": 2066,
                                  "name": "takerAssetStart",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2032,
                                  "src": "7522:15:10",
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
                                  "id": 2064,
                                  "name": "_offset",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2011,
                                  "src": "7510:7:10",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2065,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 8753,
                                "src": "7510:11:10",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2067,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7510:28:10",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2068,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 8753,
                            "src": "7510:32:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2071,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7510:62:10",
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
                          "id": 2058,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2007,
                          "src": "7437:11:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 2059,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5513,
                        "src": "7437:17:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 2072,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7437:145:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7414:168:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 2074,
                  "nodeType": "ExpressionStatement",
                  "src": "7414:168:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2075,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2019,
                    "src": "7600:5:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$5357_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 2015,
                  "id": 2076,
                  "nodeType": "Return",
                  "src": "7593:12:10"
                }
              ]
            },
            "documentation": null,
            "id": 2078,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2012,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2007,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2078,
                  "src": "6052:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2006,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6052:5:10",
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
                  "id": 2009,
                  "name": "_header",
                  "nodeType": "VariableDeclaration",
                  "scope": 2078,
                  "src": "6079:26:10",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2008,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1951,
                    "src": "6079:11:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1951_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2011,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 2078,
                  "src": "6115:15:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2010,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6115:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6042:94:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 2015,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2014,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2078,
                  "src": "6184:14:10",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$5357_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2013,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 5357,
                    "src": "6184:14:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$5357_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6183:23:10"
            },
            "scope": 2079,
            "src": "6017:1595:10",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 2080,
        "src": "2472:5142:10"
      }
    ],
    "src": "597:7018:10"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        2079
      ]
    },
    "id": 2080,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1920,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:10"
      },
      {
        "id": 1921,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:10"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1923,
        "nodeType": "ImportDirective",
        "scope": 2080,
        "sourceUnit": 8755,
        "src": "658:73:10",
        "symbolAliases": [
          {
            "foreign": 1922,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 1925,
        "nodeType": "ImportDirective",
        "scope": 2080,
        "sourceUnit": 5515,
        "src": "732:61:10",
        "symbolAliases": [
          {
            "foreign": 1924,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 1927,
        "nodeType": "ImportDirective",
        "scope": 2080,
        "sourceUnit": 5366,
        "src": "794:75:10",
        "symbolAliases": [
          {
            "foreign": 1926,
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
        "id": 2079,
        "linearizedBaseContracts": [
          2079
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1930,
            "libraryName": {
              "contractScope": null,
              "id": 1928,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5514,
              "src": "2515:8:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$5514",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2509:25:10",
            "typeName": {
              "id": 1929,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "2528:5:10",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "id": 1933,
            "libraryName": {
              "contractScope": null,
              "id": 1931,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 8754,
              "src": "2545:8:10",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$8754",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "2539:27:10",
            "typeName": {
              "id": 1932,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "2558:7:10",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1940,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 2079,
            "src": "2616:73:10",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 1934,
              "name": "bytes4",
              "nodeType": "ElementaryTypeName",
              "src": "2616:6:10",
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
                      "id": 1937,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2666:21:10",
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
                    "id": 1936,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 9301,
                    "src": "2656:9:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 1938,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "2656:32:10",
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
                "id": 1935,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "ElementaryTypeNameExpression",
                "src": "2649:6:10",
                "typeDescriptions": {
                  "typeIdentifier": "t_type$_t_bytes4_$",
                  "typeString": "type(bytes4)"
                },
                "typeName": "bytes4"
              },
              "id": 1939,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "typeConversion",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "2649:40:10",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.OrderHeader",
            "id": 1951,
            "members": [
              {
                "constant": false,
                "id": 1942,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 1951,
                "src": "2767:23:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1941,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2767:7:10",
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
                "id": 1944,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 1951,
                "src": "2800:19:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1943,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2800:7:10",
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
                "id": 1946,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1951,
                "src": "2829:28:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1945,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2829:7:10",
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
                "id": 1948,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 1951,
                "src": "2867:28:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1947,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2867:7:10",
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
                "id": 1950,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 1951,
                "src": "2905:18:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 1949,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2905:7:10",
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
            "scope": 2079,
            "src": "2738:192:10",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 1956,
            "members": [
              {
                "constant": false,
                "id": 1953,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1956,
                "src": "2972:25:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1952,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2972:7:10",
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
                "id": 1955,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 1956,
                "src": "3007:25:10",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 1954,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "3007:7:10",
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
            "scope": 2079,
            "src": "2936:103:10",
            "visibility": "public"
          },
          {
            "body": {
              "id": 1979,
              "nodeType": "Block",
              "src": "3391:188:10",
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
                        "id": 1969,
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
                              "id": 1966,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3473:1:10",
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
                              "id": 1964,
                              "name": "_assetData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1958,
                              "src": "3451:10:10",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 1965,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "readBytes4",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 5404,
                            "src": "3451:21:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
                            }
                          },
                          "id": 1967,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3451:24:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 1968,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1940,
                          "src": "3479:14:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "src": "3451:42:10",
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
                      "id": 1963,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        9310,
                        9311
                      ],
                      "referencedDeclaration": 9310,
                      "src": "3443:7:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1970,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3443:51:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1971,
                  "nodeType": "ExpressionStatement",
                  "src": "3443:51:10"
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
                            "id": 1975,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3569:1:10",
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
                            "id": 1973,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1958,
                            "src": "3546:10:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1974,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 5431,
                          "src": "3546:22:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 1976,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3546:25:10",
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
                      "id": 1972,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "3538:7:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": "address"
                    },
                    "id": 1977,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3538:34:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1962,
                  "id": 1978,
                  "nodeType": "Return",
                  "src": "3531:41:10"
                }
              ]
            },
            "documentation": "Parse token address from asset data\n     * @param _assetData   Encoded asset data\n@return address     Address of ERC20 asset address",
            "id": 1980,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1959,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1958,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1980,
                  "src": "3309:16:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1957,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3309:5:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3299:32:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 1962,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1961,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1980,
                  "src": "3378:7:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1960,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3378:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3377:9:10"
            },
            "scope": 2079,
            "src": "3268:311:10",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2004,
              "nodeType": "Block",
              "src": "4051:620:10",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1990,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 2005,
                      "src": "4061:25:10",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1989,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1951,
                        "src": "4061:11:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$1951_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1991,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4061:25:10"
                },
                {
                  "assignments": [
                    1993
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1993,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 2005,
                      "src": "4097:22:10",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1992,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4097:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2000,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1998,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1984,
                        "src": "4155:7:10",
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
                            "id": 1994,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1982,
                            "src": "4122:11:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 1995,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 5381,
                          "src": "4122:26:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 1996,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4122:28:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1997,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 8753,
                      "src": "4122:32:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1999,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4122:41:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4097:66:10"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 1990,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4204:6:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1993,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4228:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1990,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4297:6:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1993,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4321:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1990,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4382:6:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1993,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4406:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1990,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4476:6:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 1990,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4570:6:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1993,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4500:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 1993,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4594:14:10",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2001,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataStart))\n    mstore(add(header, 32), mload(add(orderDataStart, 32)))\n    mstore(add(header, 64), mload(add(orderDataStart, 64)))\n    mstore(add(header, 96), mload(add(orderDataStart, 96)))\n    mstore(add(header, 128), mload(add(orderDataStart, 128)))\n}",
                  "src": "4174:483:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2002,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1990,
                    "src": "4658:6:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "functionReturnParameters": 1988,
                  "id": 2003,
                  "nodeType": "Return",
                  "src": "4651:13:10"
                }
              ]
            },
            "documentation": null,
            "id": 2005,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1985,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1982,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2005,
                  "src": "3938:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1981,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3938:5:10",
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
                  "id": 1984,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 2005,
                  "src": "3965:15:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1983,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3965:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3928:58:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 1988,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1987,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2005,
                  "src": "4034:11:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1986,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1951,
                    "src": "4034:11:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1951_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4033:13:10"
            },
            "scope": 2079,
            "src": "3903:768:10",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2077,
              "nodeType": "Block",
              "src": "6211:1401:10",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2019,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2078,
                      "src": "6221:27:10",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$5357_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2018,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 5357,
                        "src": "6221:14:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$5357_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2020,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6221:27:10"
                },
                {
                  "assignments": [
                    2022
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2022,
                      "name": "orderDataStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 2078,
                      "src": "6259:22:10",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2021,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6259:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2029,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2027,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2011,
                        "src": "6317:7:10",
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
                            "id": 2023,
                            "name": "_ordersData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2007,
                            "src": "6284:11:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 2024,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 5381,
                          "src": "6284:26:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 2025,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6284:28:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2026,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 8753,
                      "src": "6284:32:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2028,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6284:41:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6259:66:10"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6366:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6389:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6448:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6471:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6526:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6549:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6875:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6611:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6697:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6634:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6786:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6809:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6720:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7136:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7159:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6956:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6898:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2019,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7037:5:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6979:14:10",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataStart": {
                        "declaration": 2022,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7060:14:10",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2030,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataStart))\n    mstore(add(order, 32), mload(add(orderDataStart, 32)))\n    mstore(add(order, 64), mload(add(orderDataStart, 64)))\n    mstore(add(order, 96), mload(add(orderDataStart, 96)))\n    mstore(add(order, 128), mload(add(orderDataStart, 128)))\n    mstore(add(order, 160), mload(add(orderDataStart, 160)))\n    mstore(add(order, 192), mload(add(orderDataStart, 192)))\n    mstore(add(order, 224), mload(add(orderDataStart, 224)))\n    mstore(add(order, 256), mload(add(orderDataStart, 256)))\n    mstore(add(order, 288), mload(add(orderDataStart, 288)))\n}",
                  "src": "6336:880:10"
                },
                {
                  "assignments": [
                    2032
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2032,
                      "name": "takerAssetStart",
                      "nodeType": "VariableDeclaration",
                      "scope": 2078,
                      "src": "7209:23:10",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2031,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7209:7:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2038,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "333230",
                        "id": 2036,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "7268:3:10",
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
                          "id": 2033,
                          "name": "_header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2009,
                          "src": "7235:7:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 2034,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1946,
                        "src": "7235:28:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2035,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 8753,
                      "src": "7235:32:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2037,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7235:37:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7209:63:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2053,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2039,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2019,
                        "src": "7282:5:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$5357_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 2041,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5354,
                      "src": "7282:20:10",
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
                              "id": 2046,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7348:3:10",
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
                              "id": 2044,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2011,
                              "src": "7336:7:10",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2045,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 8753,
                            "src": "7336:11:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2047,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7336:16:10",
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
                              "id": 2050,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2032,
                              "src": "7378:15:10",
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
                              "id": 2048,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2011,
                              "src": "7366:7:10",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2049,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 8753,
                            "src": "7366:11:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2051,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7366:28:10",
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
                          "id": 2042,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2007,
                          "src": "7305:11:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 2043,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5513,
                        "src": "7305:17:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 2052,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7305:99:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7282:122:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 2054,
                  "nodeType": "ExpressionStatement",
                  "src": "7282:122:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2073,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2055,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2019,
                        "src": "7414:5:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$5357_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 2057,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5356,
                      "src": "7414:20:10",
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
                              "id": 2062,
                              "name": "takerAssetStart",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2032,
                              "src": "7480:15:10",
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
                              "id": 2060,
                              "name": "_offset",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2011,
                              "src": "7468:7:10",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2061,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 8753,
                            "src": "7468:11:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2063,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7468:28:10",
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
                                "id": 2069,
                                "name": "_header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2009,
                                "src": "7543:7:10",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                                  "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                                }
                              },
                              "id": 2070,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "takerAssetDataLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1948,
                              "src": "7543:28:10",
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
                                  "id": 2066,
                                  "name": "takerAssetStart",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2032,
                                  "src": "7522:15:10",
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
                                  "id": 2064,
                                  "name": "_offset",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2011,
                                  "src": "7510:7:10",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2065,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 8753,
                                "src": "7510:11:10",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2067,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7510:28:10",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2068,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 8753,
                            "src": "7510:32:10",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2071,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7510:62:10",
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
                          "id": 2058,
                          "name": "_ordersData",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2007,
                          "src": "7437:11:10",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 2059,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5513,
                        "src": "7437:17:10",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 2072,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7437:145:10",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7414:168:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 2074,
                  "nodeType": "ExpressionStatement",
                  "src": "7414:168:10"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2075,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2019,
                    "src": "7600:5:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$5357_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 2015,
                  "id": 2076,
                  "nodeType": "Return",
                  "src": "7593:12:10"
                }
              ]
            },
            "documentation": null,
            "id": 2078,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2012,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2007,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2078,
                  "src": "6052:17:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2006,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6052:5:10",
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
                  "id": 2009,
                  "name": "_header",
                  "nodeType": "VariableDeclaration",
                  "scope": 2078,
                  "src": "6079:26:10",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$1951_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2008,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 1951,
                    "src": "6079:11:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$1951_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2011,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 2078,
                  "src": "6115:15:10",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2010,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6115:7:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6042:94:10"
            },
            "payable": false,
            "returnParameters": {
              "id": 2015,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2014,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2078,
                  "src": "6184:14:10",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$5357_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2013,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 5357,
                    "src": "6184:14:10",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$5357_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6183:23:10"
            },
            "scope": 2079,
            "src": "6017:1595:10",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 2080,
        "src": "2472:5142:10"
      }
    ],
    "src": "597:7018:10"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.085Z"
}
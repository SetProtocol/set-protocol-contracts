export const ZeroExOrderDataHandler = 
{
  "contractName": "ZeroExOrderDataHandler",
  "abi": [],
  "bytecode": "0x605a602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a265627a7a72305820f6331193193ca0f2189c25f32645972c82734cf34b6f3f0a5ad33dead7f907046c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a265627a7a72305820f6331193193ca0f2189c25f32645972c82734cf34b6f3f0a5ad33dead7f907046c6578706572696d656e74616cf50037",
  "sourceMap": "1125:8113:2:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "1125:8113:2:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { IExchange as ZeroEx } from \"../../../external/0x/Exchange/interfaces/IExchange.sol\";\nimport { LibBytes } from \"../../../external/0x/LibBytes.sol\";\nimport { LibOrder } from \"../../../external/0x/Exchange/libs/LibOrder.sol\";\n\n\n/**\n * @title ZeroExOrderDataHandler\n * @author Set Protocol\n *\n * This library contains functions and structs to assist with parsing exchange orders data\n */\nlibrary ZeroExOrderDataHandler {\n    using SafeMath for uint256;\n    using LibBytes for bytes;\n\n    // ============ Constants ============\n\n    bytes4 constant ERC20_SELECTOR = bytes4(keccak256(\"ERC20Token(address)\"));\n\n    // ============ Structs ============\n\n    // We construct the following to allow calling fillOrder on ZeroEx V2 Exchange\n    // The layout of this orderData is in the table below.\n    // \n    // | Section | Data                  | Offset              | Length          | Contents                      |\n    // |---------|-----------------------|---------------------|-----------------|-------------------------------|\n    // | Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |\n    // |         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |\n    // |         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |\n    // |         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |\n    // |         | fillAmount            | 128                 | 32              | taker asset fill amouint      |\n    // | Body    | signature             | 160                 | signatureLength | signature in bytes            |\n    // |         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |\n\n    struct OrderHeader {\n        uint256 signatureLength;\n        uint256 orderLength;\n        uint256 makerAssetDataLength;\n        uint256 takerAssetDataLength;\n        uint256 fillAmount;\n    }\n\n    struct AssetDataAddresses {\n        address makerTokenAddress;\n        address takerTokenAddress;\n    }\n\n    // ============ Internal Functions ============\n\n    /**\n     * Parse token address from asset data\n     *\n     * @param _assetData   Encoded asset data\n     * @return Address of ERC20 asset address\n     */\n    function parseERC20TokenAddress(bytes _assetData)\n        internal\n        pure\n        returns(address)\n    {\n        // Ensure that the asset is ERC20\n        require(_assetData.readBytes4(0) == ERC20_SELECTOR);\n\n        // Return address\n        return address(_assetData.readBytes32(4));\n    }\n\n    /*\n     * Parses the header from order byte array\n     * Can only be called by authorized contracts.\n     *\n     * @param  _orderData    Byte array of order data  \n     * @return OrderHeader struct\n     */\n    function parseOrderHeader(bytes _orderData)\n        internal\n        pure\n        returns (OrderHeader)\n    {\n        OrderHeader memory header;\n\n        assembly {\n            mstore(header,          mload(add(_orderData, 32)))  // signatureLength\n            mstore(add(header, 32), mload(add(_orderData, 64)))  // orderLength\n            mstore(add(header, 64), mload(add(_orderData, 96)))  // makerAssetDataLength\n            mstore(add(header, 96), mload(add(_orderData, 128))) // takerAssetDataLength\n            mstore(add(header, 128), mload(add(_orderData, 160))) // fillAmmount\n        }\n\n        return header;\n    }\n\n    /*\n     * Parses the signature from order byte array\n     *\n     * @param  _signatureLength    Length of signature to slice from order data\n     * @param  _ordersData         Byte array of order data\n     * @return Byte array containing signature\n     */\n    function parseSignature(\n        uint256 _signatureLength,\n        bytes _orderData\n    )\n        internal\n        pure\n        returns (bytes)\n    {\n        bytes memory signature = _orderData.slice(160, _signatureLength.add(160));\n        return signature;\n    }\n\n    /*\n     * Parses the bytes array into ZeroEx order\n     *\n     * @param  _orderData    Byte array of order data\n     * @return LibOrder.Order (0x order) struct\n     */\n    function parseZeroExOrder(bytes _orderData)\n        internal\n        pure\n        returns(LibOrder.Order memory)\n    {\n        OrderHeader memory header = parseOrderHeader(_orderData);\n\n        LibOrder.Order memory order = constructZeroExOrder(\n            sliceZeroExOrder(\n                _orderData,\n                header.signatureLength,\n                header.orderLength\n            ),\n            header.makerAssetDataLength,\n            header.takerAssetDataLength\n        );\n\n        return order;\n    }\n\n    // ============ WIP Functions ============\n\n    // Remove and put me into parseZeroExOrder\n    function sliceZeroExOrder(\n        bytes _orderData,\n        uint _signatureLength,\n        uint _orderLength\n    )\n        internal\n        pure\n        returns (bytes memory)\n    {\n        // 160 is the signature start length. The order starts with sig length\n        uint256 orderStartAddress = _signatureLength.add(160);\n\n        bytes memory order = _orderData.slice(\n            orderStartAddress,\n            orderStartAddress.add(_orderLength)\n        );\n        return order;\n    }\n\n    // | Data                       | Location |\n    // |----------------------------|----------|\n    // | maker                      | 0        |\n    // | taker                      | 32       |\n    // | feeRecipient               | 64       |\n    // | senderAddress              | 96       |\n    // | makerAssetAmount           | 128      |\n    // | takerAssetAmount           | 160      |\n    // | makerFee                   | 192      |\n    // | takerFee                   | 224      |\n    // | expirationUnixTimeStampSec | 256      |\n    // | salt                       | 288      |\n    // | makerAssetData             | 320      |\n    // | takerAssetData             | 320      |\n\n    // Remove and put me into parseZeroExOrder\n    function constructZeroExOrder(\n        bytes _zeroExOrder,\n        uint _makerAssetDataLength,\n        uint _takerAssetDataLength\n    )\n        internal\n        pure\n        returns (LibOrder.Order memory)\n    {\n        LibOrder.Order memory order;\n        uint256 orderDataAddr = _zeroExOrder.contentAddress();\n\n        assembly {\n            mstore(order,           mload(orderDataAddr))           // maker\n            mstore(add(order, 32),  mload(add(orderDataAddr, 32)))  // taker\n            mstore(add(order, 64),  mload(add(orderDataAddr, 64)))  // feeRecipient\n            mstore(add(order, 96),  mload(add(orderDataAddr, 96)))  // senderAddress\n            mstore(add(order, 128), mload(add(orderDataAddr, 128))) // makerAssetAmount\n            mstore(add(order, 160), mload(add(orderDataAddr, 160))) // takerAssetAmount\n            mstore(add(order, 192), mload(add(orderDataAddr, 192))) // makerFee\n            mstore(add(order, 224), mload(add(orderDataAddr, 224))) // takerFee\n            mstore(add(order, 256), mload(add(orderDataAddr, 256))) // expirationUnixTimestampSec\n            mstore(add(order, 288), mload(add(orderDataAddr, 288))) // salt\n        }\n\n        order.makerAssetData = _zeroExOrder.slice(320, _makerAssetDataLength.add(320));\n        order.takerAssetData = _zeroExOrder.slice(_makerAssetDataLength.add(320), _makerAssetDataLength.add(320).add(_takerAssetDataLength));\n\n        return order;       \n    }\n\n    // Figure out effective way to put this inside sliceOrderBody once ZeroExExchangeWrapper specs are in\n    function getZeroExOrderDataLength(\n        bytes _orderData,\n        uint256 _offset\n    )\n        internal\n        pure\n        returns (uint256)\n    {\n        OrderHeader memory header;\n\n        uint256 orderDataAddr = _orderData.contentAddress().add(_offset);\n\n        assembly {\n            mstore(header,          mload(orderDataAddr))          // signatureLength\n            mstore(add(header, 32), mload(add(orderDataAddr, 32))) // orderLength\n        }\n\n        return header.signatureLength.add(160).add(header.orderLength);\n    }\n\n    function sliceOrderBody(bytes _ordersData, uint256 _offset)\n        internal\n        pure\n        returns (bytes)\n    {\n        uint256 orderLength = getZeroExOrderDataLength(_ordersData, _offset);\n\n        bytes memory orderBody = _ordersData.slice(\n            _offset,\n            _offset.add(orderLength)\n        );\n        return orderBody;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        558
      ]
    },
    "id": 559,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 271,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:2"
      },
      {
        "id": 272,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:2"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 274,
        "nodeType": "ImportDirective",
        "scope": 559,
        "sourceUnit": 3894,
        "src": "658:73:2",
        "symbolAliases": [
          {
            "foreign": 273,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 276,
        "nodeType": "ImportDirective",
        "scope": 559,
        "sourceUnit": 3018,
        "src": "732:93:2",
        "symbolAliases": [
          {
            "foreign": 275,
            "local": "ZeroEx"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 278,
        "nodeType": "ImportDirective",
        "scope": 559,
        "sourceUnit": 3504,
        "src": "826:61:2",
        "symbolAliases": [
          {
            "foreign": 277,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 280,
        "nodeType": "ImportDirective",
        "scope": 559,
        "sourceUnit": 3355,
        "src": "888:75:2",
        "symbolAliases": [
          {
            "foreign": 279,
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
        "id": 558,
        "linearizedBaseContracts": [
          558
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 283,
            "libraryName": {
              "contractScope": null,
              "id": 281,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3893,
              "src": "1168:8:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$3893",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1162:27:2",
            "typeName": {
              "id": 282,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1181:7:2",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 286,
            "libraryName": {
              "contractScope": null,
              "id": 284,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3503,
              "src": "1200:8:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$3503",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1194:25:2",
            "typeName": {
              "id": 285,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "1213:5:2",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "constant": true,
            "id": 293,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 558,
            "src": "1269:73:2",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 287,
              "name": "bytes4",
              "nodeType": "ElementaryTypeName",
              "src": "1269:6:2",
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
                      "id": 290,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1319:21:2",
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
                    "id": 289,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3988,
                    "src": "1309:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 291,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "1309:32:2",
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
                "id": 288,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "ElementaryTypeNameExpression",
                "src": "1302:6:2",
                "typeDescriptions": {
                  "typeIdentifier": "t_type$_t_bytes4_$",
                  "typeString": "type(bytes4)"
                },
                "typeName": "bytes4"
              },
              "id": 292,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "typeConversion",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "1302:40:2",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.OrderHeader",
            "id": 304,
            "members": [
              {
                "constant": false,
                "id": 295,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 304,
                "src": "2606:23:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 294,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2606:7:2",
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
                "id": 297,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 304,
                "src": "2639:19:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 296,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2639:7:2",
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
                "id": 299,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 304,
                "src": "2668:28:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 298,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2668:7:2",
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
                "id": 301,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 304,
                "src": "2706:28:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 300,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2706:7:2",
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
                "id": 303,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 304,
                "src": "2744:18:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 302,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2744:7:2",
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
            "scope": 558,
            "src": "2577:192:2",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 309,
            "members": [
              {
                "constant": false,
                "id": 306,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 309,
                "src": "2811:25:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 305,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2811:7:2",
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
                "id": 308,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 309,
                "src": "2846:25:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 307,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2846:7:2",
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
            "scope": 558,
            "src": "2775:103:2",
            "visibility": "public"
          },
          {
            "body": {
              "id": 332,
              "nodeType": "Block",
              "src": "3204:188:2",
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
                        "id": 322,
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
                              "id": 319,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3286:1:2",
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
                              "id": 317,
                              "name": "_assetData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 311,
                              "src": "3264:10:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 318,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "readBytes4",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3393,
                            "src": "3264:21:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
                            }
                          },
                          "id": 320,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3264:24:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 321,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 293,
                          "src": "3292:14:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "src": "3264:42:2",
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
                      "id": 316,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "3256:7:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 323,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3256:51:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 324,
                  "nodeType": "ExpressionStatement",
                  "src": "3256:51:2"
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
                            "id": 328,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3382:1:2",
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
                            "id": 326,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 311,
                            "src": "3359:10:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 327,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3420,
                          "src": "3359:22:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 329,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3359:25:2",
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
                      "id": 325,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "3351:7:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": "address"
                    },
                    "id": 330,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3351:34:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 315,
                  "id": 331,
                  "nodeType": "Return",
                  "src": "3344:41:2"
                }
              ]
            },
            "documentation": "Parse token address from asset data\n     * @param _assetData   Encoded asset data\n@return Address of ERC20 asset address",
            "id": 333,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 312,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 311,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 333,
                  "src": "3127:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 310,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3127:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3126:18:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 315,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 314,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 333,
                  "src": "3191:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 313,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3191:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3190:9:2"
            },
            "scope": 558,
            "src": "3095:297:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 346,
              "nodeType": "Block",
              "src": "3716:519:2",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 341,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 347,
                      "src": "3726:25:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 340,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 304,
                        "src": "3726:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$304_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 342,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3726:25:2"
                },
                {
                  "externalReferences": [
                    {
                      "_orderData": {
                        "declaration": 335,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3819:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 341,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3792:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 341,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3880:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 335,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3903:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 341,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3960:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 335,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3983:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 341,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4049:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 335,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4072:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 341,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4138:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 335,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4162:10:2",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 343,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(add(_orderData, 32)))\n    mstore(add(header, 32), mload(add(_orderData, 64)))\n    mstore(add(header, 64), mload(add(_orderData, 96)))\n    mstore(add(header, 96), mload(add(_orderData, 128)))\n    mstore(add(header, 128), mload(add(_orderData, 160)))\n}",
                  "src": "3762:459:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 344,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 341,
                    "src": "4222:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "functionReturnParameters": 339,
                  "id": 345,
                  "nodeType": "Return",
                  "src": "4215:13:2"
                }
              ]
            },
            "documentation": null,
            "id": 347,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 336,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 335,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 347,
                  "src": "3634:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 334,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3634:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3633:18:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 339,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 338,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 347,
                  "src": "3699:11:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 337,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 304,
                    "src": "3699:11:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$304_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3698:13:2"
            },
            "scope": 558,
            "src": "3608:627:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 369,
              "nodeType": "Block",
              "src": "4648:116:2",
              "statements": [
                {
                  "assignments": [
                    357
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 357,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 370,
                      "src": "4658:22:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 356,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "4658:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 366,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 360,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4700:3:2",
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
                            "id": 363,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "4726:3:2",
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
                            "id": 361,
                            "name": "_signatureLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 349,
                            "src": "4705:16:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 362,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3892,
                          "src": "4705:20:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 364,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4705:25:2",
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
                        "id": 358,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 351,
                        "src": "4683:10:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 359,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3502,
                      "src": "4683:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 365,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4683:48:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4658:73:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 367,
                    "name": "signature",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 357,
                    "src": "4748:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 355,
                  "id": 368,
                  "nodeType": "Return",
                  "src": "4741:16:2"
                }
              ]
            },
            "documentation": null,
            "id": 370,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 352,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 349,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 370,
                  "src": "4533:24:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 348,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4533:7:2",
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
                  "id": 351,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 370,
                  "src": "4567:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 350,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4567:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4523:66:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 355,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 354,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 370,
                  "src": "4637:5:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 353,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4637:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4636:7:2"
            },
            "scope": 558,
            "src": "4500:264:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 403,
              "nodeType": "Block",
              "src": "5059:397:2",
              "statements": [
                {
                  "assignments": [
                    378
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 378,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 404,
                      "src": "5069:25:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 377,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 304,
                        "src": "5069:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$304_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 382,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 380,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 372,
                        "src": "5114:10:2",
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
                      "id": 379,
                      "name": "parseOrderHeader",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 347,
                      "src": "5097:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_OrderHeader_$304_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct ZeroExOrderDataHandler.OrderHeader memory)"
                      }
                    },
                    "id": 381,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5097:28:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5069:56:2"
                },
                {
                  "assignments": [
                    386
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 386,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 404,
                      "src": "5136:27:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 385,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3346,
                        "src": "5136:14:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 400,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 389,
                            "name": "_orderData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 372,
                            "src": "5234:10:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 390,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 378,
                              "src": "5262:6:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                              }
                            },
                            "id": 391,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "signatureLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 295,
                            "src": "5262:22:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 392,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 378,
                              "src": "5302:6:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                              }
                            },
                            "id": 393,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 297,
                            "src": "5302:18:2",
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
                          "id": 388,
                          "name": "sliceZeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 436,
                          "src": "5200:16:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                          }
                        },
                        "id": 394,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5200:134:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 395,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 378,
                          "src": "5348:6:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 396,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 299,
                        "src": "5348:27:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 397,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 378,
                          "src": "5389:6:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 398,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 301,
                        "src": "5389:27:2",
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
                      "id": 387,
                      "name": "constructZeroExOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 494,
                      "src": "5166:20:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_struct$_Order_$3346_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 399,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5166:260:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5136:290:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 401,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 386,
                    "src": "5444:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 376,
                  "id": 402,
                  "nodeType": "Return",
                  "src": "5437:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 404,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 373,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 372,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 404,
                  "src": "4968:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 371,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4968:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4967:18:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 376,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 375,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 404,
                  "src": "5032:14:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 374,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "5032:14:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5031:23:2"
            },
            "scope": 558,
            "src": "4942:514:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 435,
              "nodeType": "Block",
              "src": "5738:309:2",
              "statements": [
                {
                  "assignments": [
                    416
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 416,
                      "name": "orderStartAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 436,
                      "src": "5827:25:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 415,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5827:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 421,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 419,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "5876:3:2",
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
                        "id": 417,
                        "name": "_signatureLength",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 408,
                        "src": "5855:16:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 418,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3892,
                      "src": "5855:20:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 420,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5855:25:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5827:53:2"
                },
                {
                  "assignments": [
                    423
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 423,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 436,
                      "src": "5891:18:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 422,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "5891:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 432,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 426,
                        "name": "orderStartAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 416,
                        "src": "5942:17:2",
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
                            "id": 429,
                            "name": "_orderLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 410,
                            "src": "5995:12:2",
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
                            "id": 427,
                            "name": "orderStartAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 416,
                            "src": "5973:17:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 428,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3892,
                          "src": "5973:21:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 430,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5973:35:2",
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
                        "id": 424,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 406,
                        "src": "5912:10:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 425,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3502,
                      "src": "5912:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 431,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5912:106:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5891:127:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 433,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 423,
                    "src": "6035:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 414,
                  "id": 434,
                  "nodeType": "Return",
                  "src": "6028:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 436,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 411,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 406,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 436,
                  "src": "5592:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 405,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5592:5:2",
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
                  "id": 408,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 436,
                  "src": "5618:21:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 407,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5618:4:2",
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
                  "id": 410,
                  "name": "_orderLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 436,
                  "src": "5649:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 409,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5649:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5582:90:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 414,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 413,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 436,
                  "src": "5720:5:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 412,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5720:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5719:14:2"
            },
            "scope": 558,
            "src": "5557:490:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 493,
              "nodeType": "Block",
              "src": "6997:1231:2",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 450,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 494,
                      "src": "7007:27:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 449,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3346,
                        "src": "7007:14:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 451,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7007:27:2"
                },
                {
                  "assignments": [
                    453
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 453,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 494,
                      "src": "7044:21:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 452,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7044:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 457,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 454,
                        "name": "_zeroExOrder",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 438,
                        "src": "7068:12:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 455,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3370,
                      "src": "7068:27:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 456,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7068:29:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7044:53:2"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7138:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7161:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7219:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7242:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7296:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7319:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7641:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7380:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7465:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7403:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7553:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7576:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7488:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7899:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7922:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7721:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7664:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7801:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7744:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7824:13:2",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 458,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataAddr))\n    mstore(add(order, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(order, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(order, 96), mload(add(orderDataAddr, 96)))\n    mstore(add(order, 128), mload(add(orderDataAddr, 128)))\n    mstore(add(order, 160), mload(add(orderDataAddr, 160)))\n    mstore(add(order, 192), mload(add(orderDataAddr, 192)))\n    mstore(add(order, 224), mload(add(orderDataAddr, 224)))\n    mstore(add(order, 256), mload(add(orderDataAddr, 256)))\n    mstore(add(order, 288), mload(add(orderDataAddr, 288)))\n}",
                  "src": "7108:868:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 470,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 459,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 450,
                        "src": "7971:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 461,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3343,
                      "src": "7971:20:2",
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
                          "id": 464,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "8013:3:2",
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
                              "id": 467,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "8044:3:2",
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
                              "id": 465,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 440,
                              "src": "8018:21:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 466,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3892,
                            "src": "8018:25:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 468,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8018:30:2",
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
                          "id": 462,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 438,
                          "src": "7994:12:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 463,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3502,
                        "src": "7994:18:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 469,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7994:55:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7971:78:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 471,
                  "nodeType": "ExpressionStatement",
                  "src": "7971:78:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 489,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 472,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 450,
                        "src": "8059:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 474,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3345,
                      "src": "8059:20:2",
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
                              "id": 479,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "8127:3:2",
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
                              "id": 477,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 440,
                              "src": "8101:21:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 478,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3892,
                            "src": "8101:25:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 480,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8101:30:2",
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
                              "id": 486,
                              "name": "_takerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 442,
                              "src": "8168:21:2",
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
                                  "id": 483,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "8159:3:2",
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
                                  "id": 481,
                                  "name": "_makerAssetDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 440,
                                  "src": "8133:21:2",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 482,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 3892,
                                "src": "8133:25:2",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 484,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8133:30:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 485,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3892,
                            "src": "8133:34:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 487,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8133:57:2",
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
                          "id": 475,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 438,
                          "src": "8082:12:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 476,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3502,
                        "src": "8082:18:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 488,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "8082:109:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "8059:132:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 490,
                  "nodeType": "ExpressionStatement",
                  "src": "8059:132:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 491,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 450,
                    "src": "8209:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 446,
                  "id": 492,
                  "nodeType": "Return",
                  "src": "8202:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 494,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "constructZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 443,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 438,
                  "name": "_zeroExOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 494,
                  "src": "6826:18:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 437,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6826:5:2",
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
                  "id": 440,
                  "name": "_makerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 494,
                  "src": "6854:26:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 439,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6854:4:2",
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
                  "id": 442,
                  "name": "_takerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 494,
                  "src": "6890:26:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 441,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6890:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6816:106:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 446,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 445,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 494,
                  "src": "6970:14:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 444,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "6970:14:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6969:23:2"
            },
            "scope": 558,
            "src": "6787:1441:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 526,
              "nodeType": "Block",
              "src": "8491:388:2",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 504,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 527,
                      "src": "8501:25:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 503,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 304,
                        "src": "8501:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$304_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 505,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "8501:25:2"
                },
                {
                  "assignments": [
                    507
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 507,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 527,
                      "src": "8537:21:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 506,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "8537:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 514,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 512,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 498,
                        "src": "8593:7:2",
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
                            "id": 508,
                            "name": "_orderData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 496,
                            "src": "8561:10:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 509,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3370,
                          "src": "8561:25:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 510,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "8561:27:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 511,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3892,
                      "src": "8561:31:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 513,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "8561:40:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "8537:64:2"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 504,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "8642:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 507,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "8665:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 504,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "8732:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 507,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "8755:13:2",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 515,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataAddr))\n    mstore(add(header, 32), mload(add(orderDataAddr, 32)))\n}",
                  "src": "8612:204:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 522,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 504,
                          "src": "8853:6:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 523,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 297,
                        "src": "8853:18:2",
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
                            "hexValue": "313630",
                            "id": 519,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "8844:3:2",
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
                            "expression": {
                              "argumentTypes": null,
                              "id": 516,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 504,
                              "src": "8817:6:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                              }
                            },
                            "id": 517,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "signatureLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 295,
                            "src": "8817:22:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 518,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3892,
                          "src": "8817:26:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 520,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "8817:31:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 521,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3892,
                      "src": "8817:35:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 524,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "8817:55:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 502,
                  "id": 525,
                  "nodeType": "Return",
                  "src": "8810:62:2"
                }
              ]
            },
            "documentation": null,
            "id": 527,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getZeroExOrderDataLength",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 499,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 496,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 527,
                  "src": "8383:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 495,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "8383:5:2",
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
                  "id": 498,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 527,
                  "src": "8409:15:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 497,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "8409:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8373:57:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 502,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 501,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 527,
                  "src": "8478:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 500,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "8478:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8477:9:2"
            },
            "scope": 558,
            "src": "8340:539:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 556,
              "nodeType": "Block",
              "src": "9003:233:2",
              "statements": [
                {
                  "assignments": [
                    537
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 537,
                      "name": "orderLength",
                      "nodeType": "VariableDeclaration",
                      "scope": 557,
                      "src": "9013:19:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 536,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "9013:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 542,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 539,
                        "name": "_ordersData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 529,
                        "src": "9060:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 540,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 531,
                        "src": "9073:7:2",
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
                        }
                      ],
                      "id": 538,
                      "name": "getZeroExOrderDataLength",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 527,
                      "src": "9035:24:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 541,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9035:46:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "9013:68:2"
                },
                {
                  "assignments": [
                    544
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 544,
                      "name": "orderBody",
                      "nodeType": "VariableDeclaration",
                      "scope": 557,
                      "src": "9092:22:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 543,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "9092:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 553,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 547,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 531,
                        "src": "9148:7:2",
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
                            "id": 550,
                            "name": "orderLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 537,
                            "src": "9181:11:2",
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
                            "id": 548,
                            "name": "_offset",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 531,
                            "src": "9169:7:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 549,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3892,
                          "src": "9169:11:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 551,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "9169:24:2",
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
                        "id": 545,
                        "name": "_ordersData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 529,
                        "src": "9117:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 546,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3502,
                      "src": "9117:17:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 552,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9117:86:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "9092:111:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 554,
                    "name": "orderBody",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 544,
                    "src": "9220:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 535,
                  "id": 555,
                  "nodeType": "Return",
                  "src": "9213:16:2"
                }
              ]
            },
            "documentation": null,
            "id": 557,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceOrderBody",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 532,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 529,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 557,
                  "src": "8909:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 528,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "8909:5:2",
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
                  "id": 531,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 557,
                  "src": "8928:15:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 530,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "8928:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8908:36:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 535,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 534,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 557,
                  "src": "8992:5:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 533,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "8992:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8991:7:2"
            },
            "scope": 558,
            "src": "8885:351:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 559,
        "src": "1125:8113:2"
      }
    ],
    "src": "597:8642:2"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        558
      ]
    },
    "id": 559,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 271,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:2"
      },
      {
        "id": 272,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:2"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 274,
        "nodeType": "ImportDirective",
        "scope": 559,
        "sourceUnit": 3894,
        "src": "658:73:2",
        "symbolAliases": [
          {
            "foreign": 273,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 276,
        "nodeType": "ImportDirective",
        "scope": 559,
        "sourceUnit": 3018,
        "src": "732:93:2",
        "symbolAliases": [
          {
            "foreign": 275,
            "local": "ZeroEx"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 278,
        "nodeType": "ImportDirective",
        "scope": 559,
        "sourceUnit": 3504,
        "src": "826:61:2",
        "symbolAliases": [
          {
            "foreign": 277,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 280,
        "nodeType": "ImportDirective",
        "scope": 559,
        "sourceUnit": 3355,
        "src": "888:75:2",
        "symbolAliases": [
          {
            "foreign": 279,
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
        "id": 558,
        "linearizedBaseContracts": [
          558
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 283,
            "libraryName": {
              "contractScope": null,
              "id": 281,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3893,
              "src": "1168:8:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$3893",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1162:27:2",
            "typeName": {
              "id": 282,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1181:7:2",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 286,
            "libraryName": {
              "contractScope": null,
              "id": 284,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3503,
              "src": "1200:8:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$3503",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1194:25:2",
            "typeName": {
              "id": 285,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "1213:5:2",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "constant": true,
            "id": 293,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 558,
            "src": "1269:73:2",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 287,
              "name": "bytes4",
              "nodeType": "ElementaryTypeName",
              "src": "1269:6:2",
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
                      "id": 290,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1319:21:2",
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
                    "id": 289,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3988,
                    "src": "1309:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 291,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "1309:32:2",
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
                "id": 288,
                "isConstant": false,
                "isLValue": false,
                "isPure": true,
                "lValueRequested": false,
                "nodeType": "ElementaryTypeNameExpression",
                "src": "1302:6:2",
                "typeDescriptions": {
                  "typeIdentifier": "t_type$_t_bytes4_$",
                  "typeString": "type(bytes4)"
                },
                "typeName": "bytes4"
              },
              "id": 292,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "typeConversion",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "1302:40:2",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes4",
                "typeString": "bytes4"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.OrderHeader",
            "id": 304,
            "members": [
              {
                "constant": false,
                "id": 295,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 304,
                "src": "2606:23:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 294,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2606:7:2",
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
                "id": 297,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 304,
                "src": "2639:19:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 296,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2639:7:2",
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
                "id": 299,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 304,
                "src": "2668:28:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 298,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2668:7:2",
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
                "id": 301,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 304,
                "src": "2706:28:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 300,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2706:7:2",
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
                "id": 303,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 304,
                "src": "2744:18:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 302,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2744:7:2",
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
            "scope": 558,
            "src": "2577:192:2",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 309,
            "members": [
              {
                "constant": false,
                "id": 306,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 309,
                "src": "2811:25:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 305,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2811:7:2",
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
                "id": 308,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 309,
                "src": "2846:25:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 307,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2846:7:2",
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
            "scope": 558,
            "src": "2775:103:2",
            "visibility": "public"
          },
          {
            "body": {
              "id": 332,
              "nodeType": "Block",
              "src": "3204:188:2",
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
                        "id": 322,
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
                              "id": 319,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3286:1:2",
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
                              "id": 317,
                              "name": "_assetData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 311,
                              "src": "3264:10:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 318,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "readBytes4",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3393,
                            "src": "3264:21:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
                            }
                          },
                          "id": 320,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3264:24:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 321,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 293,
                          "src": "3292:14:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes4",
                            "typeString": "bytes4"
                          }
                        },
                        "src": "3264:42:2",
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
                      "id": 316,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "3256:7:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 323,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3256:51:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 324,
                  "nodeType": "ExpressionStatement",
                  "src": "3256:51:2"
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
                            "id": 328,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "3382:1:2",
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
                            "id": 326,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 311,
                            "src": "3359:10:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 327,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3420,
                          "src": "3359:22:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 329,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3359:25:2",
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
                      "id": 325,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "ElementaryTypeNameExpression",
                      "src": "3351:7:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_address_$",
                        "typeString": "type(address)"
                      },
                      "typeName": "address"
                    },
                    "id": 330,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3351:34:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 315,
                  "id": 331,
                  "nodeType": "Return",
                  "src": "3344:41:2"
                }
              ]
            },
            "documentation": "Parse token address from asset data\n     * @param _assetData   Encoded asset data\n@return Address of ERC20 asset address",
            "id": 333,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 312,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 311,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 333,
                  "src": "3127:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 310,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3127:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3126:18:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 315,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 314,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 333,
                  "src": "3191:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 313,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3191:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3190:9:2"
            },
            "scope": 558,
            "src": "3095:297:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 346,
              "nodeType": "Block",
              "src": "3716:519:2",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 341,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 347,
                      "src": "3726:25:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 340,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 304,
                        "src": "3726:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$304_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 342,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3726:25:2"
                },
                {
                  "externalReferences": [
                    {
                      "_orderData": {
                        "declaration": 335,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3819:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 341,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3792:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 341,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3880:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 335,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3903:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 341,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3960:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 335,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3983:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 341,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4049:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 335,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4072:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 341,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4138:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 335,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4162:10:2",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 343,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(add(_orderData, 32)))\n    mstore(add(header, 32), mload(add(_orderData, 64)))\n    mstore(add(header, 64), mload(add(_orderData, 96)))\n    mstore(add(header, 96), mload(add(_orderData, 128)))\n    mstore(add(header, 128), mload(add(_orderData, 160)))\n}",
                  "src": "3762:459:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 344,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 341,
                    "src": "4222:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "functionReturnParameters": 339,
                  "id": 345,
                  "nodeType": "Return",
                  "src": "4215:13:2"
                }
              ]
            },
            "documentation": null,
            "id": 347,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 336,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 335,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 347,
                  "src": "3634:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 334,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3634:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3633:18:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 339,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 338,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 347,
                  "src": "3699:11:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 337,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 304,
                    "src": "3699:11:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$304_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3698:13:2"
            },
            "scope": 558,
            "src": "3608:627:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 369,
              "nodeType": "Block",
              "src": "4648:116:2",
              "statements": [
                {
                  "assignments": [
                    357
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 357,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 370,
                      "src": "4658:22:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 356,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "4658:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 366,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 360,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4700:3:2",
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
                            "id": 363,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "4726:3:2",
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
                            "id": 361,
                            "name": "_signatureLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 349,
                            "src": "4705:16:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 362,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3892,
                          "src": "4705:20:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 364,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4705:25:2",
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
                        "id": 358,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 351,
                        "src": "4683:10:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 359,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3502,
                      "src": "4683:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 365,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4683:48:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4658:73:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 367,
                    "name": "signature",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 357,
                    "src": "4748:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 355,
                  "id": 368,
                  "nodeType": "Return",
                  "src": "4741:16:2"
                }
              ]
            },
            "documentation": null,
            "id": 370,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 352,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 349,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 370,
                  "src": "4533:24:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 348,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4533:7:2",
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
                  "id": 351,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 370,
                  "src": "4567:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 350,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4567:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4523:66:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 355,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 354,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 370,
                  "src": "4637:5:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 353,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4637:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4636:7:2"
            },
            "scope": 558,
            "src": "4500:264:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 403,
              "nodeType": "Block",
              "src": "5059:397:2",
              "statements": [
                {
                  "assignments": [
                    378
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 378,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 404,
                      "src": "5069:25:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 377,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 304,
                        "src": "5069:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$304_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 382,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 380,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 372,
                        "src": "5114:10:2",
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
                      "id": 379,
                      "name": "parseOrderHeader",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 347,
                      "src": "5097:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_OrderHeader_$304_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct ZeroExOrderDataHandler.OrderHeader memory)"
                      }
                    },
                    "id": 381,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5097:28:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5069:56:2"
                },
                {
                  "assignments": [
                    386
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 386,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 404,
                      "src": "5136:27:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 385,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3346,
                        "src": "5136:14:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 400,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 389,
                            "name": "_orderData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 372,
                            "src": "5234:10:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 390,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 378,
                              "src": "5262:6:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                              }
                            },
                            "id": 391,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "signatureLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 295,
                            "src": "5262:22:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 392,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 378,
                              "src": "5302:6:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                              }
                            },
                            "id": 393,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 297,
                            "src": "5302:18:2",
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
                          "id": 388,
                          "name": "sliceZeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 436,
                          "src": "5200:16:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                          }
                        },
                        "id": 394,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5200:134:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 395,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 378,
                          "src": "5348:6:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 396,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 299,
                        "src": "5348:27:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 397,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 378,
                          "src": "5389:6:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 398,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 301,
                        "src": "5389:27:2",
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
                      "id": 387,
                      "name": "constructZeroExOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 494,
                      "src": "5166:20:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_struct$_Order_$3346_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 399,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5166:260:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5136:290:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 401,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 386,
                    "src": "5444:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 376,
                  "id": 402,
                  "nodeType": "Return",
                  "src": "5437:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 404,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 373,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 372,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 404,
                  "src": "4968:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 371,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4968:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4967:18:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 376,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 375,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 404,
                  "src": "5032:14:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 374,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "5032:14:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5031:23:2"
            },
            "scope": 558,
            "src": "4942:514:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 435,
              "nodeType": "Block",
              "src": "5738:309:2",
              "statements": [
                {
                  "assignments": [
                    416
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 416,
                      "name": "orderStartAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 436,
                      "src": "5827:25:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 415,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5827:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 421,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 419,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "5876:3:2",
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
                        "id": 417,
                        "name": "_signatureLength",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 408,
                        "src": "5855:16:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 418,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3892,
                      "src": "5855:20:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 420,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5855:25:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5827:53:2"
                },
                {
                  "assignments": [
                    423
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 423,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 436,
                      "src": "5891:18:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 422,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "5891:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 432,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 426,
                        "name": "orderStartAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 416,
                        "src": "5942:17:2",
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
                            "id": 429,
                            "name": "_orderLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 410,
                            "src": "5995:12:2",
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
                            "id": 427,
                            "name": "orderStartAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 416,
                            "src": "5973:17:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 428,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3892,
                          "src": "5973:21:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 430,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5973:35:2",
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
                        "id": 424,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 406,
                        "src": "5912:10:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 425,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3502,
                      "src": "5912:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 431,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5912:106:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5891:127:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 433,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 423,
                    "src": "6035:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 414,
                  "id": 434,
                  "nodeType": "Return",
                  "src": "6028:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 436,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 411,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 406,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 436,
                  "src": "5592:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 405,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5592:5:2",
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
                  "id": 408,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 436,
                  "src": "5618:21:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 407,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5618:4:2",
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
                  "id": 410,
                  "name": "_orderLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 436,
                  "src": "5649:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 409,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5649:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5582:90:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 414,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 413,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 436,
                  "src": "5720:5:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 412,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5720:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5719:14:2"
            },
            "scope": 558,
            "src": "5557:490:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 493,
              "nodeType": "Block",
              "src": "6997:1231:2",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 450,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 494,
                      "src": "7007:27:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 449,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3346,
                        "src": "7007:14:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 451,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7007:27:2"
                },
                {
                  "assignments": [
                    453
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 453,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 494,
                      "src": "7044:21:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 452,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7044:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 457,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 454,
                        "name": "_zeroExOrder",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 438,
                        "src": "7068:12:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 455,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3370,
                      "src": "7068:27:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 456,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7068:29:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7044:53:2"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7138:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7161:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7219:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7242:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7296:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7319:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7641:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7380:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7465:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7403:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7553:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7576:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7488:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7899:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7922:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7721:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7664:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 450,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7801:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7744:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 453,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7824:13:2",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 458,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataAddr))\n    mstore(add(order, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(order, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(order, 96), mload(add(orderDataAddr, 96)))\n    mstore(add(order, 128), mload(add(orderDataAddr, 128)))\n    mstore(add(order, 160), mload(add(orderDataAddr, 160)))\n    mstore(add(order, 192), mload(add(orderDataAddr, 192)))\n    mstore(add(order, 224), mload(add(orderDataAddr, 224)))\n    mstore(add(order, 256), mload(add(orderDataAddr, 256)))\n    mstore(add(order, 288), mload(add(orderDataAddr, 288)))\n}",
                  "src": "7108:868:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 470,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 459,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 450,
                        "src": "7971:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 461,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3343,
                      "src": "7971:20:2",
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
                          "id": 464,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "8013:3:2",
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
                              "id": 467,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "8044:3:2",
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
                              "id": 465,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 440,
                              "src": "8018:21:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 466,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3892,
                            "src": "8018:25:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 468,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8018:30:2",
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
                          "id": 462,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 438,
                          "src": "7994:12:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 463,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3502,
                        "src": "7994:18:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 469,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7994:55:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7971:78:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 471,
                  "nodeType": "ExpressionStatement",
                  "src": "7971:78:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 489,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 472,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 450,
                        "src": "8059:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 474,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3345,
                      "src": "8059:20:2",
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
                              "id": 479,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "8127:3:2",
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
                              "id": 477,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 440,
                              "src": "8101:21:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 478,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3892,
                            "src": "8101:25:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 480,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8101:30:2",
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
                              "id": 486,
                              "name": "_takerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 442,
                              "src": "8168:21:2",
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
                                  "id": 483,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "8159:3:2",
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
                                  "id": 481,
                                  "name": "_makerAssetDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 440,
                                  "src": "8133:21:2",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 482,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 3892,
                                "src": "8133:25:2",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 484,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8133:30:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 485,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3892,
                            "src": "8133:34:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 487,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8133:57:2",
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
                          "id": 475,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 438,
                          "src": "8082:12:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 476,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3502,
                        "src": "8082:18:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 488,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "8082:109:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "8059:132:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 490,
                  "nodeType": "ExpressionStatement",
                  "src": "8059:132:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 491,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 450,
                    "src": "8209:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 446,
                  "id": 492,
                  "nodeType": "Return",
                  "src": "8202:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 494,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "constructZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 443,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 438,
                  "name": "_zeroExOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 494,
                  "src": "6826:18:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 437,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6826:5:2",
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
                  "id": 440,
                  "name": "_makerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 494,
                  "src": "6854:26:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 439,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6854:4:2",
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
                  "id": 442,
                  "name": "_takerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 494,
                  "src": "6890:26:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 441,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6890:4:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6816:106:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 446,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 445,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 494,
                  "src": "6970:14:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3346_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 444,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3346,
                    "src": "6970:14:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3346_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6969:23:2"
            },
            "scope": 558,
            "src": "6787:1441:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 526,
              "nodeType": "Block",
              "src": "8491:388:2",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 504,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 527,
                      "src": "8501:25:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 503,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 304,
                        "src": "8501:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$304_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 505,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "8501:25:2"
                },
                {
                  "assignments": [
                    507
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 507,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 527,
                      "src": "8537:21:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 506,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "8537:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 514,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 512,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 498,
                        "src": "8593:7:2",
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
                            "id": 508,
                            "name": "_orderData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 496,
                            "src": "8561:10:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 509,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "contentAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3370,
                          "src": "8561:25:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory) pure returns (uint256)"
                          }
                        },
                        "id": 510,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "8561:27:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 511,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3892,
                      "src": "8561:31:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 513,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "8561:40:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "8537:64:2"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 504,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "8642:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 507,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "8665:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 504,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "8732:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 507,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "8755:13:2",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 515,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataAddr))\n    mstore(add(header, 32), mload(add(orderDataAddr, 32)))\n}",
                  "src": "8612:204:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 522,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 504,
                          "src": "8853:6:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 523,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 297,
                        "src": "8853:18:2",
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
                            "hexValue": "313630",
                            "id": 519,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "8844:3:2",
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
                            "expression": {
                              "argumentTypes": null,
                              "id": 516,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 504,
                              "src": "8817:6:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$304_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                              }
                            },
                            "id": 517,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "signatureLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 295,
                            "src": "8817:22:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 518,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3892,
                          "src": "8817:26:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 520,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "8817:31:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 521,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3892,
                      "src": "8817:35:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 524,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "8817:55:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 502,
                  "id": 525,
                  "nodeType": "Return",
                  "src": "8810:62:2"
                }
              ]
            },
            "documentation": null,
            "id": 527,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getZeroExOrderDataLength",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 499,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 496,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 527,
                  "src": "8383:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 495,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "8383:5:2",
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
                  "id": 498,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 527,
                  "src": "8409:15:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 497,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "8409:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8373:57:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 502,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 501,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 527,
                  "src": "8478:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 500,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "8478:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8477:9:2"
            },
            "scope": 558,
            "src": "8340:539:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 556,
              "nodeType": "Block",
              "src": "9003:233:2",
              "statements": [
                {
                  "assignments": [
                    537
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 537,
                      "name": "orderLength",
                      "nodeType": "VariableDeclaration",
                      "scope": 557,
                      "src": "9013:19:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 536,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "9013:7:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 542,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 539,
                        "name": "_ordersData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 529,
                        "src": "9060:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 540,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 531,
                        "src": "9073:7:2",
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
                        }
                      ],
                      "id": 538,
                      "name": "getZeroExOrderDataLength",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 527,
                      "src": "9035:24:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 541,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9035:46:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "9013:68:2"
                },
                {
                  "assignments": [
                    544
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 544,
                      "name": "orderBody",
                      "nodeType": "VariableDeclaration",
                      "scope": 557,
                      "src": "9092:22:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 543,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "9092:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 553,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 547,
                        "name": "_offset",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 531,
                        "src": "9148:7:2",
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
                            "id": 550,
                            "name": "orderLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 537,
                            "src": "9181:11:2",
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
                            "id": 548,
                            "name": "_offset",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 531,
                            "src": "9169:7:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 549,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3892,
                          "src": "9169:11:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 551,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "9169:24:2",
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
                        "id": 545,
                        "name": "_ordersData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 529,
                        "src": "9117:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 546,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3502,
                      "src": "9117:17:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 552,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9117:86:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "9092:111:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 554,
                    "name": "orderBody",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 544,
                    "src": "9220:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 535,
                  "id": 555,
                  "nodeType": "Return",
                  "src": "9213:16:2"
                }
              ]
            },
            "documentation": null,
            "id": 557,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceOrderBody",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 532,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 529,
                  "name": "_ordersData",
                  "nodeType": "VariableDeclaration",
                  "scope": 557,
                  "src": "8909:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 528,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "8909:5:2",
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
                  "id": 531,
                  "name": "_offset",
                  "nodeType": "VariableDeclaration",
                  "scope": 557,
                  "src": "8928:15:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 530,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "8928:7:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8908:36:2"
            },
            "payable": false,
            "returnParameters": {
              "id": 535,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 534,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 557,
                  "src": "8992:5:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 533,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "8992:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8991:7:2"
            },
            "scope": 558,
            "src": "8885:351:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 559,
        "src": "1125:8113:2"
      }
    ],
    "src": "597:8642:2"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.857Z"
}
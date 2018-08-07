export const ZeroExOrderDataHandler = 
{
  "contractName": "ZeroExOrderDataHandler",
  "abi": [],
  "bytecode": "0x605a602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a265627a7a7230582083e12c5a44b74edbefbfa8ab34cb88c132d1b77e7de5c7d3b3adeaffb6d23eef6c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a265627a7a7230582083e12c5a44b74edbefbfa8ab34cb88c132d1b77e7de5c7d3b3adeaffb6d23eef6c6578706572696d656e74616cf50037",
  "sourceMap": "1125:8197:2:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "1125:8197:2:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { IExchange as ZeroEx } from \"../../../external/0x/Exchange/interfaces/IExchange.sol\";\nimport { LibBytes } from \"../../../external/0x/LibBytes.sol\";\nimport { LibOrder } from \"../../../external/0x/Exchange/libs/LibOrder.sol\";\n\n\n/**\n * @title ZeroExOrderDataHandler\n * @author Set Protocol\n *\n * This library contains functions and structs to assist with parsing exchange orders data\n */\nlibrary ZeroExOrderDataHandler {\n    using SafeMath for uint256;\n    using LibBytes for bytes;\n\n    // ============ Constants ============\n\n    bytes4 constant ERC20_SELECTOR = bytes4(keccak256(\"ERC20Token(address)\"));\n\n    // ============ Structs ============\n\n    // We construct the following to allow calling fillOrder on ZeroEx V2 Exchange\n    // The layout of this orderData is in the table below.\n    // \n    // | Section | Data                  | Offset              | Length          | Contents                      |\n    // |---------|-----------------------|---------------------|-----------------|-------------------------------|\n    // | Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |\n    // |         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |\n    // |         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |\n    // |         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |\n    // |         | fillAmount            | 128                 | 32              | taker asset fill amouint      |\n    // | Body    | signature             | 160                 | signatureLength | signature in bytes            |\n    // |         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |\n\n    struct OrderHeader {\n        uint256 signatureLength;\n        uint256 orderLength;\n        uint256 makerAssetDataLength;\n        uint256 takerAssetDataLength;\n        uint256 fillAmount;\n    }\n\n    struct AssetDataAddresses {\n        address makerTokenAddress;\n        address takerTokenAddress;\n    }\n\n    // ============ Internal Functions ============\n\n    /**\n     * Parse token address from asset data\n     *\n     * @param _assetData   Encoded asset data\n     * @return Address of ERC20 asset address\n     */\n    function parseERC20TokenAddress(bytes _assetData)\n        internal\n        pure\n        returns(address)\n    {\n        // Ensure that the asset is ERC20\n        require(_assetData.readBytes4(0) == ERC20_SELECTOR);\n\n        // Return address\n        return address(_assetData.readBytes32(4));\n    }\n\n    /*\n     * Parses the header from order byte array\n     * Can only be called by authorized contracts.\n     *\n     * @param  _orderData    Byte array of order data  \n     * @return OrderHeader struct\n     */\n    function parseOrderHeader(bytes _orderData)\n        internal\n        pure\n        returns (OrderHeader)\n    {\n        OrderHeader memory header;\n\n        assembly {\n            mstore(header,          mload(add(_orderData, 32)))  // signatureLength\n            mstore(add(header, 32), mload(add(_orderData, 64)))  // orderLength\n            mstore(add(header, 64), mload(add(_orderData, 96)))  // makerAssetDataLength\n            mstore(add(header, 96), mload(add(_orderData, 128))) // takerAssetDataLength\n            mstore(add(header, 128), mload(add(_orderData, 160))) // fillAmmount\n        }\n\n        return header;\n    }\n\n    /*\n     * Parses the signature from order byte array\n     *\n     * @param  _signatureLength    Length of signature to slice from order data\n     * @param  _ordersData         Byte array of order data\n     * @return Byte array containing signature\n     */\n    function parseSignature(\n        uint256 _signatureLength,\n        bytes _orderData\n    )\n        internal\n        pure\n        returns (bytes)\n    {\n        bytes memory signature = _orderData.slice(160, _signatureLength.add(160));\n        return signature;\n    }\n\n    /*\n     * Parses the bytes array into ZeroEx order\n     *\n     * @param  _orderData    Byte array of order data\n     * @return LibOrder.Order (0x order) struct\n     */\n    function parseZeroExOrder(bytes _orderData)\n        internal\n        pure\n        returns(LibOrder.Order memory)\n    {\n        OrderHeader memory header = parseOrderHeader(_orderData);\n\n        LibOrder.Order memory order = constructZeroExOrder(\n            sliceZeroExOrder(\n                _orderData,\n                header.signatureLength,\n                header.orderLength\n            ),\n            header.makerAssetDataLength,\n            header.takerAssetDataLength\n        );\n\n        return order;\n    }\n\n    // ============ WIP Functions ============\n\n    // Remove and put me into parseZeroExOrder\n    function sliceZeroExOrder(\n        bytes _orderData,\n        uint _signatureLength,\n        uint _orderLength\n    )\n        internal\n        pure\n        returns (bytes memory)\n    {\n        // 160 is the signature start length. The order starts with sig length\n        uint256 orderStartAddress = _signatureLength.add(160);\n\n        bytes memory order = _orderData.slice(\n            orderStartAddress,\n            orderStartAddress.add(_orderLength)\n        );\n        return order;\n    }\n\n    // | Data                       | Location |\n    // |----------------------------|----------|\n    // | maker                      | 0        |\n    // | taker                      | 32       |\n    // | feeRecipient               | 64       |\n    // | senderAddress              | 96       |\n    // | makerAssetAmount           | 128      |\n    // | takerAssetAmount           | 160      |\n    // | makerFee                   | 192      |\n    // | takerFee                   | 224      |\n    // | expirationUnixTimeStampSec | 256      |\n    // | salt                       | 288      |\n    // | makerAssetData             | 320      |\n    // | takerAssetData             | 320      |\n\n    // Remove and put me into parseZeroExOrder\n    function constructZeroExOrder(\n        bytes _zeroExOrder,\n        uint _makerAssetDataLength,\n        uint _takerAssetDataLength\n    )\n        internal\n        pure\n        returns (LibOrder.Order memory)\n    {\n        LibOrder.Order memory order;\n        uint256 orderDataAddr = _zeroExOrder.contentAddress();\n\n        assembly {\n            mstore(order,           mload(orderDataAddr))           // maker\n            mstore(add(order, 32),  mload(add(orderDataAddr, 32)))  // taker\n            mstore(add(order, 64),  mload(add(orderDataAddr, 64)))  // feeRecipient\n            mstore(add(order, 96),  mload(add(orderDataAddr, 96)))  // senderAddress\n            mstore(add(order, 128), mload(add(orderDataAddr, 128))) // makerAssetAmount\n            mstore(add(order, 160), mload(add(orderDataAddr, 160))) // takerAssetAmount\n            mstore(add(order, 192), mload(add(orderDataAddr, 192))) // makerFee\n            mstore(add(order, 224), mload(add(orderDataAddr, 224))) // takerFee\n            mstore(add(order, 256), mload(add(orderDataAddr, 256))) // expirationUnixTimestampSec\n            mstore(add(order, 288), mload(add(orderDataAddr, 288))) // salt\n        }\n\n        order.makerAssetData = _zeroExOrder.slice(320, _makerAssetDataLength.add(320));\n        order.takerAssetData = _zeroExOrder.slice(_makerAssetDataLength.add(320), _makerAssetDataLength.add(320).add(_takerAssetDataLength));\n\n        return order;       \n    }\n\n    // Figure out effective way to put this inside sliceOrderBody once ZeroExExchangeWrapper specs are in\n    // function getZeroExOrderDataLength(\n    //     bytes _orderData,\n    //     uint256 _offset\n    // )\n    //     internal\n    //     pure\n    //     returns (uint256)\n    // {\n    //     OrderHeader memory header;\n\n    //     uint256 orderDataAddr = _orderData.contentAddress().add(_offset);\n\n    //     assembly {\n    //         mstore(header,          mload(orderDataAddr))          // signatureLength\n    //         mstore(add(header, 32), mload(add(orderDataAddr, 32))) // orderLength\n    //     }\n\n    //     return header.signatureLength.add(160).add(header.orderLength);\n    // }\n\n    // function sliceOrderBody(bytes _ordersData, uint256 _offset)\n    //     internal\n    //     pure\n    //     returns (bytes)\n    // {\n    //     uint256 orderLength = getZeroExOrderDataLength(_ordersData, _offset);\n\n    //     bytes memory orderBody = _ordersData.slice(\n    //         _offset,\n    //         _offset.add(orderLength)\n    //     );\n    //     return orderBody;\n    // }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        441
      ]
    },
    "id": 442,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 217,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:2"
      },
      {
        "id": 218,
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
        "id": 220,
        "nodeType": "ImportDirective",
        "scope": 442,
        "sourceUnit": 3619,
        "src": "658:73:2",
        "symbolAliases": [
          {
            "foreign": 219,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 222,
        "nodeType": "ImportDirective",
        "scope": 442,
        "sourceUnit": 2743,
        "src": "732:93:2",
        "symbolAliases": [
          {
            "foreign": 221,
            "local": "ZeroEx"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 224,
        "nodeType": "ImportDirective",
        "scope": 442,
        "sourceUnit": 3229,
        "src": "826:61:2",
        "symbolAliases": [
          {
            "foreign": 223,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 226,
        "nodeType": "ImportDirective",
        "scope": 442,
        "sourceUnit": 3080,
        "src": "888:75:2",
        "symbolAliases": [
          {
            "foreign": 225,
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
        "id": 441,
        "linearizedBaseContracts": [
          441
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 229,
            "libraryName": {
              "contractScope": null,
              "id": 227,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3618,
              "src": "1168:8:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$3618",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1162:27:2",
            "typeName": {
              "id": 228,
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
            "id": 232,
            "libraryName": {
              "contractScope": null,
              "id": 230,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3228,
              "src": "1200:8:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$3228",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1194:25:2",
            "typeName": {
              "id": 231,
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
            "id": 239,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 441,
            "src": "1269:73:2",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 233,
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
                      "id": 236,
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
                    "id": 235,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3713,
                    "src": "1309:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 237,
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
                "id": 234,
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
              "id": 238,
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
            "id": 250,
            "members": [
              {
                "constant": false,
                "id": 241,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 250,
                "src": "2606:23:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 240,
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
                "id": 243,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 250,
                "src": "2639:19:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 242,
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
                "id": 245,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 250,
                "src": "2668:28:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 244,
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
                "id": 247,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 250,
                "src": "2706:28:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 246,
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
                "id": 249,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 250,
                "src": "2744:18:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 248,
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
            "scope": 441,
            "src": "2577:192:2",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 255,
            "members": [
              {
                "constant": false,
                "id": 252,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 255,
                "src": "2811:25:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 251,
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
                "id": 254,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 255,
                "src": "2846:25:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 253,
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
            "scope": 441,
            "src": "2775:103:2",
            "visibility": "public"
          },
          {
            "body": {
              "id": 278,
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
                        "id": 268,
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
                              "id": 265,
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
                              "id": 263,
                              "name": "_assetData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 257,
                              "src": "3264:10:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 264,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "readBytes4",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3118,
                            "src": "3264:21:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
                            }
                          },
                          "id": 266,
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
                          "id": 267,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 239,
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
                      "id": 262,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3722,
                        3723
                      ],
                      "referencedDeclaration": 3722,
                      "src": "3256:7:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 269,
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
                  "id": 270,
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
                            "id": 274,
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
                            "id": 272,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 257,
                            "src": "3359:10:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 273,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3145,
                          "src": "3359:22:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 275,
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
                      "id": 271,
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
                    "id": 276,
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
                  "functionReturnParameters": 261,
                  "id": 277,
                  "nodeType": "Return",
                  "src": "3344:41:2"
                }
              ]
            },
            "documentation": "Parse token address from asset data\n     * @param _assetData   Encoded asset data\n@return Address of ERC20 asset address",
            "id": 279,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 258,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 257,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 279,
                  "src": "3127:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 256,
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
              "id": 261,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 260,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 279,
                  "src": "3191:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 259,
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
            "scope": 441,
            "src": "3095:297:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 292,
              "nodeType": "Block",
              "src": "3716:519:2",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 287,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 293,
                      "src": "3726:25:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 286,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 250,
                        "src": "3726:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$250_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 288,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3726:25:2"
                },
                {
                  "externalReferences": [
                    {
                      "_orderData": {
                        "declaration": 281,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3819:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 287,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3792:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 287,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3880:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 281,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3903:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 287,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3960:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 281,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3983:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 287,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4049:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 281,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4072:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 287,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4138:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 281,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4162:10:2",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 289,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(add(_orderData, 32)))\n    mstore(add(header, 32), mload(add(_orderData, 64)))\n    mstore(add(header, 64), mload(add(_orderData, 96)))\n    mstore(add(header, 96), mload(add(_orderData, 128)))\n    mstore(add(header, 128), mload(add(_orderData, 160)))\n}",
                  "src": "3762:459:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 290,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 287,
                    "src": "4222:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "functionReturnParameters": 285,
                  "id": 291,
                  "nodeType": "Return",
                  "src": "4215:13:2"
                }
              ]
            },
            "documentation": null,
            "id": 293,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 282,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 281,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 293,
                  "src": "3634:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 280,
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
              "id": 285,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 284,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 293,
                  "src": "3699:11:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 283,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 250,
                    "src": "3699:11:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$250_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3698:13:2"
            },
            "scope": 441,
            "src": "3608:627:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 315,
              "nodeType": "Block",
              "src": "4648:116:2",
              "statements": [
                {
                  "assignments": [
                    303
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 303,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 316,
                      "src": "4658:22:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 302,
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
                  "id": 312,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 306,
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
                            "id": 309,
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
                            "id": 307,
                            "name": "_signatureLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 295,
                            "src": "4705:16:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 308,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3617,
                          "src": "4705:20:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 310,
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
                        "id": 304,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 297,
                        "src": "4683:10:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 305,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3227,
                      "src": "4683:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 311,
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
                    "id": 313,
                    "name": "signature",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 303,
                    "src": "4748:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 301,
                  "id": 314,
                  "nodeType": "Return",
                  "src": "4741:16:2"
                }
              ]
            },
            "documentation": null,
            "id": 316,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 298,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 295,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 316,
                  "src": "4533:24:2",
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
                  "id": 297,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 316,
                  "src": "4567:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 296,
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
              "id": 301,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 300,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 316,
                  "src": "4637:5:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 299,
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
            "scope": 441,
            "src": "4500:264:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 349,
              "nodeType": "Block",
              "src": "5059:397:2",
              "statements": [
                {
                  "assignments": [
                    324
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 324,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 350,
                      "src": "5069:25:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 323,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 250,
                        "src": "5069:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$250_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 328,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 326,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 318,
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
                      "id": 325,
                      "name": "parseOrderHeader",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 293,
                      "src": "5097:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_OrderHeader_$250_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct ZeroExOrderDataHandler.OrderHeader memory)"
                      }
                    },
                    "id": 327,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5097:28:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5069:56:2"
                },
                {
                  "assignments": [
                    332
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 332,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 350,
                      "src": "5136:27:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 331,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3071,
                        "src": "5136:14:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 346,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 335,
                            "name": "_orderData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 318,
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
                              "id": 336,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 324,
                              "src": "5262:6:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                              }
                            },
                            "id": 337,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "signatureLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 241,
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
                              "id": 338,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 324,
                              "src": "5302:6:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                              }
                            },
                            "id": 339,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 243,
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
                          "id": 334,
                          "name": "sliceZeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 382,
                          "src": "5200:16:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                          }
                        },
                        "id": 340,
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
                          "id": 341,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 324,
                          "src": "5348:6:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 342,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 245,
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
                          "id": 343,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 324,
                          "src": "5389:6:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 344,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 247,
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
                      "id": 333,
                      "name": "constructZeroExOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 440,
                      "src": "5166:20:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_struct$_Order_$3071_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 345,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5166:260:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5136:290:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 347,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 332,
                    "src": "5444:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 322,
                  "id": 348,
                  "nodeType": "Return",
                  "src": "5437:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 350,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 319,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 318,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 350,
                  "src": "4968:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 317,
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
              "id": 322,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 321,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 350,
                  "src": "5032:14:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 320,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3071,
                    "src": "5032:14:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5031:23:2"
            },
            "scope": 441,
            "src": "4942:514:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 381,
              "nodeType": "Block",
              "src": "5738:309:2",
              "statements": [
                {
                  "assignments": [
                    362
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 362,
                      "name": "orderStartAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 382,
                      "src": "5827:25:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 361,
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
                  "id": 367,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 365,
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
                        "id": 363,
                        "name": "_signatureLength",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 354,
                        "src": "5855:16:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 364,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3617,
                      "src": "5855:20:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 366,
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
                    369
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 369,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 382,
                      "src": "5891:18:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 368,
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
                  "id": 378,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 372,
                        "name": "orderStartAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 362,
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
                            "id": 375,
                            "name": "_orderLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 356,
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
                            "id": 373,
                            "name": "orderStartAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 362,
                            "src": "5973:17:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 374,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3617,
                          "src": "5973:21:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 376,
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
                        "id": 370,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 352,
                        "src": "5912:10:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 371,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3227,
                      "src": "5912:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 377,
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
                    "id": 379,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 369,
                    "src": "6035:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 360,
                  "id": 380,
                  "nodeType": "Return",
                  "src": "6028:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 382,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 357,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 352,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 382,
                  "src": "5592:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 351,
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
                  "id": 354,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 382,
                  "src": "5618:21:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 353,
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
                  "id": 356,
                  "name": "_orderLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 382,
                  "src": "5649:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 355,
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
              "id": 360,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 359,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 382,
                  "src": "5720:5:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 358,
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
            "scope": 441,
            "src": "5557:490:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 439,
              "nodeType": "Block",
              "src": "6997:1231:2",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 396,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 440,
                      "src": "7007:27:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 395,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3071,
                        "src": "7007:14:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 397,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7007:27:2"
                },
                {
                  "assignments": [
                    399
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 399,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 440,
                      "src": "7044:21:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 398,
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
                  "id": 403,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 400,
                        "name": "_zeroExOrder",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 384,
                        "src": "7068:12:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 401,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3095,
                      "src": "7068:27:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 402,
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
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7138:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7161:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7219:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7242:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7296:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7319:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7641:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7380:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7465:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7403:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7553:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7576:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7488:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7899:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7922:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7721:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7664:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7801:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7744:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7824:13:2",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 404,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataAddr))\n    mstore(add(order, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(order, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(order, 96), mload(add(orderDataAddr, 96)))\n    mstore(add(order, 128), mload(add(orderDataAddr, 128)))\n    mstore(add(order, 160), mload(add(orderDataAddr, 160)))\n    mstore(add(order, 192), mload(add(orderDataAddr, 192)))\n    mstore(add(order, 224), mload(add(orderDataAddr, 224)))\n    mstore(add(order, 256), mload(add(orderDataAddr, 256)))\n    mstore(add(order, 288), mload(add(orderDataAddr, 288)))\n}",
                  "src": "7108:868:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 416,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 405,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 396,
                        "src": "7971:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 407,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3068,
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
                          "id": 410,
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
                              "id": 413,
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
                              "id": 411,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 386,
                              "src": "8018:21:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 412,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3617,
                            "src": "8018:25:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 414,
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
                          "id": 408,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 384,
                          "src": "7994:12:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 409,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3227,
                        "src": "7994:18:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 415,
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
                  "id": 417,
                  "nodeType": "ExpressionStatement",
                  "src": "7971:78:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 435,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 418,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 396,
                        "src": "8059:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 420,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3070,
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
                              "id": 425,
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
                              "id": 423,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 386,
                              "src": "8101:21:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 424,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3617,
                            "src": "8101:25:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 426,
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
                              "id": 432,
                              "name": "_takerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 388,
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
                                  "id": 429,
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
                                  "id": 427,
                                  "name": "_makerAssetDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 386,
                                  "src": "8133:21:2",
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
                                "referencedDeclaration": 3617,
                                "src": "8133:25:2",
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
                              "src": "8133:30:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 431,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3617,
                            "src": "8133:34:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 433,
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
                          "id": 421,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 384,
                          "src": "8082:12:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 422,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3227,
                        "src": "8082:18:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 434,
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
                  "id": 436,
                  "nodeType": "ExpressionStatement",
                  "src": "8059:132:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 437,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 396,
                    "src": "8209:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 392,
                  "id": 438,
                  "nodeType": "Return",
                  "src": "8202:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 440,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "constructZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 389,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 384,
                  "name": "_zeroExOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 440,
                  "src": "6826:18:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 383,
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
                  "id": 386,
                  "name": "_makerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 440,
                  "src": "6854:26:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 385,
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
                  "id": 388,
                  "name": "_takerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 440,
                  "src": "6890:26:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 387,
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
              "id": 392,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 391,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 440,
                  "src": "6970:14:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 390,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3071,
                    "src": "6970:14:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6969:23:2"
            },
            "scope": 441,
            "src": "6787:1441:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 442,
        "src": "1125:8197:2"
      }
    ],
    "src": "597:8726:2"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/exchange-wrappers/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        441
      ]
    },
    "id": 442,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 217,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:2"
      },
      {
        "id": 218,
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
        "id": 220,
        "nodeType": "ImportDirective",
        "scope": 442,
        "sourceUnit": 3619,
        "src": "658:73:2",
        "symbolAliases": [
          {
            "foreign": 219,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
        "file": "../../../external/0x/Exchange/interfaces/IExchange.sol",
        "id": 222,
        "nodeType": "ImportDirective",
        "scope": 442,
        "sourceUnit": 2743,
        "src": "732:93:2",
        "symbolAliases": [
          {
            "foreign": 221,
            "local": "ZeroEx"
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../../external/0x/LibBytes.sol",
        "id": 224,
        "nodeType": "ImportDirective",
        "scope": 442,
        "sourceUnit": 3229,
        "src": "826:61:2",
        "symbolAliases": [
          {
            "foreign": 223,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
        "file": "../../../external/0x/Exchange/libs/LibOrder.sol",
        "id": 226,
        "nodeType": "ImportDirective",
        "scope": 442,
        "sourceUnit": 3080,
        "src": "888:75:2",
        "symbolAliases": [
          {
            "foreign": 225,
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
        "id": 441,
        "linearizedBaseContracts": [
          441
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 229,
            "libraryName": {
              "contractScope": null,
              "id": 227,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3618,
              "src": "1168:8:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$3618",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1162:27:2",
            "typeName": {
              "id": 228,
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
            "id": 232,
            "libraryName": {
              "contractScope": null,
              "id": 230,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3228,
              "src": "1200:8:2",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$3228",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1194:25:2",
            "typeName": {
              "id": 231,
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
            "id": 239,
            "name": "ERC20_SELECTOR",
            "nodeType": "VariableDeclaration",
            "scope": 441,
            "src": "1269:73:2",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes4",
              "typeString": "bytes4"
            },
            "typeName": {
              "id": 233,
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
                      "id": 236,
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
                    "id": 235,
                    "name": "keccak256",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 3713,
                    "src": "1309:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                      "typeString": "function () pure returns (bytes32)"
                    }
                  },
                  "id": 237,
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
                "id": 234,
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
              "id": 238,
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
            "id": 250,
            "members": [
              {
                "constant": false,
                "id": 241,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 250,
                "src": "2606:23:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 240,
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
                "id": 243,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 250,
                "src": "2639:19:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 242,
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
                "id": 245,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 250,
                "src": "2668:28:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 244,
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
                "id": 247,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 250,
                "src": "2706:28:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 246,
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
                "id": 249,
                "name": "fillAmount",
                "nodeType": "VariableDeclaration",
                "scope": 250,
                "src": "2744:18:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 248,
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
            "scope": 441,
            "src": "2577:192:2",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.AssetDataAddresses",
            "id": 255,
            "members": [
              {
                "constant": false,
                "id": 252,
                "name": "makerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 255,
                "src": "2811:25:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 251,
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
                "id": 254,
                "name": "takerTokenAddress",
                "nodeType": "VariableDeclaration",
                "scope": 255,
                "src": "2846:25:2",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 253,
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
            "scope": 441,
            "src": "2775:103:2",
            "visibility": "public"
          },
          {
            "body": {
              "id": 278,
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
                        "id": 268,
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
                              "id": 265,
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
                              "id": 263,
                              "name": "_assetData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 257,
                              "src": "3264:10:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            "id": 264,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "readBytes4",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3118,
                            "src": "3264:21:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes4_$bound_to$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256) pure returns (bytes4)"
                            }
                          },
                          "id": 266,
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
                          "id": 267,
                          "name": "ERC20_SELECTOR",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 239,
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
                      "id": 262,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3722,
                        3723
                      ],
                      "referencedDeclaration": 3722,
                      "src": "3256:7:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 269,
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
                  "id": 270,
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
                            "id": 274,
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
                            "id": 272,
                            "name": "_assetData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 257,
                            "src": "3359:10:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          "id": 273,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "readBytes32",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3145,
                          "src": "3359:22:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$returns$_t_bytes32_$bound_to$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256) pure returns (bytes32)"
                          }
                        },
                        "id": 275,
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
                      "id": 271,
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
                    "id": 276,
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
                  "functionReturnParameters": 261,
                  "id": 277,
                  "nodeType": "Return",
                  "src": "3344:41:2"
                }
              ]
            },
            "documentation": "Parse token address from asset data\n     * @param _assetData   Encoded asset data\n@return Address of ERC20 asset address",
            "id": 279,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseERC20TokenAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 258,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 257,
                  "name": "_assetData",
                  "nodeType": "VariableDeclaration",
                  "scope": 279,
                  "src": "3127:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 256,
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
              "id": 261,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 260,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 279,
                  "src": "3191:7:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 259,
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
            "scope": 441,
            "src": "3095:297:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 292,
              "nodeType": "Block",
              "src": "3716:519:2",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 287,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 293,
                      "src": "3726:25:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 286,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 250,
                        "src": "3726:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$250_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 288,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3726:25:2"
                },
                {
                  "externalReferences": [
                    {
                      "_orderData": {
                        "declaration": 281,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3819:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 287,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3792:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 287,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3880:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 281,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3903:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 287,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3960:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 281,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "3983:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 287,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4049:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 281,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4072:10:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 287,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4138:6:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "_orderData": {
                        "declaration": 281,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4162:10:2",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 289,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(add(_orderData, 32)))\n    mstore(add(header, 32), mload(add(_orderData, 64)))\n    mstore(add(header, 64), mload(add(_orderData, 96)))\n    mstore(add(header, 96), mload(add(_orderData, 128)))\n    mstore(add(header, 128), mload(add(_orderData, 160)))\n}",
                  "src": "3762:459:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 290,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 287,
                    "src": "4222:6:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "functionReturnParameters": 285,
                  "id": 291,
                  "nodeType": "Return",
                  "src": "4215:13:2"
                }
              ]
            },
            "documentation": null,
            "id": 293,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 282,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 281,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 293,
                  "src": "3634:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 280,
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
              "id": 285,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 284,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 293,
                  "src": "3699:11:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 283,
                    "name": "OrderHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 250,
                    "src": "3699:11:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$250_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3698:13:2"
            },
            "scope": 441,
            "src": "3608:627:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 315,
              "nodeType": "Block",
              "src": "4648:116:2",
              "statements": [
                {
                  "assignments": [
                    303
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 303,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 316,
                      "src": "4658:22:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 302,
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
                  "id": 312,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 306,
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
                            "id": 309,
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
                            "id": 307,
                            "name": "_signatureLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 295,
                            "src": "4705:16:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 308,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3617,
                          "src": "4705:20:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 310,
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
                        "id": 304,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 297,
                        "src": "4683:10:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 305,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3227,
                      "src": "4683:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 311,
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
                    "id": 313,
                    "name": "signature",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 303,
                    "src": "4748:9:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 301,
                  "id": 314,
                  "nodeType": "Return",
                  "src": "4741:16:2"
                }
              ]
            },
            "documentation": null,
            "id": 316,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 298,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 295,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 316,
                  "src": "4533:24:2",
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
                  "id": 297,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 316,
                  "src": "4567:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 296,
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
              "id": 301,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 300,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 316,
                  "src": "4637:5:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 299,
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
            "scope": 441,
            "src": "4500:264:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 349,
              "nodeType": "Block",
              "src": "5059:397:2",
              "statements": [
                {
                  "assignments": [
                    324
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 324,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 350,
                      "src": "5069:25:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 323,
                        "name": "OrderHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 250,
                        "src": "5069:11:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_OrderHeader_$250_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.OrderHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 328,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 326,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 318,
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
                      "id": 325,
                      "name": "parseOrderHeader",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 293,
                      "src": "5097:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_OrderHeader_$250_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct ZeroExOrderDataHandler.OrderHeader memory)"
                      }
                    },
                    "id": 327,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5097:28:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5069:56:2"
                },
                {
                  "assignments": [
                    332
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 332,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 350,
                      "src": "5136:27:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 331,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3071,
                        "src": "5136:14:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 346,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 335,
                            "name": "_orderData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 318,
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
                              "id": 336,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 324,
                              "src": "5262:6:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                              }
                            },
                            "id": 337,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "signatureLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 241,
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
                              "id": 338,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 324,
                              "src": "5302:6:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                              }
                            },
                            "id": 339,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 243,
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
                          "id": 334,
                          "name": "sliceZeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 382,
                          "src": "5200:16:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                          }
                        },
                        "id": 340,
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
                          "id": 341,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 324,
                          "src": "5348:6:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 342,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 245,
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
                          "id": 343,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 324,
                          "src": "5389:6:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$250_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.OrderHeader memory"
                          }
                        },
                        "id": 344,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 247,
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
                      "id": 333,
                      "name": "constructZeroExOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 440,
                      "src": "5166:20:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_struct$_Order_$3071_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (struct LibOrder.Order memory)"
                      }
                    },
                    "id": 345,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5166:260:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5136:290:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 347,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 332,
                    "src": "5444:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 322,
                  "id": 348,
                  "nodeType": "Return",
                  "src": "5437:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 350,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 319,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 318,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 350,
                  "src": "4968:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 317,
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
              "id": 322,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 321,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 350,
                  "src": "5032:14:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 320,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3071,
                    "src": "5032:14:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5031:23:2"
            },
            "scope": 441,
            "src": "4942:514:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 381,
              "nodeType": "Block",
              "src": "5738:309:2",
              "statements": [
                {
                  "assignments": [
                    362
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 362,
                      "name": "orderStartAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 382,
                      "src": "5827:25:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 361,
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
                  "id": 367,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 365,
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
                        "id": 363,
                        "name": "_signatureLength",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 354,
                        "src": "5855:16:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 364,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3617,
                      "src": "5855:20:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 366,
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
                    369
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 369,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 382,
                      "src": "5891:18:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 368,
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
                  "id": 378,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 372,
                        "name": "orderStartAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 362,
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
                            "id": 375,
                            "name": "_orderLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 356,
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
                            "id": 373,
                            "name": "orderStartAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 362,
                            "src": "5973:17:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 374,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3617,
                          "src": "5973:21:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 376,
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
                        "id": 370,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 352,
                        "src": "5912:10:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 371,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3227,
                      "src": "5912:16:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 377,
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
                    "id": 379,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 369,
                    "src": "6035:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 360,
                  "id": 380,
                  "nodeType": "Return",
                  "src": "6028:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 382,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 357,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 352,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 382,
                  "src": "5592:16:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 351,
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
                  "id": 354,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 382,
                  "src": "5618:21:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 353,
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
                  "id": 356,
                  "name": "_orderLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 382,
                  "src": "5649:17:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 355,
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
              "id": 360,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 359,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 382,
                  "src": "5720:5:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 358,
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
            "scope": 441,
            "src": "5557:490:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 439,
              "nodeType": "Block",
              "src": "6997:1231:2",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 396,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 440,
                      "src": "7007:27:2",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                        "typeString": "struct LibOrder.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 395,
                        "name": "LibOrder.Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3071,
                        "src": "7007:14:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_storage_ptr",
                          "typeString": "struct LibOrder.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 397,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7007:27:2"
                },
                {
                  "assignments": [
                    399
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 399,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 440,
                      "src": "7044:21:2",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 398,
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
                  "id": 403,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 400,
                        "name": "_zeroExOrder",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 384,
                        "src": "7068:12:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 401,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3095,
                      "src": "7068:27:2",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 402,
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
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7138:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7161:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7219:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7242:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7296:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7319:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7641:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7380:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7465:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7403:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7553:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7576:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7488:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7899:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7922:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7721:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7664:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 396,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7801:5:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7744:13:2",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 399,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7824:13:2",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 404,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataAddr))\n    mstore(add(order, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(order, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(order, 96), mload(add(orderDataAddr, 96)))\n    mstore(add(order, 128), mload(add(orderDataAddr, 128)))\n    mstore(add(order, 160), mload(add(orderDataAddr, 160)))\n    mstore(add(order, 192), mload(add(orderDataAddr, 192)))\n    mstore(add(order, 224), mload(add(orderDataAddr, 224)))\n    mstore(add(order, 256), mload(add(orderDataAddr, 256)))\n    mstore(add(order, 288), mload(add(orderDataAddr, 288)))\n}",
                  "src": "7108:868:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 416,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 405,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 396,
                        "src": "7971:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 407,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3068,
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
                          "id": 410,
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
                              "id": 413,
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
                              "id": 411,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 386,
                              "src": "8018:21:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 412,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3617,
                            "src": "8018:25:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 414,
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
                          "id": 408,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 384,
                          "src": "7994:12:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 409,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3227,
                        "src": "7994:18:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 415,
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
                  "id": 417,
                  "nodeType": "ExpressionStatement",
                  "src": "7971:78:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 435,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 418,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 396,
                        "src": "8059:5:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                          "typeString": "struct LibOrder.Order memory"
                        }
                      },
                      "id": 420,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3070,
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
                              "id": 425,
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
                              "id": 423,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 386,
                              "src": "8101:21:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 424,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3617,
                            "src": "8101:25:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 426,
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
                              "id": 432,
                              "name": "_takerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 388,
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
                                  "id": 429,
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
                                  "id": 427,
                                  "name": "_makerAssetDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 386,
                                  "src": "8133:21:2",
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
                                "referencedDeclaration": 3617,
                                "src": "8133:25:2",
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
                              "src": "8133:30:2",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 431,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3617,
                            "src": "8133:34:2",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 433,
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
                          "id": 421,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 384,
                          "src": "8082:12:2",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 422,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3227,
                        "src": "8082:18:2",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 434,
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
                  "id": 436,
                  "nodeType": "ExpressionStatement",
                  "src": "8059:132:2"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 437,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 396,
                    "src": "8209:5:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                      "typeString": "struct LibOrder.Order memory"
                    }
                  },
                  "functionReturnParameters": 392,
                  "id": 438,
                  "nodeType": "Return",
                  "src": "8202:12:2"
                }
              ]
            },
            "documentation": null,
            "id": 440,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "constructZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 389,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 384,
                  "name": "_zeroExOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 440,
                  "src": "6826:18:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 383,
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
                  "id": 386,
                  "name": "_makerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 440,
                  "src": "6854:26:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 385,
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
                  "id": 388,
                  "name": "_takerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 440,
                  "src": "6890:26:2",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 387,
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
              "id": 392,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 391,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 440,
                  "src": "6970:14:2",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$3071_memory_ptr",
                    "typeString": "struct LibOrder.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 390,
                    "name": "LibOrder.Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3071,
                    "src": "6970:14:2",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$3071_storage_ptr",
                      "typeString": "struct LibOrder.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6969:23:2"
            },
            "scope": 441,
            "src": "6787:1441:2",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 442,
        "src": "1125:8197:2"
      }
    ],
    "src": "597:8726:2"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T02:05:30.471Z"
}
export const ZeroExOrderDataHandler = 
{
  "contractName": "ZeroExOrderDataHandler",
  "abi": [],
  "bytecode": "0x605a602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a265627a7a72305820813a43b32ba1377f9205b041ad4f4b0e8254867e61bca27a0d1a700a6682e6bf6c6578706572696d656e74616cf50037",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600080fd00a265627a7a72305820813a43b32ba1377f9205b041ad4f4b0e8254867e61bca27a0d1a700a6682e6bf6c6578706572696d656e74616cf50037",
  "sourceMap": "952:7273:13:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "952:7273:13:-;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { LibBytes } from \"../../../external/LibBytes.sol\";\n\n\n/**\n * @title ZeroExOrderDataHandler\n * @author Set Protocol\n *\n * This library contains functions and structs to assist with parsing exchange orders data\n */\nlibrary ZeroExOrderDataHandler {\n    using SafeMath for uint256;\n    using LibBytes for bytes;\n\n    // ============ Structs ============\n\n    struct Order {\n        address makerAddress;           // Address that created the order.\n        address takerAddress;           // Address that is allowed to fill the order.\n        address feeRecipientAddress;    // Address that will recieve fees when order is filled.\n        address senderAddress;          // Address that is allowed to call Exchange contract.\n        uint256 makerAssetAmount;       // Amount of makerAsset being offered by maker.\n        uint256 takerAssetAmount;       // Amount of takerAsset being bid on by maker.\n        uint256 makerFee;               // Amount of ZRX paid to feeRecipient by maker\n        uint256 takerFee;               // Amount of ZRX paid to feeRecipient by taker\n        uint256 expirationTimeSeconds;  // Timestamp in seconds at which order expires.\n        uint256 salt;                   // Number to facilitate uniqueness of the order's hash.\n        bytes makerAssetData;           // Encoded data when transferring makerAsset.\n        bytes takerAssetData;           // Encoded data when transferring takerAsset.\n    }\n\n    struct ZeroExHeader {\n        uint256 signatureLength;\n        uint256 orderLength;\n        uint256 makerAssetDataLength;\n        uint256 takerAssetDataLength;\n    }\n\n    // ============ Internal Functions ============\n\n    // We construct the following to allow calling fillOrder on ZeroEx V2 Exchange\n    // The layout of this orderData is in the table below.\n    // \n    // | Section | Data                  | Offset              | Length          | Contents                      |\n    // |---------|-----------------------|---------------------|-----------------|-------------------------------|\n    // | Header  | signatureLength       | 0                   | 32              | Num Bytes of 0x Signature     |\n    // |         | orderLength           | 32                  | 32              | Num Bytes of 0x Order         |\n    // |         | makerAssetDataLength  | 64                  | 32              | Num Bytes of maker asset data |\n    // |         | takerAssetDataLength  | 96                  | 32              | Num Bytes of taker asset data |\n    // | Body    | fillAmount            | 128                 | 32              | taker asset fill amouint      |\n    // |         | signature             | 160                 | signatureLength | signature in bytes            |\n    // |         | order                 | 160+signatureLength | orderLength     | ZeroEx Order                  |\n\n    /*\n     * Parses the header of the orderData\n     * Can only be called by authorized contracts.\n     *\n     * @param  _orderData   \n     * @return ZeroExHeader\n     */\n    function parseOrderHeader(bytes _orderData)\n        internal\n        pure\n        returns (ZeroExHeader)\n    {\n        ZeroExHeader memory header;\n\n        uint256 orderDataAddr = _orderData.contentAddress();\n\n        assembly {\n            mstore(header,          mload(orderDataAddr)) // signatureLength\n            mstore(add(header, 32), mload(add(orderDataAddr, 32))) // orderLength\n            mstore(add(header, 64), mload(add(orderDataAddr, 64))) // makerAssetDataLength\n            mstore(add(header, 96), mload(add(orderDataAddr, 96))) // takerAssetDataLength\n        }\n\n        return header;\n    }\n\n    function parseFillAmount(bytes _orderData)\n        internal\n        pure\n        returns (uint256)\n    {\n        uint256 orderDataAddr = _orderData.contentAddress();\n        uint256 fillAmount;\n\n        assembly {\n            fillAmount := mload(add(orderDataAddr, 128))\n        }\n\n        return fillAmount;\n    }\n\n    function sliceSignature(bytes _orderData, uint _signatureLength)\n        internal\n        pure\n        returns (bytes)\n    {\n        bytes memory signature = _orderData.slice(160, _signatureLength.add(160));\n        return signature;\n    }\n\n    function sliceZeroExOrder(bytes _orderData, uint _signatureLength, uint _orderLength)\n        internal\n        pure\n        returns (bytes)\n    {\n        uint256 orderDataAddr = _orderData.contentAddress();\n        uint256 orderStartAddress = orderDataAddr.add(_signatureLength);\n        bytes memory order = _orderData.slice(\n            orderStartAddress,\n            orderStartAddress.add(_orderLength)\n        );\n        return order;\n    }\n\n    function parseZeroExOrder(\n        bytes _zeroExOrder,\n        uint _makerAssetDataLength,\n        uint _takerAssetDataLength\n    )\n        internal\n        pure\n        returns (Order memory)\n    {\n        Order memory order;\n        uint256 orderDataAddr = _zeroExOrder.contentAddress();\n\n        // | Data                       | Location | Length |\n        // |----------------------------|----------|--------|\n        // | maker                      | 0        |        |\n        // | taker                      | 32       |        |\n        // | feeRecipient               | 64       |        |\n        // | senderAddress              | 96       |        |\n        // | makerAssetAmount           | 128      |        |\n        // | takerAssetAmount           | 160      |        |\n        // | makerFee                   | 192      |        |\n        // | takerFee                   | 224      |        |\n        // | expirationUnixTimeStampSec | 256      |        |\n        // | salt                       | 288      |        |\n        // | makerAssetData             | 320      | **     |\n        // | takerAssetData             | 320 + ** | ***    |\n        // ** - Maker Asset Data Length\n        // *** - Taker Asset Data Length\n        assembly {\n            mstore(order,           mload(orderDataAddr))  // maker\n            mstore(add(order, 32),  mload(add(orderDataAddr, 32)))  // taker\n            mstore(add(order, 64),  mload(add(orderDataAddr, 64)))  // feeRecipient\n            mstore(add(order, 96),  mload(add(orderDataAddr, 96)))  // senderAddress\n            mstore(add(order, 128),  mload(add(orderDataAddr, 128))) // makerAssetAmount\n            mstore(add(order, 160), mload(add(orderDataAddr, 160))) // takerAssetAmount\n            mstore(add(order, 192), mload(add(orderDataAddr, 192))) // makerFee\n            mstore(add(order, 224), mload(add(orderDataAddr, 224))) // takerFee\n            mstore(add(order, 256), mload(add(orderDataAddr, 256))) // expirationUnixTimestampSec\n            mstore(add(order, 288), mload(add(orderDataAddr, 288))) // salt\n        }\n\n        order.makerAssetData = _zeroExOrder.slice(320, _makerAssetDataLength.add(320));\n        order.takerAssetData = _zeroExOrder.slice(\n            _makerAssetDataLength.add(320),\n            _makerAssetDataLength.add(320).add(_takerAssetDataLength)\n        );\n\n        return order;       \n    }\n\n    function parseZeroExOrderData(bytes _orderData)\n        internal\n        pure\n        returns(Order memory)\n    {\n        ZeroExHeader memory header = parseOrderHeader(_orderData);\n\n        Order memory order = parseZeroExOrder(\n            sliceZeroExOrder(_orderData, header.signatureLength, header.orderLength),\n            header.makerAssetDataLength,\n            header.takerAssetDataLength\n        );\n\n        return order;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/external/lib/ZeroExOrderDataHandler.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/external/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        2330
      ]
    },
    "id": 2331,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2095,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:13"
      },
      {
        "id": 2096,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:13"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 2098,
        "nodeType": "ImportDirective",
        "scope": 2331,
        "sourceUnit": 4739,
        "src": "658:73:13",
        "symbolAliases": [
          {
            "foreign": 2097,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/LibBytes.sol",
        "file": "../../../external/LibBytes.sol",
        "id": 2100,
        "nodeType": "ImportDirective",
        "scope": 2331,
        "sourceUnit": 3108,
        "src": "732:58:13",
        "symbolAliases": [
          {
            "foreign": 2099,
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
        "id": 2330,
        "linearizedBaseContracts": [
          2330
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2103,
            "libraryName": {
              "contractScope": null,
              "id": 2101,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4738,
              "src": "995:8:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$4738",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "989:27:13",
            "typeName": {
              "id": 2102,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1008:7:13",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 2106,
            "libraryName": {
              "contractScope": null,
              "id": 2104,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3107,
              "src": "1027:8:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$3107",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1021:25:13",
            "typeName": {
              "id": 2105,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "1040:5:13",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.Order",
            "id": 2131,
            "members": [
              {
                "constant": false,
                "id": 2108,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1117:20:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2107,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1117:7:13",
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
                "id": 2110,
                "name": "takerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1192:20:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2109,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1192:7:13",
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
                "id": 2112,
                "name": "feeRecipientAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1278:27:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2111,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1278:7:13",
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
                "id": 2114,
                "name": "senderAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1374:21:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2113,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1374:7:13",
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
                "id": 2116,
                "name": "makerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1468:24:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2115,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1468:7:13",
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
                "id": 2118,
                "name": "takerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1556:24:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2117,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1556:7:13",
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
                "id": 2120,
                "name": "makerFee",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1643:16:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2119,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1643:7:13",
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
                "id": 2122,
                "name": "takerFee",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1730:16:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2121,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1730:7:13",
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
                "id": 2124,
                "name": "expirationTimeSeconds",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1817:29:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2123,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1817:7:13",
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
                "id": 2126,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1905:12:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2125,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1905:7:13",
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
                "id": 2128,
                "name": "makerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "2001:20:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 2127,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "2001:5:13",
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
                "id": 2130,
                "name": "takerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "2087:20:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 2129,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "2087:5:13",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_storage_ptr",
                    "typeString": "bytes"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "Order",
            "nodeType": "StructDefinition",
            "scope": 2330,
            "src": "1094:1076:13",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.ZeroExHeader",
            "id": 2140,
            "members": [
              {
                "constant": false,
                "id": 2133,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 2140,
                "src": "2206:23:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2132,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2206:7:13",
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
                "id": 2135,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 2140,
                "src": "2239:19:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2134,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2239:7:13",
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
                "id": 2137,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 2140,
                "src": "2268:28:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2136,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2268:7:13",
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
                "id": 2139,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 2140,
                "src": "2306:28:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2138,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2306:7:13",
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
            "scope": 2330,
            "src": "2176:165:13",
            "visibility": "public"
          },
          {
            "body": {
              "id": 2159,
              "nodeType": "Block",
              "src": "3867:500:13",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2148,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 2160,
                      "src": "3877:26:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2147,
                        "name": "ZeroExHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2140,
                        "src": "3877:12:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_ZeroExHeader_$2140_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2149,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3877:26:13"
                },
                {
                  "assignments": [
                    2151
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2151,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 2160,
                      "src": "3914:21:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2150,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3914:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2155,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 2152,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2142,
                        "src": "3938:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2153,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2997,
                      "src": "3938:25:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 2154,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3938:27:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3914:51:13"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 2148,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4006:6:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2151,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4029:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2148,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4087:6:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2151,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4110:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2148,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4169:6:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2151,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4192:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2148,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4260:6:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2151,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4283:13:13",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2156,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataAddr))\n    mstore(add(header, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(header, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(header, 96), mload(add(orderDataAddr, 96)))\n}",
                  "src": "3976:377:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2157,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2148,
                    "src": "4354:6:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                    }
                  },
                  "functionReturnParameters": 2146,
                  "id": 2158,
                  "nodeType": "Return",
                  "src": "4347:13:13"
                }
              ]
            },
            "documentation": null,
            "id": 2160,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2143,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2142,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2160,
                  "src": "3784:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2141,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3784:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3783:18:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2146,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2145,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2160,
                  "src": "3849:12:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2144,
                    "name": "ZeroExHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2140,
                    "src": "3849:12:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$2140_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3848:14:13"
            },
            "scope": 2330,
            "src": "3758:609:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2179,
              "nodeType": "Block",
              "src": "4476:211:13",
              "statements": [
                {
                  "assignments": [
                    2168
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2168,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 2180,
                      "src": "4486:21:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2167,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4486:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2172,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 2169,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2162,
                        "src": "4510:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2170,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2997,
                      "src": "4510:25:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 2171,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4510:27:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4486:51:13"
                },
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2174,
                      "name": "fillAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2180,
                      "src": "4547:18:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2173,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4547:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2175,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4547:18:13"
                },
                {
                  "externalReferences": [
                    {
                      "fillAmount": {
                        "declaration": 2174,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4599:10:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2168,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4623:13:13",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2176,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    fillAmount := mload(add(orderDataAddr, 128))\n}",
                  "src": "4576:93:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2177,
                    "name": "fillAmount",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2174,
                    "src": "4670:10:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2166,
                  "id": 2178,
                  "nodeType": "Return",
                  "src": "4663:17:13"
                }
              ]
            },
            "documentation": null,
            "id": 2180,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseFillAmount",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2163,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2162,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2180,
                  "src": "4398:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2161,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4398:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4397:18:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2166,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2165,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2180,
                  "src": "4463:7:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2164,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4463:7:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4462:9:13"
            },
            "scope": 2330,
            "src": "4373:314:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2202,
              "nodeType": "Block",
              "src": "4816:116:13",
              "statements": [
                {
                  "assignments": [
                    2190
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2190,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 2203,
                      "src": "4826:22:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 2189,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "4826:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2199,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 2193,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4868:3:13",
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
                            "id": 2196,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "4894:3:13",
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
                            "id": 2194,
                            "name": "_signatureLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2184,
                            "src": "4873:16:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2195,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4737,
                          "src": "4873:20:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2197,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4873:25:13",
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
                        "id": 2191,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2182,
                        "src": "4851:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2192,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3106,
                      "src": "4851:16:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 2198,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4851:48:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4826:73:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2200,
                    "name": "signature",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2190,
                    "src": "4916:9:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 2188,
                  "id": 2201,
                  "nodeType": "Return",
                  "src": "4909:16:13"
                }
              ]
            },
            "documentation": null,
            "id": 2203,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2185,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2182,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2203,
                  "src": "4717:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2181,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4717:5:13",
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
                  "id": 2184,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 2203,
                  "src": "4735:21:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2183,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4735:4:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4716:41:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2188,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2187,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2203,
                  "src": "4805:5:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2186,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4805:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4804:7:13"
            },
            "scope": 2330,
            "src": "4693:239:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2240,
              "nodeType": "Block",
              "src": "5082:300:13",
              "statements": [
                {
                  "assignments": [
                    2215
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2215,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 2241,
                      "src": "5092:21:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2214,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5092:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2219,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 2216,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2205,
                        "src": "5116:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2217,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2997,
                      "src": "5116:25:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 2218,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5116:27:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5092:51:13"
                },
                {
                  "assignments": [
                    2221
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2221,
                      "name": "orderStartAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 2241,
                      "src": "5153:25:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2220,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5153:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2226,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2224,
                        "name": "_signatureLength",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2207,
                        "src": "5199:16:13",
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
                        "id": 2222,
                        "name": "orderDataAddr",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2215,
                        "src": "5181:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2223,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4737,
                      "src": "5181:17:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2225,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5181:35:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5153:63:13"
                },
                {
                  "assignments": [
                    2228
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2228,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2241,
                      "src": "5226:18:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 2227,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "5226:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2237,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2231,
                        "name": "orderStartAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2221,
                        "src": "5277:17:13",
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
                            "id": 2234,
                            "name": "_orderLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2209,
                            "src": "5330:12:13",
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
                            "id": 2232,
                            "name": "orderStartAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2221,
                            "src": "5308:17:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2233,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4737,
                          "src": "5308:21:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2235,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5308:35:13",
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
                        "id": 2229,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2205,
                        "src": "5247:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2230,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3106,
                      "src": "5247:16:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 2236,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5247:106:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5226:127:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2238,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2228,
                    "src": "5370:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 2213,
                  "id": 2239,
                  "nodeType": "Return",
                  "src": "5363:12:13"
                }
              ]
            },
            "documentation": null,
            "id": 2241,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2210,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2205,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2241,
                  "src": "4964:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2204,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4964:5:13",
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
                  "id": 2207,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 2241,
                  "src": "4982:21:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2206,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4982:4:13",
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
                  "id": 2209,
                  "name": "_orderLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 2241,
                  "src": "5005:17:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2208,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5005:4:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4963:60:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2213,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2212,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2241,
                  "src": "5071:5:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2211,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5071:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5070:7:13"
            },
            "scope": 2330,
            "src": "4938:444:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2296,
              "nodeType": "Block",
              "src": "5585:2197:13",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2253,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2297,
                      "src": "5595:18:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2252,
                        "name": "Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2131,
                        "src": "5595:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$2131_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2254,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5595:18:13"
                },
                {
                  "assignments": [
                    2256
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2256,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 2297,
                      "src": "5623:21:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2255,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5623:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2260,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 2257,
                        "name": "_zeroExOrder",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2243,
                        "src": "5647:12:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2258,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2997,
                      "src": "5647:27:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 2259,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5647:29:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5623:53:13"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6666:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6689:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6738:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6761:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6815:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6838:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7161:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6899:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6984:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6922:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7073:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7096:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7008:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7419:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7442:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7241:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7184:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7321:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7264:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7344:13:13",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2261,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataAddr))\n    mstore(add(order, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(order, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(order, 96), mload(add(orderDataAddr, 96)))\n    mstore(add(order, 128), mload(add(orderDataAddr, 128)))\n    mstore(add(order, 160), mload(add(orderDataAddr, 160)))\n    mstore(add(order, 192), mload(add(orderDataAddr, 192)))\n    mstore(add(order, 224), mload(add(orderDataAddr, 224)))\n    mstore(add(order, 256), mload(add(orderDataAddr, 256)))\n    mstore(add(order, 288), mload(add(orderDataAddr, 288)))\n}",
                  "src": "6636:860:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2273,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2262,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2253,
                        "src": "7491:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.Order memory"
                        }
                      },
                      "id": 2264,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2128,
                      "src": "7491:20:13",
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
                          "id": 2267,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "7533:3:13",
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
                              "id": 2270,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7564:3:13",
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
                              "id": 2268,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2245,
                              "src": "7538:21:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2269,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4737,
                            "src": "7538:25:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2271,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7538:30:13",
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
                          "id": 2265,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2243,
                          "src": "7514:12:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 2266,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3106,
                        "src": "7514:18:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 2272,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7514:55:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7491:78:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 2274,
                  "nodeType": "ExpressionStatement",
                  "src": "7491:78:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2292,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2275,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2253,
                        "src": "7579:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.Order memory"
                        }
                      },
                      "id": 2277,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2130,
                      "src": "7579:20:13",
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
                              "id": 2282,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7660:3:13",
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
                              "id": 2280,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2245,
                              "src": "7634:21:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2281,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4737,
                            "src": "7634:25:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2283,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7634:30:13",
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
                              "id": 2289,
                              "name": "_takerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2247,
                              "src": "7713:21:13",
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
                                  "id": 2286,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "7704:3:13",
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
                                  "id": 2284,
                                  "name": "_makerAssetDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2245,
                                  "src": "7678:21:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2285,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4737,
                                "src": "7678:25:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2287,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7678:30:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2288,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4737,
                            "src": "7678:34:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2290,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7678:57:13",
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
                          "id": 2278,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2243,
                          "src": "7602:12:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 2279,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3106,
                        "src": "7602:18:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 2291,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7602:143:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7579:166:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 2293,
                  "nodeType": "ExpressionStatement",
                  "src": "7579:166:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2294,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2253,
                    "src": "7763:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.Order memory"
                    }
                  },
                  "functionReturnParameters": 2251,
                  "id": 2295,
                  "nodeType": "Return",
                  "src": "7756:12:13"
                }
              ]
            },
            "documentation": null,
            "id": 2297,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2248,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2243,
                  "name": "_zeroExOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 2297,
                  "src": "5423:18:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2242,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5423:5:13",
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
                  "id": 2245,
                  "name": "_makerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 2297,
                  "src": "5451:26:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2244,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5451:4:13",
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
                  "id": 2247,
                  "name": "_takerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 2297,
                  "src": "5487:26:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2246,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5487:4:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5413:106:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2251,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2250,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2297,
                  "src": "5567:5:13",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2249,
                    "name": "Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2131,
                    "src": "5567:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$2131_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5566:14:13"
            },
            "scope": 2330,
            "src": "5388:2394:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2328,
              "nodeType": "Block",
              "src": "7900:323:13",
              "statements": [
                {
                  "assignments": [
                    2305
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2305,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 2329,
                      "src": "7910:26:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2304,
                        "name": "ZeroExHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2140,
                        "src": "7910:12:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_ZeroExHeader_$2140_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2309,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2307,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2299,
                        "src": "7956:10:13",
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
                      "id": 2306,
                      "name": "parseOrderHeader",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2160,
                      "src": "7939:16:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_ZeroExHeader_$2140_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct ZeroExOrderDataHandler.ZeroExHeader memory)"
                      }
                    },
                    "id": 2308,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7939:28:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7910:57:13"
                },
                {
                  "assignments": [
                    2311
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2311,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2329,
                      "src": "7978:18:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2310,
                        "name": "Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2131,
                        "src": "7978:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$2131_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2325,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 2314,
                            "name": "_orderData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2299,
                            "src": "8046:10:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2315,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2305,
                              "src": "8058:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                              }
                            },
                            "id": 2316,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "signatureLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2133,
                            "src": "8058:22:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2317,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2305,
                              "src": "8082:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                              }
                            },
                            "id": 2318,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2135,
                            "src": "8082:18:13",
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
                          "id": 2313,
                          "name": "sliceZeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2241,
                          "src": "8029:16:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                          }
                        },
                        "id": 2319,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "8029:72:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2320,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2305,
                          "src": "8115:6:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                          }
                        },
                        "id": 2321,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2137,
                        "src": "8115:27:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2322,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2305,
                          "src": "8156:6:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                          }
                        },
                        "id": 2323,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2139,
                        "src": "8156:27:13",
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
                      "id": 2312,
                      "name": "parseZeroExOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2297,
                      "src": "7999:16:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_struct$_Order_$2131_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (struct ZeroExOrderDataHandler.Order memory)"
                      }
                    },
                    "id": 2324,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7999:194:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7978:215:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2326,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2311,
                    "src": "8211:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.Order memory"
                    }
                  },
                  "functionReturnParameters": 2303,
                  "id": 2327,
                  "nodeType": "Return",
                  "src": "8204:12:13"
                }
              ]
            },
            "documentation": null,
            "id": 2329,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrderData",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2300,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2299,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2329,
                  "src": "7818:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2298,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7818:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7817:18:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2303,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2302,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2329,
                  "src": "7882:5:13",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2301,
                    "name": "Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2131,
                    "src": "7882:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$2131_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7881:14:13"
            },
            "scope": 2330,
            "src": "7788:435:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 2331,
        "src": "952:7273:13"
      }
    ],
    "src": "597:7629:13"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/external/lib/ZeroExOrderDataHandler.sol",
    "exportedSymbols": {
      "ZeroExOrderDataHandler": [
        2330
      ]
    },
    "id": 2331,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2095,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:13"
      },
      {
        "id": 2096,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:13"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 2098,
        "nodeType": "ImportDirective",
        "scope": 2331,
        "sourceUnit": 4739,
        "src": "658:73:13",
        "symbolAliases": [
          {
            "foreign": 2097,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/LibBytes.sol",
        "file": "../../../external/LibBytes.sol",
        "id": 2100,
        "nodeType": "ImportDirective",
        "scope": 2331,
        "sourceUnit": 3108,
        "src": "732:58:13",
        "symbolAliases": [
          {
            "foreign": 2099,
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
        "id": 2330,
        "linearizedBaseContracts": [
          2330
        ],
        "name": "ZeroExOrderDataHandler",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2103,
            "libraryName": {
              "contractScope": null,
              "id": 2101,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4738,
              "src": "995:8:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$4738",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "989:27:13",
            "typeName": {
              "id": 2102,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1008:7:13",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 2106,
            "libraryName": {
              "contractScope": null,
              "id": 2104,
              "name": "LibBytes",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3107,
              "src": "1027:8:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibBytes_$3107",
                "typeString": "library LibBytes"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1021:25:13",
            "typeName": {
              "id": 2105,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "1040:5:13",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            }
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.Order",
            "id": 2131,
            "members": [
              {
                "constant": false,
                "id": 2108,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1117:20:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2107,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1117:7:13",
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
                "id": 2110,
                "name": "takerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1192:20:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2109,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1192:7:13",
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
                "id": 2112,
                "name": "feeRecipientAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1278:27:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2111,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1278:7:13",
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
                "id": 2114,
                "name": "senderAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1374:21:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2113,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1374:7:13",
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
                "id": 2116,
                "name": "makerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1468:24:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2115,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1468:7:13",
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
                "id": 2118,
                "name": "takerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1556:24:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2117,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1556:7:13",
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
                "id": 2120,
                "name": "makerFee",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1643:16:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2119,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1643:7:13",
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
                "id": 2122,
                "name": "takerFee",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1730:16:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2121,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1730:7:13",
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
                "id": 2124,
                "name": "expirationTimeSeconds",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1817:29:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2123,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1817:7:13",
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
                "id": 2126,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "1905:12:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2125,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1905:7:13",
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
                "id": 2128,
                "name": "makerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "2001:20:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 2127,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "2001:5:13",
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
                "id": 2130,
                "name": "takerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 2131,
                "src": "2087:20:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 2129,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "2087:5:13",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_storage_ptr",
                    "typeString": "bytes"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "Order",
            "nodeType": "StructDefinition",
            "scope": 2330,
            "src": "1094:1076:13",
            "visibility": "public"
          },
          {
            "canonicalName": "ZeroExOrderDataHandler.ZeroExHeader",
            "id": 2140,
            "members": [
              {
                "constant": false,
                "id": 2133,
                "name": "signatureLength",
                "nodeType": "VariableDeclaration",
                "scope": 2140,
                "src": "2206:23:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2132,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2206:7:13",
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
                "id": 2135,
                "name": "orderLength",
                "nodeType": "VariableDeclaration",
                "scope": 2140,
                "src": "2239:19:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2134,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2239:7:13",
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
                "id": 2137,
                "name": "makerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 2140,
                "src": "2268:28:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2136,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2268:7:13",
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
                "id": 2139,
                "name": "takerAssetDataLength",
                "nodeType": "VariableDeclaration",
                "scope": 2140,
                "src": "2306:28:13",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2138,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2306:7:13",
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
            "scope": 2330,
            "src": "2176:165:13",
            "visibility": "public"
          },
          {
            "body": {
              "id": 2159,
              "nodeType": "Block",
              "src": "3867:500:13",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2148,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 2160,
                      "src": "3877:26:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2147,
                        "name": "ZeroExHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2140,
                        "src": "3877:12:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_ZeroExHeader_$2140_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2149,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3877:26:13"
                },
                {
                  "assignments": [
                    2151
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2151,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 2160,
                      "src": "3914:21:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2150,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "3914:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2155,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 2152,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2142,
                        "src": "3938:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2153,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2997,
                      "src": "3938:25:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 2154,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3938:27:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3914:51:13"
                },
                {
                  "externalReferences": [
                    {
                      "header": {
                        "declaration": 2148,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4006:6:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2151,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4029:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2148,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4087:6:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2151,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4110:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2148,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4169:6:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2151,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4192:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "header": {
                        "declaration": 2148,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4260:6:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2151,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4283:13:13",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2156,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(header, mload(orderDataAddr))\n    mstore(add(header, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(header, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(header, 96), mload(add(orderDataAddr, 96)))\n}",
                  "src": "3976:377:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2157,
                    "name": "header",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2148,
                    "src": "4354:6:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                    }
                  },
                  "functionReturnParameters": 2146,
                  "id": 2158,
                  "nodeType": "Return",
                  "src": "4347:13:13"
                }
              ]
            },
            "documentation": null,
            "id": 2160,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseOrderHeader",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2143,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2142,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2160,
                  "src": "3784:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2141,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3784:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3783:18:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2146,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2145,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2160,
                  "src": "3849:12:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2144,
                    "name": "ZeroExHeader",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2140,
                    "src": "3849:12:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$2140_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3848:14:13"
            },
            "scope": 2330,
            "src": "3758:609:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2179,
              "nodeType": "Block",
              "src": "4476:211:13",
              "statements": [
                {
                  "assignments": [
                    2168
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2168,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 2180,
                      "src": "4486:21:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2167,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4486:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2172,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 2169,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2162,
                        "src": "4510:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2170,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2997,
                      "src": "4510:25:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 2171,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4510:27:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4486:51:13"
                },
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2174,
                      "name": "fillAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2180,
                      "src": "4547:18:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2173,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "4547:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2175,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4547:18:13"
                },
                {
                  "externalReferences": [
                    {
                      "fillAmount": {
                        "declaration": 2174,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4599:10:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2168,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "4623:13:13",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2176,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    fillAmount := mload(add(orderDataAddr, 128))\n}",
                  "src": "4576:93:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2177,
                    "name": "fillAmount",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2174,
                    "src": "4670:10:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2166,
                  "id": 2178,
                  "nodeType": "Return",
                  "src": "4663:17:13"
                }
              ]
            },
            "documentation": null,
            "id": 2180,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseFillAmount",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2163,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2162,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2180,
                  "src": "4398:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2161,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4398:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4397:18:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2166,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2165,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2180,
                  "src": "4463:7:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2164,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4463:7:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4462:9:13"
            },
            "scope": 2330,
            "src": "4373:314:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2202,
              "nodeType": "Block",
              "src": "4816:116:13",
              "statements": [
                {
                  "assignments": [
                    2190
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2190,
                      "name": "signature",
                      "nodeType": "VariableDeclaration",
                      "scope": 2203,
                      "src": "4826:22:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 2189,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "4826:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2199,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "313630",
                        "id": 2193,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "4868:3:13",
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
                            "id": 2196,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "4894:3:13",
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
                            "id": 2194,
                            "name": "_signatureLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2184,
                            "src": "4873:16:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2195,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4737,
                          "src": "4873:20:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2197,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4873:25:13",
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
                        "id": 2191,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2182,
                        "src": "4851:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2192,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3106,
                      "src": "4851:16:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 2198,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4851:48:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4826:73:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2200,
                    "name": "signature",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2190,
                    "src": "4916:9:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 2188,
                  "id": 2201,
                  "nodeType": "Return",
                  "src": "4909:16:13"
                }
              ]
            },
            "documentation": null,
            "id": 2203,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2185,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2182,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2203,
                  "src": "4717:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2181,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4717:5:13",
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
                  "id": 2184,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 2203,
                  "src": "4735:21:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2183,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4735:4:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4716:41:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2188,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2187,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2203,
                  "src": "4805:5:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2186,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4805:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4804:7:13"
            },
            "scope": 2330,
            "src": "4693:239:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2240,
              "nodeType": "Block",
              "src": "5082:300:13",
              "statements": [
                {
                  "assignments": [
                    2215
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2215,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 2241,
                      "src": "5092:21:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2214,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5092:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2219,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 2216,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2205,
                        "src": "5116:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2217,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2997,
                      "src": "5116:25:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 2218,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5116:27:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5092:51:13"
                },
                {
                  "assignments": [
                    2221
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2221,
                      "name": "orderStartAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 2241,
                      "src": "5153:25:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2220,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5153:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2226,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2224,
                        "name": "_signatureLength",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2207,
                        "src": "5199:16:13",
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
                        "id": 2222,
                        "name": "orderDataAddr",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2215,
                        "src": "5181:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2223,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4737,
                      "src": "5181:17:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2225,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5181:35:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5153:63:13"
                },
                {
                  "assignments": [
                    2228
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2228,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2241,
                      "src": "5226:18:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 2227,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "5226:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2237,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2231,
                        "name": "orderStartAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2221,
                        "src": "5277:17:13",
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
                            "id": 2234,
                            "name": "_orderLength",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2209,
                            "src": "5330:12:13",
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
                            "id": 2232,
                            "name": "orderStartAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2221,
                            "src": "5308:17:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2233,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "add",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 4737,
                          "src": "5308:21:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2235,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5308:35:13",
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
                        "id": 2229,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2205,
                        "src": "5247:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2230,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "slice",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3106,
                      "src": "5247:16:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                      }
                    },
                    "id": 2236,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5247:106:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5226:127:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2238,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2228,
                    "src": "5370:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory_ptr",
                      "typeString": "bytes memory"
                    }
                  },
                  "functionReturnParameters": 2213,
                  "id": 2239,
                  "nodeType": "Return",
                  "src": "5363:12:13"
                }
              ]
            },
            "documentation": null,
            "id": 2241,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "sliceZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2210,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2205,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2241,
                  "src": "4964:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2204,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "4964:5:13",
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
                  "id": 2207,
                  "name": "_signatureLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 2241,
                  "src": "4982:21:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2206,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4982:4:13",
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
                  "id": 2209,
                  "name": "_orderLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 2241,
                  "src": "5005:17:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2208,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5005:4:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4963:60:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2213,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2212,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2241,
                  "src": "5071:5:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2211,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5071:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5070:7:13"
            },
            "scope": 2330,
            "src": "4938:444:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2296,
              "nodeType": "Block",
              "src": "5585:2197:13",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2253,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2297,
                      "src": "5595:18:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2252,
                        "name": "Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2131,
                        "src": "5595:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$2131_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2254,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5595:18:13"
                },
                {
                  "assignments": [
                    2256
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2256,
                      "name": "orderDataAddr",
                      "nodeType": "VariableDeclaration",
                      "scope": 2297,
                      "src": "5623:21:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2255,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "5623:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2260,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "expression": {
                        "argumentTypes": null,
                        "id": 2257,
                        "name": "_zeroExOrder",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2243,
                        "src": "5647:12:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2258,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "contentAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2997,
                      "src": "5647:27:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_uint256_$bound_to$_t_bytes_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (uint256)"
                      }
                    },
                    "id": 2259,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5647:29:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5623:53:13"
                },
                {
                  "externalReferences": [
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6666:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6689:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6738:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6761:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6815:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6838:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7161:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6899:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6984:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "6922:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7073:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7096:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7008:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7419:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7442:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7241:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7184:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "order": {
                        "declaration": 2253,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7321:5:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7264:13:13",
                        "valueSize": 1
                      }
                    },
                    {
                      "orderDataAddr": {
                        "declaration": 2256,
                        "isOffset": false,
                        "isSlot": false,
                        "src": "7344:13:13",
                        "valueSize": 1
                      }
                    }
                  ],
                  "id": 2261,
                  "nodeType": "InlineAssembly",
                  "operations": "{\n    mstore(order, mload(orderDataAddr))\n    mstore(add(order, 32), mload(add(orderDataAddr, 32)))\n    mstore(add(order, 64), mload(add(orderDataAddr, 64)))\n    mstore(add(order, 96), mload(add(orderDataAddr, 96)))\n    mstore(add(order, 128), mload(add(orderDataAddr, 128)))\n    mstore(add(order, 160), mload(add(orderDataAddr, 160)))\n    mstore(add(order, 192), mload(add(orderDataAddr, 192)))\n    mstore(add(order, 224), mload(add(orderDataAddr, 224)))\n    mstore(add(order, 256), mload(add(orderDataAddr, 256)))\n    mstore(add(order, 288), mload(add(orderDataAddr, 288)))\n}",
                  "src": "6636:860:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2273,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2262,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2253,
                        "src": "7491:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.Order memory"
                        }
                      },
                      "id": 2264,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "makerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2128,
                      "src": "7491:20:13",
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
                          "id": 2267,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "7533:3:13",
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
                              "id": 2270,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7564:3:13",
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
                              "id": 2268,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2245,
                              "src": "7538:21:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2269,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4737,
                            "src": "7538:25:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2271,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7538:30:13",
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
                          "id": 2265,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2243,
                          "src": "7514:12:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 2266,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3106,
                        "src": "7514:18:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 2272,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7514:55:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7491:78:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 2274,
                  "nodeType": "ExpressionStatement",
                  "src": "7491:78:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2292,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 2275,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2253,
                        "src": "7579:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.Order memory"
                        }
                      },
                      "id": 2277,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "takerAssetData",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2130,
                      "src": "7579:20:13",
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
                              "id": 2282,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "7660:3:13",
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
                              "id": 2280,
                              "name": "_makerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2245,
                              "src": "7634:21:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2281,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4737,
                            "src": "7634:25:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2283,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7634:30:13",
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
                              "id": 2289,
                              "name": "_takerAssetDataLength",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2247,
                              "src": "7713:21:13",
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
                                  "id": 2286,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "7704:3:13",
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
                                  "id": 2284,
                                  "name": "_makerAssetDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2245,
                                  "src": "7678:21:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2285,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4737,
                                "src": "7678:25:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2287,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7678:30:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2288,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4737,
                            "src": "7678:34:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2290,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7678:57:13",
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
                          "id": 2278,
                          "name": "_zeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2243,
                          "src": "7602:12:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "id": 2279,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "slice",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3106,
                        "src": "7602:18:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$bound_to$_t_bytes_memory_ptr_$",
                          "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                        }
                      },
                      "id": 2291,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7602:143:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes memory"
                      }
                    },
                    "src": "7579:166:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_memory",
                      "typeString": "bytes memory"
                    }
                  },
                  "id": 2293,
                  "nodeType": "ExpressionStatement",
                  "src": "7579:166:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2294,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2253,
                    "src": "7763:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.Order memory"
                    }
                  },
                  "functionReturnParameters": 2251,
                  "id": 2295,
                  "nodeType": "Return",
                  "src": "7756:12:13"
                }
              ]
            },
            "documentation": null,
            "id": 2297,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2248,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2243,
                  "name": "_zeroExOrder",
                  "nodeType": "VariableDeclaration",
                  "scope": 2297,
                  "src": "5423:18:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2242,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "5423:5:13",
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
                  "id": 2245,
                  "name": "_makerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 2297,
                  "src": "5451:26:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2244,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5451:4:13",
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
                  "id": 2247,
                  "name": "_takerAssetDataLength",
                  "nodeType": "VariableDeclaration",
                  "scope": 2297,
                  "src": "5487:26:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2246,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5487:4:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5413:106:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2251,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2250,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2297,
                  "src": "5567:5:13",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2249,
                    "name": "Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2131,
                    "src": "5567:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$2131_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5566:14:13"
            },
            "scope": 2330,
            "src": "5388:2394:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2328,
              "nodeType": "Block",
              "src": "7900:323:13",
              "statements": [
                {
                  "assignments": [
                    2305
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2305,
                      "name": "header",
                      "nodeType": "VariableDeclaration",
                      "scope": 2329,
                      "src": "7910:26:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2304,
                        "name": "ZeroExHeader",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2140,
                        "src": "7910:12:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_ZeroExHeader_$2140_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2309,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2307,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2299,
                        "src": "7956:10:13",
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
                      "id": 2306,
                      "name": "parseOrderHeader",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2160,
                      "src": "7939:16:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_ZeroExHeader_$2140_memory_ptr_$",
                        "typeString": "function (bytes memory) pure returns (struct ZeroExOrderDataHandler.ZeroExHeader memory)"
                      }
                    },
                    "id": 2308,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7939:28:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7910:57:13"
                },
                {
                  "assignments": [
                    2311
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2311,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2329,
                      "src": "7978:18:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                        "typeString": "struct ZeroExOrderDataHandler.Order"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2310,
                        "name": "Order",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2131,
                        "src": "7978:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Order_$2131_storage_ptr",
                          "typeString": "struct ZeroExOrderDataHandler.Order"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2325,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 2314,
                            "name": "_orderData",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2299,
                            "src": "8046:10:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2315,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2305,
                              "src": "8058:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                              }
                            },
                            "id": 2316,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "signatureLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2133,
                            "src": "8058:22:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2317,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2305,
                              "src": "8082:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                                "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                              }
                            },
                            "id": 2318,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderLength",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2135,
                            "src": "8082:18:13",
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
                          "id": 2313,
                          "name": "sliceZeroExOrder",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2241,
                          "src": "8029:16:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                          }
                        },
                        "id": 2319,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "8029:72:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2320,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2305,
                          "src": "8115:6:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                          }
                        },
                        "id": 2321,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2137,
                        "src": "8115:27:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2322,
                          "name": "header",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2305,
                          "src": "8156:6:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ZeroExHeader_$2140_memory_ptr",
                            "typeString": "struct ZeroExOrderDataHandler.ZeroExHeader memory"
                          }
                        },
                        "id": 2323,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "takerAssetDataLength",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2139,
                        "src": "8156:27:13",
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
                      "id": 2312,
                      "name": "parseZeroExOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2297,
                      "src": "7999:16:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_struct$_Order_$2131_memory_ptr_$",
                        "typeString": "function (bytes memory,uint256,uint256) pure returns (struct ZeroExOrderDataHandler.Order memory)"
                      }
                    },
                    "id": 2324,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7999:194:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.Order memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7978:215:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2326,
                    "name": "order",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2311,
                    "src": "8211:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.Order memory"
                    }
                  },
                  "functionReturnParameters": 2303,
                  "id": 2327,
                  "nodeType": "Return",
                  "src": "8204:12:13"
                }
              ]
            },
            "documentation": null,
            "id": 2329,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "parseZeroExOrderData",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2300,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2299,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2329,
                  "src": "7818:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2298,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7818:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7817:18:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2303,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2302,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2329,
                  "src": "7882:5:13",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_Order_$2131_memory_ptr",
                    "typeString": "struct ZeroExOrderDataHandler.Order"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2301,
                    "name": "Order",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2131,
                    "src": "7882:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Order_$2131_storage_ptr",
                      "typeString": "struct ZeroExOrderDataHandler.Order"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7881:14:13"
            },
            "scope": 2330,
            "src": "7788:435:13",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          }
        ],
        "scope": 2331,
        "src": "952:7273:13"
      }
    ],
    "src": "597:7629:13"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.902Z"
}
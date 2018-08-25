export const LibOrder = 
{
  "contractName": "LibOrder",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "EIP712_DOMAIN_SEPARATOR_SCHEMA_HASH",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "EIP712_DOMAIN_HASH",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506101f4806100206000396000f30060806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632624b2d98114610050578063e306f77914610077575b600080fd5b34801561005c57600080fd5b5061006561008c565b60408051918252519081900360200190f35b34801561008357600080fd5b506100656101c2565b604080517f454950373132446f6d61696e28000000000000000000000000000000000000006020808301919091527f737472696e67206e616d652c0000000000000000000000000000000000000000602d8301527f737472696e672076657273696f6e2c000000000000000000000000000000000060398301527f6164647265737320766572696679696e67436f6e74726163740000000000000060488301527f2900000000000000000000000000000000000000000000000000000000000000606183015282516042818403018152606290920192839052815191929182918401908083835b602083106101925780518252601f199092019160209182019101610173565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902081565b600054815600a165627a7a72305820ee91c888d44a9641f54d3d265aa64522f5862b7835ed9236f4d99a6f66b0476a0029",
  "deployedBytecode": "0x60806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632624b2d98114610050578063e306f77914610077575b600080fd5b34801561005c57600080fd5b5061006561008c565b60408051918252519081900360200190f35b34801561008357600080fd5b506100656101c2565b604080517f454950373132446f6d61696e28000000000000000000000000000000000000006020808301919091527f737472696e67206e616d652c0000000000000000000000000000000000000000602d8301527f737472696e672076657273696f6e2c000000000000000000000000000000000060398301527f6164647265737320766572696679696e67436f6e74726163740000000000000060488301527f2900000000000000000000000000000000000000000000000000000000000000606183015282516042818403018152606290920192839052815191929182918401908083835b602083106101925780518252601f199092019160209182019101610173565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902081565b600054815600a165627a7a72305820ee91c888d44a9641f54d3d265aa64522f5862b7835ed9236f4d99a6f66b0476a0029",
  "sourceMap": "633:3340:31:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;633:3340:31;;;;;;;",
  "deployedSourceMap": "633:3340:31:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;943:221:29;;8:9:-1;5:2;;;30:1;27;20:12;5:2;943:221:29;;;;;;;;;;;;;;;;;;;;1219:33;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1219:33:29;;;;943:221;1015:148;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;22:32:-1;26:21;;;22:32;6:49;;1015:148:29;;;;;;;;1005:159;;1015:148;;;;;1005:159;;;;1015:148;1005:159;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;1005:159:29;;;;;;;;;;;;;;;;943:221;:::o;1219:33::-;;;;:::o",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\n\nimport \"./LibEIP712.sol\";\n\ncontract LibOrder is\n    LibEIP712\n{\n\n    // Hash for the EIP712 Order Schema\n    bytes32 constant EIP712_ORDER_SCHEMA_HASH = keccak256(abi.encodePacked(\n        \"Order(\",\n        \"address makerAddress,\",\n        \"address takerAddress,\",\n        \"address feeRecipientAddress,\",\n        \"address senderAddress,\",\n        \"uint256 makerAssetAmount,\",\n        \"uint256 takerAssetAmount,\",\n        \"uint256 makerFee,\",\n        \"uint256 takerFee,\",\n        \"uint256 expirationTimeSeconds,\",\n        \"uint256 salt,\",\n        \"bytes makerAssetData,\",\n        \"bytes takerAssetData\",\n        \")\"\n    ));\n\n    // A valid order remains fillable until it is expired, fully filled, or cancelled.\n    // An order's state is unaffected by external factors, like account balances.\n    enum OrderStatus {\n        INVALID,                     // Default value\n        INVALID_MAKER_ASSET_AMOUNT,  // Order does not have a valid maker asset amount\n        INVALID_TAKER_ASSET_AMOUNT,  // Order does not have a valid taker asset amount\n        FILLABLE,                    // Order is fillable\n        EXPIRED,                     // Order has already expired\n        FULLY_FILLED,                // Order is fully filled\n        CANCELLED                    // Order has been cancelled\n    }\n\n    struct Order {\n        address makerAddress;           // Address that created the order.      \n        address takerAddress;           // Address that is allowed to fill the order. If set to 0, any address is allowed to fill the order.          \n        address feeRecipientAddress;    // Address that will recieve fees when order is filled.      \n        address senderAddress;          // Address that is allowed to call Exchange contract methods that affect this order. If set to 0, any address is allowed to call these methods.\n        uint256 makerAssetAmount;       // Amount of makerAsset being offered by maker. Must be greater than 0.        \n        uint256 takerAssetAmount;       // Amount of takerAsset being bid on by maker. Must be greater than 0.        \n        uint256 makerFee;               // Amount of ZRX paid to feeRecipient by maker when order is filled. If set to 0, no transfer of ZRX from maker to feeRecipient will be attempted.\n        uint256 takerFee;               // Amount of ZRX paid to feeRecipient by taker when order is filled. If set to 0, no transfer of ZRX from taker to feeRecipient will be attempted.\n        uint256 expirationTimeSeconds;  // Timestamp in seconds at which order expires.          \n        uint256 salt;                   // Arbitrary number to facilitate uniqueness of the order's hash.     \n        bytes makerAssetData;           // Encoded data that can be decoded by a specified proxy contract when transferring makerAsset. The last byte references the id of this proxy.\n        bytes takerAssetData;           // Encoded data that can be decoded by a specified proxy contract when transferring takerAsset. The last byte references the id of this proxy.\n    }\n\n    struct OrderInfo {\n        uint8 orderStatus;                    // Status that describes order's validity and fillability.\n        bytes32 orderHash;                    // EIP712 hash of the order (see LibOrder.getOrderHash).\n        uint256 orderTakerAssetFilledAmount;  // Amount of order that has already been filled.\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
    "exportedSymbols": {
      "LibOrder": [
        4379
      ]
    },
    "id": 4380,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4314,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:31"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibEIP712.sol",
        "file": "./LibEIP712.sol",
        "id": 4315,
        "nodeType": "ImportDirective",
        "scope": 4380,
        "sourceUnit": 4294,
        "src": "606:25:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4316,
              "name": "LibEIP712",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4293,
              "src": "658:9:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibEIP712_$4293",
                "typeString": "contract LibEIP712"
              }
            },
            "id": 4317,
            "nodeType": "InheritanceSpecifier",
            "src": "658:9:31"
          }
        ],
        "contractDependencies": [
          4293
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4379,
        "linearizedBaseContracts": [
          4379,
          4293
        ],
        "name": "LibOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4338,
            "name": "EIP712_ORDER_SCHEMA_HASH",
            "nodeType": "VariableDeclaration",
            "scope": 4379,
            "src": "715:512:31",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes32",
              "typeString": "bytes32"
            },
            "typeName": {
              "id": 4318,
              "name": "bytes32",
              "nodeType": "ElementaryTypeName",
              "src": "715:7:31",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes32",
                "typeString": "bytes32"
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
                      "hexValue": "4f7264657228",
                      "id": 4322,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "795:8:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_2e914b43d8d6cbd999d1f030ee624f48df0ba3eae96befa67ebf4e808f3fc00d",
                        "typeString": "literal_string \"Order(\""
                      },
                      "value": "Order("
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "61646472657373206d616b6572416464726573732c",
                      "id": 4323,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "813:23:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_4473d6bfe4ebb95adbc99de87da4c9bc7cd057081c9b700e9455d948e9367f5e",
                        "typeString": "literal_string \"address makerAddress,\""
                      },
                      "value": "address makerAddress,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "616464726573732074616b6572416464726573732c",
                      "id": 4324,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "846:23:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_f21d8246542e267aa46dc521185afae73af2544d51216dc637f0d1f6895e3f31",
                        "typeString": "literal_string \"address takerAddress,\""
                      },
                      "value": "address takerAddress,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "6164647265737320666565526563697069656e74416464726573732c",
                      "id": 4325,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "879:30:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_c4da4ab41c527067cec8fef915f269e1d7835444314c79128d687227d5ad73f1",
                        "typeString": "literal_string \"address feeRecipientAddress,\""
                      },
                      "value": "address feeRecipientAddress,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "616464726573732073656e646572416464726573732c",
                      "id": 4326,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "919:24:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_2b22b1cebda17126b7e2811dd8ebe1ddfe797a62c0da88b3560b631948c59023",
                        "typeString": "literal_string \"address senderAddress,\""
                      },
                      "value": "address senderAddress,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e74323536206d616b65724173736574416d6f756e742c",
                      "id": 4327,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "953:27:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_1aef8eb6c7121e41c8bb564ddaa21c6b9a4103570bdfcf830875929e5d6dc831",
                        "typeString": "literal_string \"uint256 makerAssetAmount,\""
                      },
                      "value": "uint256 makerAssetAmount,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e743235362074616b65724173736574416d6f756e742c",
                      "id": 4328,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "990:27:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_f8b68280cabe94322831379a09e5699174f4d5c893f150c6409072f972f8564b",
                        "typeString": "literal_string \"uint256 takerAssetAmount,\""
                      },
                      "value": "uint256 takerAssetAmount,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e74323536206d616b65724665652c",
                      "id": 4329,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1027:19:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_aa8715591952c835f0dd09e2bae1450169b7cc41fdff29bae99cd01c79da5ed6",
                        "typeString": "literal_string \"uint256 makerFee,\""
                      },
                      "value": "uint256 makerFee,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e743235362074616b65724665652c",
                      "id": 4330,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1056:19:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_5a734be3c8124642e770da0bdfa84455c76aa67295fd66a509f044d69c633a04",
                        "typeString": "literal_string \"uint256 takerFee,\""
                      },
                      "value": "uint256 takerFee,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e743235362065787069726174696f6e54696d655365636f6e64732c",
                      "id": 4331,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1085:32:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_f3e2cd1e28eaf3127300820a3dbcd3ce36c49feb902d08d62e76a67540d654e1",
                        "typeString": "literal_string \"uint256 expirationTimeSeconds,\""
                      },
                      "value": "uint256 expirationTimeSeconds,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e743235362073616c742c",
                      "id": 4332,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1127:15:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_7afce5645cc56fac870e2fe75e80ac27df3fcb6cd3912779279ab14e789c90b9",
                        "typeString": "literal_string \"uint256 salt,\""
                      },
                      "value": "uint256 salt,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "6279746573206d616b65724173736574446174612c",
                      "id": 4333,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1152:23:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_430ecb0220b77b3fe494fd1d8f3c61b4234b47d6dd34e1ac5dec4ffc7074cb17",
                        "typeString": "literal_string \"bytes makerAssetData,\""
                      },
                      "value": "bytes makerAssetData,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "62797465732074616b6572417373657444617461",
                      "id": 4334,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1185:22:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_4ef906dc7bc9115c00c0fba41a6aa96c6082d8a27fa4550ba4e5b17f0aab6dcb",
                        "typeString": "literal_string \"bytes takerAssetData\""
                      },
                      "value": "bytes takerAssetData"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "29",
                      "id": 4335,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1217:3:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_59d76dc3b33357eda30db1508968fbb18f21b9cd2442f1559b20154ddaa4d7ed",
                        "typeString": "literal_string \")\""
                      },
                      "value": ")"
                    }
                  ],
                  "expression": {
                    "argumentTypes": [
                      {
                        "typeIdentifier": "t_stringliteral_2e914b43d8d6cbd999d1f030ee624f48df0ba3eae96befa67ebf4e808f3fc00d",
                        "typeString": "literal_string \"Order(\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_4473d6bfe4ebb95adbc99de87da4c9bc7cd057081c9b700e9455d948e9367f5e",
                        "typeString": "literal_string \"address makerAddress,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_f21d8246542e267aa46dc521185afae73af2544d51216dc637f0d1f6895e3f31",
                        "typeString": "literal_string \"address takerAddress,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_c4da4ab41c527067cec8fef915f269e1d7835444314c79128d687227d5ad73f1",
                        "typeString": "literal_string \"address feeRecipientAddress,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_2b22b1cebda17126b7e2811dd8ebe1ddfe797a62c0da88b3560b631948c59023",
                        "typeString": "literal_string \"address senderAddress,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_1aef8eb6c7121e41c8bb564ddaa21c6b9a4103570bdfcf830875929e5d6dc831",
                        "typeString": "literal_string \"uint256 makerAssetAmount,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_f8b68280cabe94322831379a09e5699174f4d5c893f150c6409072f972f8564b",
                        "typeString": "literal_string \"uint256 takerAssetAmount,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_aa8715591952c835f0dd09e2bae1450169b7cc41fdff29bae99cd01c79da5ed6",
                        "typeString": "literal_string \"uint256 makerFee,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_5a734be3c8124642e770da0bdfa84455c76aa67295fd66a509f044d69c633a04",
                        "typeString": "literal_string \"uint256 takerFee,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_f3e2cd1e28eaf3127300820a3dbcd3ce36c49feb902d08d62e76a67540d654e1",
                        "typeString": "literal_string \"uint256 expirationTimeSeconds,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_7afce5645cc56fac870e2fe75e80ac27df3fcb6cd3912779279ab14e789c90b9",
                        "typeString": "literal_string \"uint256 salt,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_430ecb0220b77b3fe494fd1d8f3c61b4234b47d6dd34e1ac5dec4ffc7074cb17",
                        "typeString": "literal_string \"bytes makerAssetData,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_4ef906dc7bc9115c00c0fba41a6aa96c6082d8a27fa4550ba4e5b17f0aab6dcb",
                        "typeString": "literal_string \"bytes takerAssetData\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_59d76dc3b33357eda30db1508968fbb18f21b9cd2442f1559b20154ddaa4d7ed",
                        "typeString": "literal_string \")\""
                      }
                    ],
                    "expression": {
                      "argumentTypes": null,
                      "id": 4320,
                      "name": "abi",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7057,
                      "src": "769:3:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_abi",
                        "typeString": "abi"
                      }
                    },
                    "id": 4321,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "lValueRequested": false,
                    "memberName": "encodePacked",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "769:16:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                      "typeString": "function () pure returns (bytes memory)"
                    }
                  },
                  "id": 4336,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "769:457:31",
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
                "id": 4319,
                "name": "keccak256",
                "nodeType": "Identifier",
                "overloadedDeclarations": [],
                "referencedDeclaration": 7064,
                "src": "759:9:31",
                "typeDescriptions": {
                  "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                  "typeString": "function () pure returns (bytes32)"
                }
              },
              "id": 4337,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "functionCall",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "759:468:31",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes32",
                "typeString": "bytes32"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "LibOrder.OrderStatus",
            "id": 4346,
            "members": [
              {
                "id": 4339,
                "name": "INVALID",
                "nodeType": "EnumValue",
                "src": "1430:7:31"
              },
              {
                "id": 4340,
                "name": "INVALID_MAKER_ASSET_AMOUNT",
                "nodeType": "EnumValue",
                "src": "1484:26:31"
              },
              {
                "id": 4341,
                "name": "INVALID_TAKER_ASSET_AMOUNT",
                "nodeType": "EnumValue",
                "src": "1571:26:31"
              },
              {
                "id": 4342,
                "name": "FILLABLE",
                "nodeType": "EnumValue",
                "src": "1658:8:31"
              },
              {
                "id": 4343,
                "name": "EXPIRED",
                "nodeType": "EnumValue",
                "src": "1716:7:31"
              },
              {
                "id": 4344,
                "name": "FULLY_FILLED",
                "nodeType": "EnumValue",
                "src": "1782:12:31"
              },
              {
                "id": 4345,
                "name": "CANCELLED",
                "nodeType": "EnumValue",
                "src": "1844:9:31"
              }
            ],
            "name": "OrderStatus",
            "nodeType": "EnumDefinition",
            "src": "1403:503:31"
          },
          {
            "canonicalName": "LibOrder.Order",
            "id": 4371,
            "members": [
              {
                "constant": false,
                "id": 4348,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "1935:20:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4347,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1935:7:31",
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
                "id": 4350,
                "name": "takerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2016:20:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4349,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2016:7:31",
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
                "id": 4352,
                "name": "feeRecipientAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2167:27:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4351,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2167:7:31",
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
                "id": 4354,
                "name": "senderAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2269:21:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4353,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2269:7:31",
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
                "id": 4356,
                "name": "makerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2453:24:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4355,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2453:7:31",
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
                "id": 4358,
                "name": "takerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2573:24:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4357,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2573:7:31",
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
                "id": 4360,
                "name": "makerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2692:16:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4359,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2692:7:31",
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
                "id": 4362,
                "name": "takerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2879:16:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4361,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2879:7:31",
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
                "id": 4364,
                "name": "expirationTimeSeconds",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "3066:29:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4363,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3066:7:31",
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
                "id": 4366,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "3164:12:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4365,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3164:7:31",
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
                "id": 4368,
                "name": "makerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "3275:20:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 4367,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "3275:5:31",
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
                "id": 4370,
                "name": "takerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "3458:20:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 4369,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "3458:5:31",
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
            "scope": 4379,
            "src": "1912:1726:31",
            "visibility": "public"
          },
          {
            "canonicalName": "LibOrder.OrderInfo",
            "id": 4378,
            "members": [
              {
                "constant": false,
                "id": 4373,
                "name": "orderStatus",
                "nodeType": "VariableDeclaration",
                "scope": 4378,
                "src": "3671:17:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint8",
                  "typeString": "uint8"
                },
                "typeName": {
                  "id": 4372,
                  "name": "uint8",
                  "nodeType": "ElementaryTypeName",
                  "src": "3671:5:31",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4375,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 4378,
                "src": "3776:17:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 4374,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "3776:7:31",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4377,
                "name": "orderTakerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4378,
                "src": "3879:35:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4376,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3879:7:31",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "OrderInfo",
            "nodeType": "StructDefinition",
            "scope": 4379,
            "src": "3644:327:31",
            "visibility": "public"
          }
        ],
        "scope": 4380,
        "src": "633:3340:31"
      }
    ],
    "src": "580:3394:31"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
    "exportedSymbols": {
      "LibOrder": [
        4379
      ]
    },
    "id": 4380,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4314,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:31"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibEIP712.sol",
        "file": "./LibEIP712.sol",
        "id": 4315,
        "nodeType": "ImportDirective",
        "scope": 4380,
        "sourceUnit": 4294,
        "src": "606:25:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4316,
              "name": "LibEIP712",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4293,
              "src": "658:9:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibEIP712_$4293",
                "typeString": "contract LibEIP712"
              }
            },
            "id": 4317,
            "nodeType": "InheritanceSpecifier",
            "src": "658:9:31"
          }
        ],
        "contractDependencies": [
          4293
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4379,
        "linearizedBaseContracts": [
          4379,
          4293
        ],
        "name": "LibOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4338,
            "name": "EIP712_ORDER_SCHEMA_HASH",
            "nodeType": "VariableDeclaration",
            "scope": 4379,
            "src": "715:512:31",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes32",
              "typeString": "bytes32"
            },
            "typeName": {
              "id": 4318,
              "name": "bytes32",
              "nodeType": "ElementaryTypeName",
              "src": "715:7:31",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes32",
                "typeString": "bytes32"
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
                      "hexValue": "4f7264657228",
                      "id": 4322,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "795:8:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_2e914b43d8d6cbd999d1f030ee624f48df0ba3eae96befa67ebf4e808f3fc00d",
                        "typeString": "literal_string \"Order(\""
                      },
                      "value": "Order("
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "61646472657373206d616b6572416464726573732c",
                      "id": 4323,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "813:23:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_4473d6bfe4ebb95adbc99de87da4c9bc7cd057081c9b700e9455d948e9367f5e",
                        "typeString": "literal_string \"address makerAddress,\""
                      },
                      "value": "address makerAddress,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "616464726573732074616b6572416464726573732c",
                      "id": 4324,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "846:23:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_f21d8246542e267aa46dc521185afae73af2544d51216dc637f0d1f6895e3f31",
                        "typeString": "literal_string \"address takerAddress,\""
                      },
                      "value": "address takerAddress,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "6164647265737320666565526563697069656e74416464726573732c",
                      "id": 4325,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "879:30:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_c4da4ab41c527067cec8fef915f269e1d7835444314c79128d687227d5ad73f1",
                        "typeString": "literal_string \"address feeRecipientAddress,\""
                      },
                      "value": "address feeRecipientAddress,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "616464726573732073656e646572416464726573732c",
                      "id": 4326,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "919:24:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_2b22b1cebda17126b7e2811dd8ebe1ddfe797a62c0da88b3560b631948c59023",
                        "typeString": "literal_string \"address senderAddress,\""
                      },
                      "value": "address senderAddress,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e74323536206d616b65724173736574416d6f756e742c",
                      "id": 4327,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "953:27:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_1aef8eb6c7121e41c8bb564ddaa21c6b9a4103570bdfcf830875929e5d6dc831",
                        "typeString": "literal_string \"uint256 makerAssetAmount,\""
                      },
                      "value": "uint256 makerAssetAmount,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e743235362074616b65724173736574416d6f756e742c",
                      "id": 4328,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "990:27:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_f8b68280cabe94322831379a09e5699174f4d5c893f150c6409072f972f8564b",
                        "typeString": "literal_string \"uint256 takerAssetAmount,\""
                      },
                      "value": "uint256 takerAssetAmount,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e74323536206d616b65724665652c",
                      "id": 4329,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1027:19:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_aa8715591952c835f0dd09e2bae1450169b7cc41fdff29bae99cd01c79da5ed6",
                        "typeString": "literal_string \"uint256 makerFee,\""
                      },
                      "value": "uint256 makerFee,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e743235362074616b65724665652c",
                      "id": 4330,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1056:19:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_5a734be3c8124642e770da0bdfa84455c76aa67295fd66a509f044d69c633a04",
                        "typeString": "literal_string \"uint256 takerFee,\""
                      },
                      "value": "uint256 takerFee,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e743235362065787069726174696f6e54696d655365636f6e64732c",
                      "id": 4331,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1085:32:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_f3e2cd1e28eaf3127300820a3dbcd3ce36c49feb902d08d62e76a67540d654e1",
                        "typeString": "literal_string \"uint256 expirationTimeSeconds,\""
                      },
                      "value": "uint256 expirationTimeSeconds,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "75696e743235362073616c742c",
                      "id": 4332,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1127:15:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_7afce5645cc56fac870e2fe75e80ac27df3fcb6cd3912779279ab14e789c90b9",
                        "typeString": "literal_string \"uint256 salt,\""
                      },
                      "value": "uint256 salt,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "6279746573206d616b65724173736574446174612c",
                      "id": 4333,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1152:23:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_430ecb0220b77b3fe494fd1d8f3c61b4234b47d6dd34e1ac5dec4ffc7074cb17",
                        "typeString": "literal_string \"bytes makerAssetData,\""
                      },
                      "value": "bytes makerAssetData,"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "62797465732074616b6572417373657444617461",
                      "id": 4334,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1185:22:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_4ef906dc7bc9115c00c0fba41a6aa96c6082d8a27fa4550ba4e5b17f0aab6dcb",
                        "typeString": "literal_string \"bytes takerAssetData\""
                      },
                      "value": "bytes takerAssetData"
                    },
                    {
                      "argumentTypes": null,
                      "hexValue": "29",
                      "id": 4335,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1217:3:31",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_59d76dc3b33357eda30db1508968fbb18f21b9cd2442f1559b20154ddaa4d7ed",
                        "typeString": "literal_string \")\""
                      },
                      "value": ")"
                    }
                  ],
                  "expression": {
                    "argumentTypes": [
                      {
                        "typeIdentifier": "t_stringliteral_2e914b43d8d6cbd999d1f030ee624f48df0ba3eae96befa67ebf4e808f3fc00d",
                        "typeString": "literal_string \"Order(\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_4473d6bfe4ebb95adbc99de87da4c9bc7cd057081c9b700e9455d948e9367f5e",
                        "typeString": "literal_string \"address makerAddress,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_f21d8246542e267aa46dc521185afae73af2544d51216dc637f0d1f6895e3f31",
                        "typeString": "literal_string \"address takerAddress,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_c4da4ab41c527067cec8fef915f269e1d7835444314c79128d687227d5ad73f1",
                        "typeString": "literal_string \"address feeRecipientAddress,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_2b22b1cebda17126b7e2811dd8ebe1ddfe797a62c0da88b3560b631948c59023",
                        "typeString": "literal_string \"address senderAddress,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_1aef8eb6c7121e41c8bb564ddaa21c6b9a4103570bdfcf830875929e5d6dc831",
                        "typeString": "literal_string \"uint256 makerAssetAmount,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_f8b68280cabe94322831379a09e5699174f4d5c893f150c6409072f972f8564b",
                        "typeString": "literal_string \"uint256 takerAssetAmount,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_aa8715591952c835f0dd09e2bae1450169b7cc41fdff29bae99cd01c79da5ed6",
                        "typeString": "literal_string \"uint256 makerFee,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_5a734be3c8124642e770da0bdfa84455c76aa67295fd66a509f044d69c633a04",
                        "typeString": "literal_string \"uint256 takerFee,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_f3e2cd1e28eaf3127300820a3dbcd3ce36c49feb902d08d62e76a67540d654e1",
                        "typeString": "literal_string \"uint256 expirationTimeSeconds,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_7afce5645cc56fac870e2fe75e80ac27df3fcb6cd3912779279ab14e789c90b9",
                        "typeString": "literal_string \"uint256 salt,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_430ecb0220b77b3fe494fd1d8f3c61b4234b47d6dd34e1ac5dec4ffc7074cb17",
                        "typeString": "literal_string \"bytes makerAssetData,\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_4ef906dc7bc9115c00c0fba41a6aa96c6082d8a27fa4550ba4e5b17f0aab6dcb",
                        "typeString": "literal_string \"bytes takerAssetData\""
                      },
                      {
                        "typeIdentifier": "t_stringliteral_59d76dc3b33357eda30db1508968fbb18f21b9cd2442f1559b20154ddaa4d7ed",
                        "typeString": "literal_string \")\""
                      }
                    ],
                    "expression": {
                      "argumentTypes": null,
                      "id": 4320,
                      "name": "abi",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7057,
                      "src": "769:3:31",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_abi",
                        "typeString": "abi"
                      }
                    },
                    "id": 4321,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "lValueRequested": false,
                    "memberName": "encodePacked",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "769:16:31",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                      "typeString": "function () pure returns (bytes memory)"
                    }
                  },
                  "id": 4336,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "769:457:31",
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
                "id": 4319,
                "name": "keccak256",
                "nodeType": "Identifier",
                "overloadedDeclarations": [],
                "referencedDeclaration": 7064,
                "src": "759:9:31",
                "typeDescriptions": {
                  "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                  "typeString": "function () pure returns (bytes32)"
                }
              },
              "id": 4337,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "functionCall",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "759:468:31",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes32",
                "typeString": "bytes32"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "LibOrder.OrderStatus",
            "id": 4346,
            "members": [
              {
                "id": 4339,
                "name": "INVALID",
                "nodeType": "EnumValue",
                "src": "1430:7:31"
              },
              {
                "id": 4340,
                "name": "INVALID_MAKER_ASSET_AMOUNT",
                "nodeType": "EnumValue",
                "src": "1484:26:31"
              },
              {
                "id": 4341,
                "name": "INVALID_TAKER_ASSET_AMOUNT",
                "nodeType": "EnumValue",
                "src": "1571:26:31"
              },
              {
                "id": 4342,
                "name": "FILLABLE",
                "nodeType": "EnumValue",
                "src": "1658:8:31"
              },
              {
                "id": 4343,
                "name": "EXPIRED",
                "nodeType": "EnumValue",
                "src": "1716:7:31"
              },
              {
                "id": 4344,
                "name": "FULLY_FILLED",
                "nodeType": "EnumValue",
                "src": "1782:12:31"
              },
              {
                "id": 4345,
                "name": "CANCELLED",
                "nodeType": "EnumValue",
                "src": "1844:9:31"
              }
            ],
            "name": "OrderStatus",
            "nodeType": "EnumDefinition",
            "src": "1403:503:31"
          },
          {
            "canonicalName": "LibOrder.Order",
            "id": 4371,
            "members": [
              {
                "constant": false,
                "id": 4348,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "1935:20:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4347,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1935:7:31",
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
                "id": 4350,
                "name": "takerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2016:20:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4349,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2016:7:31",
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
                "id": 4352,
                "name": "feeRecipientAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2167:27:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4351,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2167:7:31",
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
                "id": 4354,
                "name": "senderAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2269:21:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4353,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2269:7:31",
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
                "id": 4356,
                "name": "makerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2453:24:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4355,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2453:7:31",
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
                "id": 4358,
                "name": "takerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2573:24:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4357,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2573:7:31",
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
                "id": 4360,
                "name": "makerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2692:16:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4359,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2692:7:31",
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
                "id": 4362,
                "name": "takerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "2879:16:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4361,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2879:7:31",
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
                "id": 4364,
                "name": "expirationTimeSeconds",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "3066:29:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4363,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3066:7:31",
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
                "id": 4366,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "3164:12:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4365,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3164:7:31",
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
                "id": 4368,
                "name": "makerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "3275:20:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 4367,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "3275:5:31",
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
                "id": 4370,
                "name": "takerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 4371,
                "src": "3458:20:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 4369,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "3458:5:31",
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
            "scope": 4379,
            "src": "1912:1726:31",
            "visibility": "public"
          },
          {
            "canonicalName": "LibOrder.OrderInfo",
            "id": 4378,
            "members": [
              {
                "constant": false,
                "id": 4373,
                "name": "orderStatus",
                "nodeType": "VariableDeclaration",
                "scope": 4378,
                "src": "3671:17:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint8",
                  "typeString": "uint8"
                },
                "typeName": {
                  "id": 4372,
                  "name": "uint8",
                  "nodeType": "ElementaryTypeName",
                  "src": "3671:5:31",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4375,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 4378,
                "src": "3776:17:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 4374,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "3776:7:31",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 4377,
                "name": "orderTakerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4378,
                "src": "3879:35:31",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4376,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3879:7:31",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "OrderInfo",
            "nodeType": "StructDefinition",
            "scope": 4379,
            "src": "3644:327:31",
            "visibility": "public"
          }
        ],
        "scope": 4380,
        "src": "633:3340:31"
      }
    ],
    "src": "580:3394:31"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-25T17:34:39.503Z"
}
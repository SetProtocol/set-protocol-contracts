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
  "sourceMap": "633:3340:44:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;633:3340:44;;;;;;;",
  "deployedSourceMap": "633:3340:44:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;943:221:41;;8:9:-1;5:2;;;30:1;27;20:12;5:2;943:221:41;;;;;;;;;;;;;;;;;;;;1219:33;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1219:33:41;;;;943:221;1015:148;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;22:32:-1;26:21;;;22:32;6:49;;1015:148:41;;;;;;;;1005:159;;1015:148;;;;;1005:159;;;;1015:148;1005:159;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;1005:159:41;;;;;;;;;;;;;;;;943:221;:::o;1219:33::-;;;;:::o",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\n\nimport \"./LibEIP712.sol\";\n\ncontract LibOrder is\n    LibEIP712\n{\n\n    // Hash for the EIP712 Order Schema\n    bytes32 constant EIP712_ORDER_SCHEMA_HASH = keccak256(abi.encodePacked(\n        \"Order(\",\n        \"address makerAddress,\",\n        \"address takerAddress,\",\n        \"address feeRecipientAddress,\",\n        \"address senderAddress,\",\n        \"uint256 makerAssetAmount,\",\n        \"uint256 takerAssetAmount,\",\n        \"uint256 makerFee,\",\n        \"uint256 takerFee,\",\n        \"uint256 expirationTimeSeconds,\",\n        \"uint256 salt,\",\n        \"bytes makerAssetData,\",\n        \"bytes takerAssetData\",\n        \")\"\n    ));\n\n    // A valid order remains fillable until it is expired, fully filled, or cancelled.\n    // An order's state is unaffected by external factors, like account balances.\n    enum OrderStatus {\n        INVALID,                     // Default value\n        INVALID_MAKER_ASSET_AMOUNT,  // Order does not have a valid maker asset amount\n        INVALID_TAKER_ASSET_AMOUNT,  // Order does not have a valid taker asset amount\n        FILLABLE,                    // Order is fillable\n        EXPIRED,                     // Order has already expired\n        FULLY_FILLED,                // Order is fully filled\n        CANCELLED                    // Order has been cancelled\n    }\n\n    struct Order {\n        address makerAddress;           // Address that created the order.      \n        address takerAddress;           // Address that is allowed to fill the order. If set to 0, any address is allowed to fill the order.          \n        address feeRecipientAddress;    // Address that will recieve fees when order is filled.      \n        address senderAddress;          // Address that is allowed to call Exchange contract methods that affect this order. If set to 0, any address is allowed to call these methods.\n        uint256 makerAssetAmount;       // Amount of makerAsset being offered by maker. Must be greater than 0.        \n        uint256 takerAssetAmount;       // Amount of takerAsset being bid on by maker. Must be greater than 0.        \n        uint256 makerFee;               // Amount of ZRX paid to feeRecipient by maker when order is filled. If set to 0, no transfer of ZRX from maker to feeRecipient will be attempted.\n        uint256 takerFee;               // Amount of ZRX paid to feeRecipient by taker when order is filled. If set to 0, no transfer of ZRX from taker to feeRecipient will be attempted.\n        uint256 expirationTimeSeconds;  // Timestamp in seconds at which order expires.          \n        uint256 salt;                   // Arbitrary number to facilitate uniqueness of the order's hash.     \n        bytes makerAssetData;           // Encoded data that can be decoded by a specified proxy contract when transferring makerAsset. The last byte references the id of this proxy.\n        bytes takerAssetData;           // Encoded data that can be decoded by a specified proxy contract when transferring takerAsset. The last byte references the id of this proxy.\n    }\n\n    struct OrderInfo {\n        uint8 orderStatus;                    // Status that describes order's validity and fillability.\n        bytes32 orderHash;                    // EIP712 hash of the order (see LibOrder.getOrderHash).\n        uint256 orderTakerAssetFilledAmount;  // Amount of order that has already been filled.\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
    "exportedSymbols": {
      "LibOrder": [
        4643
      ]
    },
    "id": 4644,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4578,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:44"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibEIP712.sol",
        "file": "./LibEIP712.sol",
        "id": 4579,
        "nodeType": "ImportDirective",
        "scope": 4644,
        "sourceUnit": 4480,
        "src": "606:25:44",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4580,
              "name": "LibEIP712",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4479,
              "src": "658:9:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibEIP712_$4479",
                "typeString": "contract LibEIP712"
              }
            },
            "id": 4581,
            "nodeType": "InheritanceSpecifier",
            "src": "658:9:44"
          }
        ],
        "contractDependencies": [
          4479
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4643,
        "linearizedBaseContracts": [
          4643,
          4479
        ],
        "name": "LibOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4602,
            "name": "EIP712_ORDER_SCHEMA_HASH",
            "nodeType": "VariableDeclaration",
            "scope": 4643,
            "src": "715:512:44",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes32",
              "typeString": "bytes32"
            },
            "typeName": {
              "id": 4582,
              "name": "bytes32",
              "nodeType": "ElementaryTypeName",
              "src": "715:7:44",
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
                      "id": 4586,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "795:8:44",
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
                      "id": 4587,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "813:23:44",
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
                      "id": 4588,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "846:23:44",
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
                      "id": 4589,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "879:30:44",
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
                      "id": 4590,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "919:24:44",
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
                      "id": 4591,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "953:27:44",
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
                      "id": 4592,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "990:27:44",
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
                      "id": 4593,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1027:19:44",
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
                      "id": 4594,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1056:19:44",
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
                      "id": 4595,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1085:32:44",
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
                      "id": 4596,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1127:15:44",
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
                      "id": 4597,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1152:23:44",
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
                      "id": 4598,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1185:22:44",
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
                      "id": 4599,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1217:3:44",
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
                      "id": 4584,
                      "name": "abi",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7242,
                      "src": "769:3:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_abi",
                        "typeString": "abi"
                      }
                    },
                    "id": 4585,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "lValueRequested": false,
                    "memberName": "encodePacked",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "769:16:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                      "typeString": "function () pure returns (bytes memory)"
                    }
                  },
                  "id": 4600,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "769:457:44",
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
                "id": 4583,
                "name": "keccak256",
                "nodeType": "Identifier",
                "overloadedDeclarations": [],
                "referencedDeclaration": 7249,
                "src": "759:9:44",
                "typeDescriptions": {
                  "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                  "typeString": "function () pure returns (bytes32)"
                }
              },
              "id": 4601,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "functionCall",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "759:468:44",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes32",
                "typeString": "bytes32"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "LibOrder.OrderStatus",
            "id": 4610,
            "members": [
              {
                "id": 4603,
                "name": "INVALID",
                "nodeType": "EnumValue",
                "src": "1430:7:44"
              },
              {
                "id": 4604,
                "name": "INVALID_MAKER_ASSET_AMOUNT",
                "nodeType": "EnumValue",
                "src": "1484:26:44"
              },
              {
                "id": 4605,
                "name": "INVALID_TAKER_ASSET_AMOUNT",
                "nodeType": "EnumValue",
                "src": "1571:26:44"
              },
              {
                "id": 4606,
                "name": "FILLABLE",
                "nodeType": "EnumValue",
                "src": "1658:8:44"
              },
              {
                "id": 4607,
                "name": "EXPIRED",
                "nodeType": "EnumValue",
                "src": "1716:7:44"
              },
              {
                "id": 4608,
                "name": "FULLY_FILLED",
                "nodeType": "EnumValue",
                "src": "1782:12:44"
              },
              {
                "id": 4609,
                "name": "CANCELLED",
                "nodeType": "EnumValue",
                "src": "1844:9:44"
              }
            ],
            "name": "OrderStatus",
            "nodeType": "EnumDefinition",
            "src": "1403:503:44"
          },
          {
            "canonicalName": "LibOrder.Order",
            "id": 4635,
            "members": [
              {
                "constant": false,
                "id": 4612,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "1935:20:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4611,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1935:7:44",
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
                "id": 4614,
                "name": "takerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2016:20:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4613,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2016:7:44",
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
                "id": 4616,
                "name": "feeRecipientAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2167:27:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4615,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2167:7:44",
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
                "id": 4618,
                "name": "senderAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2269:21:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4617,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2269:7:44",
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
                "id": 4620,
                "name": "makerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2453:24:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4619,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2453:7:44",
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
                "id": 4622,
                "name": "takerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2573:24:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4621,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2573:7:44",
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
                "id": 4624,
                "name": "makerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2692:16:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4623,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2692:7:44",
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
                "id": 4626,
                "name": "takerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2879:16:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4625,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2879:7:44",
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
                "id": 4628,
                "name": "expirationTimeSeconds",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "3066:29:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4627,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3066:7:44",
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
                "id": 4630,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "3164:12:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4629,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3164:7:44",
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
                "id": 4632,
                "name": "makerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "3275:20:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 4631,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "3275:5:44",
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
                "id": 4634,
                "name": "takerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "3458:20:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 4633,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "3458:5:44",
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
            "scope": 4643,
            "src": "1912:1726:44",
            "visibility": "public"
          },
          {
            "canonicalName": "LibOrder.OrderInfo",
            "id": 4642,
            "members": [
              {
                "constant": false,
                "id": 4637,
                "name": "orderStatus",
                "nodeType": "VariableDeclaration",
                "scope": 4642,
                "src": "3671:17:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint8",
                  "typeString": "uint8"
                },
                "typeName": {
                  "id": 4636,
                  "name": "uint8",
                  "nodeType": "ElementaryTypeName",
                  "src": "3671:5:44",
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
                "id": 4639,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 4642,
                "src": "3776:17:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 4638,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "3776:7:44",
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
                "id": 4641,
                "name": "orderTakerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4642,
                "src": "3879:35:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4640,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3879:7:44",
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
            "scope": 4643,
            "src": "3644:327:44",
            "visibility": "public"
          }
        ],
        "scope": 4644,
        "src": "633:3340:44"
      }
    ],
    "src": "580:3394:44"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibOrder.sol",
    "exportedSymbols": {
      "LibOrder": [
        4643
      ]
    },
    "id": 4644,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4578,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:44"
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibEIP712.sol",
        "file": "./LibEIP712.sol",
        "id": 4579,
        "nodeType": "ImportDirective",
        "scope": 4644,
        "sourceUnit": 4480,
        "src": "606:25:44",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4580,
              "name": "LibEIP712",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4479,
              "src": "658:9:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_LibEIP712_$4479",
                "typeString": "contract LibEIP712"
              }
            },
            "id": 4581,
            "nodeType": "InheritanceSpecifier",
            "src": "658:9:44"
          }
        ],
        "contractDependencies": [
          4479
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4643,
        "linearizedBaseContracts": [
          4643,
          4479
        ],
        "name": "LibOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4602,
            "name": "EIP712_ORDER_SCHEMA_HASH",
            "nodeType": "VariableDeclaration",
            "scope": 4643,
            "src": "715:512:44",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes32",
              "typeString": "bytes32"
            },
            "typeName": {
              "id": 4582,
              "name": "bytes32",
              "nodeType": "ElementaryTypeName",
              "src": "715:7:44",
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
                      "id": 4586,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "795:8:44",
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
                      "id": 4587,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "813:23:44",
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
                      "id": 4588,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "846:23:44",
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
                      "id": 4589,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "879:30:44",
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
                      "id": 4590,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "919:24:44",
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
                      "id": 4591,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "953:27:44",
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
                      "id": 4592,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "990:27:44",
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
                      "id": 4593,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1027:19:44",
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
                      "id": 4594,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1056:19:44",
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
                      "id": 4595,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1085:32:44",
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
                      "id": 4596,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1127:15:44",
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
                      "id": 4597,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1152:23:44",
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
                      "id": 4598,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1185:22:44",
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
                      "id": 4599,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1217:3:44",
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
                      "id": 4584,
                      "name": "abi",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7242,
                      "src": "769:3:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_abi",
                        "typeString": "abi"
                      }
                    },
                    "id": 4585,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "lValueRequested": false,
                    "memberName": "encodePacked",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "769:16:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                      "typeString": "function () pure returns (bytes memory)"
                    }
                  },
                  "id": 4600,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "kind": "functionCall",
                  "lValueRequested": false,
                  "names": [],
                  "nodeType": "FunctionCall",
                  "src": "769:457:44",
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
                "id": 4583,
                "name": "keccak256",
                "nodeType": "Identifier",
                "overloadedDeclarations": [],
                "referencedDeclaration": 7249,
                "src": "759:9:44",
                "typeDescriptions": {
                  "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                  "typeString": "function () pure returns (bytes32)"
                }
              },
              "id": 4601,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "functionCall",
              "lValueRequested": false,
              "names": [],
              "nodeType": "FunctionCall",
              "src": "759:468:44",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes32",
                "typeString": "bytes32"
              }
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "LibOrder.OrderStatus",
            "id": 4610,
            "members": [
              {
                "id": 4603,
                "name": "INVALID",
                "nodeType": "EnumValue",
                "src": "1430:7:44"
              },
              {
                "id": 4604,
                "name": "INVALID_MAKER_ASSET_AMOUNT",
                "nodeType": "EnumValue",
                "src": "1484:26:44"
              },
              {
                "id": 4605,
                "name": "INVALID_TAKER_ASSET_AMOUNT",
                "nodeType": "EnumValue",
                "src": "1571:26:44"
              },
              {
                "id": 4606,
                "name": "FILLABLE",
                "nodeType": "EnumValue",
                "src": "1658:8:44"
              },
              {
                "id": 4607,
                "name": "EXPIRED",
                "nodeType": "EnumValue",
                "src": "1716:7:44"
              },
              {
                "id": 4608,
                "name": "FULLY_FILLED",
                "nodeType": "EnumValue",
                "src": "1782:12:44"
              },
              {
                "id": 4609,
                "name": "CANCELLED",
                "nodeType": "EnumValue",
                "src": "1844:9:44"
              }
            ],
            "name": "OrderStatus",
            "nodeType": "EnumDefinition",
            "src": "1403:503:44"
          },
          {
            "canonicalName": "LibOrder.Order",
            "id": 4635,
            "members": [
              {
                "constant": false,
                "id": 4612,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "1935:20:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4611,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1935:7:44",
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
                "id": 4614,
                "name": "takerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2016:20:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4613,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2016:7:44",
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
                "id": 4616,
                "name": "feeRecipientAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2167:27:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4615,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2167:7:44",
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
                "id": 4618,
                "name": "senderAddress",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2269:21:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 4617,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2269:7:44",
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
                "id": 4620,
                "name": "makerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2453:24:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4619,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2453:7:44",
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
                "id": 4622,
                "name": "takerAssetAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2573:24:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4621,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2573:7:44",
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
                "id": 4624,
                "name": "makerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2692:16:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4623,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2692:7:44",
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
                "id": 4626,
                "name": "takerFee",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "2879:16:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4625,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2879:7:44",
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
                "id": 4628,
                "name": "expirationTimeSeconds",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "3066:29:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4627,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3066:7:44",
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
                "id": 4630,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "3164:12:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4629,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3164:7:44",
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
                "id": 4632,
                "name": "makerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "3275:20:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 4631,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "3275:5:44",
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
                "id": 4634,
                "name": "takerAssetData",
                "nodeType": "VariableDeclaration",
                "scope": 4635,
                "src": "3458:20:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes_storage_ptr",
                  "typeString": "bytes"
                },
                "typeName": {
                  "id": 4633,
                  "name": "bytes",
                  "nodeType": "ElementaryTypeName",
                  "src": "3458:5:44",
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
            "scope": 4643,
            "src": "1912:1726:44",
            "visibility": "public"
          },
          {
            "canonicalName": "LibOrder.OrderInfo",
            "id": 4642,
            "members": [
              {
                "constant": false,
                "id": 4637,
                "name": "orderStatus",
                "nodeType": "VariableDeclaration",
                "scope": 4642,
                "src": "3671:17:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint8",
                  "typeString": "uint8"
                },
                "typeName": {
                  "id": 4636,
                  "name": "uint8",
                  "nodeType": "ElementaryTypeName",
                  "src": "3671:5:44",
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
                "id": 4639,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 4642,
                "src": "3776:17:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 4638,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "3776:7:44",
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
                "id": 4641,
                "name": "orderTakerAssetFilledAmount",
                "nodeType": "VariableDeclaration",
                "scope": 4642,
                "src": "3879:35:44",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 4640,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "3879:7:44",
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
            "scope": 4643,
            "src": "3644:327:44",
            "visibility": "public"
          }
        ],
        "scope": 4644,
        "src": "633:3340:44"
      }
    ],
    "src": "580:3394:44"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.831Z"
}
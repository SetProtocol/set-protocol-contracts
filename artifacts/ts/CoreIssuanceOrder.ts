export const CoreIssuanceOrder = 
{
  "contractName": "CoreIssuanceOrder",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_factory",
          "type": "address"
        }
      ],
      "name": "validFactories",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_orderHash",
          "type": "bytes32"
        }
      ],
      "name": "orderCancels",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "vaultAddress",
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
      "name": "transferProxyAddress",
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
      "inputs": [
        {
          "name": "_exchangeId",
          "type": "uint8"
        }
      ],
      "name": "exchanges",
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
      "name": "state",
      "outputs": [
        {
          "name": "transferProxyAddress",
          "type": "address"
        },
        {
          "name": "vaultAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_orderHash",
          "type": "bytes32"
        }
      ],
      "name": "orderFills",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_set",
          "type": "address"
        }
      ],
      "name": "validSets",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_addresses",
          "type": "address[4]"
        },
        {
          "name": "_values",
          "type": "uint256[5]"
        },
        {
          "name": "_fillQuantity",
          "type": "uint256"
        },
        {
          "name": "_v",
          "type": "uint8"
        },
        {
          "name": "_r",
          "type": "bytes32"
        },
        {
          "name": "_s",
          "type": "bytes32"
        },
        {
          "name": "_orderData",
          "type": "bytes"
        }
      ],
      "name": "fillOrder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_addresses",
          "type": "address[4]"
        },
        {
          "name": "_values",
          "type": "uint256[5]"
        },
        {
          "name": "_cancelQuantity",
          "type": "uint256"
        }
      ],
      "name": "cancelOrder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ExchangeHandler } from \"../lib/ExchangeHandler.sol\";\nimport { ICoreIssuance } from \"../interfaces/ICoreIssuance.sol\";\nimport { LibBytes } from \"../../external/LibBytes.sol\";\nimport { OrderLibrary } from \"../lib/OrderLibrary.sol\";\n\n\n/**\n * @title CoreIssuanceOrder\n * @author Set Protocol\n *\n * The Core Issuance Order extension houses all functions related to the filling and\n * canceling issuance orders.\n *\n */\ncontract CoreIssuanceOrder is\n    ICoreIssuance,\n    CoreState,\n    CoreModifiers\n{\n    using SafeMath for uint256;\n\n    /* ============ Constants ============ */\n\n    uint256 constant HEADER_LENGTH = 64;\n\n    string constant INVALID_EXCHANGE = \"Exchange does not exist.\";\n    string constant INVALID_CANCEL_ORDER = \"Only maker can cancel order.\";\n    string constant INVALID_SIGNATURE = \"Invalid order signature.\";\n    string constant INVALID_TOKEN_AMOUNTS = \"Quantity and makerTokenAmount should be greater than 0.\";\n    string constant ORDER_EXPIRED = \"This order has expired.\";\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Fill an issuance order\n     *\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerToken]\n     * @param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _fillQuantity   Quantity of set to be filled\n     * @param  _v              v element of ECDSA signature\n     * @param  _r              r element of ECDSA signature\n     * @param  _s              s element of ECDSA signature\n     * @param _orderData       Bytes array containing the exchange orders to execute\n     */\n    function fillOrder(\n        address[4] _addresses,\n        uint[5] _values,\n        uint _fillQuantity,\n        uint8 _v,\n        bytes32 _r,\n        bytes32 _s,\n        bytes _orderData\n    )\n        external\n        isValidSet(_addresses[0])\n        isPositiveQuantity(_fillQuantity)\n        isNaturalUnitMultiple(_fillQuantity, _addresses[0])\n    {\n        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({\n            setAddress: _addresses[0],\n            quantity: _values[0],\n            makerAddress: _addresses[1],\n            makerToken: _addresses[2],\n            makerTokenAmount: _values[1],\n            expiration: _values[2],\n            relayerToken: _addresses[3],\n            relayerTokenAmount: _values[3],\n            salt: _values[4],\n            orderHash: OrderLibrary.generateOrderHash(\n                _addresses,\n                _values\n            )\n        });\n\n        // Verify order is valid and return amount to be filled\n        validateOrder(\n            order,\n            _fillQuantity\n        );\n\n        // Verify signature is authentic\n        require(\n            OrderLibrary.validateSignature(\n                order.orderHash,\n                order.makerAddress,\n                _v,\n                _r,\n                _s\n            ),\n            INVALID_SIGNATURE\n        );\n\n        // Execute exchange orders\n        executeExchangeOrders(_orderData);\n\n        // TO DO: When openOrder amount functionality added these must change\n        // Tally fill in orderFills mapping\n        state.orderFills[order.orderHash] = state.orderFills[order.orderHash].add(_fillQuantity);\n\n        //Issue Set\n        issueInternal(\n            order.makerAddress,\n            order.setAddress,\n            _fillQuantity\n        );\n    }\n\n    /**\n     * Cancel an issuance order\n     *\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerToken]\n     * @param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _cancelQuantity Quantity of set to be filled\n     */\n    function cancelOrder(\n        address[4] _addresses,\n        uint[5] _values,\n        uint _cancelQuantity\n    )\n        external\n        isPositiveQuantity(_cancelQuantity)\n    {\n        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({\n            setAddress: _addresses[0],\n            quantity: _values[0],\n            makerAddress: _addresses[1],\n            makerToken: _addresses[2],\n            makerTokenAmount: _values[1],\n            expiration: _values[2],\n            relayerToken: _addresses[3],\n            relayerTokenAmount: _values[3],\n            salt: _values[4],\n            orderHash: OrderLibrary.generateOrderHash(\n                _addresses,\n                _values\n            )\n        });\n\n        // Make sure cancel order comes from maker\n        require(order.makerAddress == msg.sender, INVALID_CANCEL_ORDER);\n\n        // Verify order is valid and return amount to be cancelled\n        validateOrder(\n            order,\n            _cancelQuantity\n        );\n\n        // TO DO: When openOrder amount functionality added these must change\n        // Tally cancel in orderCancels mapping\n        state.orderCancels[order.orderHash] = state.orderCancels[order.orderHash].add(_cancelQuantity);\n    }\n\n    /* ============ Private Functions ============ */\n\n    /**\n     * Execute the exchange orders by parsing the order data and facilitating the transfers\n     *\n     * @param _orderData   Bytes array containing the exchange orders to execute\n     */\n    function executeExchangeOrders(\n        bytes _orderData\n    )\n        private\n    {\n        uint256 scannedBytes;\n        while (scannedBytes < _orderData.length) {\n            // Read the next exchange order header\n            bytes memory headerData = LibBytes.slice(\n                _orderData,\n                scannedBytes,\n                scannedBytes.add(HEADER_LENGTH)\n            );\n            ExchangeHandler.OrderHeader memory header = ExchangeHandler.parseOrderHeader(\n                headerData\n            );\n\n            // Get exchange address from state mapping based on header exchange info\n            address exchange = state.exchanges[header.exchange];\n\n            // Verify exchange address is registered\n            require(\n                exchange != address(0),\n                INVALID_EXCHANGE\n            );\n\n            // Read the order body based on header order length info\n            uint256 orderLength = header.orderLength.add(HEADER_LENGTH);\n            bytes memory orderBody = LibBytes.slice(\n                _orderData,\n                scannedBytes.add(HEADER_LENGTH),\n                scannedBytes.add(orderLength)\n            );\n\n            // TODO: Call Exchange\n\n            // Update scanned bytes with header and body lengths\n            scannedBytes = scannedBytes.add(orderLength);\n        }\n    }\n\n    /**\n     * Validate order params are still valid\n     *\n     * @param  _order           IssuanceOrder object containing order params\n     * @param  _fillQuantity    Quantity of Set to be filled\n     */\n    function validateOrder(\n        OrderLibrary.IssuanceOrder _order,\n        uint _fillQuantity\n    )\n        private\n        view\n    {\n        // Make sure makerTokenAmount and Set Token to issue is greater than 0.\n        require(\n            _order.makerTokenAmount > 0 && _order.quantity > 0,\n            INVALID_TOKEN_AMOUNTS\n        );\n        // Make sure the order hasn't expired\n        require(\n            block.timestamp <= _order.expiration,\n            ORDER_EXPIRED\n        );\n        // TO DO: Check to make sure quantity is multiple of natural unit\n        // TO DO: Check to see if filled\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
    "exportedSymbols": {
      "CoreIssuanceOrder": [
        2064
      ]
    },
    "id": 2065,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1698,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:11"
      },
      {
        "id": 1699,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:11"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1701,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 4739,
        "src": "659:73:11",
        "symbolAliases": [
          {
            "foreign": 1700,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1703,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 2639,
        "src": "733:63:11",
        "symbolAliases": [
          {
            "foreign": 1702,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1705,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 2752,
        "src": "797:49:11",
        "symbolAliases": [
          {
            "foreign": 1704,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
        "file": "../lib/ExchangeHandler.sol",
        "id": 1707,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 2869,
        "src": "847:61:11",
        "symbolAliases": [
          {
            "foreign": 1706,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
        "file": "../interfaces/ICoreIssuance.sol",
        "id": 1709,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 2436,
        "src": "909:64:11",
        "symbolAliases": [
          {
            "foreign": 1708,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/LibBytes.sol",
        "file": "../../external/LibBytes.sol",
        "id": 1711,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 3108,
        "src": "974:55:11",
        "symbolAliases": [
          {
            "foreign": 1710,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../lib/OrderLibrary.sol",
        "id": 1713,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 2982,
        "src": "1030:55:11",
        "symbolAliases": [
          {
            "foreign": 1712,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1714,
              "name": "ICoreIssuance",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2435,
              "src": "1303:13:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICoreIssuance_$2435",
                "typeString": "contract ICoreIssuance"
              }
            },
            "id": 1715,
            "nodeType": "InheritanceSpecifier",
            "src": "1303:13:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1716,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2751,
              "src": "1322:9:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2751",
                "typeString": "contract CoreState"
              }
            },
            "id": 1717,
            "nodeType": "InheritanceSpecifier",
            "src": "1322:9:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1718,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2638,
              "src": "1337:13:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2638",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1719,
            "nodeType": "InheritanceSpecifier",
            "src": "1337:13:11"
          }
        ],
        "contractDependencies": [
          2435,
          2638,
          2751
        ],
        "contractKind": "contract",
        "documentation": "@title CoreIssuanceOrder\n@author Set Protocol\n * The Core Issuance Order extension houses all functions related to the filling and\ncanceling issuance orders.\n ",
        "fullyImplemented": false,
        "id": 2064,
        "linearizedBaseContracts": [
          2064,
          2638,
          2751,
          2435
        ],
        "name": "CoreIssuanceOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1722,
            "libraryName": {
              "contractScope": null,
              "id": 1720,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4738,
              "src": "1363:8:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$4738",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1357:27:11",
            "typeName": {
              "id": 1721,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1376:7:11",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1725,
            "name": "HEADER_LENGTH",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1437:35:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 1723,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1437:7:11",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "3634",
              "id": 1724,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1470:2:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_64_by_1",
                "typeString": "int_const 64"
              },
              "value": "64"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1728,
            "name": "INVALID_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1479:61:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1726,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1479:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "45786368616e676520646f6573206e6f742065786973742e",
              "id": 1727,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1514:26:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_10f19557f33751b7359fb90801bc276162b3bec07df01ad819ebdc88cb6b9ba9",
                "typeString": "literal_string \"Exchange does not exist.\""
              },
              "value": "Exchange does not exist."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1731,
            "name": "INVALID_CANCEL_ORDER",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1546:69:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1729,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1546:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4f6e6c79206d616b65722063616e2063616e63656c206f726465722e",
              "id": 1730,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1585:30:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_20dfea250c19728ad7708562ddd39d1aeb6ed3c7b91b9fcf939ae806695fbec0",
                "typeString": "literal_string \"Only maker can cancel order.\""
              },
              "value": "Only maker can cancel order."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1734,
            "name": "INVALID_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1621:62:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1732,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1621:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "496e76616c6964206f72646572207369676e61747572652e",
              "id": 1733,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1657:26:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_0bd9264828df20222816a7b62c45b8acdadb1a4d88a71d7b8927310b19371298",
                "typeString": "literal_string \"Invalid order signature.\""
              },
              "value": "Invalid order signature."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1737,
            "name": "INVALID_TOKEN_AMOUNTS",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1689:97:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1735,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1689:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e7469747920616e64206d616b6572546f6b656e416d6f756e742073686f756c642062652067726561746572207468616e20302e",
              "id": 1736,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1729:57:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_1257ba6c150a3f09d68043a4396003cea2846a7fb783030e7fe366f0b3057763",
                "typeString": "literal_string \"Quantity and makerTokenAmount should be greater than 0.\""
              },
              "value": "Quantity and makerTokenAmount should be greater than 0."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1740,
            "name": "ORDER_EXPIRED",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1792:57:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1738,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1792:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "54686973206f726465722068617320657870697265642e",
              "id": 1739,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1824:25:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_f81dc39ed5b9833b941e5d3d7c8154be2e213143256d344f6e98febd45c490c6",
                "typeString": "literal_string \"This order has expired.\""
              },
              "value": "This order has expired."
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1862,
              "nodeType": "Block",
              "src": "2822:1439:11",
              "statements": [
                {
                  "assignments": [
                    1778
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1778,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1863,
                      "src": "2832:39:11",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1777,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2891,
                        "src": "2832:26:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1814,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1781,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1744,
                          "src": "2927:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1783,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1782,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2938:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "2927:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1784,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1748,
                          "src": "2964:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1786,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1785,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2972:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "2964:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1787,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1744,
                          "src": "3002:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1789,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1788,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3013:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3002:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1790,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1744,
                          "src": "3041:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1792,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1791,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3052:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3041:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1793,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1748,
                          "src": "3086:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1795,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1794,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3094:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3086:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1796,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1748,
                          "src": "3122:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1798,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1797,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3130:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3122:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1799,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1744,
                          "src": "3160:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1801,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1800,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3171:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_3_by_1",
                            "typeString": "int_const 3"
                          },
                          "value": "3"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3160:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1802,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1748,
                          "src": "3207:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1804,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1803,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3215:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_3_by_1",
                            "typeString": "int_const 3"
                          },
                          "value": "3"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3207:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1805,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1748,
                          "src": "3237:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1807,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1806,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3245:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_4_by_1",
                            "typeString": "int_const 4"
                          },
                          "value": "4"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3237:10:11",
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
                            "id": 1810,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1744,
                            "src": "3320:10:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                              "typeString": "address[4] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1811,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1748,
                            "src": "3348:7:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                              "typeString": "address[4] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1808,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2981,
                            "src": "3272:12:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1809,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2938,
                          "src": "3272:30:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$4_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[4] memory,uint256[5] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 1812,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3272:97:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1779,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2981,
                        "src": "2874:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1780,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2891,
                      "src": "2874:26:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$2891_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 1813,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "quantity",
                      "makerAddress",
                      "makerToken",
                      "makerTokenAmount",
                      "expiration",
                      "relayerToken",
                      "relayerTokenAmount",
                      "salt",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "2874:506:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2832:548:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1816,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1778,
                        "src": "3482:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1817,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1750,
                        "src": "3501:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1815,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2063,
                      "src": "3455:13:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$2891_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 1818,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3455:69:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1819,
                  "nodeType": "ExpressionStatement",
                  "src": "3455:69:11"
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
                            "expression": {
                              "argumentTypes": null,
                              "id": 1823,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1778,
                              "src": "3645:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1824,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2890,
                            "src": "3645:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1825,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1778,
                              "src": "3678:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1826,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2876,
                            "src": "3678:18:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1827,
                            "name": "_v",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1752,
                            "src": "3714:2:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1828,
                            "name": "_r",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1754,
                            "src": "3734:2:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1829,
                            "name": "_s",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1756,
                            "src": "3754:2:11",
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
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            },
                            {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            },
                            {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1821,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2981,
                            "src": "3597:12:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1822,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validateSignature",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2980,
                          "src": "3597:30:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                            "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                          }
                        },
                        "id": 1830,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3597:173:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1831,
                        "name": "INVALID_SIGNATURE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1734,
                        "src": "3784:17:11",
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
                      "id": 1820,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "3576:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1832,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3576:235:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1833,
                  "nodeType": "ExpressionStatement",
                  "src": "3576:235:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1835,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1758,
                        "src": "3879:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      ],
                      "id": 1834,
                      "name": "executeExchangeOrders",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2033,
                      "src": "3857:21:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_bytes_memory_ptr_$returns$__$",
                        "typeString": "function (bytes memory)"
                      }
                    },
                    "id": 1836,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3857:33:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1837,
                  "nodeType": "ExpressionStatement",
                  "src": "3857:33:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1852,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1838,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "4023:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1842,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderFills",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2660,
                        "src": "4023:16:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 1843,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1840,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1778,
                          "src": "4040:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1841,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2890,
                        "src": "4040:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "4023:33:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 1850,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1750,
                          "src": "4097:13:11",
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
                          "baseExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1844,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "4059:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1845,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderFills",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2660,
                            "src": "4059:16:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 1848,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1846,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1778,
                              "src": "4076:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1847,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2890,
                            "src": "4076:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "4059:33:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1849,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4737,
                        "src": "4059:37:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 1851,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "4059:52:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4023:88:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1853,
                  "nodeType": "ExpressionStatement",
                  "src": "4023:88:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1855,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1778,
                          "src": "4169:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1856,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2876,
                        "src": "4169:18:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1857,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1778,
                          "src": "4201:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1858,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2872,
                        "src": "4201:16:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1859,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1750,
                        "src": "4231:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1854,
                      "name": "issueInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2434,
                      "src": "4142:13:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 1860,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4142:112:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1861,
                  "nodeType": "ExpressionStatement",
                  "src": "4142:112:11"
                }
              ]
            },
            "documentation": "Fill an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _fillQuantity   Quantity of set to be filled\n@param  _v              v element of ECDSA signature\n@param  _r              r element of ECDSA signature\n@param  _s              s element of ECDSA signature\n@param _orderData       Bytes array containing the exchange orders to execute",
            "id": 1863,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 1761,
                      "name": "_addresses",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1744,
                      "src": "2701:10:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                        "typeString": "address[4] calldata"
                      }
                    },
                    "id": 1763,
                    "indexExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1762,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2712:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "2701:13:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1764,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1760,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2616,
                  "src": "2690:10:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2690:25:11"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1766,
                    "name": "_fillQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1750,
                    "src": "2743:13:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 1767,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1765,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2588,
                  "src": "2724:18:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2724:33:11"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1769,
                    "name": "_fillQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1750,
                    "src": "2788:13:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 1770,
                      "name": "_addresses",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1744,
                      "src": "2803:10:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                        "typeString": "address[4] calldata"
                      }
                    },
                    "id": 1772,
                    "indexExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1771,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2814:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "2803:13:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1773,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1768,
                  "name": "isNaturalUnitMultiple",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2637,
                  "src": "2766:21:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$_t_address_$",
                    "typeString": "modifier (uint256,address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2766:51:11"
              }
            ],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1759,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1744,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2500:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                    "typeString": "address[4]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1741,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2500:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1743,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "34",
                      "id": 1742,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2508:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "4"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "2500:10:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$4_storage_ptr",
                      "typeString": "address[4]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1748,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2531:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1745,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2531:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1747,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1746,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2536:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "2531:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1750,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2556:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1749,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2556:4:11",
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
                  "id": 1752,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2584:8:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 1751,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2584:5:11",
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
                  "id": 1754,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2602:10:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 1753,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2602:7:11",
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
                  "id": 1756,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2622:10:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 1755,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2622:7:11",
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
                  "id": 1758,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2642:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1757,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2642:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2490:174:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1774,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2822:0:11"
            },
            "scope": 2064,
            "src": "2472:1789:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1949,
              "nodeType": "Block",
              "src": "4742:1070:11",
              "statements": [
                {
                  "assignments": [
                    1882
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1882,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1950,
                      "src": "4752:39:11",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1881,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2891,
                        "src": "4752:26:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1918,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1885,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1867,
                          "src": "4847:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1887,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1886,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4858:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4847:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1888,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "4884:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1890,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1889,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4892:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4884:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1891,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1867,
                          "src": "4922:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1893,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1892,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4933:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4922:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1894,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1867,
                          "src": "4961:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1896,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1895,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4972:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4961:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1897,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "5006:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1899,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1898,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5014:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "5006:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1900,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "5042:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1902,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1901,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5050:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "5042:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1903,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1867,
                          "src": "5080:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1905,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1904,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5091:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_3_by_1",
                            "typeString": "int_const 3"
                          },
                          "value": "3"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "5080:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1906,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "5127:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1908,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1907,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5135:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_3_by_1",
                            "typeString": "int_const 3"
                          },
                          "value": "3"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "5127:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1909,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "5157:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1911,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1910,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5165:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_4_by_1",
                            "typeString": "int_const 4"
                          },
                          "value": "4"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "5157:10:11",
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
                            "id": 1914,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1867,
                            "src": "5240:10:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                              "typeString": "address[4] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1915,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1871,
                            "src": "5268:7:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                              "typeString": "address[4] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1912,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2981,
                            "src": "5192:12:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1913,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2938,
                          "src": "5192:30:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$4_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[4] memory,uint256[5] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 1916,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5192:97:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1883,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2981,
                        "src": "4794:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1884,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2891,
                      "src": "4794:26:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$2891_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 1917,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "quantity",
                      "makerAddress",
                      "makerToken",
                      "makerTokenAmount",
                      "expiration",
                      "relayerToken",
                      "relayerTokenAmount",
                      "salt",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "4794:506:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4752:548:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 1924,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1920,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1882,
                            "src": "5370:5:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1921,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "makerAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2876,
                          "src": "5370:18:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1922,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5397,
                            "src": "5392:3:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 1923,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5392:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "5370:32:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1925,
                        "name": "INVALID_CANCEL_ORDER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1731,
                        "src": "5404:20:11",
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
                      "id": 1919,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "5362:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1926,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5362:63:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1927,
                  "nodeType": "ExpressionStatement",
                  "src": "5362:63:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1929,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1882,
                        "src": "5530:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1930,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1873,
                        "src": "5549:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1928,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2063,
                      "src": "5503:13:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$2891_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 1931,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5503:71:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1932,
                  "nodeType": "ExpressionStatement",
                  "src": "5503:71:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1947,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1933,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "5711:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1937,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderCancels",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2664,
                        "src": "5711:18:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 1938,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1935,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1882,
                          "src": "5730:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1936,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2890,
                        "src": "5730:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "5711:35:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 1945,
                          "name": "_cancelQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1873,
                          "src": "5789:15:11",
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
                          "baseExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1939,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "5749:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1940,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderCancels",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2664,
                            "src": "5749:18:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 1943,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1941,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1882,
                              "src": "5768:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1942,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2890,
                            "src": "5768:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "5749:35:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1944,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4737,
                        "src": "5749:39:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 1946,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5749:56:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "5711:94:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1948,
                  "nodeType": "ExpressionStatement",
                  "src": "5711:94:11"
                }
              ]
            },
            "documentation": "Cancel an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _cancelQuantity Quantity of set to be filled",
            "id": 1950,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1876,
                    "name": "_cancelQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1873,
                    "src": "4721:15:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 1877,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1875,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2588,
                  "src": "4702:18:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4702:35:11"
              }
            ],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1874,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1867,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1950,
                  "src": "4594:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                    "typeString": "address[4]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1864,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4594:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1866,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "34",
                      "id": 1865,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "4602:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "4"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "4594:10:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$4_storage_ptr",
                      "typeString": "address[4]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1871,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 1950,
                  "src": "4625:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1868,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "4625:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1870,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1869,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "4630:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "4625:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1873,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1950,
                  "src": "4650:20:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1872,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4650:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4584:92:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1878,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4742:0:11"
            },
            "scope": 2064,
            "src": "4564:1248:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2032,
              "nodeType": "Block",
              "src": "6152:1264:11",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1956,
                      "name": "scannedBytes",
                      "nodeType": "VariableDeclaration",
                      "scope": 2033,
                      "src": "6162:20:11",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1955,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6162:7:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1957,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6162:20:11"
                },
                {
                  "body": {
                    "id": 2030,
                    "nodeType": "Block",
                    "src": "6233:1177:11",
                    "statements": [
                      {
                        "assignments": [
                          1963
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1963,
                            "name": "headerData",
                            "nodeType": "VariableDeclaration",
                            "scope": 2033,
                            "src": "6298:23:11",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 1962,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "6298:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1973,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1966,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1952,
                              "src": "6356:10:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1967,
                              "name": "scannedBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1956,
                              "src": "6384:12:11",
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
                                  "id": 1970,
                                  "name": "HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1725,
                                  "src": "6431:13:11",
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
                                  "id": 1968,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1956,
                                  "src": "6414:12:11",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1969,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4737,
                                "src": "6414:16:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1971,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "6414:31:11",
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
                            "expression": {
                              "argumentTypes": null,
                              "id": 1964,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3107,
                              "src": "6324:8:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$3107_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 1965,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3106,
                            "src": "6324:14:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 1972,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6324:135:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "6298:161:11"
                      },
                      {
                        "assignments": [
                          1977
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1977,
                            "name": "header",
                            "nodeType": "VariableDeclaration",
                            "scope": 2033,
                            "src": "6473:41:11",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_OrderHeader_$2853_memory_ptr",
                              "typeString": "struct ExchangeHandler.OrderHeader"
                            },
                            "typeName": {
                              "contractScope": null,
                              "id": 1976,
                              "name": "ExchangeHandler.OrderHeader",
                              "nodeType": "UserDefinedTypeName",
                              "referencedDeclaration": 2853,
                              "src": "6473:27:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$2853_storage_ptr",
                                "typeString": "struct ExchangeHandler.OrderHeader"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1982,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1980,
                              "name": "headerData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1963,
                              "src": "6567:10:11",
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
                            "expression": {
                              "argumentTypes": null,
                              "id": 1978,
                              "name": "ExchangeHandler",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2868,
                              "src": "6517:15:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_ExchangeHandler_$2868_$",
                                "typeString": "type(library ExchangeHandler)"
                              }
                            },
                            "id": 1979,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "parseOrderHeader",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2867,
                            "src": "6517:32:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_OrderHeader_$2853_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (struct ExchangeHandler.OrderHeader memory)"
                            }
                          },
                          "id": 1981,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6517:74:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$2853_memory_ptr",
                            "typeString": "struct ExchangeHandler.OrderHeader memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "6473:118:11"
                      },
                      {
                        "assignments": [
                          1984
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1984,
                            "name": "exchange",
                            "nodeType": "VariableDeclaration",
                            "scope": 2033,
                            "src": "6691:16:11",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            "typeName": {
                              "id": 1983,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "6691:7:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1990,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1985,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "6710:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1986,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchanges",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2644,
                            "src": "6710:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                              "typeString": "mapping(uint8 => address)"
                            }
                          },
                          "id": 1989,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1987,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1977,
                              "src": "6726:6:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$2853_memory_ptr",
                                "typeString": "struct ExchangeHandler.OrderHeader memory"
                              }
                            },
                            "id": 1988,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchange",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2850,
                            "src": "6726:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "6710:32:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "6691:51:11"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              "id": 1996,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "leftExpression": {
                                "argumentTypes": null,
                                "id": 1992,
                                "name": "exchange",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1984,
                                "src": "6835:8:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "nodeType": "BinaryOperation",
                              "operator": "!=",
                              "rightExpression": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "hexValue": "30",
                                    "id": 1994,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "kind": "number",
                                    "lValueRequested": false,
                                    "nodeType": "Literal",
                                    "src": "6855:1:11",
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
                                  "id": 1993,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "nodeType": "ElementaryTypeNameExpression",
                                  "src": "6847:7:11",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_address_$",
                                    "typeString": "type(address)"
                                  },
                                  "typeName": "address"
                                },
                                "id": 1995,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "6847:10:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "src": "6835:22:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1997,
                              "name": "INVALID_EXCHANGE",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1728,
                              "src": "6875:16:11",
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
                            "id": 1991,
                            "name": "require",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [
                              5400,
                              5401
                            ],
                            "referencedDeclaration": 5401,
                            "src": "6810:7:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                              "typeString": "function (bool,string memory) pure"
                            }
                          },
                          "id": 1998,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6810:95:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1999,
                        "nodeType": "ExpressionStatement",
                        "src": "6810:95:11"
                      },
                      {
                        "assignments": [
                          2001
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2001,
                            "name": "orderLength",
                            "nodeType": "VariableDeclaration",
                            "scope": 2033,
                            "src": "6989:19:11",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 2000,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "6989:7:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2007,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2005,
                              "name": "HEADER_LENGTH",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1725,
                              "src": "7034:13:11",
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
                              "expression": {
                                "argumentTypes": null,
                                "id": 2002,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1977,
                                "src": "7011:6:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_OrderHeader_$2853_memory_ptr",
                                  "typeString": "struct ExchangeHandler.OrderHeader memory"
                                }
                              },
                              "id": 2003,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "orderLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2852,
                              "src": "7011:18:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2004,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4737,
                            "src": "7011:22:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2006,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7011:37:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "6989:59:11"
                      },
                      {
                        "assignments": [
                          2009
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2009,
                            "name": "orderBody",
                            "nodeType": "VariableDeclaration",
                            "scope": 2033,
                            "src": "7062:22:11",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 2008,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "7062:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2022,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2012,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1952,
                              "src": "7119:10:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 2015,
                                  "name": "HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1725,
                                  "src": "7164:13:11",
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
                                  "id": 2013,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1956,
                                  "src": "7147:12:11",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2014,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4737,
                                "src": "7147:16:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2016,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7147:31:11",
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
                                  "id": 2019,
                                  "name": "orderLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2001,
                                  "src": "7213:11:11",
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
                                  "id": 2017,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1956,
                                  "src": "7196:12:11",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2018,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4737,
                                "src": "7196:16:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2020,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7196:29:11",
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
                            "expression": {
                              "argumentTypes": null,
                              "id": 2010,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3107,
                              "src": "7087:8:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$3107_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 2011,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3106,
                            "src": "7087:14:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 2021,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7087:152:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7062:177:11"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 2028,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 2023,
                            "name": "scannedBytes",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1956,
                            "src": "7355:12:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 2026,
                                "name": "orderLength",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2001,
                                "src": "7387:11:11",
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
                                "id": 2024,
                                "name": "scannedBytes",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1956,
                                "src": "7370:12:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 2025,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 4737,
                              "src": "7370:16:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 2027,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "7370:29:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "7355:44:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2029,
                        "nodeType": "ExpressionStatement",
                        "src": "7355:44:11"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1961,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1958,
                      "name": "scannedBytes",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1956,
                      "src": "6199:12:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1959,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1952,
                        "src": "6214:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1960,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "6214:17:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "6199:32:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2031,
                  "nodeType": "WhileStatement",
                  "src": "6192:1218:11"
                }
              ]
            },
            "documentation": "Execute the exchange orders by parsing the order data and facilitating the transfers\n     * @param _orderData   Bytes array containing the exchange orders to execute",
            "id": 2033,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeExchangeOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1953,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1952,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2033,
                  "src": "6109:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1951,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6109:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6099:32:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1954,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6152:0:11"
            },
            "scope": 2064,
            "src": "6069:1347:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 2062,
              "nodeType": "Block",
              "src": "7761:478:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 2049,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 2044,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2041,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2035,
                              "src": "7872:6:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2042,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2880,
                            "src": "7872:23:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 2043,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "7898:1:11",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "7872:27:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "&&",
                        "rightExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 2048,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2045,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2035,
                              "src": "7903:6:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2046,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2874,
                            "src": "7903:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 2047,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "7921:1:11",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "7903:19:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "7872:50:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2050,
                        "name": "INVALID_TOKEN_AMOUNTS",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1737,
                        "src": "7936:21:11",
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
                      "id": 2040,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "7851:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
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
                    "src": "7851:116:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2052,
                  "nodeType": "ExpressionStatement",
                  "src": "7851:116:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 2058,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2054,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5387,
                            "src": "8044:5:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 2055,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "8044:15:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2056,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2035,
                            "src": "8063:6:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2057,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "expiration",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2882,
                          "src": "8063:17:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "8044:36:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2059,
                        "name": "ORDER_EXPIRED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1740,
                        "src": "8094:13:11",
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
                      "id": 2053,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "8023:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2060,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "8023:94:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2061,
                  "nodeType": "ExpressionStatement",
                  "src": "8023:94:11"
                }
              ]
            },
            "documentation": "Validate order params are still valid\n     * @param  _order           IssuanceOrder object containing order params\n@param  _fillQuantity    Quantity of Set to be filled",
            "id": 2063,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2038,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2035,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 2063,
                  "src": "7660:33:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2034,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2891,
                    "src": "7660:26:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2891_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2037,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2063,
                  "src": "7703:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2036,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "7703:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7650:77:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 2039,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "7761:0:11"
            },
            "scope": 2064,
            "src": "7628:611:11",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 2065,
        "src": "1269:6972:11"
      }
    ],
    "src": "597:7645:11"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
    "exportedSymbols": {
      "CoreIssuanceOrder": [
        2064
      ]
    },
    "id": 2065,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1698,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:11"
      },
      {
        "id": 1699,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:11"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1701,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 4739,
        "src": "659:73:11",
        "symbolAliases": [
          {
            "foreign": 1700,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1703,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 2639,
        "src": "733:63:11",
        "symbolAliases": [
          {
            "foreign": 1702,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1705,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 2752,
        "src": "797:49:11",
        "symbolAliases": [
          {
            "foreign": 1704,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
        "file": "../lib/ExchangeHandler.sol",
        "id": 1707,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 2869,
        "src": "847:61:11",
        "symbolAliases": [
          {
            "foreign": 1706,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
        "file": "../interfaces/ICoreIssuance.sol",
        "id": 1709,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 2436,
        "src": "909:64:11",
        "symbolAliases": [
          {
            "foreign": 1708,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/LibBytes.sol",
        "file": "../../external/LibBytes.sol",
        "id": 1711,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 3108,
        "src": "974:55:11",
        "symbolAliases": [
          {
            "foreign": 1710,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../lib/OrderLibrary.sol",
        "id": 1713,
        "nodeType": "ImportDirective",
        "scope": 2065,
        "sourceUnit": 2982,
        "src": "1030:55:11",
        "symbolAliases": [
          {
            "foreign": 1712,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1714,
              "name": "ICoreIssuance",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2435,
              "src": "1303:13:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICoreIssuance_$2435",
                "typeString": "contract ICoreIssuance"
              }
            },
            "id": 1715,
            "nodeType": "InheritanceSpecifier",
            "src": "1303:13:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1716,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2751,
              "src": "1322:9:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2751",
                "typeString": "contract CoreState"
              }
            },
            "id": 1717,
            "nodeType": "InheritanceSpecifier",
            "src": "1322:9:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1718,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2638,
              "src": "1337:13:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2638",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1719,
            "nodeType": "InheritanceSpecifier",
            "src": "1337:13:11"
          }
        ],
        "contractDependencies": [
          2435,
          2638,
          2751
        ],
        "contractKind": "contract",
        "documentation": "@title CoreIssuanceOrder\n@author Set Protocol\n * The Core Issuance Order extension houses all functions related to the filling and\ncanceling issuance orders.\n ",
        "fullyImplemented": false,
        "id": 2064,
        "linearizedBaseContracts": [
          2064,
          2638,
          2751,
          2435
        ],
        "name": "CoreIssuanceOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1722,
            "libraryName": {
              "contractScope": null,
              "id": 1720,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4738,
              "src": "1363:8:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$4738",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1357:27:11",
            "typeName": {
              "id": 1721,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1376:7:11",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1725,
            "name": "HEADER_LENGTH",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1437:35:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 1723,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1437:7:11",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "3634",
              "id": 1724,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1470:2:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_64_by_1",
                "typeString": "int_const 64"
              },
              "value": "64"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1728,
            "name": "INVALID_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1479:61:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1726,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1479:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "45786368616e676520646f6573206e6f742065786973742e",
              "id": 1727,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1514:26:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_10f19557f33751b7359fb90801bc276162b3bec07df01ad819ebdc88cb6b9ba9",
                "typeString": "literal_string \"Exchange does not exist.\""
              },
              "value": "Exchange does not exist."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1731,
            "name": "INVALID_CANCEL_ORDER",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1546:69:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1729,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1546:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4f6e6c79206d616b65722063616e2063616e63656c206f726465722e",
              "id": 1730,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1585:30:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_20dfea250c19728ad7708562ddd39d1aeb6ed3c7b91b9fcf939ae806695fbec0",
                "typeString": "literal_string \"Only maker can cancel order.\""
              },
              "value": "Only maker can cancel order."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1734,
            "name": "INVALID_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1621:62:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1732,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1621:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "496e76616c6964206f72646572207369676e61747572652e",
              "id": 1733,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1657:26:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_0bd9264828df20222816a7b62c45b8acdadb1a4d88a71d7b8927310b19371298",
                "typeString": "literal_string \"Invalid order signature.\""
              },
              "value": "Invalid order signature."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1737,
            "name": "INVALID_TOKEN_AMOUNTS",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1689:97:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1735,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1689:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e7469747920616e64206d616b6572546f6b656e416d6f756e742073686f756c642062652067726561746572207468616e20302e",
              "id": 1736,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1729:57:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_1257ba6c150a3f09d68043a4396003cea2846a7fb783030e7fe366f0b3057763",
                "typeString": "literal_string \"Quantity and makerTokenAmount should be greater than 0.\""
              },
              "value": "Quantity and makerTokenAmount should be greater than 0."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 1740,
            "name": "ORDER_EXPIRED",
            "nodeType": "VariableDeclaration",
            "scope": 2064,
            "src": "1792:57:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1738,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1792:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "54686973206f726465722068617320657870697265642e",
              "id": 1739,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1824:25:11",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_f81dc39ed5b9833b941e5d3d7c8154be2e213143256d344f6e98febd45c490c6",
                "typeString": "literal_string \"This order has expired.\""
              },
              "value": "This order has expired."
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1862,
              "nodeType": "Block",
              "src": "2822:1439:11",
              "statements": [
                {
                  "assignments": [
                    1778
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1778,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1863,
                      "src": "2832:39:11",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1777,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2891,
                        "src": "2832:26:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1814,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1781,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1744,
                          "src": "2927:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1783,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1782,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2938:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "2927:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1784,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1748,
                          "src": "2964:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1786,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1785,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2972:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "2964:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1787,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1744,
                          "src": "3002:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1789,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1788,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3013:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3002:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1790,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1744,
                          "src": "3041:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1792,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1791,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3052:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3041:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1793,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1748,
                          "src": "3086:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1795,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1794,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3094:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3086:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1796,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1748,
                          "src": "3122:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1798,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1797,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3130:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3122:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1799,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1744,
                          "src": "3160:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1801,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1800,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3171:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_3_by_1",
                            "typeString": "int_const 3"
                          },
                          "value": "3"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3160:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1802,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1748,
                          "src": "3207:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1804,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1803,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3215:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_3_by_1",
                            "typeString": "int_const 3"
                          },
                          "value": "3"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3207:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1805,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1748,
                          "src": "3237:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1807,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1806,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3245:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_4_by_1",
                            "typeString": "int_const 4"
                          },
                          "value": "4"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "3237:10:11",
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
                            "id": 1810,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1744,
                            "src": "3320:10:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                              "typeString": "address[4] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1811,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1748,
                            "src": "3348:7:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                              "typeString": "address[4] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1808,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2981,
                            "src": "3272:12:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1809,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2938,
                          "src": "3272:30:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$4_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[4] memory,uint256[5] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 1812,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3272:97:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1779,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2981,
                        "src": "2874:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1780,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2891,
                      "src": "2874:26:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$2891_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 1813,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "quantity",
                      "makerAddress",
                      "makerToken",
                      "makerTokenAmount",
                      "expiration",
                      "relayerToken",
                      "relayerTokenAmount",
                      "salt",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "2874:506:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2832:548:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1816,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1778,
                        "src": "3482:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1817,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1750,
                        "src": "3501:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1815,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2063,
                      "src": "3455:13:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$2891_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 1818,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3455:69:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1819,
                  "nodeType": "ExpressionStatement",
                  "src": "3455:69:11"
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
                            "expression": {
                              "argumentTypes": null,
                              "id": 1823,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1778,
                              "src": "3645:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1824,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2890,
                            "src": "3645:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1825,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1778,
                              "src": "3678:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1826,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2876,
                            "src": "3678:18:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1827,
                            "name": "_v",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1752,
                            "src": "3714:2:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1828,
                            "name": "_r",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1754,
                            "src": "3734:2:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1829,
                            "name": "_s",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1756,
                            "src": "3754:2:11",
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
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            },
                            {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            },
                            {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1821,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2981,
                            "src": "3597:12:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1822,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validateSignature",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2980,
                          "src": "3597:30:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                            "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                          }
                        },
                        "id": 1830,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3597:173:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1831,
                        "name": "INVALID_SIGNATURE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1734,
                        "src": "3784:17:11",
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
                      "id": 1820,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "3576:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1832,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3576:235:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1833,
                  "nodeType": "ExpressionStatement",
                  "src": "3576:235:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1835,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1758,
                        "src": "3879:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      ],
                      "id": 1834,
                      "name": "executeExchangeOrders",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2033,
                      "src": "3857:21:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_bytes_memory_ptr_$returns$__$",
                        "typeString": "function (bytes memory)"
                      }
                    },
                    "id": 1836,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3857:33:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1837,
                  "nodeType": "ExpressionStatement",
                  "src": "3857:33:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1852,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1838,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "4023:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1842,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderFills",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2660,
                        "src": "4023:16:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 1843,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1840,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1778,
                          "src": "4040:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1841,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2890,
                        "src": "4040:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "4023:33:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 1850,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1750,
                          "src": "4097:13:11",
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
                          "baseExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1844,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "4059:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1845,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderFills",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2660,
                            "src": "4059:16:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 1848,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1846,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1778,
                              "src": "4076:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1847,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2890,
                            "src": "4076:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "4059:33:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1849,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4737,
                        "src": "4059:37:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 1851,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "4059:52:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4023:88:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1853,
                  "nodeType": "ExpressionStatement",
                  "src": "4023:88:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1855,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1778,
                          "src": "4169:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1856,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2876,
                        "src": "4169:18:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1857,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1778,
                          "src": "4201:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1858,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2872,
                        "src": "4201:16:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1859,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1750,
                        "src": "4231:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1854,
                      "name": "issueInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2434,
                      "src": "4142:13:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 1860,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4142:112:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1861,
                  "nodeType": "ExpressionStatement",
                  "src": "4142:112:11"
                }
              ]
            },
            "documentation": "Fill an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _fillQuantity   Quantity of set to be filled\n@param  _v              v element of ECDSA signature\n@param  _r              r element of ECDSA signature\n@param  _s              s element of ECDSA signature\n@param _orderData       Bytes array containing the exchange orders to execute",
            "id": 1863,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 1761,
                      "name": "_addresses",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1744,
                      "src": "2701:10:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                        "typeString": "address[4] calldata"
                      }
                    },
                    "id": 1763,
                    "indexExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1762,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2712:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "2701:13:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1764,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1760,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2616,
                  "src": "2690:10:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2690:25:11"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1766,
                    "name": "_fillQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1750,
                    "src": "2743:13:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 1767,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1765,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2588,
                  "src": "2724:18:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2724:33:11"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1769,
                    "name": "_fillQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1750,
                    "src": "2788:13:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "id": 1770,
                      "name": "_addresses",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1744,
                      "src": "2803:10:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                        "typeString": "address[4] calldata"
                      }
                    },
                    "id": 1772,
                    "indexExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1771,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2814:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "IndexAccess",
                    "src": "2803:13:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1773,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1768,
                  "name": "isNaturalUnitMultiple",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2637,
                  "src": "2766:21:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$_t_address_$",
                    "typeString": "modifier (uint256,address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2766:51:11"
              }
            ],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1759,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1744,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2500:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                    "typeString": "address[4]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1741,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2500:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1743,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "34",
                      "id": 1742,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2508:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "4"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "2500:10:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$4_storage_ptr",
                      "typeString": "address[4]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1748,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2531:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1745,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2531:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1747,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1746,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2536:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "2531:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1750,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2556:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1749,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2556:4:11",
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
                  "id": 1752,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2584:8:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 1751,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2584:5:11",
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
                  "id": 1754,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2602:10:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 1753,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2602:7:11",
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
                  "id": 1756,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2622:10:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 1755,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2622:7:11",
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
                  "id": 1758,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1863,
                  "src": "2642:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1757,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2642:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2490:174:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1774,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2822:0:11"
            },
            "scope": 2064,
            "src": "2472:1789:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1949,
              "nodeType": "Block",
              "src": "4742:1070:11",
              "statements": [
                {
                  "assignments": [
                    1882
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1882,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1950,
                      "src": "4752:39:11",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1881,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2891,
                        "src": "4752:26:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1918,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1885,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1867,
                          "src": "4847:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1887,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1886,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4858:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4847:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1888,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "4884:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1890,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1889,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4892:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4884:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1891,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1867,
                          "src": "4922:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1893,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1892,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4933:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4922:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1894,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1867,
                          "src": "4961:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1896,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1895,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4972:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "4961:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1897,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "5006:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1899,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1898,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5014:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "5006:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1900,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "5042:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1902,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1901,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5050:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_2_by_1",
                            "typeString": "int_const 2"
                          },
                          "value": "2"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "5042:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1903,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1867,
                          "src": "5080:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                            "typeString": "address[4] calldata"
                          }
                        },
                        "id": 1905,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1904,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5091:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_3_by_1",
                            "typeString": "int_const 3"
                          },
                          "value": "3"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "5080:13:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1906,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "5127:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1908,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1907,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5135:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_3_by_1",
                            "typeString": "int_const 3"
                          },
                          "value": "3"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "5127:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1909,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "5157:7:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1911,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1910,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5165:1:11",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_4_by_1",
                            "typeString": "int_const 4"
                          },
                          "value": "4"
                        },
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "5157:10:11",
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
                            "id": 1914,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1867,
                            "src": "5240:10:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                              "typeString": "address[4] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1915,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1871,
                            "src": "5268:7:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                              "typeString": "address[4] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1912,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2981,
                            "src": "5192:12:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1913,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2938,
                          "src": "5192:30:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$4_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[4] memory,uint256[5] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 1916,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5192:97:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1883,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2981,
                        "src": "4794:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2981_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1884,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2891,
                      "src": "4794:26:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$2891_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 1917,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "quantity",
                      "makerAddress",
                      "makerToken",
                      "makerTokenAmount",
                      "expiration",
                      "relayerToken",
                      "relayerTokenAmount",
                      "salt",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "4794:506:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4752:548:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 1924,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1920,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1882,
                            "src": "5370:5:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1921,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "makerAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2876,
                          "src": "5370:18:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1922,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5397,
                            "src": "5392:3:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 1923,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5392:10:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "5370:32:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1925,
                        "name": "INVALID_CANCEL_ORDER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1731,
                        "src": "5404:20:11",
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
                      "id": 1919,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "5362:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1926,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5362:63:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1927,
                  "nodeType": "ExpressionStatement",
                  "src": "5362:63:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1929,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1882,
                        "src": "5530:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1930,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1873,
                        "src": "5549:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1928,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2063,
                      "src": "5503:13:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$2891_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 1931,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5503:71:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1932,
                  "nodeType": "ExpressionStatement",
                  "src": "5503:71:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1947,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1933,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "5711:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1937,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderCancels",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2664,
                        "src": "5711:18:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 1938,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1935,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1882,
                          "src": "5730:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1936,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2890,
                        "src": "5730:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "5711:35:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 1945,
                          "name": "_cancelQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1873,
                          "src": "5789:15:11",
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
                          "baseExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1939,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "5749:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1940,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderCancels",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2664,
                            "src": "5749:18:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 1943,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1941,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1882,
                              "src": "5768:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1942,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2890,
                            "src": "5768:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "5749:35:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1944,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4737,
                        "src": "5749:39:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 1946,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5749:56:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "5711:94:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1948,
                  "nodeType": "ExpressionStatement",
                  "src": "5711:94:11"
                }
              ]
            },
            "documentation": "Cancel an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _cancelQuantity Quantity of set to be filled",
            "id": 1950,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1876,
                    "name": "_cancelQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1873,
                    "src": "4721:15:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 1877,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1875,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2588,
                  "src": "4702:18:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4702:35:11"
              }
            ],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1874,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1867,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1950,
                  "src": "4594:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$4_calldata_ptr",
                    "typeString": "address[4]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1864,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "4594:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1866,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "34",
                      "id": 1865,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "4602:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "4"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "4594:10:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$4_storage_ptr",
                      "typeString": "address[4]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1871,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 1950,
                  "src": "4625:15:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1868,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "4625:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1870,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1869,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "4630:1:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "4625:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$5_storage_ptr",
                      "typeString": "uint256[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1873,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1950,
                  "src": "4650:20:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1872,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4650:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4584:92:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1878,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4742:0:11"
            },
            "scope": 2064,
            "src": "4564:1248:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2032,
              "nodeType": "Block",
              "src": "6152:1264:11",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1956,
                      "name": "scannedBytes",
                      "nodeType": "VariableDeclaration",
                      "scope": 2033,
                      "src": "6162:20:11",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1955,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "6162:7:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1957,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6162:20:11"
                },
                {
                  "body": {
                    "id": 2030,
                    "nodeType": "Block",
                    "src": "6233:1177:11",
                    "statements": [
                      {
                        "assignments": [
                          1963
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1963,
                            "name": "headerData",
                            "nodeType": "VariableDeclaration",
                            "scope": 2033,
                            "src": "6298:23:11",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 1962,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "6298:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1973,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1966,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1952,
                              "src": "6356:10:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1967,
                              "name": "scannedBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1956,
                              "src": "6384:12:11",
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
                                  "id": 1970,
                                  "name": "HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1725,
                                  "src": "6431:13:11",
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
                                  "id": 1968,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1956,
                                  "src": "6414:12:11",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1969,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4737,
                                "src": "6414:16:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1971,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "6414:31:11",
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
                            "expression": {
                              "argumentTypes": null,
                              "id": 1964,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3107,
                              "src": "6324:8:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$3107_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 1965,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3106,
                            "src": "6324:14:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 1972,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6324:135:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "6298:161:11"
                      },
                      {
                        "assignments": [
                          1977
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1977,
                            "name": "header",
                            "nodeType": "VariableDeclaration",
                            "scope": 2033,
                            "src": "6473:41:11",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_OrderHeader_$2853_memory_ptr",
                              "typeString": "struct ExchangeHandler.OrderHeader"
                            },
                            "typeName": {
                              "contractScope": null,
                              "id": 1976,
                              "name": "ExchangeHandler.OrderHeader",
                              "nodeType": "UserDefinedTypeName",
                              "referencedDeclaration": 2853,
                              "src": "6473:27:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$2853_storage_ptr",
                                "typeString": "struct ExchangeHandler.OrderHeader"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1982,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1980,
                              "name": "headerData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1963,
                              "src": "6567:10:11",
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
                            "expression": {
                              "argumentTypes": null,
                              "id": 1978,
                              "name": "ExchangeHandler",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2868,
                              "src": "6517:15:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_ExchangeHandler_$2868_$",
                                "typeString": "type(library ExchangeHandler)"
                              }
                            },
                            "id": 1979,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "parseOrderHeader",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2867,
                            "src": "6517:32:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_OrderHeader_$2853_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (struct ExchangeHandler.OrderHeader memory)"
                            }
                          },
                          "id": 1981,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6517:74:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_OrderHeader_$2853_memory_ptr",
                            "typeString": "struct ExchangeHandler.OrderHeader memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "6473:118:11"
                      },
                      {
                        "assignments": [
                          1984
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1984,
                            "name": "exchange",
                            "nodeType": "VariableDeclaration",
                            "scope": 2033,
                            "src": "6691:16:11",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            "typeName": {
                              "id": 1983,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "6691:7:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1990,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1985,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "6710:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1986,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchanges",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2644,
                            "src": "6710:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                              "typeString": "mapping(uint8 => address)"
                            }
                          },
                          "id": 1989,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1987,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1977,
                              "src": "6726:6:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_OrderHeader_$2853_memory_ptr",
                                "typeString": "struct ExchangeHandler.OrderHeader memory"
                              }
                            },
                            "id": 1988,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchange",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2850,
                            "src": "6726:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "6710:32:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "6691:51:11"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              "id": 1996,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "leftExpression": {
                                "argumentTypes": null,
                                "id": 1992,
                                "name": "exchange",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1984,
                                "src": "6835:8:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "nodeType": "BinaryOperation",
                              "operator": "!=",
                              "rightExpression": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "hexValue": "30",
                                    "id": 1994,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "kind": "number",
                                    "lValueRequested": false,
                                    "nodeType": "Literal",
                                    "src": "6855:1:11",
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
                                  "id": 1993,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "nodeType": "ElementaryTypeNameExpression",
                                  "src": "6847:7:11",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_address_$",
                                    "typeString": "type(address)"
                                  },
                                  "typeName": "address"
                                },
                                "id": 1995,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "6847:10:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "src": "6835:22:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1997,
                              "name": "INVALID_EXCHANGE",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1728,
                              "src": "6875:16:11",
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
                            "id": 1991,
                            "name": "require",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [
                              5400,
                              5401
                            ],
                            "referencedDeclaration": 5401,
                            "src": "6810:7:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                              "typeString": "function (bool,string memory) pure"
                            }
                          },
                          "id": 1998,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6810:95:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1999,
                        "nodeType": "ExpressionStatement",
                        "src": "6810:95:11"
                      },
                      {
                        "assignments": [
                          2001
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2001,
                            "name": "orderLength",
                            "nodeType": "VariableDeclaration",
                            "scope": 2033,
                            "src": "6989:19:11",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 2000,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "6989:7:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2007,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2005,
                              "name": "HEADER_LENGTH",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1725,
                              "src": "7034:13:11",
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
                              "expression": {
                                "argumentTypes": null,
                                "id": 2002,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1977,
                                "src": "7011:6:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_OrderHeader_$2853_memory_ptr",
                                  "typeString": "struct ExchangeHandler.OrderHeader memory"
                                }
                              },
                              "id": 2003,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "orderLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2852,
                              "src": "7011:18:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2004,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4737,
                            "src": "7011:22:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2006,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7011:37:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "6989:59:11"
                      },
                      {
                        "assignments": [
                          2009
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2009,
                            "name": "orderBody",
                            "nodeType": "VariableDeclaration",
                            "scope": 2033,
                            "src": "7062:22:11",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 2008,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "7062:5:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2022,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2012,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1952,
                              "src": "7119:10:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 2015,
                                  "name": "HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1725,
                                  "src": "7164:13:11",
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
                                  "id": 2013,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1956,
                                  "src": "7147:12:11",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2014,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4737,
                                "src": "7147:16:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2016,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7147:31:11",
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
                                  "id": 2019,
                                  "name": "orderLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2001,
                                  "src": "7213:11:11",
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
                                  "id": 2017,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1956,
                                  "src": "7196:12:11",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2018,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 4737,
                                "src": "7196:16:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2020,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7196:29:11",
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
                            "expression": {
                              "argumentTypes": null,
                              "id": 2010,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3107,
                              "src": "7087:8:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$3107_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 2011,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3106,
                            "src": "7087:14:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 2021,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7087:152:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7062:177:11"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 2028,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 2023,
                            "name": "scannedBytes",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1956,
                            "src": "7355:12:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "argumentTypes": null,
                            "arguments": [
                              {
                                "argumentTypes": null,
                                "id": 2026,
                                "name": "orderLength",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2001,
                                "src": "7387:11:11",
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
                                "id": 2024,
                                "name": "scannedBytes",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1956,
                                "src": "7370:12:11",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 2025,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 4737,
                              "src": "7370:16:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 2027,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "7370:29:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "7355:44:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2029,
                        "nodeType": "ExpressionStatement",
                        "src": "7355:44:11"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1961,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1958,
                      "name": "scannedBytes",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1956,
                      "src": "6199:12:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1959,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1952,
                        "src": "6214:10:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1960,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "6214:17:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "6199:32:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2031,
                  "nodeType": "WhileStatement",
                  "src": "6192:1218:11"
                }
              ]
            },
            "documentation": "Execute the exchange orders by parsing the order data and facilitating the transfers\n     * @param _orderData   Bytes array containing the exchange orders to execute",
            "id": 2033,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeExchangeOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1953,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1952,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2033,
                  "src": "6109:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1951,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "6109:5:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6099:32:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1954,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6152:0:11"
            },
            "scope": 2064,
            "src": "6069:1347:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 2062,
              "nodeType": "Block",
              "src": "7761:478:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 2049,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 2044,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2041,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2035,
                              "src": "7872:6:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2042,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2880,
                            "src": "7872:23:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 2043,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "7898:1:11",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "7872:27:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "&&",
                        "rightExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 2048,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2045,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2035,
                              "src": "7903:6:11",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2046,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2874,
                            "src": "7903:15:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 2047,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "7921:1:11",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "7903:19:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "7872:50:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2050,
                        "name": "INVALID_TOKEN_AMOUNTS",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1737,
                        "src": "7936:21:11",
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
                      "id": 2040,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "7851:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
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
                    "src": "7851:116:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2052,
                  "nodeType": "ExpressionStatement",
                  "src": "7851:116:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 2058,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2054,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5387,
                            "src": "8044:5:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 2055,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "8044:15:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2056,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2035,
                            "src": "8063:6:11",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2057,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "expiration",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2882,
                          "src": "8063:17:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "8044:36:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2059,
                        "name": "ORDER_EXPIRED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1740,
                        "src": "8094:13:11",
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
                      "id": 2053,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "8023:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2060,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "8023:94:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2061,
                  "nodeType": "ExpressionStatement",
                  "src": "8023:94:11"
                }
              ]
            },
            "documentation": "Validate order params are still valid\n     * @param  _order           IssuanceOrder object containing order params\n@param  _fillQuantity    Quantity of Set to be filled",
            "id": 2063,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2038,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2035,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 2063,
                  "src": "7660:33:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$2891_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2034,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2891,
                    "src": "7660:26:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2891_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2037,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2063,
                  "src": "7703:18:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2036,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "7703:4:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7650:77:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 2039,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "7761:0:11"
            },
            "scope": 2064,
            "src": "7628:611:11",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 2065,
        "src": "1269:6972:11"
      }
    ],
    "src": "597:7645:11"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.899Z"
}
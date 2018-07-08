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
          "type": "address[5]"
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
          "name": "sigBytes",
          "type": "bytes32[]"
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
          "type": "address[5]"
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\n\nimport { Math } from \"zeppelin-solidity/contracts/math/Math.sol\";\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ExchangeHandler } from \"../lib/ExchangeHandler.sol\";\nimport { ICoreIssuance } from \"../interfaces/ICoreIssuance.sol\";\nimport { ISetToken } from \"../interfaces/ISetToken.sol\";\nimport { LibBytes } from \"../../external/0x/LibBytes.sol\";\nimport { OrderLibrary } from \"../lib/OrderLibrary.sol\";\n\n\n/**\n * @title CoreIssuanceOrder\n * @author Set Protocol\n *\n * The Core Issuance Order extension houses all functions related to the filling and\n * canceling issuance orders.\n *\n */\ncontract CoreIssuanceOrder is\n    ICoreIssuance,\n    CoreState,\n    CoreModifiers\n{\n    using SafeMath for uint256;\n    using Math for uint256;\n\n    /* ============ Constants ============ */\n\n    uint256 constant EXCHANGE_HEADER_LENGTH = 128;\n\n    string constant INVALID_CANCEL_ORDER = \"Only maker can cancel order.\";\n    string constant INVALID_EXCHANGE = \"Exchange does not exist.\";\n    string constant INVALID_FILL_AMOUNT = \"Fill amount must be equal or less than open order amount.\";\n    string constant INVALID_QUANTITY = \"Quantity must be multiple of the natural unit of the set.\";\n    string constant INVALID_SIGNATURE = \"Invalid order signature.\";\n    string constant POSITIVE_AMOUNT_REQUIRED = \"Quantity should be greater than 0.\";\n    string constant ORDER_EXPIRED = \"This order has expired.\";\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Fill an issuance order\n     *\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _fillQuantity   Quantity of set to be filled\n     * @param  _v              v element of ECDSA signature\n     * @param  sigBytes        Array with r and s segments of ECDSA signature\n     * @param _orderData       Bytes array containing the exchange orders to execute\n     */\n    function fillOrder(\n        address[5] _addresses,\n        uint[5] _values,\n        uint _fillQuantity,\n        uint8 _v,\n        bytes32[] sigBytes,\n        bytes _orderData\n    )\n        external\n        isValidSet(_addresses[0])\n        isPositiveQuantity(_fillQuantity)\n    {\n        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({\n            setAddress: _addresses[0],\n            quantity: _values[0],\n            makerAddress: _addresses[1],\n            makerToken: _addresses[2],\n            makerTokenAmount: _values[1],\n            expiration: _values[2],\n            relayerAddress: _addresses[3],\n            relayerToken: _addresses[4],\n            relayerTokenAmount: _values[3],\n            salt: _values[4],\n            orderHash: OrderLibrary.generateOrderHash(\n                _addresses,\n                _values\n            )\n        });\n\n        // Verify signature is authentic\n        require(\n            OrderLibrary.validateSignature(\n                order.orderHash,\n                order.makerAddress,\n                _v,\n                sigBytes[0], // r\n                sigBytes[1] // s\n            ),\n            INVALID_SIGNATURE\n        );\n\n        // Verify order is valid and return amount to be filled\n        validateOrder(\n            order,\n            _fillQuantity\n        );\n\n        // Execute exchange orders\n        executeExchangeOrders(_orderData);\n\n        // Check to make sure open order amount equals _fillQuantity\n        uint closedOrderAmount = state.orderFills[order.orderHash].add(state.orderCancels[order.orderHash]);\n        uint openOrderAmount = order.quantity.sub(closedOrderAmount);\n        require(\n            openOrderAmount >= _fillQuantity,\n            INVALID_FILL_AMOUNT\n        );\n\n        // Tally fill in orderFills mapping\n        state.orderFills[order.orderHash] = state.orderFills[order.orderHash].add(_fillQuantity);\n\n        //Issue Set\n        issueInternal(\n            order.makerAddress,\n            order.setAddress,\n            _fillQuantity\n        );\n    }\n\n    /**\n     * Cancel an issuance order\n     *\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _cancelQuantity Quantity of set to be filled\n     */\n    function cancelOrder(\n        address[5] _addresses,\n        uint[5] _values,\n        uint _cancelQuantity\n    )\n        external\n        isPositiveQuantity(_cancelQuantity)\n    {\n        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({\n            setAddress: _addresses[0],\n            quantity: _values[0],\n            makerAddress: _addresses[1],\n            makerToken: _addresses[2],\n            makerTokenAmount: _values[1],\n            expiration: _values[2],\n            relayerAddress: _addresses[3],\n            relayerToken: _addresses[4],\n            relayerTokenAmount: _values[3],\n            salt: _values[4],\n            orderHash: OrderLibrary.generateOrderHash(\n                _addresses,\n                _values\n            )\n        });\n\n        // Make sure cancel order comes from maker\n        require(order.makerAddress == msg.sender, INVALID_CANCEL_ORDER);\n\n        // Verify order is valid\n        validateOrder(\n            order,\n            _cancelQuantity\n        );\n\n        // Determine amount to cancel\n        uint closedOrderAmount = state.orderFills[order.orderHash].add(state.orderCancels[order.orderHash]);\n        uint openOrderAmount = order.quantity.sub(closedOrderAmount);\n        uint canceledAmount = openOrderAmount.min256(_cancelQuantity);\n\n        // Tally cancel in orderCancels mapping\n        state.orderCancels[order.orderHash] = state.orderCancels[order.orderHash].add(canceledAmount);\n    }\n\n    /* ============ Private Functions ============ */\n\n    /**\n     * Execute the exchange orders by parsing the order data and facilitating the transfers. Each\n     * header represents a batch of orders for a particular exchange (0x, KNC, taker). Additional\n     * information such as makerToken is encoded so it can be used to facilitate exchange orders\n     *\n     * @param _orderData   Bytes array containing the exchange orders to execute\n     */\n    function executeExchangeOrders(\n        bytes _orderData\n    )\n        private\n    {\n        uint256 scannedBytes;\n        while (scannedBytes < _orderData.length) {\n            // Read the next exchange order header\n            bytes memory headerData = LibBytes.slice(\n                _orderData,\n                scannedBytes,\n                scannedBytes.add(EXCHANGE_HEADER_LENGTH)\n            );\n            ExchangeHandler.ExchangeHeader memory header = ExchangeHandler.parseExchangeHeader(\n                headerData\n            );\n\n            // Get exchange address from state mapping based on header exchange info\n            address exchange = state.exchanges[header.exchange];\n\n            // Verify exchange address is registered\n            require(\n                exchange != address(0),\n                INVALID_EXCHANGE\n            );\n\n            // Read the order body based on header order length info\n            uint256 exchangeDataLength = header.totalOrdersLength.add(EXCHANGE_HEADER_LENGTH);\n            bytes memory orderBody = LibBytes.slice(\n                _orderData,\n                scannedBytes.add(EXCHANGE_HEADER_LENGTH),\n                scannedBytes.add(exchangeDataLength)\n            );\n\n            // TODO: Transfer header.makerToken to Exchange\n\n            // TODO: Call Exchange\n\n            // Update scanned bytes with header and body lengths\n            scannedBytes = scannedBytes.add(exchangeDataLength);\n        }\n    }\n\n    /**\n     * Validate order params are still valid\n     *\n     * @param  _order           IssuanceOrder object containing order params\n     * @param  _executeQuantity    Quantity of Set to be filled\n     */\n    function validateOrder(\n        OrderLibrary.IssuanceOrder _order,\n        uint _executeQuantity\n    )\n        private\n        view\n    {\n        // Make sure makerTokenAmount and Set Token to issue is greater than 0.\n        require(\n            _order.makerTokenAmount > 0 && _order.quantity > 0,\n            POSITIVE_AMOUNT_REQUIRED\n        );\n        // Make sure the order hasn't expired\n        require(\n            block.timestamp <= _order.expiration,\n            ORDER_EXPIRED\n        );\n\n        // Make sure IssuanceOrder quantity is multiple of natural unit\n        require(\n            _order.quantity % ISetToken(_order.setAddress).naturalUnit() == 0,\n            INVALID_QUANTITY\n        );\n\n        // Make sure fill or cancel quantity is multiple of natural unit\n        require(\n            _executeQuantity % ISetToken(_order.setAddress).naturalUnit() == 0,\n            INVALID_QUANTITY\n        );\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
    "exportedSymbols": {
      "CoreIssuanceOrder": [
        2665
      ]
    },
    "id": 2666,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2194,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:13"
      },
      {
        "id": 2195,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:13"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
        "file": "zeppelin-solidity/contracts/math/Math.sol",
        "id": 2197,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 5710,
        "src": "659:65:13",
        "symbolAliases": [
          {
            "foreign": 2196,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 2199,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 5804,
        "src": "725:73:13",
        "symbolAliases": [
          {
            "foreign": 2198,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 2201,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 2976,
        "src": "799:63:13",
        "symbolAliases": [
          {
            "foreign": 2200,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 2203,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 3089,
        "src": "863:49:13",
        "symbolAliases": [
          {
            "foreign": 2202,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
        "file": "../lib/ExchangeHandler.sol",
        "id": 2205,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 3288,
        "src": "913:61:13",
        "symbolAliases": [
          {
            "foreign": 2204,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
        "file": "../interfaces/ICoreIssuance.sol",
        "id": 2207,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 2771,
        "src": "975:64:13",
        "symbolAliases": [
          {
            "foreign": 2206,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 2209,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 2840,
        "src": "1040:56:13",
        "symbolAliases": [
          {
            "foreign": 2208,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 2211,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 4144,
        "src": "1097:58:13",
        "symbolAliases": [
          {
            "foreign": 2210,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../lib/OrderLibrary.sol",
        "id": 2213,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 3406,
        "src": "1156:55:13",
        "symbolAliases": [
          {
            "foreign": 2212,
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
              "id": 2214,
              "name": "ICoreIssuance",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2770,
              "src": "1429:13:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICoreIssuance_$2770",
                "typeString": "contract ICoreIssuance"
              }
            },
            "id": 2215,
            "nodeType": "InheritanceSpecifier",
            "src": "1429:13:13"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2216,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3088,
              "src": "1448:9:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3088",
                "typeString": "contract CoreState"
              }
            },
            "id": 2217,
            "nodeType": "InheritanceSpecifier",
            "src": "1448:9:13"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2218,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2975,
              "src": "1463:13:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2975",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 2219,
            "nodeType": "InheritanceSpecifier",
            "src": "1463:13:13"
          }
        ],
        "contractDependencies": [
          2770,
          2975,
          3088
        ],
        "contractKind": "contract",
        "documentation": "@title CoreIssuanceOrder\n@author Set Protocol\n * The Core Issuance Order extension houses all functions related to the filling and\ncanceling issuance orders.\n ",
        "fullyImplemented": false,
        "id": 2665,
        "linearizedBaseContracts": [
          2665,
          2975,
          3088,
          2770
        ],
        "name": "CoreIssuanceOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2222,
            "libraryName": {
              "contractScope": null,
              "id": 2220,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5803,
              "src": "1489:8:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$5803",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1483:27:13",
            "typeName": {
              "id": 2221,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1502:7:13",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 2225,
            "libraryName": {
              "contractScope": null,
              "id": 2223,
              "name": "Math",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5709,
              "src": "1521:4:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Math_$5709",
                "typeString": "library Math"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1515:23:13",
            "typeName": {
              "id": 2224,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1530:7:13",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 2228,
            "name": "EXCHANGE_HEADER_LENGTH",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1591:45:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 2226,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1591:7:13",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "313238",
              "id": 2227,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1633:3:13",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_128_by_1",
                "typeString": "int_const 128"
              },
              "value": "128"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2231,
            "name": "INVALID_CANCEL_ORDER",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1643:69:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2229,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1643:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4f6e6c79206d616b65722063616e2063616e63656c206f726465722e",
              "id": 2230,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1682:30:13",
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
            "id": 2234,
            "name": "INVALID_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1718:61:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2232,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1718:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "45786368616e676520646f6573206e6f742065786973742e",
              "id": 2233,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1753:26:13",
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
            "id": 2237,
            "name": "INVALID_FILL_AMOUNT",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1785:97:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2235,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1785:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "46696c6c20616d6f756e74206d75737420626520657175616c206f72206c657373207468616e206f70656e206f7264657220616d6f756e742e",
              "id": 2236,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1823:59:13",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_8f315a1c25e5546a5f1e2c45f4569d7fd8cc107fa5433f393ca93ce57a75d0e6",
                "typeString": "literal_string \"Fill amount must be equal or less than open order amount.\""
              },
              "value": "Fill amount must be equal or less than open order amount."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2240,
            "name": "INVALID_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1888:94:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2238,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1888:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d757374206265206d756c7469706c65206f6620746865206e61747572616c20756e6974206f6620746865207365742e",
              "id": 2239,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1923:59:13",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_d07f06b1dbcd0a898f7012f6e92da489627e9127773658e2348a0db0797b8933",
                "typeString": "literal_string \"Quantity must be multiple of the natural unit of the set.\""
              },
              "value": "Quantity must be multiple of the natural unit of the set."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2243,
            "name": "INVALID_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1988:62:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2241,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1988:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "496e76616c6964206f72646572207369676e61747572652e",
              "id": 2242,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2024:26:13",
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
            "id": 2246,
            "name": "POSITIVE_AMOUNT_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "2056:79:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2244,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2056:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e746974792073686f756c642062652067726561746572207468616e20302e",
              "id": 2245,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2099:36:13",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_70c945b88d7e0a924752a63daf2ab8f9fe317a01401ca73aa023bd096a1d1e60",
                "typeString": "literal_string \"Quantity should be greater than 0.\""
              },
              "value": "Quantity should be greater than 0."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2249,
            "name": "ORDER_EXPIRED",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "2141:57:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2247,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2141:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "54686973206f726465722068617320657870697265642e",
              "id": 2248,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2173:25:13",
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
              "id": 2401,
              "nodeType": "Block",
              "src": "3073:1787:13",
              "statements": [
                {
                  "assignments": [
                    2280
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2280,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2402,
                      "src": "3083:39:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2279,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3312,
                        "src": "3083:26:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2319,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2283,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2253,
                          "src": "3178:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2285,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2284,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3189:1:13",
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
                        "src": "3178:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2286,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2257,
                          "src": "3215:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2288,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2287,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3223:1:13",
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
                        "src": "3215:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2289,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2253,
                          "src": "3253:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2291,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2290,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3264:1:13",
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
                        "src": "3253:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2292,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2253,
                          "src": "3292:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2294,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2293,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3303:1:13",
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
                        "src": "3292:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2295,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2257,
                          "src": "3337:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2297,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2296,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3345:1:13",
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
                        "src": "3337:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2298,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2257,
                          "src": "3373:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2300,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2299,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3381:1:13",
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
                        "src": "3373:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2301,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2253,
                          "src": "3413:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2303,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2302,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3424:1:13",
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
                        "src": "3413:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2304,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2253,
                          "src": "3454:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2306,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2305,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3465:1:13",
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
                        "src": "3454:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2307,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2257,
                          "src": "3501:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2309,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2308,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3509:1:13",
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
                        "src": "3501:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2310,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2257,
                          "src": "3531:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2312,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2311,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3539:1:13",
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
                        "src": "3531:10:13",
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
                            "id": 2315,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2253,
                            "src": "3614:10:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2316,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2257,
                            "src": "3642:7:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2313,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3405,
                            "src": "3566:12:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2314,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3362,
                          "src": "3566:30:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 2317,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3566:97:13",
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
                        "id": 2281,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3405,
                        "src": "3125:12:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 2282,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3312,
                      "src": "3125:26:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$3312_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 2318,
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
                      "relayerAddress",
                      "relayerToken",
                      "relayerTokenAmount",
                      "salt",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "3125:549:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3083:591:13"
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
                              "id": 2323,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2280,
                              "src": "3795:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2324,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3311,
                            "src": "3795:15:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2325,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2280,
                              "src": "3828:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2326,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3295,
                            "src": "3828:18:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2327,
                            "name": "_v",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2261,
                            "src": "3864:2:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2328,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2264,
                              "src": "3884:8:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 2330,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 2329,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3893:1:13",
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
                            "src": "3884:11:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2331,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2264,
                              "src": "3918:8:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 2333,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 2332,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3927:1:13",
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
                            "src": "3918:11:13",
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
                            "id": 2321,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3405,
                            "src": "3747:12:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2322,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validateSignature",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3404,
                          "src": "3747:30:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                            "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                          }
                        },
                        "id": 2334,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3747:201:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2335,
                        "name": "INVALID_SIGNATURE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2243,
                        "src": "3962:17:13",
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
                      "id": 2320,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "3726:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2336,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3726:263:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2337,
                  "nodeType": "ExpressionStatement",
                  "src": "3726:263:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2339,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2280,
                        "src": "4091:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2340,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2259,
                        "src": "4110:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 2338,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2664,
                      "src": "4064:13:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$3312_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 2341,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4064:69:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2342,
                  "nodeType": "ExpressionStatement",
                  "src": "4064:69:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2344,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2266,
                        "src": "4201:10:13",
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
                      "id": 2343,
                      "name": "executeExchangeOrders",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2605,
                      "src": "4179:21:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_bytes_memory_ptr_$returns$__$",
                        "typeString": "function (bytes memory)"
                      }
                    },
                    "id": 2345,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4179:33:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2346,
                  "nodeType": "ExpressionStatement",
                  "src": "4179:33:13"
                },
                {
                  "assignments": [
                    2348
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2348,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2402,
                      "src": "4292:22:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2347,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "4292:4:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2361,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2355,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "4355:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2356,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3001,
                          "src": "4355:18:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2359,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2357,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2280,
                            "src": "4374:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2358,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3311,
                          "src": "4374:15:13",
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
                        "src": "4355:35:13",
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
                            "id": 2349,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "4317:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2350,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2997,
                          "src": "4317:16:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2353,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2351,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2280,
                            "src": "4334:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2352,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3311,
                          "src": "4334:15:13",
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
                        "src": "4317:33:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2354,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5802,
                      "src": "4317:37:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2360,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4317:74:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4292:99:13"
                },
                {
                  "assignments": [
                    2363
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2363,
                      "name": "openOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2402,
                      "src": "4401:20:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2362,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "4401:4:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2369,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2367,
                        "name": "closedOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2348,
                        "src": "4443:17:13",
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
                          "id": 2364,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2280,
                          "src": "4424:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2365,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3293,
                        "src": "4424:14:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2366,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5778,
                      "src": "4424:18:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2368,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4424:37:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4401:60:13"
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
                        "id": 2373,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 2371,
                          "name": "openOrderAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2363,
                          "src": "4492:15:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 2372,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2259,
                          "src": "4511:13:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4492:32:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2374,
                        "name": "INVALID_FILL_AMOUNT",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2237,
                        "src": "4538:19:13",
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
                      "id": 2370,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "4471:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2375,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4471:96:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2376,
                  "nodeType": "ExpressionStatement",
                  "src": "4471:96:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2391,
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
                          "id": 2377,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "4622:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2381,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderFills",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2997,
                        "src": "4622:16:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 2382,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2379,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2280,
                          "src": "4639:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2380,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3311,
                        "src": "4639:15:13",
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
                      "src": "4622:33:13",
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
                          "id": 2389,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2259,
                          "src": "4696:13:13",
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
                              "id": 2383,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "4658:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2384,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderFills",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2997,
                            "src": "4658:16:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 2387,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2385,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2280,
                              "src": "4675:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2386,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3311,
                            "src": "4675:15:13",
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
                          "src": "4658:33:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2388,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5802,
                        "src": "4658:37:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 2390,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "4658:52:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4622:88:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 2392,
                  "nodeType": "ExpressionStatement",
                  "src": "4622:88:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2394,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2280,
                          "src": "4768:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2395,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3295,
                        "src": "4768:18:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2396,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2280,
                          "src": "4800:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2397,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3291,
                        "src": "4800:16:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2398,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2259,
                        "src": "4830:13:13",
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
                      "id": 2393,
                      "name": "issueInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2769,
                      "src": "4741:13:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 2399,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4741:112:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2400,
                  "nodeType": "ExpressionStatement",
                  "src": "4741:112:13"
                }
              ]
            },
            "documentation": "Fill an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _fillQuantity   Quantity of set to be filled\n@param  _v              v element of ECDSA signature\n@param  sigBytes        Array with r and s segments of ECDSA signature\n@param _orderData       Bytes array containing the exchange orders to execute",
            "id": 2402,
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
                      "id": 2269,
                      "name": "_addresses",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2253,
                      "src": "3012:10:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                        "typeString": "address[5] calldata"
                      }
                    },
                    "id": 2271,
                    "indexExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 2270,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3023:1:13",
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
                    "src": "3012:13:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 2272,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2268,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2953,
                  "src": "3001:10:13",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3001:25:13"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 2274,
                    "name": "_fillQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2259,
                    "src": "3054:13:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 2275,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2273,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2925,
                  "src": "3035:18:13",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3035:33:13"
              }
            ],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2267,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2253,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2823:21:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2250,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2823:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2252,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2251,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2831:1:13",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "2823:10:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2257,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2854:15:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2254,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2854:4:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2256,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2255,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2859:1:13",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "2854:7:13",
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
                  "id": 2259,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2879:18:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2258,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2879:4:13",
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
                  "id": 2261,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2907:8:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 2260,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2907:5:13",
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
                  "id": 2264,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2925:18:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2262,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "2925:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 2263,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2925:9:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes32_$dyn_storage_ptr",
                      "typeString": "bytes32[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2266,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2953:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2265,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2953:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2813:162:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2276,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3073:0:13"
            },
            "scope": 2665,
            "src": "2795:2065:13",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2521,
              "nodeType": "Block",
              "src": "5357:1289:13",
              "statements": [
                {
                  "assignments": [
                    2421
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2421,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2522,
                      "src": "5367:39:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2420,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3312,
                        "src": "5367:26:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2460,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2424,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2406,
                          "src": "5462:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2426,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2425,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5473:1:13",
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
                        "src": "5462:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2427,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2410,
                          "src": "5499:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2429,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2428,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5507:1:13",
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
                        "src": "5499:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2430,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2406,
                          "src": "5537:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2432,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2431,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5548:1:13",
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
                        "src": "5537:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2433,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2406,
                          "src": "5576:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2435,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2434,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5587:1:13",
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
                        "src": "5576:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2436,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2410,
                          "src": "5621:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2438,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2437,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5629:1:13",
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
                        "src": "5621:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2439,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2410,
                          "src": "5657:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2441,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2440,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5665:1:13",
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
                        "src": "5657:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2442,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2406,
                          "src": "5697:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2444,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2443,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5708:1:13",
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
                        "src": "5697:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2445,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2406,
                          "src": "5738:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2447,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2446,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5749:1:13",
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
                        "src": "5738:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2448,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2410,
                          "src": "5785:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2450,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2449,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5793:1:13",
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
                        "src": "5785:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2451,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2410,
                          "src": "5815:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2453,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2452,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5823:1:13",
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
                        "src": "5815:10:13",
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
                            "id": 2456,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2406,
                            "src": "5898:10:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2457,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2410,
                            "src": "5926:7:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2454,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3405,
                            "src": "5850:12:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2455,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3362,
                          "src": "5850:30:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 2458,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5850:97:13",
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
                        "id": 2422,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3405,
                        "src": "5409:12:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 2423,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3312,
                      "src": "5409:26:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$3312_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 2459,
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
                      "relayerAddress",
                      "relayerToken",
                      "relayerTokenAmount",
                      "salt",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "5409:549:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5367:591:13"
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
                        "id": 2466,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2462,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2421,
                            "src": "6028:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2463,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "makerAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3295,
                          "src": "6028:18:13",
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
                            "id": 2464,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6356,
                            "src": "6050:3:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 2465,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "6050:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "6028:32:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2467,
                        "name": "INVALID_CANCEL_ORDER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2231,
                        "src": "6062:20:13",
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
                      "id": 2461,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "6020:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2468,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6020:63:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2469,
                  "nodeType": "ExpressionStatement",
                  "src": "6020:63:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2471,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2421,
                        "src": "6154:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2472,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2412,
                        "src": "6173:15:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 2470,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2664,
                      "src": "6127:13:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$3312_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 2473,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6127:71:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2474,
                  "nodeType": "ExpressionStatement",
                  "src": "6127:71:13"
                },
                {
                  "assignments": [
                    2476
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2476,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2522,
                      "src": "6247:22:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2475,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6247:4:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2489,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2483,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "6310:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2484,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3001,
                          "src": "6310:18:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2487,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2485,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2421,
                            "src": "6329:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2486,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3311,
                          "src": "6329:15:13",
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
                        "src": "6310:35:13",
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
                            "id": 2477,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "6272:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2478,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2997,
                          "src": "6272:16:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2481,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2479,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2421,
                            "src": "6289:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2480,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3311,
                          "src": "6289:15:13",
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
                        "src": "6272:33:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2482,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5802,
                      "src": "6272:37:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2488,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6272:74:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6247:99:13"
                },
                {
                  "assignments": [
                    2491
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2491,
                      "name": "openOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2522,
                      "src": "6356:20:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2490,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6356:4:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2497,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2495,
                        "name": "closedOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2476,
                        "src": "6398:17:13",
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
                          "id": 2492,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2421,
                          "src": "6379:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2493,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3293,
                        "src": "6379:14:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2494,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5778,
                      "src": "6379:18:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2496,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6379:37:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6356:60:13"
                },
                {
                  "assignments": [
                    2499
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2499,
                      "name": "canceledAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2522,
                      "src": "6426:19:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2498,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6426:4:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2504,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2502,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2412,
                        "src": "6471:15:13",
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
                        "id": 2500,
                        "name": "openOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2491,
                        "src": "6448:15:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2501,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "min256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5708,
                      "src": "6448:22:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2503,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6448:39:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6426:61:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2519,
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
                          "id": 2505,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "6546:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2509,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderCancels",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3001,
                        "src": "6546:18:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 2510,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2507,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2421,
                          "src": "6565:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2508,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3311,
                        "src": "6565:15:13",
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
                      "src": "6546:35:13",
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
                          "id": 2517,
                          "name": "canceledAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2499,
                          "src": "6624:14:13",
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
                              "id": 2511,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "6584:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2512,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderCancels",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3001,
                            "src": "6584:18:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 2515,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2513,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2421,
                              "src": "6603:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2514,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3311,
                            "src": "6603:15:13",
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
                          "src": "6584:35:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2516,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5802,
                        "src": "6584:39:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 2518,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "6584:55:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "6546:93:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 2520,
                  "nodeType": "ExpressionStatement",
                  "src": "6546:93:13"
                }
              ]
            },
            "documentation": "Cancel an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _cancelQuantity Quantity of set to be filled",
            "id": 2522,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 2415,
                    "name": "_cancelQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2412,
                    "src": "5336:15:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 2416,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2414,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2925,
                  "src": "5317:18:13",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "5317:35:13"
              }
            ],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2413,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2406,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2522,
                  "src": "5209:21:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2403,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5209:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2405,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2404,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5217:1:13",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5209:10:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2410,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 2522,
                  "src": "5240:15:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2407,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5240:4:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2409,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2408,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5245:1:13",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5240:7:13",
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
                  "id": 2412,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2522,
                  "src": "5265:20:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2411,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5265:4:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5199:92:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2417,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5357:0:13"
            },
            "scope": 2665,
            "src": "5179:1467:13",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2604,
              "nodeType": "Block",
              "src": "7187:1385:13",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2528,
                      "name": "scannedBytes",
                      "nodeType": "VariableDeclaration",
                      "scope": 2605,
                      "src": "7197:20:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2527,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7197:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2529,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7197:20:13"
                },
                {
                  "body": {
                    "id": 2602,
                    "nodeType": "Block",
                    "src": "7268:1298:13",
                    "statements": [
                      {
                        "assignments": [
                          2535
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2535,
                            "name": "headerData",
                            "nodeType": "VariableDeclaration",
                            "scope": 2605,
                            "src": "7333:23:13",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 2534,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "7333:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2545,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2538,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2524,
                              "src": "7391:10:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2539,
                              "name": "scannedBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2528,
                              "src": "7419:12:13",
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
                                  "id": 2542,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2228,
                                  "src": "7466:22:13",
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
                                  "id": 2540,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2528,
                                  "src": "7449:12:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2541,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 5802,
                                "src": "7449:16:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2543,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7449:40:13",
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
                              "id": 2536,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4143,
                              "src": "7359:8:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$4143_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 2537,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4142,
                            "src": "7359:14:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 2544,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7359:144:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7333:170:13"
                      },
                      {
                        "assignments": [
                          2549
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2549,
                            "name": "header",
                            "nodeType": "VariableDeclaration",
                            "scope": 2605,
                            "src": "7517:44:13",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_ExchangeHeader_$3272_memory_ptr",
                              "typeString": "struct ExchangeHandler.ExchangeHeader"
                            },
                            "typeName": {
                              "contractScope": null,
                              "id": 2548,
                              "name": "ExchangeHandler.ExchangeHeader",
                              "nodeType": "UserDefinedTypeName",
                              "referencedDeclaration": 3272,
                              "src": "7517:30:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$3272_storage_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2554,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2552,
                              "name": "headerData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2535,
                              "src": "7617:10:13",
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
                              "id": 2550,
                              "name": "ExchangeHandler",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3287,
                              "src": "7564:15:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_ExchangeHandler_$3287_$",
                                "typeString": "type(library ExchangeHandler)"
                              }
                            },
                            "id": 2551,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "parseExchangeHeader",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3286,
                            "src": "7564:35:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_ExchangeHeader_$3272_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (struct ExchangeHandler.ExchangeHeader memory)"
                            }
                          },
                          "id": 2553,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7564:77:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ExchangeHeader_$3272_memory_ptr",
                            "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7517:124:13"
                      },
                      {
                        "assignments": [
                          2556
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2556,
                            "name": "exchange",
                            "nodeType": "VariableDeclaration",
                            "scope": 2605,
                            "src": "7741:16:13",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            "typeName": {
                              "id": 2555,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "7741:7:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2562,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2557,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "7760:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2558,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchanges",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2981,
                            "src": "7760:15:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                              "typeString": "mapping(uint8 => address)"
                            }
                          },
                          "id": 2561,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2559,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2549,
                              "src": "7776:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$3272_memory_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                              }
                            },
                            "id": 2560,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchange",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3265,
                            "src": "7776:15:13",
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
                          "src": "7760:32:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7741:51:13"
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
                              "id": 2568,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "leftExpression": {
                                "argumentTypes": null,
                                "id": 2564,
                                "name": "exchange",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2556,
                                "src": "7885:8:13",
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
                                    "id": 2566,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "kind": "number",
                                    "lValueRequested": false,
                                    "nodeType": "Literal",
                                    "src": "7905:1:13",
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
                                  "id": 2565,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "nodeType": "ElementaryTypeNameExpression",
                                  "src": "7897:7:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_address_$",
                                    "typeString": "type(address)"
                                  },
                                  "typeName": "address"
                                },
                                "id": 2567,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "7897:10:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "src": "7885:22:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2569,
                              "name": "INVALID_EXCHANGE",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2234,
                              "src": "7925:16:13",
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
                            "id": 2563,
                            "name": "require",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [
                              6359,
                              6360
                            ],
                            "referencedDeclaration": 6360,
                            "src": "7860:7:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                              "typeString": "function (bool,string memory) pure"
                            }
                          },
                          "id": 2570,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7860:95:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 2571,
                        "nodeType": "ExpressionStatement",
                        "src": "7860:95:13"
                      },
                      {
                        "assignments": [
                          2573
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2573,
                            "name": "exchangeDataLength",
                            "nodeType": "VariableDeclaration",
                            "scope": 2605,
                            "src": "8039:26:13",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 2572,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "8039:7:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2579,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2577,
                              "name": "EXCHANGE_HEADER_LENGTH",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2228,
                              "src": "8097:22:13",
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
                                "id": 2574,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2549,
                                "src": "8068:6:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_ExchangeHeader_$3272_memory_ptr",
                                  "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                                }
                              },
                              "id": 2575,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "totalOrdersLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3271,
                              "src": "8068:24:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2576,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 5802,
                            "src": "8068:28:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2578,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8068:52:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8039:81:13"
                      },
                      {
                        "assignments": [
                          2581
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2581,
                            "name": "orderBody",
                            "nodeType": "VariableDeclaration",
                            "scope": 2605,
                            "src": "8134:22:13",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 2580,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "8134:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2594,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2584,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2524,
                              "src": "8191:10:13",
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
                                  "id": 2587,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2228,
                                  "src": "8236:22:13",
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
                                  "id": 2585,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2528,
                                  "src": "8219:12:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2586,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 5802,
                                "src": "8219:16:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2588,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8219:40:13",
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
                                  "id": 2591,
                                  "name": "exchangeDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2573,
                                  "src": "8294:18:13",
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
                                  "id": 2589,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2528,
                                  "src": "8277:12:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2590,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 5802,
                                "src": "8277:16:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2592,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8277:36:13",
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
                              "id": 2582,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4143,
                              "src": "8159:8:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$4143_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 2583,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4142,
                            "src": "8159:14:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 2593,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8159:168:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8134:193:13"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 2600,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 2595,
                            "name": "scannedBytes",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2528,
                            "src": "8504:12:13",
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
                                "id": 2598,
                                "name": "exchangeDataLength",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2573,
                                "src": "8536:18:13",
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
                                "id": 2596,
                                "name": "scannedBytes",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2528,
                                "src": "8519:12:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 2597,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 5802,
                              "src": "8519:16:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 2599,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "8519:36:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "8504:51:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2601,
                        "nodeType": "ExpressionStatement",
                        "src": "8504:51:13"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 2533,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 2530,
                      "name": "scannedBytes",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2528,
                      "src": "7234:12:13",
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
                        "id": 2531,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2524,
                        "src": "7249:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2532,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "7249:17:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "7234:32:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2603,
                  "nodeType": "WhileStatement",
                  "src": "7227:1339:13"
                }
              ]
            },
            "documentation": "Execute the exchange orders by parsing the order data and facilitating the transfers. Each\nheader represents a batch of orders for a particular exchange (0x, KNC, taker). Additional\ninformation such as makerToken is encoded so it can be used to facilitate exchange orders\n     * @param _orderData   Bytes array containing the exchange orders to execute",
            "id": 2605,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeExchangeOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2525,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2524,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2605,
                  "src": "7144:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2523,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7144:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7134:32:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2526,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "7187:0:13"
            },
            "scope": 2665,
            "src": "7104:1468:13",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 2663,
              "nodeType": "Block",
              "src": "8923:786:13",
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
                        "id": 2621,
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
                          "id": 2616,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2613,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2607,
                              "src": "9034:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2614,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3299,
                            "src": "9034:23:13",
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
                            "id": 2615,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "9060:1:13",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "9034:27:13",
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
                          "id": 2620,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2617,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2607,
                              "src": "9065:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2618,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3293,
                            "src": "9065:15:13",
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
                            "id": 2619,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "9083:1:13",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "9065:19:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "9034:50:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2622,
                        "name": "POSITIVE_AMOUNT_REQUIRED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2246,
                        "src": "9098:24:13",
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
                      "id": 2612,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "9013:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2623,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9013:119:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2624,
                  "nodeType": "ExpressionStatement",
                  "src": "9013:119:13"
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
                        "id": 2630,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2626,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6346,
                            "src": "9209:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 2627,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "9209:15:13",
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
                            "id": 2628,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2607,
                            "src": "9228:6:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2629,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "expiration",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3301,
                          "src": "9228:17:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "9209:36:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2631,
                        "name": "ORDER_EXPIRED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2249,
                        "src": "9259:13:13",
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
                      "id": 2625,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "9188:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2632,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9188:94:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2633,
                  "nodeType": "ExpressionStatement",
                  "src": "9188:94:13"
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
                        "id": 2645,
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
                          "id": 2643,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2635,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2607,
                              "src": "9386:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2636,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3293,
                            "src": "9386:15:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "%",
                          "rightExpression": {
                            "argumentTypes": null,
                            "arguments": [],
                            "expression": {
                              "argumentTypes": [],
                              "expression": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 2638,
                                      "name": "_order",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 2607,
                                      "src": "9414:6:13",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                      }
                                    },
                                    "id": 2639,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setAddress",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3291,
                                    "src": "9414:17:13",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "id": 2637,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2839,
                                  "src": "9404:9:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$2839_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2640,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "9404:28:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$2839",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2641,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2812,
                              "src": "9404:40:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2642,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "9404:42:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "9386:60:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2644,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "9450:1:13",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "9386:65:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2646,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2240,
                        "src": "9465:16:13",
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
                      "id": 2634,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "9365:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2647,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9365:126:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2648,
                  "nodeType": "ExpressionStatement",
                  "src": "9365:126:13"
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
                        "id": 2659,
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
                          "id": 2657,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 2650,
                            "name": "_executeQuantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2609,
                            "src": "9596:16:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "%",
                          "rightExpression": {
                            "argumentTypes": null,
                            "arguments": [],
                            "expression": {
                              "argumentTypes": [],
                              "expression": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 2652,
                                      "name": "_order",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 2607,
                                      "src": "9625:6:13",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                      }
                                    },
                                    "id": 2653,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setAddress",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3291,
                                    "src": "9625:17:13",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "id": 2651,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2839,
                                  "src": "9615:9:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$2839_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2654,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "9615:28:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$2839",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2655,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2812,
                              "src": "9615:40:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2656,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "9615:42:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "9596:61:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2658,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "9661:1:13",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "9596:66:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2660,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2240,
                        "src": "9676:16:13",
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
                      "id": 2649,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "9575:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2661,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9575:127:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2662,
                  "nodeType": "ExpressionStatement",
                  "src": "9575:127:13"
                }
              ]
            },
            "documentation": "Validate order params are still valid\n     * @param  _order           IssuanceOrder object containing order params\n@param  _executeQuantity    Quantity of Set to be filled",
            "id": 2664,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2610,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2607,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 2664,
                  "src": "8819:33:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2606,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3312,
                    "src": "8819:26:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3312_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2609,
                  "name": "_executeQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2664,
                  "src": "8862:21:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2608,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "8862:4:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8809:80:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2611,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "8923:0:13"
            },
            "scope": 2665,
            "src": "8787:922:13",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 2666,
        "src": "1395:8316:13"
      }
    ],
    "src": "597:9115:13"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
    "exportedSymbols": {
      "CoreIssuanceOrder": [
        2665
      ]
    },
    "id": 2666,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2194,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:13"
      },
      {
        "id": 2195,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:13"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
        "file": "zeppelin-solidity/contracts/math/Math.sol",
        "id": 2197,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 5710,
        "src": "659:65:13",
        "symbolAliases": [
          {
            "foreign": 2196,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 2199,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 5804,
        "src": "725:73:13",
        "symbolAliases": [
          {
            "foreign": 2198,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 2201,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 2976,
        "src": "799:63:13",
        "symbolAliases": [
          {
            "foreign": 2200,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 2203,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 3089,
        "src": "863:49:13",
        "symbolAliases": [
          {
            "foreign": 2202,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
        "file": "../lib/ExchangeHandler.sol",
        "id": 2205,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 3288,
        "src": "913:61:13",
        "symbolAliases": [
          {
            "foreign": 2204,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
        "file": "../interfaces/ICoreIssuance.sol",
        "id": 2207,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 2771,
        "src": "975:64:13",
        "symbolAliases": [
          {
            "foreign": 2206,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 2209,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 2840,
        "src": "1040:56:13",
        "symbolAliases": [
          {
            "foreign": 2208,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 2211,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 4144,
        "src": "1097:58:13",
        "symbolAliases": [
          {
            "foreign": 2210,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../lib/OrderLibrary.sol",
        "id": 2213,
        "nodeType": "ImportDirective",
        "scope": 2666,
        "sourceUnit": 3406,
        "src": "1156:55:13",
        "symbolAliases": [
          {
            "foreign": 2212,
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
              "id": 2214,
              "name": "ICoreIssuance",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2770,
              "src": "1429:13:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICoreIssuance_$2770",
                "typeString": "contract ICoreIssuance"
              }
            },
            "id": 2215,
            "nodeType": "InheritanceSpecifier",
            "src": "1429:13:13"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2216,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3088,
              "src": "1448:9:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3088",
                "typeString": "contract CoreState"
              }
            },
            "id": 2217,
            "nodeType": "InheritanceSpecifier",
            "src": "1448:9:13"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2218,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2975,
              "src": "1463:13:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2975",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 2219,
            "nodeType": "InheritanceSpecifier",
            "src": "1463:13:13"
          }
        ],
        "contractDependencies": [
          2770,
          2975,
          3088
        ],
        "contractKind": "contract",
        "documentation": "@title CoreIssuanceOrder\n@author Set Protocol\n * The Core Issuance Order extension houses all functions related to the filling and\ncanceling issuance orders.\n ",
        "fullyImplemented": false,
        "id": 2665,
        "linearizedBaseContracts": [
          2665,
          2975,
          3088,
          2770
        ],
        "name": "CoreIssuanceOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2222,
            "libraryName": {
              "contractScope": null,
              "id": 2220,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5803,
              "src": "1489:8:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$5803",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1483:27:13",
            "typeName": {
              "id": 2221,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1502:7:13",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 2225,
            "libraryName": {
              "contractScope": null,
              "id": 2223,
              "name": "Math",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5709,
              "src": "1521:4:13",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Math_$5709",
                "typeString": "library Math"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1515:23:13",
            "typeName": {
              "id": 2224,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1530:7:13",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 2228,
            "name": "EXCHANGE_HEADER_LENGTH",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1591:45:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 2226,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1591:7:13",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "313238",
              "id": 2227,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1633:3:13",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_128_by_1",
                "typeString": "int_const 128"
              },
              "value": "128"
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2231,
            "name": "INVALID_CANCEL_ORDER",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1643:69:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2229,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1643:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4f6e6c79206d616b65722063616e2063616e63656c206f726465722e",
              "id": 2230,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1682:30:13",
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
            "id": 2234,
            "name": "INVALID_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1718:61:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2232,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1718:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "45786368616e676520646f6573206e6f742065786973742e",
              "id": 2233,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1753:26:13",
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
            "id": 2237,
            "name": "INVALID_FILL_AMOUNT",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1785:97:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2235,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1785:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "46696c6c20616d6f756e74206d75737420626520657175616c206f72206c657373207468616e206f70656e206f7264657220616d6f756e742e",
              "id": 2236,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1823:59:13",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_8f315a1c25e5546a5f1e2c45f4569d7fd8cc107fa5433f393ca93ce57a75d0e6",
                "typeString": "literal_string \"Fill amount must be equal or less than open order amount.\""
              },
              "value": "Fill amount must be equal or less than open order amount."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2240,
            "name": "INVALID_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1888:94:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2238,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1888:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d757374206265206d756c7469706c65206f6620746865206e61747572616c20756e6974206f6620746865207365742e",
              "id": 2239,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1923:59:13",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_d07f06b1dbcd0a898f7012f6e92da489627e9127773658e2348a0db0797b8933",
                "typeString": "literal_string \"Quantity must be multiple of the natural unit of the set.\""
              },
              "value": "Quantity must be multiple of the natural unit of the set."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2243,
            "name": "INVALID_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "1988:62:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2241,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1988:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "496e76616c6964206f72646572207369676e61747572652e",
              "id": 2242,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2024:26:13",
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
            "id": 2246,
            "name": "POSITIVE_AMOUNT_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "2056:79:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2244,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2056:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e746974792073686f756c642062652067726561746572207468616e20302e",
              "id": 2245,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2099:36:13",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_70c945b88d7e0a924752a63daf2ab8f9fe317a01401ca73aa023bd096a1d1e60",
                "typeString": "literal_string \"Quantity should be greater than 0.\""
              },
              "value": "Quantity should be greater than 0."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 2249,
            "name": "ORDER_EXPIRED",
            "nodeType": "VariableDeclaration",
            "scope": 2665,
            "src": "2141:57:13",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2247,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2141:6:13",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "54686973206f726465722068617320657870697265642e",
              "id": 2248,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2173:25:13",
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
              "id": 2401,
              "nodeType": "Block",
              "src": "3073:1787:13",
              "statements": [
                {
                  "assignments": [
                    2280
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2280,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2402,
                      "src": "3083:39:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2279,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3312,
                        "src": "3083:26:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2319,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2283,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2253,
                          "src": "3178:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2285,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2284,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3189:1:13",
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
                        "src": "3178:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2286,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2257,
                          "src": "3215:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2288,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2287,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3223:1:13",
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
                        "src": "3215:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2289,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2253,
                          "src": "3253:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2291,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2290,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3264:1:13",
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
                        "src": "3253:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2292,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2253,
                          "src": "3292:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2294,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2293,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3303:1:13",
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
                        "src": "3292:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2295,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2257,
                          "src": "3337:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2297,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2296,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3345:1:13",
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
                        "src": "3337:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2298,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2257,
                          "src": "3373:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2300,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2299,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3381:1:13",
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
                        "src": "3373:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2301,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2253,
                          "src": "3413:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2303,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2302,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3424:1:13",
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
                        "src": "3413:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2304,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2253,
                          "src": "3454:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2306,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2305,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3465:1:13",
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
                        "src": "3454:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2307,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2257,
                          "src": "3501:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2309,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2308,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3509:1:13",
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
                        "src": "3501:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2310,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2257,
                          "src": "3531:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2312,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2311,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3539:1:13",
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
                        "src": "3531:10:13",
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
                            "id": 2315,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2253,
                            "src": "3614:10:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2316,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2257,
                            "src": "3642:7:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2313,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3405,
                            "src": "3566:12:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2314,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3362,
                          "src": "3566:30:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 2317,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3566:97:13",
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
                        "id": 2281,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3405,
                        "src": "3125:12:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 2282,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3312,
                      "src": "3125:26:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$3312_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 2318,
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
                      "relayerAddress",
                      "relayerToken",
                      "relayerTokenAmount",
                      "salt",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "3125:549:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3083:591:13"
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
                              "id": 2323,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2280,
                              "src": "3795:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2324,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3311,
                            "src": "3795:15:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2325,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2280,
                              "src": "3828:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2326,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3295,
                            "src": "3828:18:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2327,
                            "name": "_v",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2261,
                            "src": "3864:2:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2328,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2264,
                              "src": "3884:8:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 2330,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 2329,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3893:1:13",
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
                            "src": "3884:11:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2331,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2264,
                              "src": "3918:8:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 2333,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 2332,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "3927:1:13",
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
                            "src": "3918:11:13",
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
                            "id": 2321,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3405,
                            "src": "3747:12:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2322,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validateSignature",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3404,
                          "src": "3747:30:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                            "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                          }
                        },
                        "id": 2334,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3747:201:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2335,
                        "name": "INVALID_SIGNATURE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2243,
                        "src": "3962:17:13",
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
                      "id": 2320,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "3726:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2336,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3726:263:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2337,
                  "nodeType": "ExpressionStatement",
                  "src": "3726:263:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2339,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2280,
                        "src": "4091:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2340,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2259,
                        "src": "4110:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 2338,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2664,
                      "src": "4064:13:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$3312_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 2341,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4064:69:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2342,
                  "nodeType": "ExpressionStatement",
                  "src": "4064:69:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2344,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2266,
                        "src": "4201:10:13",
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
                      "id": 2343,
                      "name": "executeExchangeOrders",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2605,
                      "src": "4179:21:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_bytes_memory_ptr_$returns$__$",
                        "typeString": "function (bytes memory)"
                      }
                    },
                    "id": 2345,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4179:33:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2346,
                  "nodeType": "ExpressionStatement",
                  "src": "4179:33:13"
                },
                {
                  "assignments": [
                    2348
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2348,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2402,
                      "src": "4292:22:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2347,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "4292:4:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2361,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2355,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "4355:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2356,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3001,
                          "src": "4355:18:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2359,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2357,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2280,
                            "src": "4374:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2358,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3311,
                          "src": "4374:15:13",
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
                        "src": "4355:35:13",
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
                            "id": 2349,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "4317:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2350,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2997,
                          "src": "4317:16:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2353,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2351,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2280,
                            "src": "4334:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2352,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3311,
                          "src": "4334:15:13",
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
                        "src": "4317:33:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2354,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5802,
                      "src": "4317:37:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2360,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4317:74:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4292:99:13"
                },
                {
                  "assignments": [
                    2363
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2363,
                      "name": "openOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2402,
                      "src": "4401:20:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2362,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "4401:4:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2369,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2367,
                        "name": "closedOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2348,
                        "src": "4443:17:13",
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
                          "id": 2364,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2280,
                          "src": "4424:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2365,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3293,
                        "src": "4424:14:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2366,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5778,
                      "src": "4424:18:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2368,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4424:37:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "4401:60:13"
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
                        "id": 2373,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 2371,
                          "name": "openOrderAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2363,
                          "src": "4492:15:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 2372,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2259,
                          "src": "4511:13:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4492:32:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2374,
                        "name": "INVALID_FILL_AMOUNT",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2237,
                        "src": "4538:19:13",
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
                      "id": 2370,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "4471:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2375,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4471:96:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2376,
                  "nodeType": "ExpressionStatement",
                  "src": "4471:96:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2391,
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
                          "id": 2377,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "4622:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2381,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderFills",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2997,
                        "src": "4622:16:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 2382,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2379,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2280,
                          "src": "4639:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2380,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3311,
                        "src": "4639:15:13",
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
                      "src": "4622:33:13",
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
                          "id": 2389,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2259,
                          "src": "4696:13:13",
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
                              "id": 2383,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "4658:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2384,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderFills",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2997,
                            "src": "4658:16:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 2387,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2385,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2280,
                              "src": "4675:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2386,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3311,
                            "src": "4675:15:13",
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
                          "src": "4658:33:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2388,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5802,
                        "src": "4658:37:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 2390,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "4658:52:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4622:88:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 2392,
                  "nodeType": "ExpressionStatement",
                  "src": "4622:88:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2394,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2280,
                          "src": "4768:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2395,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3295,
                        "src": "4768:18:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2396,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2280,
                          "src": "4800:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2397,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3291,
                        "src": "4800:16:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2398,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2259,
                        "src": "4830:13:13",
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
                      "id": 2393,
                      "name": "issueInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2769,
                      "src": "4741:13:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 2399,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4741:112:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2400,
                  "nodeType": "ExpressionStatement",
                  "src": "4741:112:13"
                }
              ]
            },
            "documentation": "Fill an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _fillQuantity   Quantity of set to be filled\n@param  _v              v element of ECDSA signature\n@param  sigBytes        Array with r and s segments of ECDSA signature\n@param _orderData       Bytes array containing the exchange orders to execute",
            "id": 2402,
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
                      "id": 2269,
                      "name": "_addresses",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2253,
                      "src": "3012:10:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                        "typeString": "address[5] calldata"
                      }
                    },
                    "id": 2271,
                    "indexExpression": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 2270,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3023:1:13",
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
                    "src": "3012:13:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 2272,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2268,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2953,
                  "src": "3001:10:13",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3001:25:13"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 2274,
                    "name": "_fillQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2259,
                    "src": "3054:13:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 2275,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2273,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2925,
                  "src": "3035:18:13",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3035:33:13"
              }
            ],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2267,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2253,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2823:21:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2250,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2823:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2252,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2251,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2831:1:13",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "2823:10:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2257,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2854:15:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2254,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2854:4:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2256,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2255,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2859:1:13",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "2854:7:13",
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
                  "id": 2259,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2879:18:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2258,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2879:4:13",
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
                  "id": 2261,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2907:8:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 2260,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "2907:5:13",
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
                  "id": 2264,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2925:18:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2262,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "2925:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 2263,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2925:9:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_bytes32_$dyn_storage_ptr",
                      "typeString": "bytes32[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2266,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2402,
                  "src": "2953:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2265,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "2953:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2813:162:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2276,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3073:0:13"
            },
            "scope": 2665,
            "src": "2795:2065:13",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2521,
              "nodeType": "Block",
              "src": "5357:1289:13",
              "statements": [
                {
                  "assignments": [
                    2421
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2421,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2522,
                      "src": "5367:39:13",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2420,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3312,
                        "src": "5367:26:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2460,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2424,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2406,
                          "src": "5462:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2426,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2425,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5473:1:13",
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
                        "src": "5462:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2427,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2410,
                          "src": "5499:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2429,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2428,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5507:1:13",
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
                        "src": "5499:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2430,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2406,
                          "src": "5537:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2432,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2431,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5548:1:13",
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
                        "src": "5537:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2433,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2406,
                          "src": "5576:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2435,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2434,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5587:1:13",
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
                        "src": "5576:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2436,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2410,
                          "src": "5621:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2438,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2437,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5629:1:13",
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
                        "src": "5621:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2439,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2410,
                          "src": "5657:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2441,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2440,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5665:1:13",
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
                        "src": "5657:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2442,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2406,
                          "src": "5697:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2444,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2443,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5708:1:13",
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
                        "src": "5697:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2445,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2406,
                          "src": "5738:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2447,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2446,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5749:1:13",
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
                        "src": "5738:13:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2448,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2410,
                          "src": "5785:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2450,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2449,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5793:1:13",
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
                        "src": "5785:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2451,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2410,
                          "src": "5815:7:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2453,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2452,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5823:1:13",
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
                        "src": "5815:10:13",
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
                            "id": 2456,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2406,
                            "src": "5898:10:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2457,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2410,
                            "src": "5926:7:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2454,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3405,
                            "src": "5850:12:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2455,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3362,
                          "src": "5850:30:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 2458,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5850:97:13",
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
                        "id": 2422,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3405,
                        "src": "5409:12:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3405_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 2423,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3312,
                      "src": "5409:26:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$3312_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 2459,
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
                      "relayerAddress",
                      "relayerToken",
                      "relayerTokenAmount",
                      "salt",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "5409:549:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5367:591:13"
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
                        "id": 2466,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2462,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2421,
                            "src": "6028:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2463,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "makerAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3295,
                          "src": "6028:18:13",
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
                            "id": 2464,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6356,
                            "src": "6050:3:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 2465,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "6050:10:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "6028:32:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2467,
                        "name": "INVALID_CANCEL_ORDER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2231,
                        "src": "6062:20:13",
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
                      "id": 2461,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "6020:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2468,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6020:63:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2469,
                  "nodeType": "ExpressionStatement",
                  "src": "6020:63:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2471,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2421,
                        "src": "6154:5:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2472,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2412,
                        "src": "6173:15:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 2470,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2664,
                      "src": "6127:13:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$3312_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 2473,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6127:71:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2474,
                  "nodeType": "ExpressionStatement",
                  "src": "6127:71:13"
                },
                {
                  "assignments": [
                    2476
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2476,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2522,
                      "src": "6247:22:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2475,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6247:4:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2489,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2483,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "6310:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2484,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3001,
                          "src": "6310:18:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2487,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2485,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2421,
                            "src": "6329:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2486,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3311,
                          "src": "6329:15:13",
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
                        "src": "6310:35:13",
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
                            "id": 2477,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3004,
                            "src": "6272:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3002_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2478,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2997,
                          "src": "6272:16:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2481,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2479,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2421,
                            "src": "6289:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2480,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3311,
                          "src": "6289:15:13",
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
                        "src": "6272:33:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2482,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5802,
                      "src": "6272:37:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2488,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6272:74:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6247:99:13"
                },
                {
                  "assignments": [
                    2491
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2491,
                      "name": "openOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2522,
                      "src": "6356:20:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2490,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6356:4:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2497,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2495,
                        "name": "closedOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2476,
                        "src": "6398:17:13",
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
                          "id": 2492,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2421,
                          "src": "6379:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2493,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3293,
                        "src": "6379:14:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2494,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5778,
                      "src": "6379:18:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2496,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6379:37:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6356:60:13"
                },
                {
                  "assignments": [
                    2499
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2499,
                      "name": "canceledAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2522,
                      "src": "6426:19:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2498,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6426:4:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2504,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2502,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2412,
                        "src": "6471:15:13",
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
                        "id": 2500,
                        "name": "openOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2491,
                        "src": "6448:15:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2501,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "min256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5708,
                      "src": "6448:22:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2503,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6448:39:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6426:61:13"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2519,
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
                          "id": 2505,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "6546:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2509,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderCancels",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3001,
                        "src": "6546:18:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 2510,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2507,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2421,
                          "src": "6565:5:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2508,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3311,
                        "src": "6565:15:13",
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
                      "src": "6546:35:13",
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
                          "id": 2517,
                          "name": "canceledAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2499,
                          "src": "6624:14:13",
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
                              "id": 2511,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "6584:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2512,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderCancels",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3001,
                            "src": "6584:18:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 2515,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2513,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2421,
                              "src": "6603:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2514,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3311,
                            "src": "6603:15:13",
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
                          "src": "6584:35:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2516,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5802,
                        "src": "6584:39:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 2518,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "6584:55:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "6546:93:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 2520,
                  "nodeType": "ExpressionStatement",
                  "src": "6546:93:13"
                }
              ]
            },
            "documentation": "Cancel an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _cancelQuantity Quantity of set to be filled",
            "id": 2522,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 2415,
                    "name": "_cancelQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2412,
                    "src": "5336:15:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 2416,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2414,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2925,
                  "src": "5317:18:13",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "5317:35:13"
              }
            ],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2413,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2406,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2522,
                  "src": "5209:21:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2403,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5209:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2405,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2404,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5217:1:13",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5209:10:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$5_storage_ptr",
                      "typeString": "address[5]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2410,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 2522,
                  "src": "5240:15:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2407,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5240:4:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2409,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2408,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5245:1:13",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5240:7:13",
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
                  "id": 2412,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2522,
                  "src": "5265:20:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2411,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5265:4:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5199:92:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2417,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5357:0:13"
            },
            "scope": 2665,
            "src": "5179:1467:13",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2604,
              "nodeType": "Block",
              "src": "7187:1385:13",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2528,
                      "name": "scannedBytes",
                      "nodeType": "VariableDeclaration",
                      "scope": 2605,
                      "src": "7197:20:13",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2527,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7197:7:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2529,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7197:20:13"
                },
                {
                  "body": {
                    "id": 2602,
                    "nodeType": "Block",
                    "src": "7268:1298:13",
                    "statements": [
                      {
                        "assignments": [
                          2535
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2535,
                            "name": "headerData",
                            "nodeType": "VariableDeclaration",
                            "scope": 2605,
                            "src": "7333:23:13",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 2534,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "7333:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2545,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2538,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2524,
                              "src": "7391:10:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2539,
                              "name": "scannedBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2528,
                              "src": "7419:12:13",
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
                                  "id": 2542,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2228,
                                  "src": "7466:22:13",
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
                                  "id": 2540,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2528,
                                  "src": "7449:12:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2541,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 5802,
                                "src": "7449:16:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2543,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7449:40:13",
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
                              "id": 2536,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4143,
                              "src": "7359:8:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$4143_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 2537,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4142,
                            "src": "7359:14:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 2544,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7359:144:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7333:170:13"
                      },
                      {
                        "assignments": [
                          2549
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2549,
                            "name": "header",
                            "nodeType": "VariableDeclaration",
                            "scope": 2605,
                            "src": "7517:44:13",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_ExchangeHeader_$3272_memory_ptr",
                              "typeString": "struct ExchangeHandler.ExchangeHeader"
                            },
                            "typeName": {
                              "contractScope": null,
                              "id": 2548,
                              "name": "ExchangeHandler.ExchangeHeader",
                              "nodeType": "UserDefinedTypeName",
                              "referencedDeclaration": 3272,
                              "src": "7517:30:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$3272_storage_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2554,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2552,
                              "name": "headerData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2535,
                              "src": "7617:10:13",
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
                              "id": 2550,
                              "name": "ExchangeHandler",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3287,
                              "src": "7564:15:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_ExchangeHandler_$3287_$",
                                "typeString": "type(library ExchangeHandler)"
                              }
                            },
                            "id": 2551,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "parseExchangeHeader",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3286,
                            "src": "7564:35:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_ExchangeHeader_$3272_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (struct ExchangeHandler.ExchangeHeader memory)"
                            }
                          },
                          "id": 2553,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7564:77:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ExchangeHeader_$3272_memory_ptr",
                            "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7517:124:13"
                      },
                      {
                        "assignments": [
                          2556
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2556,
                            "name": "exchange",
                            "nodeType": "VariableDeclaration",
                            "scope": 2605,
                            "src": "7741:16:13",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            "typeName": {
                              "id": 2555,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "7741:7:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2562,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2557,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "7760:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2558,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchanges",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2981,
                            "src": "7760:15:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                              "typeString": "mapping(uint8 => address)"
                            }
                          },
                          "id": 2561,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2559,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2549,
                              "src": "7776:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$3272_memory_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                              }
                            },
                            "id": 2560,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchange",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3265,
                            "src": "7776:15:13",
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
                          "src": "7760:32:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7741:51:13"
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
                              "id": 2568,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "leftExpression": {
                                "argumentTypes": null,
                                "id": 2564,
                                "name": "exchange",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2556,
                                "src": "7885:8:13",
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
                                    "id": 2566,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "kind": "number",
                                    "lValueRequested": false,
                                    "nodeType": "Literal",
                                    "src": "7905:1:13",
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
                                  "id": 2565,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "nodeType": "ElementaryTypeNameExpression",
                                  "src": "7897:7:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_address_$",
                                    "typeString": "type(address)"
                                  },
                                  "typeName": "address"
                                },
                                "id": 2567,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "7897:10:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "src": "7885:22:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2569,
                              "name": "INVALID_EXCHANGE",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2234,
                              "src": "7925:16:13",
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
                            "id": 2563,
                            "name": "require",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [
                              6359,
                              6360
                            ],
                            "referencedDeclaration": 6360,
                            "src": "7860:7:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                              "typeString": "function (bool,string memory) pure"
                            }
                          },
                          "id": 2570,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7860:95:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 2571,
                        "nodeType": "ExpressionStatement",
                        "src": "7860:95:13"
                      },
                      {
                        "assignments": [
                          2573
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2573,
                            "name": "exchangeDataLength",
                            "nodeType": "VariableDeclaration",
                            "scope": 2605,
                            "src": "8039:26:13",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 2572,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "8039:7:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2579,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2577,
                              "name": "EXCHANGE_HEADER_LENGTH",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2228,
                              "src": "8097:22:13",
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
                                "id": 2574,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2549,
                                "src": "8068:6:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_ExchangeHeader_$3272_memory_ptr",
                                  "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                                }
                              },
                              "id": 2575,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "totalOrdersLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3271,
                              "src": "8068:24:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2576,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 5802,
                            "src": "8068:28:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2578,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8068:52:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8039:81:13"
                      },
                      {
                        "assignments": [
                          2581
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2581,
                            "name": "orderBody",
                            "nodeType": "VariableDeclaration",
                            "scope": 2605,
                            "src": "8134:22:13",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 2580,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "8134:5:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2594,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2584,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2524,
                              "src": "8191:10:13",
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
                                  "id": 2587,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2228,
                                  "src": "8236:22:13",
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
                                  "id": 2585,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2528,
                                  "src": "8219:12:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2586,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 5802,
                                "src": "8219:16:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2588,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8219:40:13",
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
                                  "id": 2591,
                                  "name": "exchangeDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2573,
                                  "src": "8294:18:13",
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
                                  "id": 2589,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2528,
                                  "src": "8277:12:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2590,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 5802,
                                "src": "8277:16:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2592,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8277:36:13",
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
                              "id": 2582,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4143,
                              "src": "8159:8:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$4143_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 2583,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4142,
                            "src": "8159:14:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 2593,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8159:168:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8134:193:13"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 2600,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 2595,
                            "name": "scannedBytes",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2528,
                            "src": "8504:12:13",
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
                                "id": 2598,
                                "name": "exchangeDataLength",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2573,
                                "src": "8536:18:13",
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
                                "id": 2596,
                                "name": "scannedBytes",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2528,
                                "src": "8519:12:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 2597,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 5802,
                              "src": "8519:16:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 2599,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "8519:36:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "8504:51:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2601,
                        "nodeType": "ExpressionStatement",
                        "src": "8504:51:13"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 2533,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 2530,
                      "name": "scannedBytes",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2528,
                      "src": "7234:12:13",
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
                        "id": 2531,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2524,
                        "src": "7249:10:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2532,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "7249:17:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "7234:32:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2603,
                  "nodeType": "WhileStatement",
                  "src": "7227:1339:13"
                }
              ]
            },
            "documentation": "Execute the exchange orders by parsing the order data and facilitating the transfers. Each\nheader represents a batch of orders for a particular exchange (0x, KNC, taker). Additional\ninformation such as makerToken is encoded so it can be used to facilitate exchange orders\n     * @param _orderData   Bytes array containing the exchange orders to execute",
            "id": 2605,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeExchangeOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2525,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2524,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2605,
                  "src": "7144:16:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2523,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7144:5:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7134:32:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2526,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "7187:0:13"
            },
            "scope": 2665,
            "src": "7104:1468:13",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 2663,
              "nodeType": "Block",
              "src": "8923:786:13",
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
                        "id": 2621,
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
                          "id": 2616,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2613,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2607,
                              "src": "9034:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2614,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3299,
                            "src": "9034:23:13",
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
                            "id": 2615,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "9060:1:13",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "9034:27:13",
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
                          "id": 2620,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2617,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2607,
                              "src": "9065:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2618,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3293,
                            "src": "9065:15:13",
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
                            "id": 2619,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "9083:1:13",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "9065:19:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "9034:50:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2622,
                        "name": "POSITIVE_AMOUNT_REQUIRED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2246,
                        "src": "9098:24:13",
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
                      "id": 2612,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "9013:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2623,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9013:119:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2624,
                  "nodeType": "ExpressionStatement",
                  "src": "9013:119:13"
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
                        "id": 2630,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2626,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6346,
                            "src": "9209:5:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 2627,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "9209:15:13",
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
                            "id": 2628,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2607,
                            "src": "9228:6:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2629,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "expiration",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3301,
                          "src": "9228:17:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "9209:36:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2631,
                        "name": "ORDER_EXPIRED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2249,
                        "src": "9259:13:13",
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
                      "id": 2625,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "9188:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2632,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9188:94:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2633,
                  "nodeType": "ExpressionStatement",
                  "src": "9188:94:13"
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
                        "id": 2645,
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
                          "id": 2643,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2635,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2607,
                              "src": "9386:6:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2636,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3293,
                            "src": "9386:15:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "%",
                          "rightExpression": {
                            "argumentTypes": null,
                            "arguments": [],
                            "expression": {
                              "argumentTypes": [],
                              "expression": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 2638,
                                      "name": "_order",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 2607,
                                      "src": "9414:6:13",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                      }
                                    },
                                    "id": 2639,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setAddress",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3291,
                                    "src": "9414:17:13",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "id": 2637,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2839,
                                  "src": "9404:9:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$2839_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2640,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "9404:28:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$2839",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2641,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2812,
                              "src": "9404:40:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2642,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "9404:42:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "9386:60:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2644,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "9450:1:13",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "9386:65:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2646,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2240,
                        "src": "9465:16:13",
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
                      "id": 2634,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "9365:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2647,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9365:126:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2648,
                  "nodeType": "ExpressionStatement",
                  "src": "9365:126:13"
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
                        "id": 2659,
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
                          "id": 2657,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 2650,
                            "name": "_executeQuantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2609,
                            "src": "9596:16:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "%",
                          "rightExpression": {
                            "argumentTypes": null,
                            "arguments": [],
                            "expression": {
                              "argumentTypes": [],
                              "expression": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 2652,
                                      "name": "_order",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 2607,
                                      "src": "9625:6:13",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                      }
                                    },
                                    "id": 2653,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setAddress",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3291,
                                    "src": "9625:17:13",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "id": 2651,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2839,
                                  "src": "9615:9:13",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$2839_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2654,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "9615:28:13",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$2839",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2655,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2812,
                              "src": "9615:40:13",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2656,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "9615:42:13",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "9596:61:13",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2658,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "9661:1:13",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "9596:66:13",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2660,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2240,
                        "src": "9676:16:13",
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
                      "id": 2649,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "9575:7:13",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2661,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9575:127:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2662,
                  "nodeType": "ExpressionStatement",
                  "src": "9575:127:13"
                }
              ]
            },
            "documentation": "Validate order params are still valid\n     * @param  _order           IssuanceOrder object containing order params\n@param  _executeQuantity    Quantity of Set to be filled",
            "id": 2664,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2610,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2607,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 2664,
                  "src": "8819:33:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$3312_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2606,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3312,
                    "src": "8819:26:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3312_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2609,
                  "name": "_executeQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2664,
                  "src": "8862:21:13",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2608,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "8862:4:13",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8809:80:13"
            },
            "payable": false,
            "returnParameters": {
              "id": 2611,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "8923:0:13"
            },
            "scope": 2665,
            "src": "8787:922:13",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 2666,
        "src": "1395:8316:13"
      }
    ],
    "src": "597:9115:13"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.194Z"
}
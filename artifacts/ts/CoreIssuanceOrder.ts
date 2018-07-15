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
      "name": "setTokens",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
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
      "inputs": [],
      "name": "factories",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
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
          "name": "_requiredComponents",
          "type": "address[]"
        },
        {
          "name": "_requiredComponentAmounts",
          "type": "uint256[]"
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
          "name": "_requiredComponents",
          "type": "address[]"
        },
        {
          "name": "_requiredComponentAmounts",
          "type": "uint256[]"
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\n\nimport { Math } from \"zeppelin-solidity/contracts/math/Math.sol\";\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ExchangeHandler } from \"../lib/ExchangeHandler.sol\";\nimport { ICoreIssuance } from \"../interfaces/ICoreIssuance.sol\";\nimport { IExchange } from \"../interfaces/IExchange.sol\";\nimport { ITransferProxy } from \"../interfaces/ITransferProxy.sol\";\nimport { IVault } from \"../interfaces/IVault.sol\";\nimport { ISetToken } from \"../interfaces/ISetToken.sol\";\nimport { LibBytes } from \"../../external/0x/LibBytes.sol\";\nimport { OrderLibrary } from \"../lib/OrderLibrary.sol\";\n\n\n/**\n * @title CoreIssuanceOrder\n * @author Set Protocol\n *\n * The Core Issuance Order extension houses all functions related to the filling and\n * canceling issuance orders.\n *\n */\ncontract CoreIssuanceOrder is\n    ICoreIssuance,\n    CoreState,\n    CoreModifiers\n{\n    using SafeMath for uint256;\n    using Math for uint256;\n\n    /* ============ Constants ============ */\n\n    uint256 constant EXCHANGE_HEADER_LENGTH = 128;\n\n    string constant INVALID_CANCEL_ORDER = \"Only maker can cancel order.\";\n    string constant INVALID_EXCHANGE = \"Exchange does not exist.\";\n    string constant INVALID_FILL_AMOUNT = \"Fill amount must be equal or less than open order amount.\";\n    string constant INVALID_QUANTITY = \"Quantity must be multiple of the natural unit of the set.\";\n    string constant INVALID_SIGNATURE = \"Invalid order signature.\";\n    string constant POSITIVE_AMOUNT_REQUIRED = \"Quantity should be greater than 0.\";\n    string constant ORDER_EXPIRED = \"This order has expired.\";\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Fill an issuance order\n     *\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _fillQuantity   Quantity of set to be filled\n     * @param  _v              v element of ECDSA signature\n     * @param  sigBytes        Array with r and s segments of ECDSA signature\n     * @param _orderData       Bytes array containing the exchange orders to execute\n     */\n    function fillOrder(\n        address[5] _addresses,\n        uint[5] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts,\n        uint _fillQuantity,\n        uint8 _v,\n        bytes32[] sigBytes,\n        bytes _orderData\n    )\n        external\n    {\n        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({\n            setAddress: _addresses[0],\n            quantity: _values[0],\n            requiredComponents: _requiredComponents,\n            requiredComponentAmounts: _requiredComponentAmounts,\n            makerAddress: _addresses[1],\n            makerToken: _addresses[2],\n            makerTokenAmount: _values[1],\n            expiration: _values[2],\n            relayerAddress: _addresses[3],\n            relayerToken: _addresses[4],\n            relayerTokenAmount: _values[3],\n            salt: _values[4],\n            orderHash: OrderLibrary.generateOrderHash(\n                _addresses,\n                _values,\n                _requiredComponents,\n                _requiredComponentAmounts\n            )\n        });\n\n        // Verify signature is authentic\n        require(\n            OrderLibrary.validateSignature(\n                order.orderHash,\n                order.makerAddress,\n                _v,\n                sigBytes[0], // r\n                sigBytes[1] // s\n            ),\n            INVALID_SIGNATURE\n        );\n\n        // Verify order is valid and return amount to be filled\n        validateOrder(\n            order,\n            _fillQuantity\n        );\n\n        // Settle Order\n        settleOrder(order, _fillQuantity, _orderData);\n\n        //Issue Set\n        // issueInternal(\n        //     order.makerAddress,\n        //     order.setAddress,\n        //     _fillQuantity\n        // );\n    }\n\n    /**\n     * Cancel an issuance order\n     *\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _cancelQuantity Quantity of set to be filled\n     */\n    function cancelOrder(\n        address[5] _addresses,\n        uint[5] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts,\n        uint _cancelQuantity\n    )\n        external\n        isPositiveQuantity(_cancelQuantity)\n    {\n        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({\n            setAddress: _addresses[0],\n            quantity: _values[0],\n            requiredComponents: _requiredComponents,\n            requiredComponentAmounts: _requiredComponentAmounts,\n            makerAddress: _addresses[1],\n            makerToken: _addresses[2],\n            makerTokenAmount: _values[1],\n            expiration: _values[2],\n            relayerAddress: _addresses[3],\n            relayerToken: _addresses[4],\n            relayerTokenAmount: _values[3],\n            salt: _values[4],\n            orderHash: OrderLibrary.generateOrderHash(\n                _addresses,\n                _values,\n                _requiredComponents,\n                _requiredComponentAmounts\n            )\n        });\n\n        // Make sure cancel order comes from maker\n        require(order.makerAddress == msg.sender, INVALID_CANCEL_ORDER);\n\n        // Verify order is valid\n        validateOrder(\n            order,\n            _cancelQuantity\n        );\n\n        // Determine amount to cancel\n        uint closedOrderAmount = state.orderFills[order.orderHash].add(state.orderCancels[order.orderHash]);\n        uint openOrderAmount = order.quantity.sub(closedOrderAmount);\n        uint canceledAmount = openOrderAmount.min256(_cancelQuantity);\n\n        // Tally cancel in orderCancels mapping\n        state.orderCancels[order.orderHash] = state.orderCancels[order.orderHash].add(canceledAmount);\n    }\n\n    /* ============ Private Functions ============ */\n\n    /**\n     * Execute the exchange orders by parsing the order data and facilitating the transfers. Each\n     * header represents a batch of orders for a particular exchange (0x, KNC, taker). Additional\n     * information such as makerToken is encoded so it can be used to facilitate exchange orders\n     *\n     * @param _orderData   Bytes array containing the exchange orders to execute\n     */\n    function executeExchangeOrders(\n        bytes _orderData,\n        address _makerAddress\n    )\n        private\n        returns (uint256)\n    {\n        uint256 scannedBytes;\n        uint256 makerTokenUsed;\n        while (scannedBytes < _orderData.length) {\n            // Read the next exchange order header\n            bytes memory headerData = LibBytes.slice(\n                _orderData,\n                scannedBytes,\n                scannedBytes.add(EXCHANGE_HEADER_LENGTH)\n            );\n            ExchangeHandler.ExchangeHeader memory header = ExchangeHandler.parseExchangeHeader(\n                headerData\n            );\n\n            // Get exchange address from state mapping based on header exchange info\n            address exchange = state.exchanges[header.exchange];\n\n            // Verify exchange address is registered\n            require(\n                exchange != address(0),\n                INVALID_EXCHANGE\n            );\n\n            // Read the order body based on header order length info\n            uint256 exchangeDataLength = header.totalOrdersLength.add(EXCHANGE_HEADER_LENGTH);\n            bytes memory orderBody = LibBytes.slice(\n                _orderData,\n                scannedBytes.add(EXCHANGE_HEADER_LENGTH),\n                scannedBytes.add(exchangeDataLength)\n            );\n\n            // Transfer header.makerTokenAmount to Exchange Wrapper\n            ITransferProxy(state.transferProxyAddress).transfer(\n                header.makerTokenAddress,\n                header.makerTokenAmount,\n                _makerAddress,\n                exchange\n            );\n\n            //Call Exchange\n            //IExchange(header.exchange).exchange(orderBody);\n\n            // Update scanned bytes with header and body lengths\n            scannedBytes = scannedBytes.add(exchangeDataLength);\n            makerTokenUsed += header.makerTokenAmount;\n        }\n        return makerTokenUsed;\n    }\n\n    /**\n     * Validate order params are still valid\n     *\n     * @param  _order              IssuanceOrder object containing order params\n     * @param  _executeQuantity    Quantity of Set to be filled\n     */\n    function validateOrder(\n        OrderLibrary.IssuanceOrder _order,\n        uint _executeQuantity\n    )\n        private\n        view\n        isValidSet(_order.setAddress)\n        isPositiveQuantity(_executeQuantity)\n    {\n        // Make sure makerTokenAmount and Set Token to issue is greater than 0.\n        require(\n            _order.makerTokenAmount > 0 && _order.quantity > 0,\n            POSITIVE_AMOUNT_REQUIRED\n        );\n        // Make sure the order hasn't expired\n        require(\n            block.timestamp <= _order.expiration,\n            ORDER_EXPIRED\n        );\n\n        // Make sure IssuanceOrder quantity is multiple of natural unit\n        require(\n            _order.quantity % ISetToken(_order.setAddress).naturalUnit() == 0,\n            INVALID_QUANTITY\n        );\n\n        // Make sure fill or cancel quantity is multiple of natural unit\n        require(\n            _executeQuantity % ISetToken(_order.setAddress).naturalUnit() == 0,\n            INVALID_QUANTITY\n        );\n    }\n\n    function settleAccounts(\n        OrderLibrary.IssuanceOrder _order,\n        uint _fillQuantity,\n        uint _requiredMakerTokenAmount,\n        uint _makerTokenUsed\n    )\n        private\n    {\n        // Calculate amount to send to taker\n        uint toTaker = _requiredMakerTokenAmount.sub(_makerTokenUsed);\n\n        // Send left over maker token balance to taker\n        ITransferProxy(state.transferProxyAddress).transfer(\n            _order.makerToken,\n            toTaker,\n            _order.makerAddress,\n            msg.sender\n        );\n\n        // Calculate fees required\n        uint requiredFees = _order.relayerTokenAmount.mul(_fillQuantity).div(_order.quantity);\n\n        //Send fees to relayer\n        ITransferProxy(state.transferProxyAddress).transfer(\n            _order.relayerToken,\n            requiredFees,\n            _order.makerAddress,\n            _order.relayerAddress\n        );\n        ITransferProxy(state.transferProxyAddress).transfer(\n            _order.relayerToken,\n            requiredFees,\n            msg.sender,\n            _order.relayerAddress\n        );\n    }\n\n    function settleOrder(\n        OrderLibrary.IssuanceOrder _order,\n        uint _fillQuantity,\n        bytes _orderData\n    )\n        private\n    {\n        // Check to make sure open order amount equals _fillQuantity\n        uint closedOrderAmount = state.orderFills[_order.orderHash].add(state.orderCancels[_order.orderHash]);\n        uint openOrderAmount = _order.quantity.sub(closedOrderAmount);\n        require(\n            openOrderAmount >= _fillQuantity,\n            INVALID_FILL_AMOUNT\n        );\n\n        uint[] memory requiredBalances = new uint[](_order.requiredComponents.length);\n\n        // Calculate amount of maker token required\n        // Look into rounding errors\n        uint requiredMakerTokenAmount = _order.makerTokenAmount.mul(_fillQuantity).div(_order.quantity);\n\n        // Calculate amount of component tokens required to issue\n        for (uint16 i = 0; i < _order.requiredComponents.length; i++) {\n            // Get current vault balances\n            uint tokenBalance = IVault(state.vaultAddress).getOwnerBalance(\n                _order.makerAddress,\n                _order.requiredComponents[i]\n            );\n\n            // Amount of component tokens to be added to Vault\n            uint requiredAddition = _order.requiredComponentAmounts[i].mul(_fillQuantity).div(_order.quantity);\n\n            // Required vault balances after exchange order executed\n            requiredBalances[i] = tokenBalance.add(requiredAddition);\n        }\n\n        // Execute exchange orders\n        uint makerTokenAmountUsed = executeExchangeOrders(_orderData, _order.makerAddress);\n        require(makerTokenAmountUsed <= requiredMakerTokenAmount);\n\n        // Check that maker's component tokens in Vault have been incremented correctly\n        for (i = 0; i < _order.requiredComponents.length; i++) {\n            uint currentBal = IVault(state.vaultAddress).getOwnerBalance(\n                _order.makerAddress,\n                _order.requiredComponents[i]\n            );\n            //require(currentBal >= requiredBalances[i]);\n        }\n\n        settleAccounts(_order, _fillQuantity, requiredMakerTokenAmount, makerTokenAmountUsed);\n\n        // Tally fill in orderFills mapping\n        state.orderFills[_order.orderHash] = state.orderFills[_order.orderHash].add(_fillQuantity);\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
    "exportedSymbols": {
      "CoreIssuanceOrder": [
        3144
      ]
    },
    "id": 3145,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2418,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:14"
      },
      {
        "id": 2419,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:14"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
        "file": "zeppelin-solidity/contracts/math/Math.sol",
        "id": 2421,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 6253,
        "src": "659:65:14",
        "symbolAliases": [
          {
            "foreign": 2420,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 2423,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 6347,
        "src": "725:73:14",
        "symbolAliases": [
          {
            "foreign": 2422,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 2425,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3455,
        "src": "799:63:14",
        "symbolAliases": [
          {
            "foreign": 2424,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 2427,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3594,
        "src": "863:49:14",
        "symbolAliases": [
          {
            "foreign": 2426,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
        "file": "../lib/ExchangeHandler.sol",
        "id": 2429,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3621,
        "src": "913:61:14",
        "symbolAliases": [
          {
            "foreign": 2428,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
        "file": "../interfaces/ICoreIssuance.sol",
        "id": 2431,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3250,
        "src": "975:64:14",
        "symbolAliases": [
          {
            "foreign": 2430,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/IExchange.sol",
        "file": "../interfaces/IExchange.sol",
        "id": 2433,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3260,
        "src": "1040:56:14",
        "symbolAliases": [
          {
            "foreign": 2432,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 2435,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3333,
        "src": "1097:66:14",
        "symbolAliases": [
          {
            "foreign": 2434,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 2437,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3372,
        "src": "1164:50:14",
        "symbolAliases": [
          {
            "foreign": 2436,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 2439,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3319,
        "src": "1215:56:14",
        "symbolAliases": [
          {
            "foreign": 2438,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 2441,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 4491,
        "src": "1272:58:14",
        "symbolAliases": [
          {
            "foreign": 2440,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../lib/OrderLibrary.sol",
        "id": 2443,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3753,
        "src": "1331:55:14",
        "symbolAliases": [
          {
            "foreign": 2442,
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
              "id": 2444,
              "name": "ICoreIssuance",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3249,
              "src": "1604:13:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICoreIssuance_$3249",
                "typeString": "contract ICoreIssuance"
              }
            },
            "id": 2445,
            "nodeType": "InheritanceSpecifier",
            "src": "1604:13:14"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2446,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "1623:9:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 2447,
            "nodeType": "InheritanceSpecifier",
            "src": "1623:9:14"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2448,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3454,
              "src": "1638:13:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3454",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 2449,
            "nodeType": "InheritanceSpecifier",
            "src": "1638:13:14"
          }
        ],
        "contractDependencies": [
          3249,
          3454,
          3593
        ],
        "contractKind": "contract",
        "documentation": "@title CoreIssuanceOrder\n@author Set Protocol\n * The Core Issuance Order extension houses all functions related to the filling and\ncanceling issuance orders.\n ",
        "fullyImplemented": false,
        "id": 3144,
        "linearizedBaseContracts": [
          3144,
          3454,
          3593,
          3249
        ],
        "name": "CoreIssuanceOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2452,
            "libraryName": {
              "contractScope": null,
              "id": 2450,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6346,
              "src": "1664:8:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6346",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1658:27:14",
            "typeName": {
              "id": 2451,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1677:7:14",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 2455,
            "libraryName": {
              "contractScope": null,
              "id": 2453,
              "name": "Math",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6252,
              "src": "1696:4:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Math_$6252",
                "typeString": "library Math"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1690:23:14",
            "typeName": {
              "id": 2454,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1705:7:14",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 2458,
            "name": "EXCHANGE_HEADER_LENGTH",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "1766:45:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 2456,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1766:7:14",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "313238",
              "id": 2457,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1808:3:14",
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
            "id": 2461,
            "name": "INVALID_CANCEL_ORDER",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "1818:69:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2459,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1818:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4f6e6c79206d616b65722063616e2063616e63656c206f726465722e",
              "id": 2460,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1857:30:14",
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
            "id": 2464,
            "name": "INVALID_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "1893:61:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2462,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1893:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "45786368616e676520646f6573206e6f742065786973742e",
              "id": 2463,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1928:26:14",
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
            "id": 2467,
            "name": "INVALID_FILL_AMOUNT",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "1960:97:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2465,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1960:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "46696c6c20616d6f756e74206d75737420626520657175616c206f72206c657373207468616e206f70656e206f7264657220616d6f756e742e",
              "id": 2466,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1998:59:14",
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
            "id": 2470,
            "name": "INVALID_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "2063:94:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2468,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2063:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d757374206265206d756c7469706c65206f6620746865206e61747572616c20756e6974206f6620746865207365742e",
              "id": 2469,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2098:59:14",
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
            "id": 2473,
            "name": "INVALID_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "2163:62:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2471,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2163:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "496e76616c6964206f72646572207369676e61747572652e",
              "id": 2472,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2199:26:14",
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
            "id": 2476,
            "name": "POSITIVE_AMOUNT_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "2231:79:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2474,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2231:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e746974792073686f756c642062652067726561746572207468616e20302e",
              "id": 2475,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2274:36:14",
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
            "id": 2479,
            "name": "ORDER_EXPIRED",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "2316:57:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2477,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2316:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "54686973206f726465722068617320657870697265642e",
              "id": 2478,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2348:25:14",
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
              "id": 2581,
              "nodeType": "Block",
              "src": "3253:1503:14",
              "statements": [
                {
                  "assignments": [
                    2508
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2508,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2582,
                      "src": "3263:39:14",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2507,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3651,
                        "src": "3263:26:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2551,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2511,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2483,
                          "src": "3358:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2513,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2512,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3369:1:14",
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
                        "src": "3358:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2514,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2487,
                          "src": "3395:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2516,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2515,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3403:1:14",
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
                        "src": "3395:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2517,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2490,
                        "src": "3439:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2518,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2493,
                        "src": "3498:25:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2519,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2483,
                          "src": "3551:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2521,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2520,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3562:1:14",
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
                        "src": "3551:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2522,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2483,
                          "src": "3590:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2524,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2523,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3601:1:14",
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
                        "src": "3590:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2525,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2487,
                          "src": "3635:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2527,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2526,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3643:1:14",
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
                        "src": "3635:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2528,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2487,
                          "src": "3671:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2530,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2529,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3679:1:14",
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
                        "src": "3671:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2531,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2483,
                          "src": "3711:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2533,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2532,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3722:1:14",
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
                        "src": "3711:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2534,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2483,
                          "src": "3752:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2536,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2535,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3763:1:14",
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
                        "src": "3752:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2537,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2487,
                          "src": "3799:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2539,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2538,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3807:1:14",
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
                        "src": "3799:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2540,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2487,
                          "src": "3829:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2542,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2541,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3837:1:14",
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
                        "src": "3829:10:14",
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
                            "id": 2545,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2483,
                            "src": "3912:10:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2546,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2487,
                            "src": "3940:7:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2547,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2490,
                            "src": "3965:19:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2548,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2493,
                            "src": "4002:25:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
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
                            },
                            {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2543,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3752,
                            "src": "3864:12:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3752_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2544,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3709,
                          "src": "3864:30:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 2549,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3864:177:14",
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
                        "id": 2509,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3752,
                        "src": "3305:12:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3752_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 2510,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3651,
                      "src": "3305:26:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$3651_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 2550,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "quantity",
                      "requiredComponents",
                      "requiredComponentAmounts",
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
                    "src": "3305:747:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3263:789:14"
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
                              "id": 2555,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2508,
                              "src": "4173:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2556,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3650,
                            "src": "4173:15:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2557,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2508,
                              "src": "4206:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2558,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3634,
                            "src": "4206:18:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2559,
                            "name": "_v",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2497,
                            "src": "4242:2:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2560,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2500,
                              "src": "4262:8:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 2562,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 2561,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4271:1:14",
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
                            "src": "4262:11:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2563,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2500,
                              "src": "4296:8:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 2565,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 2564,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4305:1:14",
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
                            "src": "4296:11:14",
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
                            "id": 2553,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3752,
                            "src": "4125:12:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3752_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2554,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validateSignature",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3751,
                          "src": "4125:30:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                            "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                          }
                        },
                        "id": 2566,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4125:201:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2567,
                        "name": "INVALID_SIGNATURE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2473,
                        "src": "4340:17:14",
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
                      "id": 2552,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "4104:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2568,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4104:263:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2569,
                  "nodeType": "ExpressionStatement",
                  "src": "4104:263:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2571,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2508,
                        "src": "4469:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2572,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2495,
                        "src": "4488:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 2570,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2888,
                      "src": "4442:13:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$3651_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 2573,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4442:69:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2574,
                  "nodeType": "ExpressionStatement",
                  "src": "4442:69:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2576,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2508,
                        "src": "4558:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2577,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2495,
                        "src": "4565:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2578,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2502,
                        "src": "4580:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      ],
                      "id": 2575,
                      "name": "settleOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3143,
                      "src": "4546:11:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_struct$_IssuanceOrder_$3651_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256,bytes memory)"
                      }
                    },
                    "id": 2579,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4546:45:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2580,
                  "nodeType": "ExpressionStatement",
                  "src": "4546:45:14"
                }
              ]
            },
            "documentation": "Fill an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _fillQuantity   Quantity of set to be filled\n@param  _v              v element of ECDSA signature\n@param  sigBytes        Array with r and s segments of ECDSA signature\n@param _orderData       Bytes array containing the exchange orders to execute",
            "id": 2582,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2503,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2483,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "2998:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2480,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2998:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2482,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2481,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3006:1:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "2998:10:14",
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
                  "id": 2487,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3029:15:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2484,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3029:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2486,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2485,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3034:1:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3029:7:14",
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
                  "id": 2490,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3054:29:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2488,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3054:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2489,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3054:9:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2493,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3093:32:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2491,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3093:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2492,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3093:6:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2495,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3135:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2494,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3135:4:14",
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
                  "id": 2497,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3163:8:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 2496,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "3163:5:14",
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
                  "id": 2500,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3181:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2498,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "3181:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 2499,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3181:9:14",
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
                  "id": 2502,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3209:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2501,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3209:5:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2988:243:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2504,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3253:0:14"
            },
            "scope": 3144,
            "src": "2970:1786:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2711,
              "nodeType": "Block",
              "src": "5334:1487:14",
              "statements": [
                {
                  "assignments": [
                    2607
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2607,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2712,
                      "src": "5344:39:14",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2606,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3651,
                        "src": "5344:26:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2650,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2610,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2586,
                          "src": "5439:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2612,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2611,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5450:1:14",
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
                        "src": "5439:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2613,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
                          "src": "5476:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2615,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2614,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5484:1:14",
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
                        "src": "5476:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2616,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2593,
                        "src": "5520:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2617,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2596,
                        "src": "5579:25:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2618,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2586,
                          "src": "5632:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2620,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2619,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5643:1:14",
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
                        "src": "5632:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2621,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2586,
                          "src": "5671:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2623,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2622,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5682:1:14",
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
                        "src": "5671:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2624,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
                          "src": "5716:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2626,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2625,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5724:1:14",
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
                        "src": "5716:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2627,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
                          "src": "5752:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2629,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2628,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5760:1:14",
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
                        "src": "5752:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2630,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2586,
                          "src": "5792:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2632,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2631,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5803:1:14",
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
                        "src": "5792:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2633,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2586,
                          "src": "5833:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2635,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2634,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5844:1:14",
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
                        "src": "5833:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2636,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
                          "src": "5880:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2638,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2637,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5888:1:14",
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
                        "src": "5880:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2639,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
                          "src": "5910:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2641,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2640,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5918:1:14",
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
                        "src": "5910:10:14",
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
                            "id": 2644,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2586,
                            "src": "5993:10:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2645,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2590,
                            "src": "6021:7:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2646,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2593,
                            "src": "6046:19:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2647,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2596,
                            "src": "6083:25:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
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
                            },
                            {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2642,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3752,
                            "src": "5945:12:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3752_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2643,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3709,
                          "src": "5945:30:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 2648,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5945:177:14",
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
                        "id": 2608,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3752,
                        "src": "5386:12:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3752_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 2609,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3651,
                      "src": "5386:26:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$3651_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 2649,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "quantity",
                      "requiredComponents",
                      "requiredComponentAmounts",
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
                    "src": "5386:747:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5344:789:14"
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
                        "id": 2656,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2652,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2607,
                            "src": "6203:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2653,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "makerAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3634,
                          "src": "6203:18:14",
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
                            "id": 2654,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6899,
                            "src": "6225:3:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 2655,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "6225:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "6203:32:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2657,
                        "name": "INVALID_CANCEL_ORDER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2461,
                        "src": "6237:20:14",
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
                      "id": 2651,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "6195:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2658,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6195:63:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2659,
                  "nodeType": "ExpressionStatement",
                  "src": "6195:63:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2661,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2607,
                        "src": "6329:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2662,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2598,
                        "src": "6348:15:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 2660,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2888,
                      "src": "6302:13:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$3651_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 2663,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6302:71:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2664,
                  "nodeType": "ExpressionStatement",
                  "src": "6302:71:14"
                },
                {
                  "assignments": [
                    2666
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2666,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2712,
                      "src": "6422:22:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2665,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6422:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2679,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2673,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "6485:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2674,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3486,
                          "src": "6485:18:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2677,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2675,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2607,
                            "src": "6504:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2676,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3650,
                          "src": "6504:15:14",
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
                        "src": "6485:35:14",
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
                            "id": 2667,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "6447:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2668,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3482,
                          "src": "6447:16:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2671,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2669,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2607,
                            "src": "6464:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2670,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3650,
                          "src": "6464:15:14",
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
                        "src": "6447:33:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2672,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6345,
                      "src": "6447:37:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2678,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6447:74:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6422:99:14"
                },
                {
                  "assignments": [
                    2681
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2681,
                      "name": "openOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2712,
                      "src": "6531:20:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2680,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6531:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2687,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2685,
                        "name": "closedOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2666,
                        "src": "6573:17:14",
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
                          "id": 2682,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2607,
                          "src": "6554:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2683,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3626,
                        "src": "6554:14:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2684,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6321,
                      "src": "6554:18:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2686,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6554:37:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6531:60:14"
                },
                {
                  "assignments": [
                    2689
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2689,
                      "name": "canceledAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2712,
                      "src": "6601:19:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2688,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6601:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2694,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2692,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2598,
                        "src": "6646:15:14",
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
                        "id": 2690,
                        "name": "openOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2681,
                        "src": "6623:15:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2691,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "min256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6251,
                      "src": "6623:22:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2693,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6623:39:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6601:61:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2709,
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
                          "id": 2695,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "6721:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2699,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderCancels",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3486,
                        "src": "6721:18:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 2700,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2697,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2607,
                          "src": "6740:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2698,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3650,
                        "src": "6740:15:14",
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
                      "src": "6721:35:14",
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
                          "id": 2707,
                          "name": "canceledAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2689,
                          "src": "6799:14:14",
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
                              "id": 2701,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "6759:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2702,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderCancels",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3486,
                            "src": "6759:18:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 2705,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2703,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2607,
                              "src": "6778:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2704,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3650,
                            "src": "6778:15:14",
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
                          "src": "6759:35:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2706,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6345,
                        "src": "6759:39:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 2708,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "6759:55:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "6721:93:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 2710,
                  "nodeType": "ExpressionStatement",
                  "src": "6721:93:14"
                }
              ]
            },
            "documentation": "Cancel an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _cancelQuantity Quantity of set to be filled",
            "id": 2712,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 2601,
                    "name": "_cancelQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2598,
                    "src": "5313:15:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 2602,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2600,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3404,
                  "src": "5294:18:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "5294:35:14"
              }
            ],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2599,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2586,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "5105:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2583,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5105:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2585,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2584,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5113:1:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5105:10:14",
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
                  "id": 2590,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "5136:15:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2587,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5136:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2589,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2588,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5141:1:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5136:7:14",
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
                  "id": 2593,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "5161:29:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2591,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5161:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2592,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5161:9:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2596,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "5200:32:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2594,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5200:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2595,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5200:6:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2598,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "5242:20:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2597,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5242:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5095:173:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2603,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5334:0:14"
            },
            "scope": 3144,
            "src": "5075:1746:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2821,
              "nodeType": "Block",
              "src": "7419:1785:14",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2722,
                      "name": "scannedBytes",
                      "nodeType": "VariableDeclaration",
                      "scope": 2822,
                      "src": "7429:20:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2721,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7429:7:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2723,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7429:20:14"
                },
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2725,
                      "name": "makerTokenUsed",
                      "nodeType": "VariableDeclaration",
                      "scope": 2822,
                      "src": "7459:22:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2724,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7459:7:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2726,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7459:22:14"
                },
                {
                  "body": {
                    "id": 2817,
                    "nodeType": "Block",
                    "src": "7532:1635:14",
                    "statements": [
                      {
                        "assignments": [
                          2732
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2732,
                            "name": "headerData",
                            "nodeType": "VariableDeclaration",
                            "scope": 2822,
                            "src": "7597:23:14",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 2731,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "7597:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2742,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2735,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2714,
                              "src": "7655:10:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2736,
                              "name": "scannedBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2722,
                              "src": "7683:12:14",
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
                                  "id": 2739,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2458,
                                  "src": "7730:22:14",
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
                                  "id": 2737,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2722,
                                  "src": "7713:12:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2738,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6345,
                                "src": "7713:16:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2740,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7713:40:14",
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
                              "id": 2733,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4490,
                              "src": "7623:8:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$4490_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 2734,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4489,
                            "src": "7623:14:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 2741,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7623:144:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7597:170:14"
                      },
                      {
                        "assignments": [
                          2746
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2746,
                            "name": "header",
                            "nodeType": "VariableDeclaration",
                            "scope": 2822,
                            "src": "7781:44:14",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                              "typeString": "struct ExchangeHandler.ExchangeHeader"
                            },
                            "typeName": {
                              "contractScope": null,
                              "id": 2745,
                              "name": "ExchangeHandler.ExchangeHeader",
                              "nodeType": "UserDefinedTypeName",
                              "referencedDeclaration": 3605,
                              "src": "7781:30:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$3605_storage_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2751,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2749,
                              "name": "headerData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2732,
                              "src": "7881:10:14",
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
                              "id": 2747,
                              "name": "ExchangeHandler",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3620,
                              "src": "7828:15:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_ExchangeHandler_$3620_$",
                                "typeString": "type(library ExchangeHandler)"
                              }
                            },
                            "id": 2748,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "parseExchangeHeader",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3619,
                            "src": "7828:35:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_ExchangeHeader_$3605_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (struct ExchangeHandler.ExchangeHeader memory)"
                            }
                          },
                          "id": 2750,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7828:77:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                            "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7781:124:14"
                      },
                      {
                        "assignments": [
                          2753
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2753,
                            "name": "exchange",
                            "nodeType": "VariableDeclaration",
                            "scope": 2822,
                            "src": "8005:16:14",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            "typeName": {
                              "id": 2752,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "8005:7:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2759,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2754,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "8024:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2755,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchanges",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3460,
                            "src": "8024:15:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                              "typeString": "mapping(uint8 => address)"
                            }
                          },
                          "id": 2758,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2756,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2746,
                              "src": "8040:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                              }
                            },
                            "id": 2757,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchange",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3598,
                            "src": "8040:15:14",
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
                          "src": "8024:32:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8005:51:14"
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
                              "id": 2765,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "leftExpression": {
                                "argumentTypes": null,
                                "id": 2761,
                                "name": "exchange",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2753,
                                "src": "8149:8:14",
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
                                    "id": 2763,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "kind": "number",
                                    "lValueRequested": false,
                                    "nodeType": "Literal",
                                    "src": "8169:1:14",
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
                                  "id": 2762,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "nodeType": "ElementaryTypeNameExpression",
                                  "src": "8161:7:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_address_$",
                                    "typeString": "type(address)"
                                  },
                                  "typeName": "address"
                                },
                                "id": 2764,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "8161:10:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "src": "8149:22:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2766,
                              "name": "INVALID_EXCHANGE",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2464,
                              "src": "8189:16:14",
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
                            "id": 2760,
                            "name": "require",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [
                              6902,
                              6903
                            ],
                            "referencedDeclaration": 6903,
                            "src": "8124:7:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                              "typeString": "function (bool,string memory) pure"
                            }
                          },
                          "id": 2767,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8124:95:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 2768,
                        "nodeType": "ExpressionStatement",
                        "src": "8124:95:14"
                      },
                      {
                        "assignments": [
                          2770
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2770,
                            "name": "exchangeDataLength",
                            "nodeType": "VariableDeclaration",
                            "scope": 2822,
                            "src": "8303:26:14",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 2769,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "8303:7:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2776,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2774,
                              "name": "EXCHANGE_HEADER_LENGTH",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2458,
                              "src": "8361:22:14",
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
                                "id": 2771,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2746,
                                "src": "8332:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                                  "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                                }
                              },
                              "id": 2772,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "totalOrdersLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3604,
                              "src": "8332:24:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2773,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6345,
                            "src": "8332:28:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2775,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8332:52:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8303:81:14"
                      },
                      {
                        "assignments": [
                          2778
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2778,
                            "name": "orderBody",
                            "nodeType": "VariableDeclaration",
                            "scope": 2822,
                            "src": "8398:22:14",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 2777,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "8398:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2791,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2781,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2714,
                              "src": "8455:10:14",
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
                                  "id": 2784,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2458,
                                  "src": "8500:22:14",
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
                                  "id": 2782,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2722,
                                  "src": "8483:12:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2783,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6345,
                                "src": "8483:16:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2785,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8483:40:14",
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
                                  "id": 2788,
                                  "name": "exchangeDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2770,
                                  "src": "8558:18:14",
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
                                  "id": 2786,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2722,
                                  "src": "8541:12:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2787,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6345,
                                "src": "8541:16:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2789,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8541:36:14",
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
                              "id": 2779,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4490,
                              "src": "8423:8:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$4490_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 2780,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4489,
                            "src": "8423:14:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 2790,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8423:168:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8398:193:14"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 2797,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2746,
                                "src": "8743:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                                  "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                                }
                              },
                              "id": 2798,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "makerTokenAddress",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3600,
                              "src": "8743:24:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 2799,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2746,
                                "src": "8785:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                                  "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                                }
                              },
                              "id": 2800,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "makerTokenAmount",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3602,
                              "src": "8785:23:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2801,
                              "name": "_makerAddress",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2716,
                              "src": "8826:13:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2802,
                              "name": "exchange",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2753,
                              "src": "8857:8:14",
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
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 2793,
                                    "name": "state",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 3489,
                                    "src": "8689:5:14",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_State_$3487_storage",
                                      "typeString": "struct CoreState.State storage ref"
                                    }
                                  },
                                  "id": 2794,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "transferProxyAddress",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 3462,
                                  "src": "8689:26:14",
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
                                "id": 2792,
                                "name": "ITransferProxy",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3332,
                                "src": "8674:14:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3332_$",
                                  "typeString": "type(contract ITransferProxy)"
                                }
                              },
                              "id": 2795,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "typeConversion",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8674:42:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_ITransferProxy_$3332",
                                "typeString": "contract ITransferProxy"
                              }
                            },
                            "id": 2796,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transfer",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3331,
                            "src": "8674:51:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                              "typeString": "function (address,uint256,address,address) external"
                            }
                          },
                          "id": 2803,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8674:205:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 2804,
                        "nodeType": "ExpressionStatement",
                        "src": "8674:205:14"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 2810,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 2805,
                            "name": "scannedBytes",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2722,
                            "src": "9050:12:14",
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
                                "id": 2808,
                                "name": "exchangeDataLength",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2770,
                                "src": "9082:18:14",
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
                                "id": 2806,
                                "name": "scannedBytes",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2722,
                                "src": "9065:12:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 2807,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 6345,
                              "src": "9065:16:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 2809,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "9065:36:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "9050:51:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2811,
                        "nodeType": "ExpressionStatement",
                        "src": "9050:51:14"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 2815,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 2812,
                            "name": "makerTokenUsed",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2725,
                            "src": "9115:14:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "+=",
                          "rightHandSide": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2813,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2746,
                              "src": "9133:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                              }
                            },
                            "id": 2814,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3602,
                            "src": "9133:23:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "9115:41:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2816,
                        "nodeType": "ExpressionStatement",
                        "src": "9115:41:14"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 2730,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 2727,
                      "name": "scannedBytes",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2722,
                      "src": "7498:12:14",
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
                        "id": 2728,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2714,
                        "src": "7513:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2729,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "7513:17:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "7498:32:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2818,
                  "nodeType": "WhileStatement",
                  "src": "7491:1676:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2819,
                    "name": "makerTokenUsed",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2725,
                    "src": "9183:14:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2720,
                  "id": 2820,
                  "nodeType": "Return",
                  "src": "9176:21:14"
                }
              ]
            },
            "documentation": "Execute the exchange orders by parsing the order data and facilitating the transfers. Each\nheader represents a batch of orders for a particular exchange (0x, KNC, taker). Additional\ninformation such as makerToken is encoded so it can be used to facilitate exchange orders\n     * @param _orderData   Bytes array containing the exchange orders to execute",
            "id": 2822,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeExchangeOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2717,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2714,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2822,
                  "src": "7319:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2713,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7319:5:14",
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
                  "id": 2716,
                  "name": "_makerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2822,
                  "src": "7345:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2715,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "7345:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7309:63:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2720,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2719,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2822,
                  "src": "7406:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2718,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7406:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7405:9:14"
            },
            "scope": 3144,
            "src": "7279:1925:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 2887,
              "nodeType": "Block",
              "src": "9641:786:14",
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
                        "id": 2845,
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
                          "id": 2840,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2837,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2824,
                              "src": "9752:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2838,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3638,
                            "src": "9752:23:14",
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
                            "id": 2839,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "9778:1:14",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "9752:27:14",
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
                          "id": 2844,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2841,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2824,
                              "src": "9783:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2842,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3626,
                            "src": "9783:15:14",
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
                            "id": 2843,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "9801:1:14",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "9783:19:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "9752:50:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2846,
                        "name": "POSITIVE_AMOUNT_REQUIRED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2476,
                        "src": "9816:24:14",
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
                      "id": 2836,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "9731:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2847,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9731:119:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2848,
                  "nodeType": "ExpressionStatement",
                  "src": "9731:119:14"
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
                        "id": 2854,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2850,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6889,
                            "src": "9927:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 2851,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "9927:15:14",
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
                            "id": 2852,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2824,
                            "src": "9946:6:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2853,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "expiration",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3640,
                          "src": "9946:17:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "9927:36:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2855,
                        "name": "ORDER_EXPIRED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2479,
                        "src": "9977:13:14",
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
                      "id": 2849,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "9906:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2856,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9906:94:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2857,
                  "nodeType": "ExpressionStatement",
                  "src": "9906:94:14"
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
                        "id": 2869,
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
                          "id": 2867,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2859,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2824,
                              "src": "10104:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2860,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3626,
                            "src": "10104:15:14",
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
                                      "id": 2862,
                                      "name": "_order",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 2824,
                                      "src": "10132:6:14",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                      }
                                    },
                                    "id": 2863,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setAddress",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3624,
                                    "src": "10132:17:14",
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
                                  "id": 2861,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3318,
                                  "src": "10122:9:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$3318_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2864,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "10122:28:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$3318",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2865,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3291,
                              "src": "10122:40:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2866,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "10122:42:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "10104:60:14",
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
                          "id": 2868,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "10168:1:14",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "10104:65:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2870,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2470,
                        "src": "10183:16:14",
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
                      "id": 2858,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "10083:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2871,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "10083:126:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2872,
                  "nodeType": "ExpressionStatement",
                  "src": "10083:126:14"
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
                        "id": 2883,
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
                          "id": 2881,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 2874,
                            "name": "_executeQuantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2826,
                            "src": "10314:16:14",
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
                                      "id": 2876,
                                      "name": "_order",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 2824,
                                      "src": "10343:6:14",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                      }
                                    },
                                    "id": 2877,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setAddress",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3624,
                                    "src": "10343:17:14",
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
                                  "id": 2875,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3318,
                                  "src": "10333:9:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$3318_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2878,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "10333:28:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$3318",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2879,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3291,
                              "src": "10333:40:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2880,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "10333:42:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "10314:61:14",
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
                          "id": 2882,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "10379:1:14",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "10314:66:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2884,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2470,
                        "src": "10394:16:14",
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
                      "id": 2873,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "10293:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2885,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "10293:127:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2886,
                  "nodeType": "ExpressionStatement",
                  "src": "10293:127:14"
                }
              ]
            },
            "documentation": "Validate order params are still valid\n     * @param  _order              IssuanceOrder object containing order params\n@param  _executeQuantity    Quantity of Set to be filled",
            "id": 2888,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2829,
                      "name": "_order",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2824,
                      "src": "9573:6:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                      }
                    },
                    "id": 2830,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3624,
                    "src": "9573:17:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 2831,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2828,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3432,
                  "src": "9562:10:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "9562:29:14"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 2833,
                    "name": "_executeQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2826,
                    "src": "9619:16:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 2834,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2832,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3404,
                  "src": "9600:18:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "9600:36:14"
              }
            ],
            "name": "validateOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2827,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2824,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 2888,
                  "src": "9454:33:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2823,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3651,
                    "src": "9454:26:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3651_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2826,
                  "name": "_executeQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2888,
                  "src": "9497:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2825,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "9497:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "9444:80:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2835,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "9641:0:14"
            },
            "scope": 3144,
            "src": "9422:1005:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 2960,
              "nodeType": "Block",
              "src": "10624:909:14",
              "statements": [
                {
                  "assignments": [
                    2900
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2900,
                      "name": "toTaker",
                      "nodeType": "VariableDeclaration",
                      "scope": 2961,
                      "src": "10679:12:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2899,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "10679:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2905,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2903,
                        "name": "_makerTokenUsed",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2896,
                        "src": "10724:15:14",
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
                        "id": 2901,
                        "name": "_requiredMakerTokenAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2894,
                        "src": "10694:25:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2902,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6321,
                      "src": "10694:29:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2904,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "10694:46:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "10679:61:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2911,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "10871:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2912,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3636,
                        "src": "10871:17:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2913,
                        "name": "toTaker",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2900,
                        "src": "10902:7:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2914,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "10923:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2915,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3634,
                        "src": "10923:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2916,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "10956:3:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 2917,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "10956:10:14",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2907,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "10821:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2908,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3462,
                            "src": "10821:26:14",
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
                          "id": 2906,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3332,
                          "src": "10806:14:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3332_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 2909,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "10806:42:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3332",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 2910,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3331,
                      "src": "10806:51:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 2918,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "10806:170:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2919,
                  "nodeType": "ExpressionStatement",
                  "src": "10806:170:14"
                },
                {
                  "assignments": [
                    2921
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2921,
                      "name": "requiredFees",
                      "nodeType": "VariableDeclaration",
                      "scope": 2961,
                      "src": "11022:17:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2920,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "11022:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2931,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2928,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11091:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2929,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3626,
                        "src": "11091:15:14",
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
                            "id": 2925,
                            "name": "_fillQuantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2892,
                            "src": "11072:13:14",
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
                              "id": 2922,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2890,
                              "src": "11042:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2923,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "relayerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3646,
                            "src": "11042:25:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2924,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6287,
                          "src": "11042:29:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2926,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "11042:44:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2927,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6301,
                      "src": "11042:48:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2930,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11042:65:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "11022:85:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2937,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11214:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2938,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3644,
                        "src": "11214:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2939,
                        "name": "requiredFees",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2921,
                        "src": "11247:12:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2940,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11273:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2941,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3634,
                        "src": "11273:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2942,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11306:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2943,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3642,
                        "src": "11306:21:14",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2933,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "11164:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2934,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3462,
                            "src": "11164:26:14",
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
                          "id": 2932,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3332,
                          "src": "11149:14:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3332_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 2935,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "11149:42:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3332",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 2936,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3331,
                      "src": "11149:51:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 2944,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11149:188:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2945,
                  "nodeType": "ExpressionStatement",
                  "src": "11149:188:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2951,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11412:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2952,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3644,
                        "src": "11412:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2953,
                        "name": "requiredFees",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2921,
                        "src": "11445:12:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2954,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "11471:3:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 2955,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "11471:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2956,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11495:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2957,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3642,
                        "src": "11495:21:14",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2947,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "11362:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2948,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3462,
                            "src": "11362:26:14",
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
                          "id": 2946,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3332,
                          "src": "11347:14:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3332_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 2949,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "11347:42:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3332",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 2950,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3331,
                      "src": "11347:51:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 2958,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11347:179:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2959,
                  "nodeType": "ExpressionStatement",
                  "src": "11347:179:14"
                }
              ]
            },
            "documentation": null,
            "id": 2961,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "settleAccounts",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2897,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2890,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 2961,
                  "src": "10466:33:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2889,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3651,
                    "src": "10466:26:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3651_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2892,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2961,
                  "src": "10509:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2891,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "10509:4:14",
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
                  "id": 2894,
                  "name": "_requiredMakerTokenAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 2961,
                  "src": "10537:30:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2893,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "10537:4:14",
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
                  "id": 2896,
                  "name": "_makerTokenUsed",
                  "nodeType": "VariableDeclaration",
                  "scope": 2961,
                  "src": "10577:20:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2895,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "10577:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "10456:147:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2898,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "10624:0:14"
            },
            "scope": 3144,
            "src": "10433:1100:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 3142,
              "nodeType": "Block",
              "src": "11683:2156:14",
              "statements": [
                {
                  "assignments": [
                    2971
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2971,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 3143,
                      "src": "11762:22:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2970,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "11762:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2984,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2978,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "11826:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2979,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3486,
                          "src": "11826:18:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2982,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2980,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2963,
                            "src": "11845:6:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2981,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3650,
                          "src": "11845:16:14",
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
                        "src": "11826:36:14",
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
                            "id": 2972,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "11787:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2973,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3482,
                          "src": "11787:16:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2976,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2974,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2963,
                            "src": "11804:6:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2975,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3650,
                          "src": "11804:16:14",
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
                        "src": "11787:34:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2977,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6345,
                      "src": "11787:38:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2983,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11787:76:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "11762:101:14"
                },
                {
                  "assignments": [
                    2986
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2986,
                      "name": "openOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 3143,
                      "src": "11873:20:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2985,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "11873:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2992,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2990,
                        "name": "closedOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2971,
                        "src": "11916:17:14",
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
                          "id": 2987,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "11896:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2988,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3626,
                        "src": "11896:15:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2989,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6321,
                      "src": "11896:19:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2991,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11896:38:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "11873:61:14"
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
                        "id": 2996,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 2994,
                          "name": "openOrderAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2986,
                          "src": "11965:15:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 2995,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2965,
                          "src": "11984:13:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "11965:32:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2997,
                        "name": "INVALID_FILL_AMOUNT",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2467,
                        "src": "12011:19:14",
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
                      "id": 2993,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "11944:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2998,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11944:96:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2999,
                  "nodeType": "ExpressionStatement",
                  "src": "11944:96:14"
                },
                {
                  "assignments": [
                    3003
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3003,
                      "name": "requiredBalances",
                      "nodeType": "VariableDeclaration",
                      "scope": 3143,
                      "src": "12051:30:14",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                        "typeString": "uint256[]"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 3001,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "12051:4:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 3002,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "12051:6:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3011,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3007,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2963,
                            "src": "12095:6:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 3008,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "requiredComponents",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3629,
                          "src": "12095:25:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_memory",
                            "typeString": "address[] memory"
                          }
                        },
                        "id": 3009,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "12095:32:14",
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
                      "id": 3006,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "NewExpression",
                      "src": "12084:10:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
                        "typeString": "function (uint256) pure returns (uint256[] memory)"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 3004,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "12088:4:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 3005,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "12088:6:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      }
                    },
                    "id": 3010,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "12084:44:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_memory",
                      "typeString": "uint256[] memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "12051:77:14"
                },
                {
                  "assignments": [
                    3013
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3013,
                      "name": "requiredMakerTokenAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 3143,
                      "src": "12228:29:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3012,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "12228:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3023,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3020,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "12307:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 3021,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3626,
                        "src": "12307:15:14",
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
                            "id": 3017,
                            "name": "_fillQuantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2965,
                            "src": "12288:13:14",
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
                              "id": 3014,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2963,
                              "src": "12260:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 3015,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3638,
                            "src": "12260:23:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 3016,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6287,
                          "src": "12260:27:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 3018,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "12260:42:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 3019,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6301,
                      "src": "12260:46:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 3022,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "12260:63:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "12228:95:14"
                },
                {
                  "body": {
                    "id": 3074,
                    "nodeType": "Block",
                    "src": "12462:542:14",
                    "statements": [
                      {
                        "assignments": [
                          3037
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 3037,
                            "name": "tokenBalance",
                            "nodeType": "VariableDeclaration",
                            "scope": 3143,
                            "src": "12518:17:14",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 3036,
                              "name": "uint",
                              "nodeType": "ElementaryTypeName",
                              "src": "12518:4:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 3050,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 3043,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2963,
                                "src": "12598:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 3044,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "makerAddress",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3634,
                              "src": "12598:19:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 3045,
                                  "name": "_order",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2963,
                                  "src": "12635:6:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                    "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                  }
                                },
                                "id": 3046,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "requiredComponents",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 3629,
                                "src": "12635:25:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 3048,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 3047,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3025,
                                "src": "12661:1:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint16",
                                  "typeString": "uint16"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "12635:28:14",
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
                              },
                              {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 3039,
                                    "name": "state",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 3489,
                                    "src": "12545:5:14",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_State_$3487_storage",
                                      "typeString": "struct CoreState.State storage ref"
                                    }
                                  },
                                  "id": 3040,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "vaultAddress",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 3464,
                                  "src": "12545:18:14",
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
                                "id": 3038,
                                "name": "IVault",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3371,
                                "src": "12538:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_type$_t_contract$_IVault_$3371_$",
                                  "typeString": "type(contract IVault)"
                                }
                              },
                              "id": 3041,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "typeConversion",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "12538:26:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_IVault_$3371",
                                "typeString": "contract IVault"
                              }
                            },
                            "id": 3042,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "getOwnerBalance",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3370,
                            "src": "12538:42:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$returns$_t_uint256_$",
                              "typeString": "function (address,address) external returns (uint256)"
                            }
                          },
                          "id": 3049,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "12538:139:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "12518:159:14"
                      },
                      {
                        "assignments": [
                          3052
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 3052,
                            "name": "requiredAddition",
                            "nodeType": "VariableDeclaration",
                            "scope": 3143,
                            "src": "12755:21:14",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 3051,
                              "name": "uint",
                              "nodeType": "ElementaryTypeName",
                              "src": "12755:4:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 3064,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 3061,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2963,
                                "src": "12837:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 3062,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "quantity",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3626,
                              "src": "12837:15:14",
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
                                  "id": 3058,
                                  "name": "_fillQuantity",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2965,
                                  "src": "12818:13:14",
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
                                      "id": 3053,
                                      "name": "_order",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 2963,
                                      "src": "12779:6:14",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                      }
                                    },
                                    "id": 3054,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "requiredComponentAmounts",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3632,
                                    "src": "12779:31:14",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_uint256_$dyn_memory",
                                      "typeString": "uint256[] memory"
                                    }
                                  },
                                  "id": 3056,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 3055,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 3025,
                                    "src": "12811:1:14",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_uint16",
                                      "typeString": "uint16"
                                    }
                                  },
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "nodeType": "IndexAccess",
                                  "src": "12779:34:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 3057,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "mul",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6287,
                                "src": "12779:38:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 3059,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "12779:53:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 3060,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "div",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6301,
                            "src": "12779:57:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 3063,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "12779:74:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "12755:98:14"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 3072,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3065,
                              "name": "requiredBalances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3003,
                              "src": "12937:16:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                                "typeString": "uint256[] memory"
                              }
                            },
                            "id": 3067,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 3066,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3025,
                              "src": "12954:1:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint16",
                                "typeString": "uint16"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "nodeType": "IndexAccess",
                            "src": "12937:19:14",
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
                                "id": 3070,
                                "name": "requiredAddition",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3052,
                                "src": "12976:16:14",
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
                                "id": 3068,
                                "name": "tokenBalance",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3037,
                                "src": "12959:12:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 3069,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 6345,
                              "src": "12959:16:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 3071,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "12959:34:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "12937:56:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 3073,
                        "nodeType": "ExpressionStatement",
                        "src": "12937:56:14"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3032,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3028,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3025,
                      "src": "12419:1:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3029,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "12423:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 3030,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "requiredComponents",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3629,
                        "src": "12423:25:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 3031,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "12423:32:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "12419:36:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 3075,
                  "initializationExpression": {
                    "assignments": [
                      3025
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 3025,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 3143,
                        "src": "12405:8:14",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint16",
                          "typeString": "uint16"
                        },
                        "typeName": {
                          "id": 3024,
                          "name": "uint16",
                          "nodeType": "ElementaryTypeName",
                          "src": "12405:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint16",
                            "typeString": "uint16"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 3027,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 3026,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "12416:1:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "12405:12:14"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 3034,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "12457:3:14",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 3033,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3025,
                        "src": "12457:1:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint16",
                          "typeString": "uint16"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "id": 3035,
                    "nodeType": "ExpressionStatement",
                    "src": "12457:3:14"
                  },
                  "nodeType": "ForStatement",
                  "src": "12400:604:14"
                },
                {
                  "assignments": [
                    3077
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3077,
                      "name": "makerTokenAmountUsed",
                      "nodeType": "VariableDeclaration",
                      "scope": 3143,
                      "src": "13049:25:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3076,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "13049:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3083,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3079,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2967,
                        "src": "13099:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3080,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "13111:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 3081,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3634,
                        "src": "13111:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 3078,
                      "name": "executeExchangeOrders",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2822,
                      "src": "13077:21:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_bytes_memory_ptr_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory,address) returns (uint256)"
                      }
                    },
                    "id": 3082,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13077:54:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "13049:82:14"
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
                        "id": 3087,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3085,
                          "name": "makerTokenAmountUsed",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3077,
                          "src": "13149:20:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3086,
                          "name": "requiredMakerTokenAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3013,
                          "src": "13173:24:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "13149:48:14",
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
                      "id": 3084,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6902,
                      "src": "13141:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3088,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13141:57:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3089,
                  "nodeType": "ExpressionStatement",
                  "src": "13141:57:14"
                },
                {
                  "body": {
                    "id": 3117,
                    "nodeType": "Block",
                    "src": "13352:240:14",
                    "statements": [
                      {
                        "assignments": [
                          3103
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 3103,
                            "name": "currentBal",
                            "nodeType": "VariableDeclaration",
                            "scope": 3143,
                            "src": "13366:15:14",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 3102,
                              "name": "uint",
                              "nodeType": "ElementaryTypeName",
                              "src": "13366:4:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 3116,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 3109,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2963,
                                "src": "13444:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 3110,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "makerAddress",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3634,
                              "src": "13444:19:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 3111,
                                  "name": "_order",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2963,
                                  "src": "13481:6:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                    "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                  }
                                },
                                "id": 3112,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "requiredComponents",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 3629,
                                "src": "13481:25:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 3114,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 3113,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3025,
                                "src": "13507:1:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint16",
                                  "typeString": "uint16"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "13481:28:14",
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
                              },
                              {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 3105,
                                    "name": "state",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 3489,
                                    "src": "13391:5:14",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_State_$3487_storage",
                                      "typeString": "struct CoreState.State storage ref"
                                    }
                                  },
                                  "id": 3106,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "vaultAddress",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 3464,
                                  "src": "13391:18:14",
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
                                "id": 3104,
                                "name": "IVault",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3371,
                                "src": "13384:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_type$_t_contract$_IVault_$3371_$",
                                  "typeString": "type(contract IVault)"
                                }
                              },
                              "id": 3107,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "typeConversion",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "13384:26:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_IVault_$3371",
                                "typeString": "contract IVault"
                              }
                            },
                            "id": 3108,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "getOwnerBalance",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3370,
                            "src": "13384:42:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$returns$_t_uint256_$",
                              "typeString": "function (address,address) external returns (uint256)"
                            }
                          },
                          "id": 3115,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "13384:139:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "13366:157:14"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3098,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3094,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3025,
                      "src": "13309:1:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3095,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "13313:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 3096,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "requiredComponents",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3629,
                        "src": "13313:25:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 3097,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "13313:32:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "13309:36:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 3118,
                  "initializationExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 3092,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 3090,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3025,
                        "src": "13302:1:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint16",
                          "typeString": "uint16"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 3091,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "13306:1:14",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      },
                      "src": "13302:5:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "id": 3093,
                    "nodeType": "ExpressionStatement",
                    "src": "13302:5:14"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 3100,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "13347:3:14",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 3099,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3025,
                        "src": "13347:1:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint16",
                          "typeString": "uint16"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "id": 3101,
                    "nodeType": "ExpressionStatement",
                    "src": "13347:3:14"
                  },
                  "nodeType": "ForStatement",
                  "src": "13297:295:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3120,
                        "name": "_order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2963,
                        "src": "13617:6:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3121,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2965,
                        "src": "13625:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3122,
                        "name": "requiredMakerTokenAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3013,
                        "src": "13640:24:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3123,
                        "name": "makerTokenAmountUsed",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3077,
                        "src": "13666:20:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
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
                      "id": 3119,
                      "name": "settleAccounts",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2961,
                      "src": "13602:14:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_struct$_IssuanceOrder_$3651_memory_ptr_$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256,uint256,uint256)"
                      }
                    },
                    "id": 3124,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13602:85:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3125,
                  "nodeType": "ExpressionStatement",
                  "src": "13602:85:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3140,
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
                          "id": 3126,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "13742:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 3130,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderFills",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3482,
                        "src": "13742:16:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 3131,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3128,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "13759:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 3129,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3650,
                        "src": "13759:16:14",
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
                      "src": "13742:34:14",
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
                          "id": 3138,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2965,
                          "src": "13818:13:14",
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
                              "id": 3132,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "13779:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 3133,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderFills",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3482,
                            "src": "13779:16:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 3136,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 3134,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2963,
                              "src": "13796:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 3135,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3650,
                            "src": "13796:16:14",
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
                          "src": "13779:34:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 3137,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6345,
                        "src": "13779:38:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 3139,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "13779:53:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "13742:90:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3141,
                  "nodeType": "ExpressionStatement",
                  "src": "13742:90:14"
                }
              ]
            },
            "documentation": null,
            "id": 3143,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "settleOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2968,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2963,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3143,
                  "src": "11569:33:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2962,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3651,
                    "src": "11569:26:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3651_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2965,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3143,
                  "src": "11612:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2964,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "11612:4:14",
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
                  "id": 2967,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3143,
                  "src": "11640:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2966,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "11640:5:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "11559:103:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2969,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "11683:0:14"
            },
            "scope": 3144,
            "src": "11539:2300:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 3145,
        "src": "1570:12271:14"
      }
    ],
    "src": "597:13245:14"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
    "exportedSymbols": {
      "CoreIssuanceOrder": [
        3144
      ]
    },
    "id": 3145,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2418,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:14"
      },
      {
        "id": 2419,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:14"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
        "file": "zeppelin-solidity/contracts/math/Math.sol",
        "id": 2421,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 6253,
        "src": "659:65:14",
        "symbolAliases": [
          {
            "foreign": 2420,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 2423,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 6347,
        "src": "725:73:14",
        "symbolAliases": [
          {
            "foreign": 2422,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 2425,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3455,
        "src": "799:63:14",
        "symbolAliases": [
          {
            "foreign": 2424,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 2427,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3594,
        "src": "863:49:14",
        "symbolAliases": [
          {
            "foreign": 2426,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
        "file": "../lib/ExchangeHandler.sol",
        "id": 2429,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3621,
        "src": "913:61:14",
        "symbolAliases": [
          {
            "foreign": 2428,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
        "file": "../interfaces/ICoreIssuance.sol",
        "id": 2431,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3250,
        "src": "975:64:14",
        "symbolAliases": [
          {
            "foreign": 2430,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/IExchange.sol",
        "file": "../interfaces/IExchange.sol",
        "id": 2433,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3260,
        "src": "1040:56:14",
        "symbolAliases": [
          {
            "foreign": 2432,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 2435,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3333,
        "src": "1097:66:14",
        "symbolAliases": [
          {
            "foreign": 2434,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 2437,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3372,
        "src": "1164:50:14",
        "symbolAliases": [
          {
            "foreign": 2436,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 2439,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3319,
        "src": "1215:56:14",
        "symbolAliases": [
          {
            "foreign": 2438,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 2441,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 4491,
        "src": "1272:58:14",
        "symbolAliases": [
          {
            "foreign": 2440,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../lib/OrderLibrary.sol",
        "id": 2443,
        "nodeType": "ImportDirective",
        "scope": 3145,
        "sourceUnit": 3753,
        "src": "1331:55:14",
        "symbolAliases": [
          {
            "foreign": 2442,
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
              "id": 2444,
              "name": "ICoreIssuance",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3249,
              "src": "1604:13:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICoreIssuance_$3249",
                "typeString": "contract ICoreIssuance"
              }
            },
            "id": 2445,
            "nodeType": "InheritanceSpecifier",
            "src": "1604:13:14"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2446,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "1623:9:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 2447,
            "nodeType": "InheritanceSpecifier",
            "src": "1623:9:14"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 2448,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3454,
              "src": "1638:13:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3454",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 2449,
            "nodeType": "InheritanceSpecifier",
            "src": "1638:13:14"
          }
        ],
        "contractDependencies": [
          3249,
          3454,
          3593
        ],
        "contractKind": "contract",
        "documentation": "@title CoreIssuanceOrder\n@author Set Protocol\n * The Core Issuance Order extension houses all functions related to the filling and\ncanceling issuance orders.\n ",
        "fullyImplemented": false,
        "id": 3144,
        "linearizedBaseContracts": [
          3144,
          3454,
          3593,
          3249
        ],
        "name": "CoreIssuanceOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2452,
            "libraryName": {
              "contractScope": null,
              "id": 2450,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6346,
              "src": "1664:8:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6346",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1658:27:14",
            "typeName": {
              "id": 2451,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1677:7:14",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 2455,
            "libraryName": {
              "contractScope": null,
              "id": 2453,
              "name": "Math",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6252,
              "src": "1696:4:14",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Math_$6252",
                "typeString": "library Math"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1690:23:14",
            "typeName": {
              "id": 2454,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1705:7:14",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 2458,
            "name": "EXCHANGE_HEADER_LENGTH",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "1766:45:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 2456,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1766:7:14",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "313238",
              "id": 2457,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1808:3:14",
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
            "id": 2461,
            "name": "INVALID_CANCEL_ORDER",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "1818:69:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2459,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1818:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4f6e6c79206d616b65722063616e2063616e63656c206f726465722e",
              "id": 2460,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1857:30:14",
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
            "id": 2464,
            "name": "INVALID_EXCHANGE",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "1893:61:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2462,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1893:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "45786368616e676520646f6573206e6f742065786973742e",
              "id": 2463,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1928:26:14",
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
            "id": 2467,
            "name": "INVALID_FILL_AMOUNT",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "1960:97:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2465,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1960:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "46696c6c20616d6f756e74206d75737420626520657175616c206f72206c657373207468616e206f70656e206f7264657220616d6f756e742e",
              "id": 2466,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1998:59:14",
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
            "id": 2470,
            "name": "INVALID_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "2063:94:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2468,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2063:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d757374206265206d756c7469706c65206f6620746865206e61747572616c20756e6974206f6620746865207365742e",
              "id": 2469,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2098:59:14",
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
            "id": 2473,
            "name": "INVALID_SIGNATURE",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "2163:62:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2471,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2163:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "496e76616c6964206f72646572207369676e61747572652e",
              "id": 2472,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2199:26:14",
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
            "id": 2476,
            "name": "POSITIVE_AMOUNT_REQUIRED",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "2231:79:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2474,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2231:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e746974792073686f756c642062652067726561746572207468616e20302e",
              "id": 2475,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2274:36:14",
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
            "id": 2479,
            "name": "ORDER_EXPIRED",
            "nodeType": "VariableDeclaration",
            "scope": 3144,
            "src": "2316:57:14",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2477,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "2316:6:14",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "54686973206f726465722068617320657870697265642e",
              "id": 2478,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "2348:25:14",
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
              "id": 2581,
              "nodeType": "Block",
              "src": "3253:1503:14",
              "statements": [
                {
                  "assignments": [
                    2508
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2508,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2582,
                      "src": "3263:39:14",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2507,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3651,
                        "src": "3263:26:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2551,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2511,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2483,
                          "src": "3358:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2513,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2512,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3369:1:14",
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
                        "src": "3358:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2514,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2487,
                          "src": "3395:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2516,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2515,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3403:1:14",
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
                        "src": "3395:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2517,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2490,
                        "src": "3439:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2518,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2493,
                        "src": "3498:25:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2519,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2483,
                          "src": "3551:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2521,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2520,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3562:1:14",
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
                        "src": "3551:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2522,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2483,
                          "src": "3590:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2524,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2523,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3601:1:14",
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
                        "src": "3590:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2525,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2487,
                          "src": "3635:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2527,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2526,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3643:1:14",
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
                        "src": "3635:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2528,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2487,
                          "src": "3671:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2530,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2529,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3679:1:14",
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
                        "src": "3671:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2531,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2483,
                          "src": "3711:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2533,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2532,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3722:1:14",
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
                        "src": "3711:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2534,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2483,
                          "src": "3752:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2536,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2535,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3763:1:14",
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
                        "src": "3752:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2537,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2487,
                          "src": "3799:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2539,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2538,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3807:1:14",
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
                        "src": "3799:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2540,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2487,
                          "src": "3829:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2542,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2541,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3837:1:14",
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
                        "src": "3829:10:14",
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
                            "id": 2545,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2483,
                            "src": "3912:10:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2546,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2487,
                            "src": "3940:7:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2547,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2490,
                            "src": "3965:19:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2548,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2493,
                            "src": "4002:25:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
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
                            },
                            {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2543,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3752,
                            "src": "3864:12:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3752_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2544,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3709,
                          "src": "3864:30:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 2549,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3864:177:14",
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
                        "id": 2509,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3752,
                        "src": "3305:12:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3752_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 2510,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3651,
                      "src": "3305:26:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$3651_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 2550,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "quantity",
                      "requiredComponents",
                      "requiredComponentAmounts",
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
                    "src": "3305:747:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3263:789:14"
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
                              "id": 2555,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2508,
                              "src": "4173:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2556,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3650,
                            "src": "4173:15:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2557,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2508,
                              "src": "4206:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2558,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3634,
                            "src": "4206:18:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2559,
                            "name": "_v",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2497,
                            "src": "4242:2:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2560,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2500,
                              "src": "4262:8:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 2562,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 2561,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4271:1:14",
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
                            "src": "4262:11:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2563,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2500,
                              "src": "4296:8:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 2565,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 2564,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4305:1:14",
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
                            "src": "4296:11:14",
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
                            "id": 2553,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3752,
                            "src": "4125:12:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3752_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2554,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validateSignature",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3751,
                          "src": "4125:30:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                            "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                          }
                        },
                        "id": 2566,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4125:201:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2567,
                        "name": "INVALID_SIGNATURE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2473,
                        "src": "4340:17:14",
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
                      "id": 2552,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "4104:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2568,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4104:263:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2569,
                  "nodeType": "ExpressionStatement",
                  "src": "4104:263:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2571,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2508,
                        "src": "4469:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2572,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2495,
                        "src": "4488:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 2570,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2888,
                      "src": "4442:13:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$3651_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 2573,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4442:69:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2574,
                  "nodeType": "ExpressionStatement",
                  "src": "4442:69:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2576,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2508,
                        "src": "4558:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2577,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2495,
                        "src": "4565:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2578,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2502,
                        "src": "4580:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      ],
                      "id": 2575,
                      "name": "settleOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3143,
                      "src": "4546:11:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_struct$_IssuanceOrder_$3651_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256,bytes memory)"
                      }
                    },
                    "id": 2579,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4546:45:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2580,
                  "nodeType": "ExpressionStatement",
                  "src": "4546:45:14"
                }
              ]
            },
            "documentation": "Fill an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _fillQuantity   Quantity of set to be filled\n@param  _v              v element of ECDSA signature\n@param  sigBytes        Array with r and s segments of ECDSA signature\n@param _orderData       Bytes array containing the exchange orders to execute",
            "id": 2582,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2503,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2483,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "2998:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2480,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2998:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2482,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2481,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3006:1:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "2998:10:14",
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
                  "id": 2487,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3029:15:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2484,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3029:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2486,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2485,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3034:1:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3029:7:14",
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
                  "id": 2490,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3054:29:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2488,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3054:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2489,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3054:9:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2493,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3093:32:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2491,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3093:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2492,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3093:6:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2495,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3135:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2494,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3135:4:14",
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
                  "id": 2497,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3163:8:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 2496,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "3163:5:14",
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
                  "id": 2500,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3181:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2498,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "3181:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 2499,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3181:9:14",
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
                  "id": 2502,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2582,
                  "src": "3209:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2501,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3209:5:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2988:243:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2504,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3253:0:14"
            },
            "scope": 3144,
            "src": "2970:1786:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2711,
              "nodeType": "Block",
              "src": "5334:1487:14",
              "statements": [
                {
                  "assignments": [
                    2607
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2607,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 2712,
                      "src": "5344:39:14",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 2606,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3651,
                        "src": "5344:26:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2650,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2610,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2586,
                          "src": "5439:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2612,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2611,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5450:1:14",
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
                        "src": "5439:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2613,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
                          "src": "5476:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2615,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 2614,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5484:1:14",
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
                        "src": "5476:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2616,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2593,
                        "src": "5520:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2617,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2596,
                        "src": "5579:25:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2618,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2586,
                          "src": "5632:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2620,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2619,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5643:1:14",
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
                        "src": "5632:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2621,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2586,
                          "src": "5671:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2623,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2622,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5682:1:14",
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
                        "src": "5671:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2624,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
                          "src": "5716:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2626,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 2625,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5724:1:14",
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
                        "src": "5716:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2627,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
                          "src": "5752:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2629,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 2628,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5760:1:14",
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
                        "src": "5752:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2630,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2586,
                          "src": "5792:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2632,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2631,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5803:1:14",
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
                        "src": "5792:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2633,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2586,
                          "src": "5833:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 2635,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2634,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5844:1:14",
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
                        "src": "5833:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2636,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
                          "src": "5880:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2638,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 2637,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5888:1:14",
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
                        "src": "5880:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 2639,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2590,
                          "src": "5910:7:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 2641,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 2640,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5918:1:14",
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
                        "src": "5910:10:14",
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
                            "id": 2644,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2586,
                            "src": "5993:10:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2645,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2590,
                            "src": "6021:7:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2646,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2593,
                            "src": "6046:19:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2647,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2596,
                            "src": "6083:25:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
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
                            },
                            {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2642,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3752,
                            "src": "5945:12:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3752_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 2643,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3709,
                          "src": "5945:30:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 2648,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5945:177:14",
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
                        "id": 2608,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3752,
                        "src": "5386:12:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$3752_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 2609,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3651,
                      "src": "5386:26:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$3651_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 2649,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "quantity",
                      "requiredComponents",
                      "requiredComponentAmounts",
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
                    "src": "5386:747:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5344:789:14"
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
                        "id": 2656,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2652,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2607,
                            "src": "6203:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2653,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "makerAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3634,
                          "src": "6203:18:14",
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
                            "id": 2654,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6899,
                            "src": "6225:3:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 2655,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "6225:10:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "6203:32:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2657,
                        "name": "INVALID_CANCEL_ORDER",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2461,
                        "src": "6237:20:14",
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
                      "id": 2651,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "6195:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2658,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6195:63:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2659,
                  "nodeType": "ExpressionStatement",
                  "src": "6195:63:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2661,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2607,
                        "src": "6329:5:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2662,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2598,
                        "src": "6348:15:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 2660,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2888,
                      "src": "6302:13:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$3651_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 2663,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6302:71:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2664,
                  "nodeType": "ExpressionStatement",
                  "src": "6302:71:14"
                },
                {
                  "assignments": [
                    2666
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2666,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2712,
                      "src": "6422:22:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2665,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6422:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2679,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2673,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "6485:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2674,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3486,
                          "src": "6485:18:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2677,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2675,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2607,
                            "src": "6504:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2676,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3650,
                          "src": "6504:15:14",
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
                        "src": "6485:35:14",
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
                            "id": 2667,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "6447:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2668,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3482,
                          "src": "6447:16:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2671,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2669,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2607,
                            "src": "6464:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2670,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3650,
                          "src": "6464:15:14",
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
                        "src": "6447:33:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2672,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6345,
                      "src": "6447:37:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2678,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6447:74:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6422:99:14"
                },
                {
                  "assignments": [
                    2681
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2681,
                      "name": "openOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2712,
                      "src": "6531:20:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2680,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6531:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2687,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2685,
                        "name": "closedOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2666,
                        "src": "6573:17:14",
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
                          "id": 2682,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2607,
                          "src": "6554:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2683,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3626,
                        "src": "6554:14:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2684,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6321,
                      "src": "6554:18:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2686,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6554:37:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6531:60:14"
                },
                {
                  "assignments": [
                    2689
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2689,
                      "name": "canceledAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 2712,
                      "src": "6601:19:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2688,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6601:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2694,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2692,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2598,
                        "src": "6646:15:14",
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
                        "id": 2690,
                        "name": "openOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2681,
                        "src": "6623:15:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2691,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "min256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6251,
                      "src": "6623:22:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2693,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6623:39:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6601:61:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2709,
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
                          "id": 2695,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "6721:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 2699,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderCancels",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3486,
                        "src": "6721:18:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 2700,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2697,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2607,
                          "src": "6740:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2698,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3650,
                        "src": "6740:15:14",
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
                      "src": "6721:35:14",
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
                          "id": 2707,
                          "name": "canceledAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2689,
                          "src": "6799:14:14",
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
                              "id": 2701,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "6759:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2702,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderCancels",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3486,
                            "src": "6759:18:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 2705,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2703,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2607,
                              "src": "6778:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2704,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3650,
                            "src": "6778:15:14",
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
                          "src": "6759:35:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2706,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6345,
                        "src": "6759:39:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 2708,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "6759:55:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "6721:93:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 2710,
                  "nodeType": "ExpressionStatement",
                  "src": "6721:93:14"
                }
              ]
            },
            "documentation": "Cancel an issuance order\n     * @param  _addresses      [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values         [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _cancelQuantity Quantity of set to be filled",
            "id": 2712,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 2601,
                    "name": "_cancelQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2598,
                    "src": "5313:15:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 2602,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2600,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3404,
                  "src": "5294:18:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "5294:35:14"
              }
            ],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2599,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2586,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "5105:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2583,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5105:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2585,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2584,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5113:1:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5105:10:14",
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
                  "id": 2590,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "5136:15:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2587,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5136:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2589,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2588,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5141:1:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5136:7:14",
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
                  "id": 2593,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "5161:29:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2591,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5161:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2592,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5161:9:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2596,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "5200:32:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2594,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5200:4:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2595,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5200:6:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2598,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2712,
                  "src": "5242:20:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2597,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5242:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5095:173:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2603,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5334:0:14"
            },
            "scope": 3144,
            "src": "5075:1746:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2821,
              "nodeType": "Block",
              "src": "7419:1785:14",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2722,
                      "name": "scannedBytes",
                      "nodeType": "VariableDeclaration",
                      "scope": 2822,
                      "src": "7429:20:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2721,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7429:7:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2723,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7429:20:14"
                },
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2725,
                      "name": "makerTokenUsed",
                      "nodeType": "VariableDeclaration",
                      "scope": 2822,
                      "src": "7459:22:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2724,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "7459:7:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2726,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7459:22:14"
                },
                {
                  "body": {
                    "id": 2817,
                    "nodeType": "Block",
                    "src": "7532:1635:14",
                    "statements": [
                      {
                        "assignments": [
                          2732
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2732,
                            "name": "headerData",
                            "nodeType": "VariableDeclaration",
                            "scope": 2822,
                            "src": "7597:23:14",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 2731,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "7597:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2742,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2735,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2714,
                              "src": "7655:10:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2736,
                              "name": "scannedBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2722,
                              "src": "7683:12:14",
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
                                  "id": 2739,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2458,
                                  "src": "7730:22:14",
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
                                  "id": 2737,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2722,
                                  "src": "7713:12:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2738,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6345,
                                "src": "7713:16:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2740,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "7713:40:14",
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
                              "id": 2733,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4490,
                              "src": "7623:8:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$4490_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 2734,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4489,
                            "src": "7623:14:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 2741,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7623:144:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7597:170:14"
                      },
                      {
                        "assignments": [
                          2746
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2746,
                            "name": "header",
                            "nodeType": "VariableDeclaration",
                            "scope": 2822,
                            "src": "7781:44:14",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                              "typeString": "struct ExchangeHandler.ExchangeHeader"
                            },
                            "typeName": {
                              "contractScope": null,
                              "id": 2745,
                              "name": "ExchangeHandler.ExchangeHeader",
                              "nodeType": "UserDefinedTypeName",
                              "referencedDeclaration": 3605,
                              "src": "7781:30:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$3605_storage_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2751,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2749,
                              "name": "headerData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2732,
                              "src": "7881:10:14",
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
                              "id": 2747,
                              "name": "ExchangeHandler",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3620,
                              "src": "7828:15:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_ExchangeHandler_$3620_$",
                                "typeString": "type(library ExchangeHandler)"
                              }
                            },
                            "id": 2748,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "parseExchangeHeader",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3619,
                            "src": "7828:35:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_ExchangeHeader_$3605_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (struct ExchangeHandler.ExchangeHeader memory)"
                            }
                          },
                          "id": 2750,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "7828:77:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                            "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "7781:124:14"
                      },
                      {
                        "assignments": [
                          2753
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2753,
                            "name": "exchange",
                            "nodeType": "VariableDeclaration",
                            "scope": 2822,
                            "src": "8005:16:14",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            "typeName": {
                              "id": 2752,
                              "name": "address",
                              "nodeType": "ElementaryTypeName",
                              "src": "8005:7:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2759,
                        "initialValue": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2754,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "8024:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2755,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchanges",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3460,
                            "src": "8024:15:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_uint8_$_t_address_$",
                              "typeString": "mapping(uint8 => address)"
                            }
                          },
                          "id": 2758,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2756,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2746,
                              "src": "8040:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                              }
                            },
                            "id": 2757,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "exchange",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3598,
                            "src": "8040:15:14",
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
                          "src": "8024:32:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8005:51:14"
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
                              "id": 2765,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "leftExpression": {
                                "argumentTypes": null,
                                "id": 2761,
                                "name": "exchange",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2753,
                                "src": "8149:8:14",
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
                                    "id": 2763,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": true,
                                    "kind": "number",
                                    "lValueRequested": false,
                                    "nodeType": "Literal",
                                    "src": "8169:1:14",
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
                                  "id": 2762,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "nodeType": "ElementaryTypeNameExpression",
                                  "src": "8161:7:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_address_$",
                                    "typeString": "type(address)"
                                  },
                                  "typeName": "address"
                                },
                                "id": 2764,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "8161:10:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "src": "8149:22:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bool",
                                "typeString": "bool"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2766,
                              "name": "INVALID_EXCHANGE",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2464,
                              "src": "8189:16:14",
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
                            "id": 2760,
                            "name": "require",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [
                              6902,
                              6903
                            ],
                            "referencedDeclaration": 6903,
                            "src": "8124:7:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                              "typeString": "function (bool,string memory) pure"
                            }
                          },
                          "id": 2767,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8124:95:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 2768,
                        "nodeType": "ExpressionStatement",
                        "src": "8124:95:14"
                      },
                      {
                        "assignments": [
                          2770
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2770,
                            "name": "exchangeDataLength",
                            "nodeType": "VariableDeclaration",
                            "scope": 2822,
                            "src": "8303:26:14",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 2769,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "8303:7:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2776,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2774,
                              "name": "EXCHANGE_HEADER_LENGTH",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2458,
                              "src": "8361:22:14",
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
                                "id": 2771,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2746,
                                "src": "8332:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                                  "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                                }
                              },
                              "id": 2772,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "totalOrdersLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3604,
                              "src": "8332:24:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2773,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6345,
                            "src": "8332:28:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2775,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8332:52:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8303:81:14"
                      },
                      {
                        "assignments": [
                          2778
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 2778,
                            "name": "orderBody",
                            "nodeType": "VariableDeclaration",
                            "scope": 2822,
                            "src": "8398:22:14",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 2777,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "8398:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 2791,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2781,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2714,
                              "src": "8455:10:14",
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
                                  "id": 2784,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2458,
                                  "src": "8500:22:14",
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
                                  "id": 2782,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2722,
                                  "src": "8483:12:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2783,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6345,
                                "src": "8483:16:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2785,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8483:40:14",
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
                                  "id": 2788,
                                  "name": "exchangeDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2770,
                                  "src": "8558:18:14",
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
                                  "id": 2786,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2722,
                                  "src": "8541:12:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2787,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6345,
                                "src": "8541:16:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2789,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8541:36:14",
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
                              "id": 2779,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4490,
                              "src": "8423:8:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$4490_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 2780,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 4489,
                            "src": "8423:14:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 2790,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8423:168:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8398:193:14"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 2797,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2746,
                                "src": "8743:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                                  "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                                }
                              },
                              "id": 2798,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "makerTokenAddress",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3600,
                              "src": "8743:24:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 2799,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2746,
                                "src": "8785:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                                  "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                                }
                              },
                              "id": 2800,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "makerTokenAmount",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3602,
                              "src": "8785:23:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2801,
                              "name": "_makerAddress",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2716,
                              "src": "8826:13:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 2802,
                              "name": "exchange",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2753,
                              "src": "8857:8:14",
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
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 2793,
                                    "name": "state",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 3489,
                                    "src": "8689:5:14",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_State_$3487_storage",
                                      "typeString": "struct CoreState.State storage ref"
                                    }
                                  },
                                  "id": 2794,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "transferProxyAddress",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 3462,
                                  "src": "8689:26:14",
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
                                "id": 2792,
                                "name": "ITransferProxy",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3332,
                                "src": "8674:14:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3332_$",
                                  "typeString": "type(contract ITransferProxy)"
                                }
                              },
                              "id": 2795,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "typeConversion",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8674:42:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_ITransferProxy_$3332",
                                "typeString": "contract ITransferProxy"
                              }
                            },
                            "id": 2796,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transfer",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3331,
                            "src": "8674:51:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                              "typeString": "function (address,uint256,address,address) external"
                            }
                          },
                          "id": 2803,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8674:205:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 2804,
                        "nodeType": "ExpressionStatement",
                        "src": "8674:205:14"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 2810,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 2805,
                            "name": "scannedBytes",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2722,
                            "src": "9050:12:14",
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
                                "id": 2808,
                                "name": "exchangeDataLength",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2770,
                                "src": "9082:18:14",
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
                                "id": 2806,
                                "name": "scannedBytes",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2722,
                                "src": "9065:12:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 2807,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 6345,
                              "src": "9065:16:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 2809,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "9065:36:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "9050:51:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2811,
                        "nodeType": "ExpressionStatement",
                        "src": "9050:51:14"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 2815,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 2812,
                            "name": "makerTokenUsed",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2725,
                            "src": "9115:14:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "+=",
                          "rightHandSide": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2813,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2746,
                              "src": "9133:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$3605_memory_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                              }
                            },
                            "id": 2814,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3602,
                            "src": "9133:23:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "9115:41:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 2816,
                        "nodeType": "ExpressionStatement",
                        "src": "9115:41:14"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 2730,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 2727,
                      "name": "scannedBytes",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2722,
                      "src": "7498:12:14",
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
                        "id": 2728,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2714,
                        "src": "7513:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 2729,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "7513:17:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "7498:32:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2818,
                  "nodeType": "WhileStatement",
                  "src": "7491:1676:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2819,
                    "name": "makerTokenUsed",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2725,
                    "src": "9183:14:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2720,
                  "id": 2820,
                  "nodeType": "Return",
                  "src": "9176:21:14"
                }
              ]
            },
            "documentation": "Execute the exchange orders by parsing the order data and facilitating the transfers. Each\nheader represents a batch of orders for a particular exchange (0x, KNC, taker). Additional\ninformation such as makerToken is encoded so it can be used to facilitate exchange orders\n     * @param _orderData   Bytes array containing the exchange orders to execute",
            "id": 2822,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeExchangeOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2717,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2714,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 2822,
                  "src": "7319:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2713,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "7319:5:14",
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
                  "id": 2716,
                  "name": "_makerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2822,
                  "src": "7345:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2715,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "7345:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7309:63:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2720,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2719,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2822,
                  "src": "7406:7:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2718,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "7406:7:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "7405:9:14"
            },
            "scope": 3144,
            "src": "7279:1925:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 2887,
              "nodeType": "Block",
              "src": "9641:786:14",
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
                        "id": 2845,
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
                          "id": 2840,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2837,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2824,
                              "src": "9752:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2838,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3638,
                            "src": "9752:23:14",
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
                            "id": 2839,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "9778:1:14",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "9752:27:14",
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
                          "id": 2844,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2841,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2824,
                              "src": "9783:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2842,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3626,
                            "src": "9783:15:14",
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
                            "id": 2843,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "9801:1:14",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "9783:19:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "9752:50:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2846,
                        "name": "POSITIVE_AMOUNT_REQUIRED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2476,
                        "src": "9816:24:14",
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
                      "id": 2836,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "9731:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2847,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9731:119:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2848,
                  "nodeType": "ExpressionStatement",
                  "src": "9731:119:14"
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
                        "id": 2854,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2850,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6889,
                            "src": "9927:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 2851,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "9927:15:14",
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
                            "id": 2852,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2824,
                            "src": "9946:6:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2853,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "expiration",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3640,
                          "src": "9946:17:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "9927:36:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2855,
                        "name": "ORDER_EXPIRED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2479,
                        "src": "9977:13:14",
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
                      "id": 2849,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "9906:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2856,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "9906:94:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2857,
                  "nodeType": "ExpressionStatement",
                  "src": "9906:94:14"
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
                        "id": 2869,
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
                          "id": 2867,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2859,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2824,
                              "src": "10104:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2860,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3626,
                            "src": "10104:15:14",
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
                                      "id": 2862,
                                      "name": "_order",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 2824,
                                      "src": "10132:6:14",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                      }
                                    },
                                    "id": 2863,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setAddress",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3624,
                                    "src": "10132:17:14",
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
                                  "id": 2861,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3318,
                                  "src": "10122:9:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$3318_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2864,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "10122:28:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$3318",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2865,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3291,
                              "src": "10122:40:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2866,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "10122:42:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "10104:60:14",
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
                          "id": 2868,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "10168:1:14",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "10104:65:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2870,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2470,
                        "src": "10183:16:14",
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
                      "id": 2858,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "10083:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2871,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "10083:126:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2872,
                  "nodeType": "ExpressionStatement",
                  "src": "10083:126:14"
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
                        "id": 2883,
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
                          "id": 2881,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 2874,
                            "name": "_executeQuantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2826,
                            "src": "10314:16:14",
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
                                      "id": 2876,
                                      "name": "_order",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 2824,
                                      "src": "10343:6:14",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                      }
                                    },
                                    "id": 2877,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setAddress",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3624,
                                    "src": "10343:17:14",
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
                                  "id": 2875,
                                  "name": "ISetToken",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 3318,
                                  "src": "10333:9:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_ISetToken_$3318_$",
                                    "typeString": "type(contract ISetToken)"
                                  }
                                },
                                "id": 2878,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "typeConversion",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "10333:28:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$3318",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 2879,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3291,
                              "src": "10333:40:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 2880,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "10333:42:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "10314:61:14",
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
                          "id": 2882,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "10379:1:14",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "10314:66:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2884,
                        "name": "INVALID_QUANTITY",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2470,
                        "src": "10394:16:14",
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
                      "id": 2873,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "10293:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2885,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "10293:127:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2886,
                  "nodeType": "ExpressionStatement",
                  "src": "10293:127:14"
                }
              ]
            },
            "documentation": "Validate order params are still valid\n     * @param  _order              IssuanceOrder object containing order params\n@param  _executeQuantity    Quantity of Set to be filled",
            "id": 2888,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 2829,
                      "name": "_order",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2824,
                      "src": "9573:6:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                      }
                    },
                    "id": 2830,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "setAddress",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": 3624,
                    "src": "9573:17:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 2831,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2828,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3432,
                  "src": "9562:10:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "9562:29:14"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 2833,
                    "name": "_executeQuantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 2826,
                    "src": "9619:16:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 2834,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 2832,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3404,
                  "src": "9600:18:14",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "9600:36:14"
              }
            ],
            "name": "validateOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2827,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2824,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 2888,
                  "src": "9454:33:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2823,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3651,
                    "src": "9454:26:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3651_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2826,
                  "name": "_executeQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2888,
                  "src": "9497:21:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2825,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "9497:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "9444:80:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2835,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "9641:0:14"
            },
            "scope": 3144,
            "src": "9422:1005:14",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 2960,
              "nodeType": "Block",
              "src": "10624:909:14",
              "statements": [
                {
                  "assignments": [
                    2900
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2900,
                      "name": "toTaker",
                      "nodeType": "VariableDeclaration",
                      "scope": 2961,
                      "src": "10679:12:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2899,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "10679:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2905,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2903,
                        "name": "_makerTokenUsed",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2896,
                        "src": "10724:15:14",
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
                        "id": 2901,
                        "name": "_requiredMakerTokenAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2894,
                        "src": "10694:25:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2902,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6321,
                      "src": "10694:29:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2904,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "10694:46:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "10679:61:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2911,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "10871:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2912,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3636,
                        "src": "10871:17:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2913,
                        "name": "toTaker",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2900,
                        "src": "10902:7:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2914,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "10923:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2915,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3634,
                        "src": "10923:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2916,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "10956:3:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 2917,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "10956:10:14",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2907,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "10821:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2908,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3462,
                            "src": "10821:26:14",
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
                          "id": 2906,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3332,
                          "src": "10806:14:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3332_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 2909,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "10806:42:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3332",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 2910,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3331,
                      "src": "10806:51:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 2918,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "10806:170:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2919,
                  "nodeType": "ExpressionStatement",
                  "src": "10806:170:14"
                },
                {
                  "assignments": [
                    2921
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2921,
                      "name": "requiredFees",
                      "nodeType": "VariableDeclaration",
                      "scope": 2961,
                      "src": "11022:17:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2920,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "11022:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2931,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2928,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11091:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2929,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3626,
                        "src": "11091:15:14",
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
                            "id": 2925,
                            "name": "_fillQuantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2892,
                            "src": "11072:13:14",
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
                              "id": 2922,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2890,
                              "src": "11042:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 2923,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "relayerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3646,
                            "src": "11042:25:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2924,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6287,
                          "src": "11042:29:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2926,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "11042:44:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2927,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6301,
                      "src": "11042:48:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2930,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11042:65:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "11022:85:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2937,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11214:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2938,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3644,
                        "src": "11214:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2939,
                        "name": "requiredFees",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2921,
                        "src": "11247:12:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2940,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11273:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2941,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3634,
                        "src": "11273:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2942,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11306:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2943,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3642,
                        "src": "11306:21:14",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2933,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "11164:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2934,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3462,
                            "src": "11164:26:14",
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
                          "id": 2932,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3332,
                          "src": "11149:14:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3332_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 2935,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "11149:42:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3332",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 2936,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3331,
                      "src": "11149:51:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 2944,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11149:188:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2945,
                  "nodeType": "ExpressionStatement",
                  "src": "11149:188:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2951,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11412:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2952,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3644,
                        "src": "11412:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2953,
                        "name": "requiredFees",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2921,
                        "src": "11445:12:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2954,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "11471:3:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 2955,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "11471:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 2956,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2890,
                          "src": "11495:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2957,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3642,
                        "src": "11495:21:14",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 2947,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "11362:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 2948,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3462,
                            "src": "11362:26:14",
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
                          "id": 2946,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3332,
                          "src": "11347:14:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3332_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 2949,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "11347:42:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3332",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 2950,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3331,
                      "src": "11347:51:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 2958,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11347:179:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2959,
                  "nodeType": "ExpressionStatement",
                  "src": "11347:179:14"
                }
              ]
            },
            "documentation": null,
            "id": 2961,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "settleAccounts",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2897,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2890,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 2961,
                  "src": "10466:33:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2889,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3651,
                    "src": "10466:26:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3651_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2892,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 2961,
                  "src": "10509:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2891,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "10509:4:14",
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
                  "id": 2894,
                  "name": "_requiredMakerTokenAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 2961,
                  "src": "10537:30:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2893,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "10537:4:14",
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
                  "id": 2896,
                  "name": "_makerTokenUsed",
                  "nodeType": "VariableDeclaration",
                  "scope": 2961,
                  "src": "10577:20:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2895,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "10577:4:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "10456:147:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2898,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "10624:0:14"
            },
            "scope": 3144,
            "src": "10433:1100:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 3142,
              "nodeType": "Block",
              "src": "11683:2156:14",
              "statements": [
                {
                  "assignments": [
                    2971
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2971,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 3143,
                      "src": "11762:22:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2970,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "11762:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2984,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2978,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "11826:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2979,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3486,
                          "src": "11826:18:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2982,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2980,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2963,
                            "src": "11845:6:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2981,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3650,
                          "src": "11845:16:14",
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
                        "src": "11826:36:14",
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
                            "id": 2972,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3489,
                            "src": "11787:5:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3487_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 2973,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3482,
                          "src": "11787:16:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 2976,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 2974,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2963,
                            "src": "11804:6:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 2975,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3650,
                          "src": "11804:16:14",
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
                        "src": "11787:34:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2977,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6345,
                      "src": "11787:38:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2983,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11787:76:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "11762:101:14"
                },
                {
                  "assignments": [
                    2986
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2986,
                      "name": "openOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 3143,
                      "src": "11873:20:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2985,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "11873:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2992,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2990,
                        "name": "closedOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2971,
                        "src": "11916:17:14",
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
                          "id": 2987,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "11896:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 2988,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3626,
                        "src": "11896:15:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2989,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6321,
                      "src": "11896:19:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2991,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11896:38:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "11873:61:14"
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
                        "id": 2996,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 2994,
                          "name": "openOrderAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2986,
                          "src": "11965:15:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 2995,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2965,
                          "src": "11984:13:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "11965:32:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2997,
                        "name": "INVALID_FILL_AMOUNT",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2467,
                        "src": "12011:19:14",
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
                      "id": 2993,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "11944:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2998,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11944:96:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2999,
                  "nodeType": "ExpressionStatement",
                  "src": "11944:96:14"
                },
                {
                  "assignments": [
                    3003
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3003,
                      "name": "requiredBalances",
                      "nodeType": "VariableDeclaration",
                      "scope": 3143,
                      "src": "12051:30:14",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                        "typeString": "uint256[]"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 3001,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "12051:4:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 3002,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "12051:6:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3011,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 3007,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2963,
                            "src": "12095:6:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 3008,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "requiredComponents",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3629,
                          "src": "12095:25:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_memory",
                            "typeString": "address[] memory"
                          }
                        },
                        "id": 3009,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "12095:32:14",
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
                      "id": 3006,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "NewExpression",
                      "src": "12084:10:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
                        "typeString": "function (uint256) pure returns (uint256[] memory)"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 3004,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "12088:4:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 3005,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "12088:6:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      }
                    },
                    "id": 3010,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "12084:44:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_memory",
                      "typeString": "uint256[] memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "12051:77:14"
                },
                {
                  "assignments": [
                    3013
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3013,
                      "name": "requiredMakerTokenAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 3143,
                      "src": "12228:29:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3012,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "12228:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3023,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3020,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "12307:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 3021,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3626,
                        "src": "12307:15:14",
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
                            "id": 3017,
                            "name": "_fillQuantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2965,
                            "src": "12288:13:14",
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
                              "id": 3014,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2963,
                              "src": "12260:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 3015,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3638,
                            "src": "12260:23:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 3016,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6287,
                          "src": "12260:27:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 3018,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "12260:42:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 3019,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6301,
                      "src": "12260:46:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 3022,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "12260:63:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "12228:95:14"
                },
                {
                  "body": {
                    "id": 3074,
                    "nodeType": "Block",
                    "src": "12462:542:14",
                    "statements": [
                      {
                        "assignments": [
                          3037
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 3037,
                            "name": "tokenBalance",
                            "nodeType": "VariableDeclaration",
                            "scope": 3143,
                            "src": "12518:17:14",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 3036,
                              "name": "uint",
                              "nodeType": "ElementaryTypeName",
                              "src": "12518:4:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 3050,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 3043,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2963,
                                "src": "12598:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 3044,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "makerAddress",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3634,
                              "src": "12598:19:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 3045,
                                  "name": "_order",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2963,
                                  "src": "12635:6:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                    "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                  }
                                },
                                "id": 3046,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "requiredComponents",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 3629,
                                "src": "12635:25:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 3048,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 3047,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3025,
                                "src": "12661:1:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint16",
                                  "typeString": "uint16"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "12635:28:14",
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
                              },
                              {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 3039,
                                    "name": "state",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 3489,
                                    "src": "12545:5:14",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_State_$3487_storage",
                                      "typeString": "struct CoreState.State storage ref"
                                    }
                                  },
                                  "id": 3040,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "vaultAddress",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 3464,
                                  "src": "12545:18:14",
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
                                "id": 3038,
                                "name": "IVault",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3371,
                                "src": "12538:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_type$_t_contract$_IVault_$3371_$",
                                  "typeString": "type(contract IVault)"
                                }
                              },
                              "id": 3041,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "typeConversion",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "12538:26:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_IVault_$3371",
                                "typeString": "contract IVault"
                              }
                            },
                            "id": 3042,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "getOwnerBalance",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3370,
                            "src": "12538:42:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$returns$_t_uint256_$",
                              "typeString": "function (address,address) external returns (uint256)"
                            }
                          },
                          "id": 3049,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "12538:139:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "12518:159:14"
                      },
                      {
                        "assignments": [
                          3052
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 3052,
                            "name": "requiredAddition",
                            "nodeType": "VariableDeclaration",
                            "scope": 3143,
                            "src": "12755:21:14",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 3051,
                              "name": "uint",
                              "nodeType": "ElementaryTypeName",
                              "src": "12755:4:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 3064,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 3061,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2963,
                                "src": "12837:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 3062,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "quantity",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3626,
                              "src": "12837:15:14",
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
                                  "id": 3058,
                                  "name": "_fillQuantity",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2965,
                                  "src": "12818:13:14",
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
                                      "id": 3053,
                                      "name": "_order",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 2963,
                                      "src": "12779:6:14",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                        "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                      }
                                    },
                                    "id": 3054,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "requiredComponentAmounts",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3632,
                                    "src": "12779:31:14",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_uint256_$dyn_memory",
                                      "typeString": "uint256[] memory"
                                    }
                                  },
                                  "id": 3056,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 3055,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 3025,
                                    "src": "12811:1:14",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_uint16",
                                      "typeString": "uint16"
                                    }
                                  },
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "nodeType": "IndexAccess",
                                  "src": "12779:34:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 3057,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "mul",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 6287,
                                "src": "12779:38:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 3059,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "12779:53:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 3060,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "div",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6301,
                            "src": "12779:57:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 3063,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "12779:74:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "12755:98:14"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 3072,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 3065,
                              "name": "requiredBalances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3003,
                              "src": "12937:16:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                                "typeString": "uint256[] memory"
                              }
                            },
                            "id": 3067,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 3066,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3025,
                              "src": "12954:1:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint16",
                                "typeString": "uint16"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "nodeType": "IndexAccess",
                            "src": "12937:19:14",
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
                                "id": 3070,
                                "name": "requiredAddition",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3052,
                                "src": "12976:16:14",
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
                                "id": 3068,
                                "name": "tokenBalance",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3037,
                                "src": "12959:12:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 3069,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 6345,
                              "src": "12959:16:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 3071,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "12959:34:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "12937:56:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 3073,
                        "nodeType": "ExpressionStatement",
                        "src": "12937:56:14"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3032,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3028,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3025,
                      "src": "12419:1:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3029,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "12423:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 3030,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "requiredComponents",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3629,
                        "src": "12423:25:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 3031,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "12423:32:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "12419:36:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 3075,
                  "initializationExpression": {
                    "assignments": [
                      3025
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 3025,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 3143,
                        "src": "12405:8:14",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint16",
                          "typeString": "uint16"
                        },
                        "typeName": {
                          "id": 3024,
                          "name": "uint16",
                          "nodeType": "ElementaryTypeName",
                          "src": "12405:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint16",
                            "typeString": "uint16"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 3027,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 3026,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "12416:1:14",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "12405:12:14"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 3034,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "12457:3:14",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 3033,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3025,
                        "src": "12457:1:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint16",
                          "typeString": "uint16"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "id": 3035,
                    "nodeType": "ExpressionStatement",
                    "src": "12457:3:14"
                  },
                  "nodeType": "ForStatement",
                  "src": "12400:604:14"
                },
                {
                  "assignments": [
                    3077
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 3077,
                      "name": "makerTokenAmountUsed",
                      "nodeType": "VariableDeclaration",
                      "scope": 3143,
                      "src": "13049:25:14",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 3076,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "13049:4:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 3083,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3079,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2967,
                        "src": "13099:10:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3080,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "13111:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 3081,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3634,
                        "src": "13111:19:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 3078,
                      "name": "executeExchangeOrders",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2822,
                      "src": "13077:21:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_bytes_memory_ptr_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory,address) returns (uint256)"
                      }
                    },
                    "id": 3082,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13077:54:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "13049:82:14"
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
                        "id": 3087,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 3085,
                          "name": "makerTokenAmountUsed",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3077,
                          "src": "13149:20:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 3086,
                          "name": "requiredMakerTokenAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3013,
                          "src": "13173:24:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "13149:48:14",
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
                      "id": 3084,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6902,
                      "src": "13141:7:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 3088,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13141:57:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3089,
                  "nodeType": "ExpressionStatement",
                  "src": "13141:57:14"
                },
                {
                  "body": {
                    "id": 3117,
                    "nodeType": "Block",
                    "src": "13352:240:14",
                    "statements": [
                      {
                        "assignments": [
                          3103
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 3103,
                            "name": "currentBal",
                            "nodeType": "VariableDeclaration",
                            "scope": 3143,
                            "src": "13366:15:14",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 3102,
                              "name": "uint",
                              "nodeType": "ElementaryTypeName",
                              "src": "13366:4:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 3116,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 3109,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 2963,
                                "src": "13444:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 3110,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "makerAddress",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3634,
                              "src": "13444:19:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 3111,
                                  "name": "_order",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2963,
                                  "src": "13481:6:14",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                    "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                  }
                                },
                                "id": 3112,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "requiredComponents",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 3629,
                                "src": "13481:25:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 3114,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 3113,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3025,
                                "src": "13507:1:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint16",
                                  "typeString": "uint16"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "13481:28:14",
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
                              },
                              {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 3105,
                                    "name": "state",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 3489,
                                    "src": "13391:5:14",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_struct$_State_$3487_storage",
                                      "typeString": "struct CoreState.State storage ref"
                                    }
                                  },
                                  "id": 3106,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "memberName": "vaultAddress",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": 3464,
                                  "src": "13391:18:14",
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
                                "id": 3104,
                                "name": "IVault",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3371,
                                "src": "13384:6:14",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_type$_t_contract$_IVault_$3371_$",
                                  "typeString": "type(contract IVault)"
                                }
                              },
                              "id": 3107,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "typeConversion",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "13384:26:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_IVault_$3371",
                                "typeString": "contract IVault"
                              }
                            },
                            "id": 3108,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "getOwnerBalance",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3370,
                            "src": "13384:42:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$returns$_t_uint256_$",
                              "typeString": "function (address,address) external returns (uint256)"
                            }
                          },
                          "id": 3115,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "13384:139:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "13366:157:14"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 3098,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 3094,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3025,
                      "src": "13309:1:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3095,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "13313:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 3096,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "requiredComponents",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3629,
                        "src": "13313:25:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 3097,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "13313:32:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "13309:36:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 3118,
                  "initializationExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 3092,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "argumentTypes": null,
                        "id": 3090,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3025,
                        "src": "13302:1:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint16",
                          "typeString": "uint16"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "argumentTypes": null,
                        "hexValue": "30",
                        "id": 3091,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "number",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "13306:1:14",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        },
                        "value": "0"
                      },
                      "src": "13302:5:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "id": 3093,
                    "nodeType": "ExpressionStatement",
                    "src": "13302:5:14"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 3100,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "13347:3:14",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 3099,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3025,
                        "src": "13347:1:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint16",
                          "typeString": "uint16"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint16",
                        "typeString": "uint16"
                      }
                    },
                    "id": 3101,
                    "nodeType": "ExpressionStatement",
                    "src": "13347:3:14"
                  },
                  "nodeType": "ForStatement",
                  "src": "13297:295:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 3120,
                        "name": "_order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2963,
                        "src": "13617:6:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3121,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2965,
                        "src": "13625:13:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3122,
                        "name": "requiredMakerTokenAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3013,
                        "src": "13640:24:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 3123,
                        "name": "makerTokenAmountUsed",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3077,
                        "src": "13666:20:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
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
                      "id": 3119,
                      "name": "settleAccounts",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2961,
                      "src": "13602:14:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_struct$_IssuanceOrder_$3651_memory_ptr_$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256,uint256,uint256)"
                      }
                    },
                    "id": 3124,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13602:85:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 3125,
                  "nodeType": "ExpressionStatement",
                  "src": "13602:85:14"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 3140,
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
                          "id": 3126,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "13742:5:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 3130,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderFills",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3482,
                        "src": "13742:16:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 3131,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 3128,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2963,
                          "src": "13759:6:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 3129,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3650,
                        "src": "13759:16:14",
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
                      "src": "13742:34:14",
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
                          "id": 3138,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2965,
                          "src": "13818:13:14",
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
                              "id": 3132,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "13779:5:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 3133,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderFills",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3482,
                            "src": "13779:16:14",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 3136,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 3134,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2963,
                              "src": "13796:6:14",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 3135,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3650,
                            "src": "13796:16:14",
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
                          "src": "13779:34:14",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 3137,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6345,
                        "src": "13779:38:14",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 3139,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "13779:53:14",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "13742:90:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 3141,
                  "nodeType": "ExpressionStatement",
                  "src": "13742:90:14"
                }
              ]
            },
            "documentation": null,
            "id": 3143,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "settleOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2968,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2963,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 3143,
                  "src": "11569:33:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$3651_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 2962,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 3651,
                    "src": "11569:26:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$3651_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 2965,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 3143,
                  "src": "11612:18:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2964,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "11612:4:14",
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
                  "id": 2967,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 3143,
                  "src": "11640:16:14",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 2966,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "11640:5:14",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "11559:103:14"
            },
            "payable": false,
            "returnParameters": {
              "id": 2969,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "11683:0:14"
            },
            "scope": 3144,
            "src": "11539:2300:14",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 3145,
        "src": "1570:12271:14"
      }
    ],
    "src": "597:13245:14"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.393Z"
}
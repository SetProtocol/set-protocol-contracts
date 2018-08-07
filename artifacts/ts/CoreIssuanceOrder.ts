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
      "name": "transferProxy",
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
          "name": "transferProxy",
          "type": "address"
        },
        {
          "name": "vault",
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
      "name": "vault",
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "setAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "makerAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "takerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "makerToken",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "relayerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "relayerToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "quantityFilled",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "makerTokenToTaker",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "relayerTokenAmountPaid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "orderHash",
          "type": "bytes32"
        }
      ],
      "name": "LogFill",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "setAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "makerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "makerToken",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "relayerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "quantityCanceled",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "orderHash",
          "type": "bytes32"
        }
      ],
      "name": "LogCancel",
      "type": "event"
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\npragma experimental \"ABIEncoderV2\";\n\n\nimport { Math } from \"zeppelin-solidity/contracts/math/Math.sol\";\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ExchangeHandler } from \"../lib/ExchangeHandler.sol\";\nimport { ICoreAccounting } from \"../interfaces/ICoreAccounting.sol\";\nimport { ICoreIssuance } from \"../interfaces/ICoreIssuance.sol\";\nimport { IExchange } from \"../interfaces/IExchange.sol\";\nimport { ISetToken } from \"../interfaces/ISetToken.sol\";\nimport { ITransferProxy } from \"../interfaces/ITransferProxy.sol\";\nimport { IVault } from \"../interfaces/IVault.sol\";\nimport { LibBytes } from \"../../external/0x/LibBytes.sol\";\nimport { OrderLibrary } from \"../lib/OrderLibrary.sol\";\n\n\n/**\n * @title CoreIssuanceOrder\n * @author Set Protocol\n *\n * The Core Issuance Order extension houses all functions related to the filling and\n * canceling issuance orders.\n *\n */\ncontract CoreIssuanceOrder is\n    ICoreIssuance,\n    ICoreAccounting,\n    CoreState\n{\n    using SafeMath for uint256;\n    using Math for uint256;\n\n    /* ============ Constants ============ */\n\n    uint256 constant EXCHANGE_HEADER_LENGTH = 160;\n\n    /* ============ Events ============ */\n\n    event LogFill(\n        address setAddress,\n        address indexed makerAddress,\n        address indexed takerAddress,\n        address makerToken,\n        address indexed relayerAddress,\n        address relayerToken,\n        uint256 quantityFilled,\n        uint256 makerTokenToTaker,\n        uint256 relayerTokenAmountPaid,\n        bytes32 orderHash\n    );\n\n    event LogCancel(\n        address setAddress,\n        address indexed makerAddress,\n        address makerToken,\n        address indexed relayerAddress,\n        uint256 quantityCanceled,\n        bytes32 orderHash\n    );\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Fill an issuance order\n     *\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _requiredComponents        Components required for the issuance order\n     * @param  _requiredComponentAmounts  Component amounts required for the issuance order\n     * @param  _fillQuantity              Quantity of set to be filled\n     * @param  _v                         v element of ECDSA signature\n     * @param  sigBytes                   Array with r and s segments of ECDSA signature\n     * @param _orderData                  Bytes array containing the exchange orders to execute\n     */\n    function fillOrder(\n        address[5] _addresses,\n        uint[5] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts,\n        uint _fillQuantity,\n        uint8 _v,\n        bytes32[] sigBytes,\n        bytes _orderData\n    )\n        external\n    {\n        // Create IssuanceOrder struct\n        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({\n            setAddress: _addresses[0],\n            makerAddress: _addresses[1],\n            makerToken: _addresses[2],\n            relayerAddress: _addresses[3],\n            relayerToken: _addresses[4],\n            quantity: _values[0],\n            makerTokenAmount: _values[1],\n            expiration: _values[2],\n            relayerTokenAmount: _values[3],\n            salt: _values[4],\n            requiredComponents: _requiredComponents,\n            requiredComponentAmounts: _requiredComponentAmounts,\n            orderHash: OrderLibrary.generateOrderHash(\n                _addresses,\n                _values,\n                _requiredComponents,\n                _requiredComponentAmounts\n            )\n        });\n\n        // Verify signature is authentic\n        require(\n            OrderLibrary.validateSignature(\n                order.orderHash,\n                order.makerAddress,\n                _v,\n                sigBytes[0], // r\n                sigBytes[1] // s\n            )\n        );\n\n        // Verify order is valid and return amount to be filled\n        validateOrder(\n            order,\n            _fillQuantity\n        );\n\n        // Settle Order\n        settleOrder(\n            order,\n            _fillQuantity,\n            _orderData\n        );\n\n        // // Issue Set\n        // issueInternal(\n        //     order.makerAddress,\n        //     order.setAddress,\n        //     _fillQuantity\n        // );\n    }\n\n    /**\n     * Cancel an issuance order\n     *\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _requiredComponents        Components required for the issuance order\n     * @param  _requiredComponentAmounts  Component amounts required for the issuance order\n     * @param  _cancelQuantity            Quantity of set to be canceled\n     */\n    function cancelOrder(\n        address[5] _addresses,\n        uint[5] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts,\n        uint _cancelQuantity\n    )\n        external\n    {\n        // Check that quantity submitted is greater than 0\n        require(_cancelQuantity > 0);\n\n        // Create IssuanceOrder struct\n        OrderLibrary.IssuanceOrder memory order = OrderLibrary.IssuanceOrder({\n            setAddress: _addresses[0],\n            makerAddress: _addresses[1],\n            makerToken: _addresses[2],\n            relayerAddress: _addresses[3],\n            relayerToken: _addresses[4],\n            quantity: _values[0],\n            makerTokenAmount: _values[1],\n            expiration: _values[2],\n            relayerTokenAmount: _values[3],\n            salt: _values[4],\n            requiredComponents: _requiredComponents,\n            requiredComponentAmounts: _requiredComponentAmounts,\n            orderHash: OrderLibrary.generateOrderHash(\n                _addresses,\n                _values,\n                _requiredComponents,\n                _requiredComponentAmounts\n            )\n        });\n\n        // Make sure cancel order comes from maker\n        require(order.makerAddress == msg.sender);\n\n        // Verify order is valid\n        validateOrder(\n            order,\n            _cancelQuantity\n        );\n\n        // Determine amount to cancel\n        uint closedOrderAmount = state.orderFills[order.orderHash].add(state.orderCancels[order.orderHash]);\n        uint openOrderAmount = order.quantity.sub(closedOrderAmount);\n        uint canceledAmount = openOrderAmount.min256(_cancelQuantity);\n\n        // Tally cancel in orderCancels mapping\n        state.orderCancels[order.orderHash] = state.orderCancels[order.orderHash].add(canceledAmount);\n\n        // Emit cancel order event\n        emit LogCancel(\n            order.setAddress,\n            order.makerAddress,\n            order.makerToken,\n            order.relayerAddress,\n            canceledAmount,\n            order.orderHash\n        );\n\n    }\n\n    /* ============ Private Functions ============ */\n\n    /**\n     * Execute the exchange orders by parsing the order data and facilitating the transfers. Each\n     * header represents a batch of orders for a particular exchange (0x, KNC, taker). Additional\n     * information such as makerToken is encoded so it can be used to facilitate exchange orders\n     *\n     * @param _orderData        Bytes array containing the exchange orders to execute\n     * @param _makerAddress     Issuance order maker address\n     * @return makerTokenUsed   Amount of maker token used to execute orders\n     */\n    function executeExchangeOrders(\n        bytes _orderData,\n        address _makerAddress\n    )\n        private\n        returns (uint256)\n    {\n        uint256 scannedBytes;\n        uint256 makerTokenUsed = 0;\n        while (scannedBytes < _orderData.length) {\n            // Read and parse the next exchange order header\n            bytes memory headerData = LibBytes.slice(\n                _orderData,\n                scannedBytes,\n                scannedBytes.add(EXCHANGE_HEADER_LENGTH)\n            );\n            ExchangeHandler.ExchangeHeader memory header = ExchangeHandler.parseExchangeHeader(\n                headerData\n            );\n\n            // // Get exchange address from state mapping based on header exchange info\n            // address exchange = state.exchanges[header.exchange];\n\n            // // Verify exchange address is registered\n            // require(exchange != address(0));\n\n            // Read the order body based on header order length info\n            uint256 exchangeDataLength = header.totalOrdersLength.add(EXCHANGE_HEADER_LENGTH);\n            bytes memory bodyData = LibBytes.slice(\n                _orderData,\n                scannedBytes.add(EXCHANGE_HEADER_LENGTH),\n                scannedBytes.add(exchangeDataLength)\n            );\n\n            // // Transfer header.makerTokenAmount to Exchange Wrapper\n            // ITransferProxy(state.transferProxy).transfer(\n            //     header.makerTokenAddress,\n            //     header.makerTokenAmount,\n            //     _makerAddress,\n            //     exchange\n            // );\n\n            // // Call Exchange\n            // address[] memory componentFillTokens = new address[](header.orderCount);\n            // uint[] memory componentFillAmounts = new uint[](header.orderCount);\n            // (componentFillTokens, componentFillAmounts) = IExchange(exchange).exchange(\n            //     msg.sender,\n            //     header.orderCount,\n            //     bodyData\n            // );\n\n            // // Transfer component tokens from wrapper to vault\n            // batchDepositInternal(\n            //     exchange,\n            //     _makerAddress,\n            //     componentFillTokens,\n            //     componentFillAmounts\n            // );\n\n            // Update scanned bytes with header and body lengths\n            scannedBytes = scannedBytes.add(exchangeDataLength);\n            makerTokenUsed += header.makerTokenAmount;\n            // scannedBytes = scannedBytes.add(EXCHANGE_HEADER_LENGTH);\n        }\n\n        return makerTokenUsed;\n    }\n\n    /**\n     * Validate order params are still valid\n     *\n     * @param  _order              IssuanceOrder object containing order params\n     * @param  _executeQuantity    Quantity of Set to be filled\n     */\n    function validateOrder(\n        OrderLibrary.IssuanceOrder _order,\n        uint _executeQuantity\n    )\n        private\n        view\n    {\n        //Declare set interface variable\n        ISetToken set = ISetToken(_order.setAddress);\n\n        // Verify Set was created by Core and is enabled\n        require(state.validSets[_order.setAddress]);\n\n        // Make sure makerTokenAmount and Set Token to issue is greater than 0.\n        require(_order.makerTokenAmount > 0 && _order.quantity > 0);\n\n        // Make sure the order hasn't expired\n        require(block.timestamp <= _order.expiration);\n\n        // Make sure IssuanceOrder quantity is multiple of natural unit\n        require(_order.quantity % set.naturalUnit() == 0);\n\n        // Make sure fill or cancel quantity is multiple of natural unit\n        require(_executeQuantity % set.naturalUnit() == 0);\n    }\n\n    /**\n     * Calculate and send tokens to taker and relayer\n     *\n     * @param  _order                          IssuanceOrder object containing order params\n     * @param  _fillQuantity                   Quantity of Set to be filled\n     * @param  _requiredMakerTokenAmount       Max amount of maker token available to fill orders\n     * @param  _makerTokenUsed                 Amount of maker token used to fill order\n     */\n    function settleAccounts(\n        OrderLibrary.IssuanceOrder _order,\n        uint _fillQuantity,\n        uint _requiredMakerTokenAmount,\n        uint _makerTokenUsed\n    )\n        private\n    {\n        //Declare transferProxy interface variable\n        ITransferProxy transferProxy = ITransferProxy(state.transferProxy);\n\n        // Send left over maker token balance to taker\n        transferProxy.transfer(\n            _order.makerToken,\n            _requiredMakerTokenAmount.sub(_makerTokenUsed), // Required less used is amount sent to taker\n            _order.makerAddress,\n            msg.sender\n        );\n\n        // Calculate fees required\n        uint requiredFees = OrderLibrary.getPartialAmount(\n            _order.relayerTokenAmount,\n            _fillQuantity,\n            _order.quantity\n        );\n\n        //Send fees to relayer\n        transferProxy.transfer(\n            _order.relayerToken,\n            requiredFees,\n            _order.makerAddress,\n            _order.relayerAddress\n        );\n        transferProxy.transfer(\n            _order.relayerToken,\n            requiredFees,\n            msg.sender,\n            _order.relayerAddress\n        );\n\n        // Emit fill order event\n        emit LogFill(\n            _order.setAddress,\n            _order.makerAddress,\n            msg.sender,\n            _order.makerToken,\n            _order.relayerAddress,\n            _order.relayerToken,\n            _fillQuantity,\n            _requiredMakerTokenAmount.sub(_makerTokenUsed), // Required less used amount is sent to taker\n            requiredFees.mul(2),\n            _order.orderHash\n        );\n    }\n\n    /**\n     * Check exchange orders acquire correct amount of tokens. Settle accounts for taker\n     * and relayer.\n     *\n     * @param  _order               IssuanceOrder object containing order params\n     * @param  _fillQuantity        Quantity of Set to be filled\n     * @param  _orderData           Bytestring encoding all exchange order data\n     */\n    function settleOrder(\n        OrderLibrary.IssuanceOrder _order,\n        uint _fillQuantity,\n        bytes _orderData\n    )\n        private\n    {\n        // Declare IVault interface as variable\n        IVault vault = IVault(state.vault);\n\n        // Check to make sure open order amount equals _fillQuantity\n        uint closedOrderAmount = state.orderFills[_order.orderHash].add(state.orderCancels[_order.orderHash]);\n\n        // Open order amount is greater than or equal to closed order amount\n        require(_order.quantity.sub(closedOrderAmount) >= _fillQuantity);\n\n        uint[] memory requiredBalances = new uint[](_order.requiredComponents.length);\n\n        // Calculate amount of maker token required\n        uint requiredMakerTokenAmount = OrderLibrary.getPartialAmount(\n            _order.makerTokenAmount,\n            _fillQuantity,\n            _order.quantity\n        );\n\n        // Calculate amount of component tokens required to issue\n        for (uint16 i = 0; i < _order.requiredComponents.length; i++) {\n            // Get current vault balances\n            uint tokenBalance = vault.getOwnerBalance(\n                _order.makerAddress,\n                _order.requiredComponents[i]\n            );\n\n            // Amount of component tokens to be added to Vault\n            uint requiredAddition = OrderLibrary.getPartialAmount(\n                _order.requiredComponentAmounts[i],\n                _fillQuantity,\n                _order.quantity\n            );\n\n            // Required vault balances after exchange order executed\n            requiredBalances[i] = tokenBalance.add(requiredAddition);\n        }\n\n        // Execute exchange orders\n        uint makerTokenAmountUsed = executeExchangeOrders(\n            _orderData,\n            _order.makerAddress\n        );\n\n        // // Check that maker's component tokens in Vault have been incremented correctly\n        // for (i = 0; i < _order.requiredComponents.length; i++) {\n        //     uint currentBal = vault.getOwnerBalance(\n        //         _order.makerAddress,\n        //         _order.requiredComponents[i]\n        //     );\n        //     require(currentBal >= requiredBalances[i]);\n        // }\n\n        // // Settle relayer and taker accounts\n        // settleAccounts(\n        //     _order,\n        //     _fillQuantity,\n        //     requiredMakerTokenAmount,\n        //     makerTokenAmountUsed\n        // );\n\n        // Tally fill in orderFills mapping\n        state.orderFills[_order.orderHash] = state.orderFills[_order.orderHash].add(_fillQuantity);\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
    "exportedSymbols": {
      "CoreIssuanceOrder": [
        1796
      ]
    },
    "id": 1797,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1094,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:6"
      },
      {
        "id": 1095,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:6"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
        "file": "zeppelin-solidity/contracts/math/Math.sol",
        "id": 1097,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2544,
        "src": "659:65:6",
        "symbolAliases": [
          {
            "foreign": 1096,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1099,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2638,
        "src": "725:73:6",
        "symbolAliases": [
          {
            "foreign": 1098,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1101,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2094,
        "src": "799:49:6",
        "symbolAliases": [
          {
            "foreign": 1100,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
        "file": "../lib/ExchangeHandler.sol",
        "id": 1103,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2123,
        "src": "849:61:6",
        "symbolAliases": [
          {
            "foreign": 1102,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreAccounting.sol",
        "file": "../interfaces/ICoreAccounting.sol",
        "id": 1105,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1813,
        "src": "911:68:6",
        "symbolAliases": [
          {
            "foreign": 1104,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
        "file": "../interfaces/ICoreIssuance.sol",
        "id": 1107,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1825,
        "src": "980:64:6",
        "symbolAliases": [
          {
            "foreign": 1106,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchange.sol",
        "file": "../interfaces/IExchange.sol",
        "id": 1109,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1843,
        "src": "1045:56:6",
        "symbolAliases": [
          {
            "foreign": 1108,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 1111,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1902,
        "src": "1102:56:6",
        "symbolAliases": [
          {
            "foreign": 1110,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 1113,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1916,
        "src": "1159:66:6",
        "symbolAliases": [
          {
            "foreign": 1112,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 1115,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1955,
        "src": "1226:50:6",
        "symbolAliases": [
          {
            "foreign": 1114,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 1117,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2473,
        "src": "1277:58:6",
        "symbolAliases": [
          {
            "foreign": 1116,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../lib/OrderLibrary.sol",
        "id": 1119,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2324,
        "src": "1336:55:6",
        "symbolAliases": [
          {
            "foreign": 1118,
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
              "id": 1120,
              "name": "ICoreIssuance",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1824,
              "src": "1609:13:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICoreIssuance_$1824",
                "typeString": "contract ICoreIssuance"
              }
            },
            "id": 1121,
            "nodeType": "InheritanceSpecifier",
            "src": "1609:13:6"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1122,
              "name": "ICoreAccounting",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1812,
              "src": "1628:15:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICoreAccounting_$1812",
                "typeString": "contract ICoreAccounting"
              }
            },
            "id": 1123,
            "nodeType": "InheritanceSpecifier",
            "src": "1628:15:6"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1124,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2093,
              "src": "1649:9:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2093",
                "typeString": "contract CoreState"
              }
            },
            "id": 1125,
            "nodeType": "InheritanceSpecifier",
            "src": "1649:9:6"
          }
        ],
        "contractDependencies": [
          1812,
          1824,
          2093
        ],
        "contractKind": "contract",
        "documentation": "@title CoreIssuanceOrder\n@author Set Protocol\n * The Core Issuance Order extension houses all functions related to the filling and\ncanceling issuance orders.\n ",
        "fullyImplemented": false,
        "id": 1796,
        "linearizedBaseContracts": [
          1796,
          2093,
          1812,
          1824
        ],
        "name": "CoreIssuanceOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1128,
            "libraryName": {
              "contractScope": null,
              "id": 1126,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2637,
              "src": "1671:8:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$2637",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1665:27:6",
            "typeName": {
              "id": 1127,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1684:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 1131,
            "libraryName": {
              "contractScope": null,
              "id": 1129,
              "name": "Math",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2543,
              "src": "1703:4:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Math_$2543",
                "typeString": "library Math"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1697:23:6",
            "typeName": {
              "id": 1130,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1712:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1134,
            "name": "EXCHANGE_HEADER_LENGTH",
            "nodeType": "VariableDeclaration",
            "scope": 1796,
            "src": "1773:45:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 1132,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1773:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "313630",
              "id": 1133,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1815:3:6",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_160_by_1",
                "typeString": "int_const 160"
              },
              "value": "160"
            },
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1156,
            "name": "LogFill",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1155,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1136,
                  "indexed": false,
                  "name": "setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "1892:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1135,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1892:7:6",
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
                  "id": 1138,
                  "indexed": true,
                  "name": "makerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "1920:28:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1137,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1920:7:6",
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
                  "id": 1140,
                  "indexed": true,
                  "name": "takerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "1958:28:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1139,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1958:7:6",
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
                  "id": 1142,
                  "indexed": false,
                  "name": "makerToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "1996:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1141,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1996:7:6",
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
                  "id": 1144,
                  "indexed": true,
                  "name": "relayerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2024:30:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1143,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2024:7:6",
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
                  "id": 1146,
                  "indexed": false,
                  "name": "relayerToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2064:20:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1145,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2064:7:6",
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
                  "id": 1148,
                  "indexed": false,
                  "name": "quantityFilled",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2094:22:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1147,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2094:7:6",
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
                  "id": 1150,
                  "indexed": false,
                  "name": "makerTokenToTaker",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2126:25:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1149,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2126:7:6",
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
                  "id": 1152,
                  "indexed": false,
                  "name": "relayerTokenAmountPaid",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2161:30:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1151,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2161:7:6",
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
                  "id": 1154,
                  "indexed": false,
                  "name": "orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2201:17:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 1153,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2201:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1882:342:6"
            },
            "src": "1869:356:6"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1170,
            "name": "LogCancel",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1169,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1158,
                  "indexed": false,
                  "name": "setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2256:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1157,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2256:7:6",
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
                  "id": 1160,
                  "indexed": true,
                  "name": "makerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2284:28:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1159,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2284:7:6",
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
                  "id": 1162,
                  "indexed": false,
                  "name": "makerToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2322:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1161,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2322:7:6",
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
                  "id": 1164,
                  "indexed": true,
                  "name": "relayerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2350:30:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1163,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2350:7:6",
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
                  "id": 1166,
                  "indexed": false,
                  "name": "quantityCanceled",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2390:24:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1165,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2390:7:6",
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
                  "id": 1168,
                  "indexed": false,
                  "name": "orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2424:17:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 1167,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2424:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2246:201:6"
            },
            "src": "2231:217:6"
          },
          {
            "body": {
              "id": 1271,
              "nodeType": "Block",
              "src": "3570:1561:6",
              "statements": [
                {
                  "assignments": [
                    1199
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1199,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1272,
                      "src": "3619:39:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1198,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2161,
                        "src": "3619:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1242,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1202,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1174,
                          "src": "3714:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1204,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1203,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3725:1:6",
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
                        "src": "3714:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1205,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1174,
                          "src": "3755:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1207,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1206,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3766:1:6",
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
                        "src": "3755:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1208,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1174,
                          "src": "3794:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1210,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1209,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3805:1:6",
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
                        "src": "3794:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1211,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1174,
                          "src": "3837:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1213,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1212,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3848:1:6",
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
                        "src": "3837:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1214,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1174,
                          "src": "3878:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1216,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1215,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3889:1:6",
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
                        "src": "3878:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1217,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1178,
                          "src": "3915:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1219,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1218,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3923:1:6",
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
                        "src": "3915:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1220,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1178,
                          "src": "3957:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1222,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1221,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3965:1:6",
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
                        "src": "3957:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1223,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1178,
                          "src": "3993:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1225,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1224,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4001:1:6",
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
                        "src": "3993:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1226,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1178,
                          "src": "4037:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1228,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1227,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4045:1:6",
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
                        "src": "4037:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1229,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1178,
                          "src": "4067:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1231,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1230,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4075:1:6",
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
                        "src": "4067:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1232,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1181,
                        "src": "4111:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1233,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1184,
                        "src": "4170:25:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1236,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1174,
                            "src": "4268:10:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1237,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1178,
                            "src": "4296:7:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1238,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1181,
                            "src": "4321:19:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1239,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1184,
                            "src": "4358:25:6",
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
                            "id": 1234,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2323,
                            "src": "4220:12:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1235,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2219,
                          "src": "4220:30:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 1240,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4220:177:6",
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
                        "id": 1200,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2323,
                        "src": "3661:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1201,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2161,
                      "src": "3661:26:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$2161_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 1241,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "makerAddress",
                      "makerToken",
                      "relayerAddress",
                      "relayerToken",
                      "quantity",
                      "makerTokenAmount",
                      "expiration",
                      "relayerTokenAmount",
                      "salt",
                      "requiredComponents",
                      "requiredComponentAmounts",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "3661:747:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3619:789:6"
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
                              "id": 1246,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1199,
                              "src": "4529:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1247,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2160,
                            "src": "4529:15:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1248,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1199,
                              "src": "4562:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1249,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2136,
                            "src": "4562:18:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1250,
                            "name": "_v",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1188,
                            "src": "4598:2:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 1251,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1191,
                              "src": "4618:8:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 1253,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 1252,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4627:1:6",
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
                            "src": "4618:11:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 1254,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1191,
                              "src": "4652:8:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 1256,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 1255,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4661:1:6",
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
                            "src": "4652:11:6",
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
                            "id": 1244,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2323,
                            "src": "4481:12:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1245,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validateSignature",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2261,
                          "src": "4481:30:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_delegatecall_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                            "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                          }
                        },
                        "id": 1257,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4481:201:6",
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
                      "id": 1243,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "4460:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1258,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4460:232:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1259,
                  "nodeType": "ExpressionStatement",
                  "src": "4460:232:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1261,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1199,
                        "src": "4794:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1262,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1186,
                        "src": "4813:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1260,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1563,
                      "src": "4767:13:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$2161_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 1263,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4767:69:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1264,
                  "nodeType": "ExpressionStatement",
                  "src": "4767:69:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1266,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1199,
                        "src": "4896:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1267,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1186,
                        "src": "4915:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1268,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1193,
                        "src": "4942:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
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
                      "id": 1265,
                      "name": "settleOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1795,
                      "src": "4871:11:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_struct$_IssuanceOrder_$2161_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256,bytes memory)"
                      }
                    },
                    "id": 1269,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4871:91:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1270,
                  "nodeType": "ExpressionStatement",
                  "src": "4871:91:6"
                }
              ]
            },
            "documentation": "Fill an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _fillQuantity              Quantity of set to be filled\n@param  _v                         v element of ECDSA signature\n@param  sigBytes                   Array with r and s segments of ECDSA signature\n@param _orderData                  Bytes array containing the exchange orders to execute",
            "id": 1272,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1194,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1174,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3315:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1171,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3315:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1173,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1172,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3323:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3315:10:6",
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
                  "id": 1178,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3346:15:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1175,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3346:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1177,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1176,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3351:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3346:7:6",
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
                  "id": 1181,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3371:29:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1179,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3371:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1180,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3371:9:6",
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
                  "id": 1184,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3410:32:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1182,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3410:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1183,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3410:6:6",
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
                  "id": 1186,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3452:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1185,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3452:4:6",
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
                  "id": 1188,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3480:8:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 1187,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "3480:5:6",
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
                  "id": 1191,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3498:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1189,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "3498:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 1190,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3498:9:6",
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
                  "id": 1193,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3526:16:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1192,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3526:5:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3305:243:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1195,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3570:0:6"
            },
            "scope": 1796,
            "src": "3287:1844:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1417,
              "nodeType": "Block",
              "src": "5877:1856:6",
              "statements": [
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
                        "id": 1294,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 1292,
                          "name": "_cancelQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1288,
                          "src": "5954:15:6",
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
                          "id": 1293,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5972:1:6",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "5954:19:6",
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
                      "id": 1291,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "5946:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1295,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5946:28:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1296,
                  "nodeType": "ExpressionStatement",
                  "src": "5946:28:6"
                },
                {
                  "assignments": [
                    1300
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1300,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1418,
                      "src": "6024:39:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1299,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2161,
                        "src": "6024:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1343,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1303,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1276,
                          "src": "6119:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1305,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1304,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6130:1:6",
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
                        "src": "6119:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1306,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1276,
                          "src": "6160:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1308,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1307,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6171:1:6",
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
                        "src": "6160:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1309,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1276,
                          "src": "6199:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1311,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1310,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6210:1:6",
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
                        "src": "6199:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1312,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1276,
                          "src": "6242:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1314,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1313,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6253:1:6",
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
                        "src": "6242:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1315,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1276,
                          "src": "6283:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1317,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1316,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6294:1:6",
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
                        "src": "6283:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1318,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1280,
                          "src": "6320:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1320,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1319,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6328:1:6",
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
                        "src": "6320:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1321,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1280,
                          "src": "6362:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1323,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1322,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6370:1:6",
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
                        "src": "6362:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1324,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1280,
                          "src": "6398:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1326,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1325,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6406:1:6",
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
                        "src": "6398:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1327,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1280,
                          "src": "6442:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1329,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1328,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6450:1:6",
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
                        "src": "6442:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1330,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1280,
                          "src": "6472:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1332,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1331,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6480:1:6",
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
                        "src": "6472:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1333,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1283,
                        "src": "6516:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1334,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1286,
                        "src": "6575:25:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1337,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1276,
                            "src": "6673:10:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1338,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1280,
                            "src": "6701:7:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1339,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1283,
                            "src": "6726:19:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1340,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1286,
                            "src": "6763:25:6",
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
                            "id": 1335,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2323,
                            "src": "6625:12:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1336,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2219,
                          "src": "6625:30:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 1341,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6625:177:6",
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
                        "id": 1301,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2323,
                        "src": "6066:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1302,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2161,
                      "src": "6066:26:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$2161_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 1342,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "makerAddress",
                      "makerToken",
                      "relayerAddress",
                      "relayerToken",
                      "quantity",
                      "makerTokenAmount",
                      "expiration",
                      "relayerTokenAmount",
                      "salt",
                      "requiredComponents",
                      "requiredComponentAmounts",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "6066:747:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6024:789:6"
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
                        "id": 1349,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1345,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1300,
                            "src": "6883:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1346,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "makerAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2136,
                          "src": "6883:18:6",
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
                            "id": 1347,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2738,
                            "src": "6905:3:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 1348,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "6905:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "6883:32:6",
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
                      "id": 1344,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "6875:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1350,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6875:41:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1351,
                  "nodeType": "ExpressionStatement",
                  "src": "6875:41:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1353,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1300,
                        "src": "6987:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1354,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1288,
                        "src": "7006:15:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1352,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1563,
                      "src": "6960:13:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$2161_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 1355,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6960:71:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1356,
                  "nodeType": "ExpressionStatement",
                  "src": "6960:71:6"
                },
                {
                  "assignments": [
                    1358
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1358,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1418,
                      "src": "7080:22:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1357,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "7080:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1371,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1365,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "7143:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1366,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1986,
                          "src": "7143:18:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 1369,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1367,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1300,
                            "src": "7162:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1368,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2160,
                          "src": "7162:15:6",
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
                        "src": "7143:35:6",
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
                            "id": 1359,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "7105:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1360,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1982,
                          "src": "7105:16:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 1363,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1361,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1300,
                            "src": "7122:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1362,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2160,
                          "src": "7122:15:6",
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
                        "src": "7105:33:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1364,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2636,
                      "src": "7105:37:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1370,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7105:74:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7080:99:6"
                },
                {
                  "assignments": [
                    1373
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1373,
                      "name": "openOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1418,
                      "src": "7189:20:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1372,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "7189:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1379,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1377,
                        "name": "closedOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1358,
                        "src": "7231:17:6",
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
                          "id": 1374,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7212:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1375,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2144,
                        "src": "7212:14:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1376,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2612,
                      "src": "7212:18:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1378,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7212:37:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7189:60:6"
                },
                {
                  "assignments": [
                    1381
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1381,
                      "name": "canceledAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1418,
                      "src": "7259:19:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1380,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "7259:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1386,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1384,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1288,
                        "src": "7304:15:6",
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
                        "id": 1382,
                        "name": "openOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1373,
                        "src": "7281:15:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1383,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "min256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2542,
                      "src": "7281:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1385,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7281:39:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7259:61:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1401,
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
                          "id": 1387,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "7379:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1391,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderCancels",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1986,
                        "src": "7379:18:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 1392,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1389,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7398:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1390,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2160,
                        "src": "7398:15:6",
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
                      "src": "7379:35:6",
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
                          "id": 1399,
                          "name": "canceledAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1381,
                          "src": "7457:14:6",
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
                              "id": 1393,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1989,
                              "src": "7417:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$1987_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1394,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderCancels",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 1986,
                            "src": "7417:18:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 1397,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1395,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1300,
                              "src": "7436:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1396,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2160,
                            "src": "7436:15:6",
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
                          "src": "7417:35:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1398,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2636,
                        "src": "7417:39:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 1400,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7417:55:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "7379:93:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1402,
                  "nodeType": "ExpressionStatement",
                  "src": "7379:93:6"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1404,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7546:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1405,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2134,
                        "src": "7546:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1406,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7576:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1407,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2136,
                        "src": "7576:18:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1408,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7608:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1409,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2138,
                        "src": "7608:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1410,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7638:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1411,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2140,
                        "src": "7638:20:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1412,
                        "name": "canceledAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1381,
                        "src": "7672:14:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1413,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7700:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1414,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2160,
                        "src": "7700:15:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
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
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 1403,
                      "name": "LogCancel",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1170,
                      "src": "7523:9:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_address_$_t_address_$_t_uint256_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,address,address,uint256,bytes32)"
                      }
                    },
                    "id": 1415,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7523:202:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1416,
                  "nodeType": "EmitStatement",
                  "src": "7518:207:6"
                }
              ]
            },
            "documentation": "Cancel an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _cancelQuantity            Quantity of set to be canceled",
            "id": 1418,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1289,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1276,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1418,
                  "src": "5692:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1273,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5692:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1275,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1274,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5700:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5692:10:6",
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
                  "id": 1280,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 1418,
                  "src": "5723:15:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1277,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5723:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1279,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1278,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5728:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5723:7:6",
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
                  "id": 1283,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 1418,
                  "src": "5748:29:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1281,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5748:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1282,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5748:9:6",
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
                  "id": 1286,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 1418,
                  "src": "5787:32:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1284,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5787:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1285,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5787:6:6",
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
                  "id": 1288,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1418,
                  "src": "5829:20:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1287,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5829:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5682:173:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1290,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5877:0:6"
            },
            "scope": 1796,
            "src": "5662:2071:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1498,
              "nodeType": "Block",
              "src": "8474:2417:6",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1428,
                      "name": "scannedBytes",
                      "nodeType": "VariableDeclaration",
                      "scope": 1499,
                      "src": "8484:20:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1427,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "8484:7:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1429,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "8484:20:6"
                },
                {
                  "assignments": [
                    1431
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1431,
                      "name": "makerTokenUsed",
                      "nodeType": "VariableDeclaration",
                      "scope": 1499,
                      "src": "8514:22:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1430,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "8514:7:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1433,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 1432,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "8539:1:6",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "8514:26:6"
                },
                {
                  "body": {
                    "id": 1494,
                    "nodeType": "Block",
                    "src": "8591:2262:6",
                    "statements": [
                      {
                        "assignments": [
                          1439
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1439,
                            "name": "headerData",
                            "nodeType": "VariableDeclaration",
                            "scope": 1499,
                            "src": "8666:23:6",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 1438,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "8666:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1449,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1442,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1420,
                              "src": "8724:10:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1443,
                              "name": "scannedBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1428,
                              "src": "8752:12:6",
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
                                  "id": 1446,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1134,
                                  "src": "8799:22:6",
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
                                  "id": 1444,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1428,
                                  "src": "8782:12:6",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1445,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2636,
                                "src": "8782:16:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1447,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8782:40:6",
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
                              "id": 1440,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2472,
                              "src": "8692:8:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$2472_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 1441,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2471,
                            "src": "8692:14:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 1448,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8692:144:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8666:170:6"
                      },
                      {
                        "assignments": [
                          1453
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1453,
                            "name": "header",
                            "nodeType": "VariableDeclaration",
                            "scope": 1499,
                            "src": "8850:44:6",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                              "typeString": "struct ExchangeHandler.ExchangeHeader"
                            },
                            "typeName": {
                              "contractScope": null,
                              "id": 1452,
                              "name": "ExchangeHandler.ExchangeHeader",
                              "nodeType": "UserDefinedTypeName",
                              "referencedDeclaration": 2107,
                              "src": "8850:30:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$2107_storage_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1458,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1456,
                              "name": "headerData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1439,
                              "src": "8950:10:6",
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
                              "id": 1454,
                              "name": "ExchangeHandler",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2122,
                              "src": "8897:15:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_ExchangeHandler_$2122_$",
                                "typeString": "type(library ExchangeHandler)"
                              }
                            },
                            "id": 1455,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "parseExchangeHeader",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2121,
                            "src": "8897:35:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_ExchangeHeader_$2107_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (struct ExchangeHandler.ExchangeHeader memory)"
                            }
                          },
                          "id": 1457,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8897:77:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                            "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8850:124:6"
                      },
                      {
                        "assignments": [
                          1460
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1460,
                            "name": "exchangeDataLength",
                            "nodeType": "VariableDeclaration",
                            "scope": 1499,
                            "src": "9320:26:6",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 1459,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "9320:7:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1466,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1464,
                              "name": "EXCHANGE_HEADER_LENGTH",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1134,
                              "src": "9378:22:6",
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
                                "id": 1461,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1453,
                                "src": "9349:6:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                                  "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                                }
                              },
                              "id": 1462,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "totalOrdersLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2106,
                              "src": "9349:24:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1463,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2636,
                            "src": "9349:28:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1465,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "9349:52:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "9320:81:6"
                      },
                      {
                        "assignments": [
                          1468
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1468,
                            "name": "bodyData",
                            "nodeType": "VariableDeclaration",
                            "scope": 1499,
                            "src": "9415:21:6",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 1467,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "9415:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1481,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1471,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1420,
                              "src": "9471:10:6",
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
                                  "id": 1474,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1134,
                                  "src": "9516:22:6",
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
                                  "id": 1472,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1428,
                                  "src": "9499:12:6",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1473,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2636,
                                "src": "9499:16:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1475,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "9499:40:6",
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
                                  "id": 1478,
                                  "name": "exchangeDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1460,
                                  "src": "9574:18:6",
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
                                  "id": 1476,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1428,
                                  "src": "9557:12:6",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1477,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2636,
                                "src": "9557:16:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1479,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "9557:36:6",
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
                              "id": 1469,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2472,
                              "src": "9439:8:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$2472_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 1470,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2471,
                            "src": "9439:14:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 1480,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "9439:168:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "9415:192:6"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 1487,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 1482,
                            "name": "scannedBytes",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1428,
                            "src": "10664:12:6",
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
                                "id": 1485,
                                "name": "exchangeDataLength",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1460,
                                "src": "10696:18:6",
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
                                "id": 1483,
                                "name": "scannedBytes",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1428,
                                "src": "10679:12:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1484,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2636,
                              "src": "10679:16:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 1486,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "10679:36:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "10664:51:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1488,
                        "nodeType": "ExpressionStatement",
                        "src": "10664:51:6"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 1492,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 1489,
                            "name": "makerTokenUsed",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1431,
                            "src": "10729:14:6",
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
                              "id": 1490,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1453,
                              "src": "10747:6:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                              }
                            },
                            "id": 1491,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2104,
                            "src": "10747:23:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "10729:41:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1493,
                        "nodeType": "ExpressionStatement",
                        "src": "10729:41:6"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1437,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1434,
                      "name": "scannedBytes",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1428,
                      "src": "8557:12:6",
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
                        "id": 1435,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1420,
                        "src": "8572:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1436,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "8572:17:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "8557:32:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1495,
                  "nodeType": "WhileStatement",
                  "src": "8550:2303:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1496,
                    "name": "makerTokenUsed",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1431,
                    "src": "10870:14:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 1426,
                  "id": 1497,
                  "nodeType": "Return",
                  "src": "10863:21:6"
                }
              ]
            },
            "documentation": "Execute the exchange orders by parsing the order data and facilitating the transfers. Each\nheader represents a batch of orders for a particular exchange (0x, KNC, taker). Additional\ninformation such as makerToken is encoded so it can be used to facilitate exchange orders\n     * @param _orderData        Bytes array containing the exchange orders to execute\n@param _makerAddress     Issuance order maker address\n@return makerTokenUsed   Amount of maker token used to execute orders",
            "id": 1499,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeExchangeOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1423,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1420,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1499,
                  "src": "8374:16:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1419,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "8374:5:6",
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
                  "id": 1422,
                  "name": "_makerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1499,
                  "src": "8400:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1421,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "8400:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8364:63:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1426,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1425,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1499,
                  "src": "8461:7:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1424,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "8461:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8460:9:6"
            },
            "scope": 1796,
            "src": "8334:2557:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 1562,
              "nodeType": "Block",
              "src": "11245:731:6",
              "statements": [
                {
                  "assignments": [
                    1507
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1507,
                      "name": "set",
                      "nodeType": "VariableDeclaration",
                      "scope": 1563,
                      "src": "11296:13:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_ISetToken_$1901",
                        "typeString": "contract ISetToken"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1506,
                        "name": "ISetToken",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1901,
                        "src": "11296:9:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetToken_$1901",
                          "typeString": "contract ISetToken"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1512,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1509,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1501,
                          "src": "11322:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1510,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2134,
                        "src": "11322:17:6",
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
                      "id": 1508,
                      "name": "ISetToken",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1901,
                      "src": "11312:9:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_ISetToken_$1901_$",
                        "typeString": "type(contract ISetToken)"
                      }
                    },
                    "id": 1511,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11312:28:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_ISetToken_$1901",
                      "typeString": "contract ISetToken"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "11296:44:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1514,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "11416:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1515,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1975,
                          "src": "11416:15:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 1518,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1516,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1501,
                            "src": "11432:6:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1517,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "setAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2134,
                          "src": "11432:17:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "11416:34:6",
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
                      "id": 1513,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "11408:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1519,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11408:43:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1520,
                  "nodeType": "ExpressionStatement",
                  "src": "11408:43:6"
                },
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
                        "id": 1530,
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
                          "id": 1525,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1522,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1501,
                              "src": "11550:6:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1523,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2146,
                            "src": "11550:23:6",
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
                            "id": 1524,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "11576:1:6",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "11550:27:6",
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
                          "id": 1529,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1526,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1501,
                              "src": "11581:6:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1527,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2144,
                            "src": "11581:15:6",
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
                            "id": 1528,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "11599:1:6",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "11581:19:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "11550:50:6",
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
                      "id": 1521,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "11542:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1531,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11542:59:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1532,
                  "nodeType": "ExpressionStatement",
                  "src": "11542:59:6"
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
                        "id": 1538,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1534,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2728,
                            "src": "11666:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 1535,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "11666:15:6",
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
                            "id": 1536,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1501,
                            "src": "11685:6:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1537,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "expiration",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2148,
                          "src": "11685:17:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "11666:36:6",
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
                      "id": 1533,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "11658:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1539,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11658:45:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1540,
                  "nodeType": "ExpressionStatement",
                  "src": "11658:45:6"
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
                        "id": 1549,
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
                          "id": 1547,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1542,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1501,
                              "src": "11794:6:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1543,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2144,
                            "src": "11794:15:6",
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
                                "id": 1544,
                                "name": "set",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1507,
                                "src": "11812:3:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$1901",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 1545,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1874,
                              "src": "11812:15:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 1546,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "11812:17:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "11794:35:6",
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
                          "id": 1548,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "11833:1:6",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "11794:40:6",
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
                      "id": 1541,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "11786:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1550,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11786:49:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1551,
                  "nodeType": "ExpressionStatement",
                  "src": "11786:49:6"
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
                        "id": 1559,
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
                          "id": 1557,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 1553,
                            "name": "_executeQuantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1503,
                            "src": "11927:16:6",
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
                                "id": 1554,
                                "name": "set",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1507,
                                "src": "11946:3:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$1901",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 1555,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1874,
                              "src": "11946:15:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 1556,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "11946:17:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "11927:36:6",
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
                          "id": 1558,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "11967:1:6",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "11927:41:6",
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
                      "id": 1552,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "11919:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1560,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11919:50:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1561,
                  "nodeType": "ExpressionStatement",
                  "src": "11919:50:6"
                }
              ]
            },
            "documentation": "Validate order params are still valid\n     * @param  _order              IssuanceOrder object containing order params\n@param  _executeQuantity    Quantity of Set to be filled",
            "id": 1563,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1504,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1501,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 1563,
                  "src": "11141:33:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1500,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2161,
                    "src": "11141:26:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2161_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1503,
                  "name": "_executeQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1563,
                  "src": "11184:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1502,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "11184:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "11131:80:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1505,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "11245:0:6"
            },
            "scope": 1796,
            "src": "11109:867:6",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 1657,
              "nodeType": "Block",
              "src": "12604:1436:6",
              "statements": [
                {
                  "assignments": [
                    1575
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1575,
                      "name": "transferProxy",
                      "nodeType": "VariableDeclaration",
                      "scope": 1658,
                      "src": "12665:28:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                        "typeString": "contract ITransferProxy"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1574,
                        "name": "ITransferProxy",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1915,
                        "src": "12665:14:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1580,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1577,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "12711:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1578,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "transferProxy",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1962,
                        "src": "12711:19:6",
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
                      "id": 1576,
                      "name": "ITransferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1915,
                      "src": "12696:14:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$1915_$",
                        "typeString": "type(contract ITransferProxy)"
                      }
                    },
                    "id": 1579,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "12696:35:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                      "typeString": "contract ITransferProxy"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "12665:66:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1584,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "12833:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1585,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2138,
                        "src": "12833:17:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1588,
                            "name": "_makerTokenUsed",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1571,
                            "src": "12894:15:6",
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
                            "id": 1586,
                            "name": "_requiredMakerTokenAmount",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1569,
                            "src": "12864:25:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 1587,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sub",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2612,
                          "src": "12864:29:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 1589,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "12864:46:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1590,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "12970:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1591,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2136,
                        "src": "12970:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1592,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2738,
                          "src": "13003:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1593,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "13003:10:6",
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
                        "id": 1581,
                        "name": "transferProxy",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1575,
                        "src": "12797:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1583,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1914,
                      "src": "12797:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1594,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "12797:226:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1595,
                  "nodeType": "ExpressionStatement",
                  "src": "12797:226:6"
                },
                {
                  "assignments": [
                    1597
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1597,
                      "name": "requiredFees",
                      "nodeType": "VariableDeclaration",
                      "scope": 1658,
                      "src": "13069:17:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1596,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "13069:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1606,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1600,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13132:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1601,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerTokenAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2150,
                        "src": "13132:25:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1602,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1567,
                        "src": "13171:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1603,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13198:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1604,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2144,
                        "src": "13198:15:6",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1598,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2323,
                        "src": "13089:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1599,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "getPartialAmount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2322,
                      "src": "13089:29:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_nonpayable$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256,uint256,uint256) returns (uint256)"
                      }
                    },
                    "id": 1605,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13089:134:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "13069:154:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1610,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13301:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1611,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2142,
                        "src": "13301:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1612,
                        "name": "requiredFees",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1597,
                        "src": "13334:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1613,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13360:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1614,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2136,
                        "src": "13360:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1615,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13393:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1616,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2140,
                        "src": "13393:21:6",
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
                        "id": 1607,
                        "name": "transferProxy",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1575,
                        "src": "13265:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1609,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1914,
                      "src": "13265:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1617,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13265:159:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1618,
                  "nodeType": "ExpressionStatement",
                  "src": "13265:159:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1622,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13470:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1623,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2142,
                        "src": "13470:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1624,
                        "name": "requiredFees",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1597,
                        "src": "13503:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1625,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2738,
                          "src": "13529:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1626,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "13529:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1627,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13553:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1628,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2140,
                        "src": "13553:21:6",
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
                        "id": 1619,
                        "name": "transferProxy",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1575,
                        "src": "13434:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1621,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1914,
                      "src": "13434:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1629,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13434:150:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1630,
                  "nodeType": "ExpressionStatement",
                  "src": "13434:150:6"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1632,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13654:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1633,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2134,
                        "src": "13654:17:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1634,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13685:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1635,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2136,
                        "src": "13685:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1636,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2738,
                          "src": "13718:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1637,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "13718:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1638,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13742:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1639,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2138,
                        "src": "13742:17:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1640,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13773:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1641,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2140,
                        "src": "13773:21:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1642,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13808:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1643,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2142,
                        "src": "13808:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1644,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1567,
                        "src": "13841:13:6",
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
                            "id": 1647,
                            "name": "_makerTokenUsed",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1571,
                            "src": "13898:15:6",
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
                            "id": 1645,
                            "name": "_requiredMakerTokenAmount",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1569,
                            "src": "13868:25:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 1646,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sub",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2612,
                          "src": "13868:29:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 1648,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "13868:46:6",
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
                            "hexValue": "32",
                            "id": 1651,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "13991:1:6",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_2_by_1",
                              "typeString": "int_const 2"
                            },
                            "value": "2"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_2_by_1",
                              "typeString": "int_const 2"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1649,
                            "name": "requiredFees",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1597,
                            "src": "13974:12:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 1650,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2578,
                          "src": "13974:16:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 1652,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "13974:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1653,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "14007:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1654,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2160,
                        "src": "14007:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
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
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 1631,
                      "name": "LogFill",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1156,
                      "src": "13633:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_address_$_t_address_$_t_address_$_t_address_$_t_uint256_$_t_uint256_$_t_uint256_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,address,address,address,address,uint256,uint256,uint256,bytes32)"
                      }
                    },
                    "id": 1655,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13633:400:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1656,
                  "nodeType": "EmitStatement",
                  "src": "13628:405:6"
                }
              ]
            },
            "documentation": "Calculate and send tokens to taker and relayer\n     * @param  _order                          IssuanceOrder object containing order params\n@param  _fillQuantity                   Quantity of Set to be filled\n@param  _requiredMakerTokenAmount       Max amount of maker token available to fill orders\n@param  _makerTokenUsed                 Amount of maker token used to fill order",
            "id": 1658,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "settleAccounts",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1572,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1565,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 1658,
                  "src": "12446:33:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1564,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2161,
                    "src": "12446:26:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2161_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1567,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1658,
                  "src": "12489:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1566,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "12489:4:6",
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
                  "id": 1569,
                  "name": "_requiredMakerTokenAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 1658,
                  "src": "12517:30:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1568,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "12517:4:6",
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
                  "id": 1571,
                  "name": "_makerTokenUsed",
                  "nodeType": "VariableDeclaration",
                  "scope": 1658,
                  "src": "12557:20:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1570,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "12557:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "12436:147:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1573,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "12604:0:6"
            },
            "scope": 1796,
            "src": "12413:1627:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 1794,
              "nodeType": "Block",
              "src": "14548:2412:6",
              "statements": [
                {
                  "assignments": [
                    1668
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1668,
                      "name": "vault",
                      "nodeType": "VariableDeclaration",
                      "scope": 1795,
                      "src": "14606:12:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IVault_$1954",
                        "typeString": "contract IVault"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1667,
                        "name": "IVault",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1954,
                        "src": "14606:6:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$1954",
                          "typeString": "contract IVault"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1673,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1670,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "14628:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1671,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1964,
                        "src": "14628:11:6",
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
                      "id": 1669,
                      "name": "IVault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1954,
                      "src": "14621:6:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_IVault_$1954_$",
                        "typeString": "type(contract IVault)"
                      }
                    },
                    "id": 1672,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "14621:19:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IVault_$1954",
                      "typeString": "contract IVault"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "14606:34:6"
                },
                {
                  "assignments": [
                    1675
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1675,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1795,
                      "src": "14720:22:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1674,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "14720:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1688,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1682,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "14784:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1683,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1986,
                          "src": "14784:18:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 1686,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1684,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1660,
                            "src": "14803:6:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1685,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2160,
                          "src": "14803:16:6",
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
                        "src": "14784:36:6",
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
                            "id": 1676,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "14745:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1677,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1982,
                          "src": "14745:16:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 1680,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1678,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1660,
                            "src": "14762:6:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1679,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2160,
                          "src": "14762:16:6",
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
                        "src": "14745:34:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1681,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2636,
                      "src": "14745:38:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1687,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "14745:76:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "14720:101:6"
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
                        "id": 1696,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1693,
                              "name": "closedOrderAmount",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1675,
                              "src": "14937:17:6",
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
                                "id": 1690,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1660,
                                "src": "14917:6:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 1691,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "quantity",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2144,
                              "src": "14917:15:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1692,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sub",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2612,
                            "src": "14917:19:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1694,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "14917:38:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 1695,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1662,
                          "src": "14959:13:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "14917:55:6",
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
                      "id": 1689,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "14909:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1697,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "14909:64:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1698,
                  "nodeType": "ExpressionStatement",
                  "src": "14909:64:6"
                },
                {
                  "assignments": [
                    1702
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1702,
                      "name": "requiredBalances",
                      "nodeType": "VariableDeclaration",
                      "scope": 1795,
                      "src": "14984:30:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                        "typeString": "uint256[]"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 1700,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "14984:4:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1701,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "14984:6:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1710,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1706,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1660,
                            "src": "15028:6:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1707,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "requiredComponents",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2155,
                          "src": "15028:25:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_memory",
                            "typeString": "address[] memory"
                          }
                        },
                        "id": 1708,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "15028:32:6",
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
                      "id": 1705,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "NewExpression",
                      "src": "15017:10:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
                        "typeString": "function (uint256) pure returns (uint256[] memory)"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 1703,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "15021:4:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1704,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "15021:6:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      }
                    },
                    "id": 1709,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "15017:44:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_memory",
                      "typeString": "uint256[] memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "14984:77:6"
                },
                {
                  "assignments": [
                    1712
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1712,
                      "name": "requiredMakerTokenAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1795,
                      "src": "15124:29:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1711,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "15124:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1721,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1715,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1660,
                          "src": "15199:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1716,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerTokenAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2146,
                        "src": "15199:23:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1717,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1662,
                        "src": "15236:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1718,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1660,
                          "src": "15263:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1719,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2144,
                        "src": "15263:15:6",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1713,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2323,
                        "src": "15156:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1714,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "getPartialAmount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2322,
                      "src": "15156:29:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_nonpayable$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256,uint256,uint256) returns (uint256)"
                      }
                    },
                    "id": 1720,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "15156:132:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "15124:164:6"
                },
                {
                  "body": {
                    "id": 1768,
                    "nodeType": "Block",
                    "src": "15427:606:6",
                    "statements": [
                      {
                        "assignments": [
                          1735
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1735,
                            "name": "tokenBalance",
                            "nodeType": "VariableDeclaration",
                            "scope": 1795,
                            "src": "15483:17:6",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 1734,
                              "name": "uint",
                              "nodeType": "ElementaryTypeName",
                              "src": "15483:4:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1745,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 1738,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1660,
                                "src": "15542:6:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 1739,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "makerAddress",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2136,
                              "src": "15542:19:6",
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
                                  "id": 1740,
                                  "name": "_order",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1660,
                                  "src": "15579:6:6",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                    "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                  }
                                },
                                "id": 1741,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "requiredComponents",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2155,
                                "src": "15579:25:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 1743,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1742,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1723,
                                "src": "15605:1:6",
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
                              "src": "15579:28:6",
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
                              "id": 1736,
                              "name": "vault",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1668,
                              "src": "15503:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_IVault_$1954",
                                "typeString": "contract IVault"
                              }
                            },
                            "id": 1737,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "getOwnerBalance",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 1953,
                            "src": "15503:21:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$returns$_t_uint256_$",
                              "typeString": "function (address,address) external returns (uint256)"
                            }
                          },
                          "id": 1744,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "15503:118:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "15483:138:6"
                      },
                      {
                        "assignments": [
                          1747
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1747,
                            "name": "requiredAddition",
                            "nodeType": "VariableDeclaration",
                            "scope": 1795,
                            "src": "15699:21:6",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 1746,
                              "name": "uint",
                              "nodeType": "ElementaryTypeName",
                              "src": "15699:4:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1758,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 1750,
                                  "name": "_order",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1660,
                                  "src": "15770:6:6",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                    "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                  }
                                },
                                "id": 1751,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "requiredComponentAmounts",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2158,
                                "src": "15770:31:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_memory",
                                  "typeString": "uint256[] memory"
                                }
                              },
                              "id": 1753,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1752,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1723,
                                "src": "15802:1:6",
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
                              "src": "15770:34:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1754,
                              "name": "_fillQuantity",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1662,
                              "src": "15822:13:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 1755,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1660,
                                "src": "15853:6:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 1756,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "quantity",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2144,
                              "src": "15853:15:6",
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
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 1748,
                              "name": "OrderLibrary",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2323,
                              "src": "15723:12:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                                "typeString": "type(library OrderLibrary)"
                              }
                            },
                            "id": 1749,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "getPartialAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2322,
                            "src": "15723:29:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_delegatecall_nonpayable$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                              "typeString": "function (uint256,uint256,uint256) returns (uint256)"
                            }
                          },
                          "id": 1757,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "15723:159:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "15699:183:6"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 1766,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 1759,
                              "name": "requiredBalances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1702,
                              "src": "15966:16:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                                "typeString": "uint256[] memory"
                              }
                            },
                            "id": 1761,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1760,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1723,
                              "src": "15983:1:6",
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
                            "src": "15966:19:6",
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
                                "id": 1764,
                                "name": "requiredAddition",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1747,
                                "src": "16005:16:6",
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
                                "id": 1762,
                                "name": "tokenBalance",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1735,
                                "src": "15988:12:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1763,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2636,
                              "src": "15988:16:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 1765,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "15988:34:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "15966:56:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1767,
                        "nodeType": "ExpressionStatement",
                        "src": "15966:56:6"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1730,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1726,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1723,
                      "src": "15384:1:6",
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
                          "id": 1727,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1660,
                          "src": "15388:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1728,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "requiredComponents",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2155,
                        "src": "15388:25:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 1729,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "15388:32:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "15384:36:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1769,
                  "initializationExpression": {
                    "assignments": [
                      1723
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1723,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1795,
                        "src": "15370:8:6",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint16",
                          "typeString": "uint16"
                        },
                        "typeName": {
                          "id": 1722,
                          "name": "uint16",
                          "nodeType": "ElementaryTypeName",
                          "src": "15370:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint16",
                            "typeString": "uint16"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1725,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1724,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "15381:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "15370:12:6"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1732,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "15422:3:6",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1731,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1723,
                        "src": "15422:1:6",
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
                    "id": 1733,
                    "nodeType": "ExpressionStatement",
                    "src": "15422:3:6"
                  },
                  "nodeType": "ForStatement",
                  "src": "15365:668:6"
                },
                {
                  "assignments": [
                    1771
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1771,
                      "name": "makerTokenAmountUsed",
                      "nodeType": "VariableDeclaration",
                      "scope": 1795,
                      "src": "16078:25:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1770,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "16078:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1777,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1773,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1664,
                        "src": "16141:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1774,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1660,
                          "src": "16165:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1775,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2136,
                        "src": "16165:19:6",
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
                      "id": 1772,
                      "name": "executeExchangeOrders",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1499,
                      "src": "16106:21:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_bytes_memory_ptr_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory,address) returns (uint256)"
                      }
                    },
                    "id": 1776,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "16106:88:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "16078:116:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1792,
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
                          "id": 1778,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "16863:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1782,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderFills",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1982,
                        "src": "16863:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 1783,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1780,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1660,
                          "src": "16880:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1781,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2160,
                        "src": "16880:16:6",
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
                      "src": "16863:34:6",
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
                          "id": 1790,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1662,
                          "src": "16939:13:6",
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
                              "id": 1784,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1989,
                              "src": "16900:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$1987_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1785,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderFills",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 1982,
                            "src": "16900:16:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 1788,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1786,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1660,
                              "src": "16917:6:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1787,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2160,
                            "src": "16917:16:6",
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
                          "src": "16900:34:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1789,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2636,
                        "src": "16900:38:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 1791,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "16900:53:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "16863:90:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1793,
                  "nodeType": "ExpressionStatement",
                  "src": "16863:90:6"
                }
              ]
            },
            "documentation": "Check exchange orders acquire correct amount of tokens. Settle accounts for taker\nand relayer.\n     * @param  _order               IssuanceOrder object containing order params\n@param  _fillQuantity        Quantity of Set to be filled\n@param  _orderData           Bytestring encoding all exchange order data",
            "id": 1795,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "settleOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1665,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1660,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 1795,
                  "src": "14434:33:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1659,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2161,
                    "src": "14434:26:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2161_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1662,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1795,
                  "src": "14477:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1661,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "14477:4:6",
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
                  "id": 1664,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1795,
                  "src": "14505:16:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1663,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "14505:5:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "14424:103:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1666,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "14548:0:6"
            },
            "scope": 1796,
            "src": "14404:2556:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 1797,
        "src": "1575:15387:6"
      }
    ],
    "src": "597:16366:6"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreIssuanceOrder.sol",
    "exportedSymbols": {
      "CoreIssuanceOrder": [
        1796
      ]
    },
    "id": 1797,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1094,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:6"
      },
      {
        "id": 1095,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "621:35:6"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/Math.sol",
        "file": "zeppelin-solidity/contracts/math/Math.sol",
        "id": 1097,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2544,
        "src": "659:65:6",
        "symbolAliases": [
          {
            "foreign": 1096,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1099,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2638,
        "src": "725:73:6",
        "symbolAliases": [
          {
            "foreign": 1098,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1101,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2094,
        "src": "799:49:6",
        "symbolAliases": [
          {
            "foreign": 1100,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/ExchangeHandler.sol",
        "file": "../lib/ExchangeHandler.sol",
        "id": 1103,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2123,
        "src": "849:61:6",
        "symbolAliases": [
          {
            "foreign": 1102,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreAccounting.sol",
        "file": "../interfaces/ICoreAccounting.sol",
        "id": 1105,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1813,
        "src": "911:68:6",
        "symbolAliases": [
          {
            "foreign": 1104,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ICoreIssuance.sol",
        "file": "../interfaces/ICoreIssuance.sol",
        "id": 1107,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1825,
        "src": "980:64:6",
        "symbolAliases": [
          {
            "foreign": 1106,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IExchange.sol",
        "file": "../interfaces/IExchange.sol",
        "id": 1109,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1843,
        "src": "1045:56:6",
        "symbolAliases": [
          {
            "foreign": 1108,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetToken.sol",
        "file": "../interfaces/ISetToken.sol",
        "id": 1111,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1902,
        "src": "1102:56:6",
        "symbolAliases": [
          {
            "foreign": 1110,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 1113,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1916,
        "src": "1159:66:6",
        "symbolAliases": [
          {
            "foreign": 1112,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 1115,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 1955,
        "src": "1226:50:6",
        "symbolAliases": [
          {
            "foreign": 1114,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/0x/LibBytes.sol",
        "file": "../../external/0x/LibBytes.sol",
        "id": 1117,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2473,
        "src": "1277:58:6",
        "symbolAliases": [
          {
            "foreign": 1116,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
        "file": "../lib/OrderLibrary.sol",
        "id": 1119,
        "nodeType": "ImportDirective",
        "scope": 1797,
        "sourceUnit": 2324,
        "src": "1336:55:6",
        "symbolAliases": [
          {
            "foreign": 1118,
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
              "id": 1120,
              "name": "ICoreIssuance",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1824,
              "src": "1609:13:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICoreIssuance_$1824",
                "typeString": "contract ICoreIssuance"
              }
            },
            "id": 1121,
            "nodeType": "InheritanceSpecifier",
            "src": "1609:13:6"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1122,
              "name": "ICoreAccounting",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1812,
              "src": "1628:15:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ICoreAccounting_$1812",
                "typeString": "contract ICoreAccounting"
              }
            },
            "id": 1123,
            "nodeType": "InheritanceSpecifier",
            "src": "1628:15:6"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1124,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2093,
              "src": "1649:9:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2093",
                "typeString": "contract CoreState"
              }
            },
            "id": 1125,
            "nodeType": "InheritanceSpecifier",
            "src": "1649:9:6"
          }
        ],
        "contractDependencies": [
          1812,
          1824,
          2093
        ],
        "contractKind": "contract",
        "documentation": "@title CoreIssuanceOrder\n@author Set Protocol\n * The Core Issuance Order extension houses all functions related to the filling and\ncanceling issuance orders.\n ",
        "fullyImplemented": false,
        "id": 1796,
        "linearizedBaseContracts": [
          1796,
          2093,
          1812,
          1824
        ],
        "name": "CoreIssuanceOrder",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1128,
            "libraryName": {
              "contractScope": null,
              "id": 1126,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2637,
              "src": "1671:8:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$2637",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1665:27:6",
            "typeName": {
              "id": 1127,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1684:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 1131,
            "libraryName": {
              "contractScope": null,
              "id": 1129,
              "name": "Math",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2543,
              "src": "1703:4:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Math_$2543",
                "typeString": "library Math"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1697:23:6",
            "typeName": {
              "id": 1130,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1712:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1134,
            "name": "EXCHANGE_HEADER_LENGTH",
            "nodeType": "VariableDeclaration",
            "scope": 1796,
            "src": "1773:45:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 1132,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1773:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "313630",
              "id": 1133,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1815:3:6",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_160_by_1",
                "typeString": "int_const 160"
              },
              "value": "160"
            },
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1156,
            "name": "LogFill",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1155,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1136,
                  "indexed": false,
                  "name": "setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "1892:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1135,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1892:7:6",
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
                  "id": 1138,
                  "indexed": true,
                  "name": "makerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "1920:28:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1137,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1920:7:6",
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
                  "id": 1140,
                  "indexed": true,
                  "name": "takerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "1958:28:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1139,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1958:7:6",
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
                  "id": 1142,
                  "indexed": false,
                  "name": "makerToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "1996:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1141,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1996:7:6",
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
                  "id": 1144,
                  "indexed": true,
                  "name": "relayerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2024:30:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1143,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2024:7:6",
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
                  "id": 1146,
                  "indexed": false,
                  "name": "relayerToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2064:20:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1145,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2064:7:6",
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
                  "id": 1148,
                  "indexed": false,
                  "name": "quantityFilled",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2094:22:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1147,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2094:7:6",
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
                  "id": 1150,
                  "indexed": false,
                  "name": "makerTokenToTaker",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2126:25:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1149,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2126:7:6",
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
                  "id": 1152,
                  "indexed": false,
                  "name": "relayerTokenAmountPaid",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2161:30:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1151,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2161:7:6",
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
                  "id": 1154,
                  "indexed": false,
                  "name": "orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 1156,
                  "src": "2201:17:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 1153,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2201:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1882:342:6"
            },
            "src": "1869:356:6"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 1170,
            "name": "LogCancel",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1169,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1158,
                  "indexed": false,
                  "name": "setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2256:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1157,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2256:7:6",
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
                  "id": 1160,
                  "indexed": true,
                  "name": "makerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2284:28:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1159,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2284:7:6",
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
                  "id": 1162,
                  "indexed": false,
                  "name": "makerToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2322:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1161,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2322:7:6",
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
                  "id": 1164,
                  "indexed": true,
                  "name": "relayerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2350:30:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1163,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2350:7:6",
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
                  "id": 1166,
                  "indexed": false,
                  "name": "quantityCanceled",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2390:24:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1165,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2390:7:6",
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
                  "id": 1168,
                  "indexed": false,
                  "name": "orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 1170,
                  "src": "2424:17:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 1167,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2424:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2246:201:6"
            },
            "src": "2231:217:6"
          },
          {
            "body": {
              "id": 1271,
              "nodeType": "Block",
              "src": "3570:1561:6",
              "statements": [
                {
                  "assignments": [
                    1199
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1199,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1272,
                      "src": "3619:39:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1198,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2161,
                        "src": "3619:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1242,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1202,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1174,
                          "src": "3714:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1204,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1203,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3725:1:6",
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
                        "src": "3714:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1205,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1174,
                          "src": "3755:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1207,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1206,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3766:1:6",
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
                        "src": "3755:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1208,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1174,
                          "src": "3794:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1210,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1209,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3805:1:6",
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
                        "src": "3794:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1211,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1174,
                          "src": "3837:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1213,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1212,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3848:1:6",
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
                        "src": "3837:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1214,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1174,
                          "src": "3878:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1216,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1215,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3889:1:6",
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
                        "src": "3878:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1217,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1178,
                          "src": "3915:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1219,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1218,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3923:1:6",
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
                        "src": "3915:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1220,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1178,
                          "src": "3957:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1222,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1221,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3965:1:6",
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
                        "src": "3957:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1223,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1178,
                          "src": "3993:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1225,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1224,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4001:1:6",
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
                        "src": "3993:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1226,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1178,
                          "src": "4037:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1228,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1227,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4045:1:6",
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
                        "src": "4037:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1229,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1178,
                          "src": "4067:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1231,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1230,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "4075:1:6",
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
                        "src": "4067:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1232,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1181,
                        "src": "4111:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1233,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1184,
                        "src": "4170:25:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1236,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1174,
                            "src": "4268:10:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1237,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1178,
                            "src": "4296:7:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1238,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1181,
                            "src": "4321:19:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1239,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1184,
                            "src": "4358:25:6",
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
                            "id": 1234,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2323,
                            "src": "4220:12:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1235,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2219,
                          "src": "4220:30:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 1240,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4220:177:6",
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
                        "id": 1200,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2323,
                        "src": "3661:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1201,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2161,
                      "src": "3661:26:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$2161_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 1241,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "makerAddress",
                      "makerToken",
                      "relayerAddress",
                      "relayerToken",
                      "quantity",
                      "makerTokenAmount",
                      "expiration",
                      "relayerTokenAmount",
                      "salt",
                      "requiredComponents",
                      "requiredComponentAmounts",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "3661:747:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "3619:789:6"
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
                              "id": 1246,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1199,
                              "src": "4529:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1247,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2160,
                            "src": "4529:15:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1248,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1199,
                              "src": "4562:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1249,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2136,
                            "src": "4562:18:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1250,
                            "name": "_v",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1188,
                            "src": "4598:2:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint8",
                              "typeString": "uint8"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 1251,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1191,
                              "src": "4618:8:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 1253,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 1252,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4627:1:6",
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
                            "src": "4618:11:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 1254,
                              "name": "sigBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1191,
                              "src": "4652:8:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                                "typeString": "bytes32[] calldata"
                              }
                            },
                            "id": 1256,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 1255,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4661:1:6",
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
                            "src": "4652:11:6",
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
                            "id": 1244,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2323,
                            "src": "4481:12:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1245,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validateSignature",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2261,
                          "src": "4481:30:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_delegatecall_pure$_t_bytes32_$_t_address_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                            "typeString": "function (bytes32,address,uint8,bytes32,bytes32) pure returns (bool)"
                          }
                        },
                        "id": 1257,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4481:201:6",
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
                      "id": 1243,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "4460:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1258,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4460:232:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1259,
                  "nodeType": "ExpressionStatement",
                  "src": "4460:232:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1261,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1199,
                        "src": "4794:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1262,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1186,
                        "src": "4813:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1260,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1563,
                      "src": "4767:13:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$2161_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 1263,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4767:69:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1264,
                  "nodeType": "ExpressionStatement",
                  "src": "4767:69:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1266,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1199,
                        "src": "4896:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1267,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1186,
                        "src": "4915:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1268,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1193,
                        "src": "4942:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_calldata_ptr",
                          "typeString": "bytes calldata"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
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
                      "id": 1265,
                      "name": "settleOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1795,
                      "src": "4871:11:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_struct$_IssuanceOrder_$2161_memory_ptr_$_t_uint256_$_t_bytes_memory_ptr_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256,bytes memory)"
                      }
                    },
                    "id": 1269,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4871:91:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1270,
                  "nodeType": "ExpressionStatement",
                  "src": "4871:91:6"
                }
              ]
            },
            "documentation": "Fill an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _fillQuantity              Quantity of set to be filled\n@param  _v                         v element of ECDSA signature\n@param  sigBytes                   Array with r and s segments of ECDSA signature\n@param _orderData                  Bytes array containing the exchange orders to execute",
            "id": 1272,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "fillOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1194,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1174,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3315:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1171,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3315:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1173,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1172,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3323:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3315:10:6",
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
                  "id": 1178,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3346:15:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1175,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3346:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1177,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1176,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3351:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3346:7:6",
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
                  "id": 1181,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3371:29:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1179,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3371:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1180,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3371:9:6",
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
                  "id": 1184,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3410:32:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1182,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3410:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1183,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3410:6:6",
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
                  "id": 1186,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3452:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1185,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3452:4:6",
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
                  "id": 1188,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3480:8:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 1187,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "3480:5:6",
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
                  "id": 1191,
                  "name": "sigBytes",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3498:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_bytes32_$dyn_calldata_ptr",
                    "typeString": "bytes32[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1189,
                      "name": "bytes32",
                      "nodeType": "ElementaryTypeName",
                      "src": "3498:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes32",
                        "typeString": "bytes32"
                      }
                    },
                    "id": 1190,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3498:9:6",
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
                  "id": 1193,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1272,
                  "src": "3526:16:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_calldata_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1192,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "3526:5:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3305:243:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1195,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3570:0:6"
            },
            "scope": 1796,
            "src": "3287:1844:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1417,
              "nodeType": "Block",
              "src": "5877:1856:6",
              "statements": [
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
                        "id": 1294,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 1292,
                          "name": "_cancelQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1288,
                          "src": "5954:15:6",
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
                          "id": 1293,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5972:1:6",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "5954:19:6",
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
                      "id": 1291,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "5946:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1295,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5946:28:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1296,
                  "nodeType": "ExpressionStatement",
                  "src": "5946:28:6"
                },
                {
                  "assignments": [
                    1300
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1300,
                      "name": "order",
                      "nodeType": "VariableDeclaration",
                      "scope": 1418,
                      "src": "6024:39:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                        "typeString": "struct OrderLibrary.IssuanceOrder"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1299,
                        "name": "OrderLibrary.IssuanceOrder",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2161,
                        "src": "6024:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_storage_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1343,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1303,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1276,
                          "src": "6119:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1305,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1304,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6130:1:6",
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
                        "src": "6119:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1306,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1276,
                          "src": "6160:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1308,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1307,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6171:1:6",
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
                        "src": "6160:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1309,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1276,
                          "src": "6199:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1311,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1310,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6210:1:6",
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
                        "src": "6199:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1312,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1276,
                          "src": "6242:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1314,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1313,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6253:1:6",
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
                        "src": "6242:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1315,
                          "name": "_addresses",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1276,
                          "src": "6283:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                            "typeString": "address[5] calldata"
                          }
                        },
                        "id": 1317,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1316,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6294:1:6",
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
                        "src": "6283:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1318,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1280,
                          "src": "6320:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1320,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 1319,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6328:1:6",
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
                        "src": "6320:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1321,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1280,
                          "src": "6362:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1323,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 1322,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6370:1:6",
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
                        "src": "6362:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1324,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1280,
                          "src": "6398:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1326,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "32",
                          "id": 1325,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6406:1:6",
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
                        "src": "6398:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1327,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1280,
                          "src": "6442:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1329,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "33",
                          "id": 1328,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6450:1:6",
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
                        "src": "6442:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 1330,
                          "name": "_values",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1280,
                          "src": "6472:7:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                            "typeString": "uint256[5] calldata"
                          }
                        },
                        "id": 1332,
                        "indexExpression": {
                          "argumentTypes": null,
                          "hexValue": "34",
                          "id": 1331,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6480:1:6",
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
                        "src": "6472:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1333,
                        "name": "_requiredComponents",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1283,
                        "src": "6516:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1334,
                        "name": "_requiredComponentAmounts",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1286,
                        "src": "6575:25:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1337,
                            "name": "_addresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1276,
                            "src": "6673:10:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                              "typeString": "address[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1338,
                            "name": "_values",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1280,
                            "src": "6701:7:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                              "typeString": "uint256[5] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1339,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1283,
                            "src": "6726:19:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 1340,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1286,
                            "src": "6763:25:6",
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
                            "id": 1335,
                            "name": "OrderLibrary",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2323,
                            "src": "6625:12:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                              "typeString": "type(library OrderLibrary)"
                            }
                          },
                          "id": 1336,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "generateOrderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2219,
                          "src": "6625:30:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$5_memory_ptr_$_t_array$_t_uint256_$5_memory_ptr_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$_t_bytes32_$",
                            "typeString": "function (address[5] memory,uint256[5] memory,address[] memory,uint256[] memory) pure returns (bytes32)"
                          }
                        },
                        "id": 1341,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6625:177:6",
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
                        "id": 1301,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2323,
                        "src": "6066:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1302,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "IssuanceOrder",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2161,
                      "src": "6066:26:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_struct$_IssuanceOrder_$2161_storage_ptr_$",
                        "typeString": "type(struct OrderLibrary.IssuanceOrder storage pointer)"
                      }
                    },
                    "id": 1342,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "structConstructorCall",
                    "lValueRequested": false,
                    "names": [
                      "setAddress",
                      "makerAddress",
                      "makerToken",
                      "relayerAddress",
                      "relayerToken",
                      "quantity",
                      "makerTokenAmount",
                      "expiration",
                      "relayerTokenAmount",
                      "salt",
                      "requiredComponents",
                      "requiredComponentAmounts",
                      "orderHash"
                    ],
                    "nodeType": "FunctionCall",
                    "src": "6066:747:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory",
                      "typeString": "struct OrderLibrary.IssuanceOrder memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6024:789:6"
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
                        "id": 1349,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1345,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1300,
                            "src": "6883:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1346,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "makerAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2136,
                          "src": "6883:18:6",
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
                            "id": 1347,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2738,
                            "src": "6905:3:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 1348,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "6905:10:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "6883:32:6",
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
                      "id": 1344,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "6875:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1350,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6875:41:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1351,
                  "nodeType": "ExpressionStatement",
                  "src": "6875:41:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1353,
                        "name": "order",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1300,
                        "src": "6987:5:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1354,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1288,
                        "src": "7006:15:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                          "typeString": "struct OrderLibrary.IssuanceOrder memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1352,
                      "name": "validateOrder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1563,
                      "src": "6960:13:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_struct$_IssuanceOrder_$2161_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (struct OrderLibrary.IssuanceOrder memory,uint256) view"
                      }
                    },
                    "id": 1355,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6960:71:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1356,
                  "nodeType": "ExpressionStatement",
                  "src": "6960:71:6"
                },
                {
                  "assignments": [
                    1358
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1358,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1418,
                      "src": "7080:22:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1357,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "7080:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1371,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1365,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "7143:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1366,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1986,
                          "src": "7143:18:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 1369,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1367,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1300,
                            "src": "7162:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1368,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2160,
                          "src": "7162:15:6",
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
                        "src": "7143:35:6",
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
                            "id": 1359,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "7105:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1360,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1982,
                          "src": "7105:16:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 1363,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1361,
                            "name": "order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1300,
                            "src": "7122:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1362,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2160,
                          "src": "7122:15:6",
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
                        "src": "7105:33:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1364,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2636,
                      "src": "7105:37:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1370,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7105:74:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7080:99:6"
                },
                {
                  "assignments": [
                    1373
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1373,
                      "name": "openOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1418,
                      "src": "7189:20:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1372,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "7189:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1379,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1377,
                        "name": "closedOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1358,
                        "src": "7231:17:6",
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
                          "id": 1374,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7212:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1375,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2144,
                        "src": "7212:14:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1376,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "sub",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2612,
                      "src": "7212:18:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1378,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7212:37:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7189:60:6"
                },
                {
                  "assignments": [
                    1381
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1381,
                      "name": "canceledAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1418,
                      "src": "7259:19:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1380,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "7259:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1386,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1384,
                        "name": "_cancelQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1288,
                        "src": "7304:15:6",
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
                        "id": 1382,
                        "name": "openOrderAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1373,
                        "src": "7281:15:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1383,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "min256",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2542,
                      "src": "7281:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1385,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7281:39:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "7259:61:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1401,
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
                          "id": 1387,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "7379:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1391,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderCancels",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1986,
                        "src": "7379:18:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 1392,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1389,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7398:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1390,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2160,
                        "src": "7398:15:6",
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
                      "src": "7379:35:6",
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
                          "id": 1399,
                          "name": "canceledAmount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1381,
                          "src": "7457:14:6",
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
                              "id": 1393,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1989,
                              "src": "7417:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$1987_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1394,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderCancels",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 1986,
                            "src": "7417:18:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 1397,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1395,
                              "name": "order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1300,
                              "src": "7436:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1396,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2160,
                            "src": "7436:15:6",
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
                          "src": "7417:35:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1398,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2636,
                        "src": "7417:39:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 1400,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "7417:55:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "7379:93:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1402,
                  "nodeType": "ExpressionStatement",
                  "src": "7379:93:6"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1404,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7546:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1405,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2134,
                        "src": "7546:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1406,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7576:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1407,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2136,
                        "src": "7576:18:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1408,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7608:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1409,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2138,
                        "src": "7608:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1410,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7638:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1411,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2140,
                        "src": "7638:20:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1412,
                        "name": "canceledAmount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1381,
                        "src": "7672:14:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1413,
                          "name": "order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1300,
                          "src": "7700:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1414,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2160,
                        "src": "7700:15:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
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
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 1403,
                      "name": "LogCancel",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1170,
                      "src": "7523:9:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_address_$_t_address_$_t_uint256_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,address,address,uint256,bytes32)"
                      }
                    },
                    "id": 1415,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7523:202:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1416,
                  "nodeType": "EmitStatement",
                  "src": "7518:207:6"
                }
              ]
            },
            "documentation": "Cancel an issuance order\n     * @param  _addresses                 [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                    [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents        Components required for the issuance order\n@param  _requiredComponentAmounts  Component amounts required for the issuance order\n@param  _cancelQuantity            Quantity of set to be canceled",
            "id": 1418,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "cancelOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1289,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1276,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1418,
                  "src": "5692:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_calldata_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1273,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5692:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1275,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1274,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5700:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5692:10:6",
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
                  "id": 1280,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 1418,
                  "src": "5723:15:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_calldata_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1277,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5723:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1279,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 1278,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5728:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "5723:7:6",
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
                  "id": 1283,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 1418,
                  "src": "5748:29:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1281,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5748:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1282,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5748:9:6",
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
                  "id": 1286,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 1418,
                  "src": "5787:32:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1284,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5787:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1285,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5787:6:6",
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
                  "id": 1288,
                  "name": "_cancelQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1418,
                  "src": "5829:20:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1287,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "5829:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5682:173:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1290,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5877:0:6"
            },
            "scope": 1796,
            "src": "5662:2071:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1498,
              "nodeType": "Block",
              "src": "8474:2417:6",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1428,
                      "name": "scannedBytes",
                      "nodeType": "VariableDeclaration",
                      "scope": 1499,
                      "src": "8484:20:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1427,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "8484:7:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1429,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "8484:20:6"
                },
                {
                  "assignments": [
                    1431
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1431,
                      "name": "makerTokenUsed",
                      "nodeType": "VariableDeclaration",
                      "scope": 1499,
                      "src": "8514:22:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1430,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "8514:7:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1433,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 1432,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "8539:1:6",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "8514:26:6"
                },
                {
                  "body": {
                    "id": 1494,
                    "nodeType": "Block",
                    "src": "8591:2262:6",
                    "statements": [
                      {
                        "assignments": [
                          1439
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1439,
                            "name": "headerData",
                            "nodeType": "VariableDeclaration",
                            "scope": 1499,
                            "src": "8666:23:6",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 1438,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "8666:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1449,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1442,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1420,
                              "src": "8724:10:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_memory_ptr",
                                "typeString": "bytes memory"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1443,
                              "name": "scannedBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1428,
                              "src": "8752:12:6",
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
                                  "id": 1446,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1134,
                                  "src": "8799:22:6",
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
                                  "id": 1444,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1428,
                                  "src": "8782:12:6",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1445,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2636,
                                "src": "8782:16:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1447,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "8782:40:6",
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
                              "id": 1440,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2472,
                              "src": "8692:8:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$2472_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 1441,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2471,
                            "src": "8692:14:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 1448,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8692:144:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8666:170:6"
                      },
                      {
                        "assignments": [
                          1453
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1453,
                            "name": "header",
                            "nodeType": "VariableDeclaration",
                            "scope": 1499,
                            "src": "8850:44:6",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                              "typeString": "struct ExchangeHandler.ExchangeHeader"
                            },
                            "typeName": {
                              "contractScope": null,
                              "id": 1452,
                              "name": "ExchangeHandler.ExchangeHeader",
                              "nodeType": "UserDefinedTypeName",
                              "referencedDeclaration": 2107,
                              "src": "8850:30:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$2107_storage_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1458,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1456,
                              "name": "headerData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1439,
                              "src": "8950:10:6",
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
                              "id": 1454,
                              "name": "ExchangeHandler",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2122,
                              "src": "8897:15:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_ExchangeHandler_$2122_$",
                                "typeString": "type(library ExchangeHandler)"
                              }
                            },
                            "id": 1455,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "parseExchangeHeader",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2121,
                            "src": "8897:35:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$returns$_t_struct$_ExchangeHeader_$2107_memory_ptr_$",
                              "typeString": "function (bytes memory) pure returns (struct ExchangeHandler.ExchangeHeader memory)"
                            }
                          },
                          "id": 1457,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "8897:77:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                            "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "8850:124:6"
                      },
                      {
                        "assignments": [
                          1460
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1460,
                            "name": "exchangeDataLength",
                            "nodeType": "VariableDeclaration",
                            "scope": 1499,
                            "src": "9320:26:6",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 1459,
                              "name": "uint256",
                              "nodeType": "ElementaryTypeName",
                              "src": "9320:7:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1466,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1464,
                              "name": "EXCHANGE_HEADER_LENGTH",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1134,
                              "src": "9378:22:6",
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
                                "id": 1461,
                                "name": "header",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1453,
                                "src": "9349:6:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                                  "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                                }
                              },
                              "id": 1462,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "totalOrdersLength",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2106,
                              "src": "9349:24:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1463,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2636,
                            "src": "9349:28:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1465,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "9349:52:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "9320:81:6"
                      },
                      {
                        "assignments": [
                          1468
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1468,
                            "name": "bodyData",
                            "nodeType": "VariableDeclaration",
                            "scope": 1499,
                            "src": "9415:21:6",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes_memory_ptr",
                              "typeString": "bytes"
                            },
                            "typeName": {
                              "id": 1467,
                              "name": "bytes",
                              "nodeType": "ElementaryTypeName",
                              "src": "9415:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_bytes_storage_ptr",
                                "typeString": "bytes"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1481,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1471,
                              "name": "_orderData",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1420,
                              "src": "9471:10:6",
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
                                  "id": 1474,
                                  "name": "EXCHANGE_HEADER_LENGTH",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1134,
                                  "src": "9516:22:6",
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
                                  "id": 1472,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1428,
                                  "src": "9499:12:6",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1473,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2636,
                                "src": "9499:16:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1475,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "9499:40:6",
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
                                  "id": 1478,
                                  "name": "exchangeDataLength",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1460,
                                  "src": "9574:18:6",
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
                                  "id": 1476,
                                  "name": "scannedBytes",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1428,
                                  "src": "9557:12:6",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 1477,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "add",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2636,
                                "src": "9557:16:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 1479,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "9557:36:6",
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
                              "id": 1469,
                              "name": "LibBytes",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2472,
                              "src": "9439:8:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_LibBytes_$2472_$",
                                "typeString": "type(library LibBytes)"
                              }
                            },
                            "id": 1470,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "slice",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2471,
                            "src": "9439:14:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_bytes_memory_ptr_$_t_uint256_$_t_uint256_$returns$_t_bytes_memory_ptr_$",
                              "typeString": "function (bytes memory,uint256,uint256) pure returns (bytes memory)"
                            }
                          },
                          "id": 1480,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "9439:168:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes_memory_ptr",
                            "typeString": "bytes memory"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "9415:192:6"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 1487,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 1482,
                            "name": "scannedBytes",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1428,
                            "src": "10664:12:6",
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
                                "id": 1485,
                                "name": "exchangeDataLength",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1460,
                                "src": "10696:18:6",
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
                                "id": 1483,
                                "name": "scannedBytes",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1428,
                                "src": "10679:12:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1484,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2636,
                              "src": "10679:16:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 1486,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "10679:36:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "10664:51:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1488,
                        "nodeType": "ExpressionStatement",
                        "src": "10664:51:6"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 1492,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "id": 1489,
                            "name": "makerTokenUsed",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1431,
                            "src": "10729:14:6",
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
                              "id": 1490,
                              "name": "header",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1453,
                              "src": "10747:6:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_ExchangeHeader_$2107_memory_ptr",
                                "typeString": "struct ExchangeHandler.ExchangeHeader memory"
                              }
                            },
                            "id": 1491,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2104,
                            "src": "10747:23:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "10729:41:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1493,
                        "nodeType": "ExpressionStatement",
                        "src": "10729:41:6"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1437,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1434,
                      "name": "scannedBytes",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1428,
                      "src": "8557:12:6",
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
                        "id": 1435,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1420,
                        "src": "8572:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      "id": 1436,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "8572:17:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "8557:32:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1495,
                  "nodeType": "WhileStatement",
                  "src": "8550:2303:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1496,
                    "name": "makerTokenUsed",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1431,
                    "src": "10870:14:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 1426,
                  "id": 1497,
                  "nodeType": "Return",
                  "src": "10863:21:6"
                }
              ]
            },
            "documentation": "Execute the exchange orders by parsing the order data and facilitating the transfers. Each\nheader represents a batch of orders for a particular exchange (0x, KNC, taker). Additional\ninformation such as makerToken is encoded so it can be used to facilitate exchange orders\n     * @param _orderData        Bytes array containing the exchange orders to execute\n@param _makerAddress     Issuance order maker address\n@return makerTokenUsed   Amount of maker token used to execute orders",
            "id": 1499,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "executeExchangeOrders",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1423,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1420,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1499,
                  "src": "8374:16:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1419,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "8374:5:6",
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
                  "id": 1422,
                  "name": "_makerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1499,
                  "src": "8400:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1421,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "8400:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8364:63:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1426,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1425,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1499,
                  "src": "8461:7:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1424,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "8461:7:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "8460:9:6"
            },
            "scope": 1796,
            "src": "8334:2557:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 1562,
              "nodeType": "Block",
              "src": "11245:731:6",
              "statements": [
                {
                  "assignments": [
                    1507
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1507,
                      "name": "set",
                      "nodeType": "VariableDeclaration",
                      "scope": 1563,
                      "src": "11296:13:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_ISetToken_$1901",
                        "typeString": "contract ISetToken"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1506,
                        "name": "ISetToken",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1901,
                        "src": "11296:9:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetToken_$1901",
                          "typeString": "contract ISetToken"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1512,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1509,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1501,
                          "src": "11322:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1510,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2134,
                        "src": "11322:17:6",
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
                      "id": 1508,
                      "name": "ISetToken",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1901,
                      "src": "11312:9:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_ISetToken_$1901_$",
                        "typeString": "type(contract ISetToken)"
                      }
                    },
                    "id": 1511,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11312:28:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_ISetToken_$1901",
                      "typeString": "contract ISetToken"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "11296:44:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1514,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "11416:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1515,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1975,
                          "src": "11416:15:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 1518,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1516,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1501,
                            "src": "11432:6:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1517,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "setAddress",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2134,
                          "src": "11432:17:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "11416:34:6",
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
                      "id": 1513,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "11408:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1519,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11408:43:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1520,
                  "nodeType": "ExpressionStatement",
                  "src": "11408:43:6"
                },
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
                        "id": 1530,
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
                          "id": 1525,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1522,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1501,
                              "src": "11550:6:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1523,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "makerTokenAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2146,
                            "src": "11550:23:6",
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
                            "id": 1524,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "11576:1:6",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "11550:27:6",
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
                          "id": 1529,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1526,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1501,
                              "src": "11581:6:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1527,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2144,
                            "src": "11581:15:6",
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
                            "id": 1528,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "11599:1:6",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "11581:19:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "11550:50:6",
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
                      "id": 1521,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "11542:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1531,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11542:59:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1532,
                  "nodeType": "ExpressionStatement",
                  "src": "11542:59:6"
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
                        "id": 1538,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1534,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2728,
                            "src": "11666:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 1535,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "11666:15:6",
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
                            "id": 1536,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1501,
                            "src": "11685:6:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1537,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "expiration",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2148,
                          "src": "11685:17:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "11666:36:6",
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
                      "id": 1533,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "11658:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1539,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11658:45:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1540,
                  "nodeType": "ExpressionStatement",
                  "src": "11658:45:6"
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
                        "id": 1549,
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
                          "id": 1547,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1542,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1501,
                              "src": "11794:6:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1543,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "quantity",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2144,
                            "src": "11794:15:6",
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
                                "id": 1544,
                                "name": "set",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1507,
                                "src": "11812:3:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$1901",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 1545,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1874,
                              "src": "11812:15:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 1546,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "11812:17:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "11794:35:6",
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
                          "id": 1548,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "11833:1:6",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "11794:40:6",
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
                      "id": 1541,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "11786:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1550,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11786:49:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1551,
                  "nodeType": "ExpressionStatement",
                  "src": "11786:49:6"
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
                        "id": 1559,
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
                          "id": 1557,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 1553,
                            "name": "_executeQuantity",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1503,
                            "src": "11927:16:6",
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
                                "id": 1554,
                                "name": "set",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1507,
                                "src": "11946:3:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_contract$_ISetToken_$1901",
                                  "typeString": "contract ISetToken"
                                }
                              },
                              "id": 1555,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "naturalUnit",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1874,
                              "src": "11946:15:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_external_nonpayable$__$returns$_t_uint256_$",
                                "typeString": "function () external returns (uint256)"
                              }
                            },
                            "id": 1556,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "11946:17:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "11927:36:6",
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
                          "id": 1558,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "11967:1:6",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "11927:41:6",
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
                      "id": 1552,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "11919:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1560,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "11919:50:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1561,
                  "nodeType": "ExpressionStatement",
                  "src": "11919:50:6"
                }
              ]
            },
            "documentation": "Validate order params are still valid\n     * @param  _order              IssuanceOrder object containing order params\n@param  _executeQuantity    Quantity of Set to be filled",
            "id": 1563,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1504,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1501,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 1563,
                  "src": "11141:33:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1500,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2161,
                    "src": "11141:26:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2161_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1503,
                  "name": "_executeQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1563,
                  "src": "11184:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1502,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "11184:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "11131:80:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1505,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "11245:0:6"
            },
            "scope": 1796,
            "src": "11109:867:6",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 1657,
              "nodeType": "Block",
              "src": "12604:1436:6",
              "statements": [
                {
                  "assignments": [
                    1575
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1575,
                      "name": "transferProxy",
                      "nodeType": "VariableDeclaration",
                      "scope": 1658,
                      "src": "12665:28:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                        "typeString": "contract ITransferProxy"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1574,
                        "name": "ITransferProxy",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1915,
                        "src": "12665:14:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1580,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1577,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "12711:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1578,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "transferProxy",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1962,
                        "src": "12711:19:6",
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
                      "id": 1576,
                      "name": "ITransferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1915,
                      "src": "12696:14:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$1915_$",
                        "typeString": "type(contract ITransferProxy)"
                      }
                    },
                    "id": 1579,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "12696:35:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                      "typeString": "contract ITransferProxy"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "12665:66:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1584,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "12833:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1585,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2138,
                        "src": "12833:17:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 1588,
                            "name": "_makerTokenUsed",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1571,
                            "src": "12894:15:6",
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
                            "id": 1586,
                            "name": "_requiredMakerTokenAmount",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1569,
                            "src": "12864:25:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 1587,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sub",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2612,
                          "src": "12864:29:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 1589,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "12864:46:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1590,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "12970:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1591,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2136,
                        "src": "12970:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1592,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2738,
                          "src": "13003:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1593,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "13003:10:6",
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
                        "id": 1581,
                        "name": "transferProxy",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1575,
                        "src": "12797:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1583,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1914,
                      "src": "12797:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1594,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "12797:226:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1595,
                  "nodeType": "ExpressionStatement",
                  "src": "12797:226:6"
                },
                {
                  "assignments": [
                    1597
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1597,
                      "name": "requiredFees",
                      "nodeType": "VariableDeclaration",
                      "scope": 1658,
                      "src": "13069:17:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1596,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "13069:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1606,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1600,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13132:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1601,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerTokenAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2150,
                        "src": "13132:25:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1602,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1567,
                        "src": "13171:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1603,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13198:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1604,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2144,
                        "src": "13198:15:6",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1598,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2323,
                        "src": "13089:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1599,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "getPartialAmount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2322,
                      "src": "13089:29:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_nonpayable$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256,uint256,uint256) returns (uint256)"
                      }
                    },
                    "id": 1605,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13089:134:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "13069:154:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1610,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13301:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1611,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2142,
                        "src": "13301:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1612,
                        "name": "requiredFees",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1597,
                        "src": "13334:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1613,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13360:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1614,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2136,
                        "src": "13360:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1615,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13393:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1616,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2140,
                        "src": "13393:21:6",
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
                        "id": 1607,
                        "name": "transferProxy",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1575,
                        "src": "13265:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1609,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1914,
                      "src": "13265:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1617,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13265:159:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1618,
                  "nodeType": "ExpressionStatement",
                  "src": "13265:159:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1622,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13470:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1623,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2142,
                        "src": "13470:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1624,
                        "name": "requiredFees",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1597,
                        "src": "13503:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1625,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2738,
                          "src": "13529:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1626,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "13529:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1627,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13553:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1628,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2140,
                        "src": "13553:21:6",
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
                        "id": 1619,
                        "name": "transferProxy",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1575,
                        "src": "13434:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$1915",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1621,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1914,
                      "src": "13434:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1629,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13434:150:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1630,
                  "nodeType": "ExpressionStatement",
                  "src": "13434:150:6"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1632,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13654:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1633,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2134,
                        "src": "13654:17:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1634,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13685:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1635,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2136,
                        "src": "13685:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1636,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2738,
                          "src": "13718:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1637,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "13718:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1638,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13742:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1639,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2138,
                        "src": "13742:17:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1640,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13773:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1641,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2140,
                        "src": "13773:21:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1642,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "13808:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1643,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "relayerToken",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2142,
                        "src": "13808:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1644,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1567,
                        "src": "13841:13:6",
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
                            "id": 1647,
                            "name": "_makerTokenUsed",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1571,
                            "src": "13898:15:6",
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
                            "id": 1645,
                            "name": "_requiredMakerTokenAmount",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1569,
                            "src": "13868:25:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 1646,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sub",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2612,
                          "src": "13868:29:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 1648,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "13868:46:6",
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
                            "hexValue": "32",
                            "id": 1651,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "13991:1:6",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_2_by_1",
                              "typeString": "int_const 2"
                            },
                            "value": "2"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_2_by_1",
                              "typeString": "int_const 2"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 1649,
                            "name": "requiredFees",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1597,
                            "src": "13974:12:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 1650,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2578,
                          "src": "13974:16:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 1652,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "13974:19:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1653,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1565,
                          "src": "14007:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1654,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2160,
                        "src": "14007:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
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
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 1631,
                      "name": "LogFill",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1156,
                      "src": "13633:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_address_$_t_address_$_t_address_$_t_address_$_t_uint256_$_t_uint256_$_t_uint256_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,address,address,address,address,uint256,uint256,uint256,bytes32)"
                      }
                    },
                    "id": 1655,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "13633:400:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1656,
                  "nodeType": "EmitStatement",
                  "src": "13628:405:6"
                }
              ]
            },
            "documentation": "Calculate and send tokens to taker and relayer\n     * @param  _order                          IssuanceOrder object containing order params\n@param  _fillQuantity                   Quantity of Set to be filled\n@param  _requiredMakerTokenAmount       Max amount of maker token available to fill orders\n@param  _makerTokenUsed                 Amount of maker token used to fill order",
            "id": 1658,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "settleAccounts",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1572,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1565,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 1658,
                  "src": "12446:33:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1564,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2161,
                    "src": "12446:26:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2161_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1567,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1658,
                  "src": "12489:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1566,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "12489:4:6",
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
                  "id": 1569,
                  "name": "_requiredMakerTokenAmount",
                  "nodeType": "VariableDeclaration",
                  "scope": 1658,
                  "src": "12517:30:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1568,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "12517:4:6",
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
                  "id": 1571,
                  "name": "_makerTokenUsed",
                  "nodeType": "VariableDeclaration",
                  "scope": 1658,
                  "src": "12557:20:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1570,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "12557:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "12436:147:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1573,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "12604:0:6"
            },
            "scope": 1796,
            "src": "12413:1627:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 1794,
              "nodeType": "Block",
              "src": "14548:2412:6",
              "statements": [
                {
                  "assignments": [
                    1668
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1668,
                      "name": "vault",
                      "nodeType": "VariableDeclaration",
                      "scope": 1795,
                      "src": "14606:12:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IVault_$1954",
                        "typeString": "contract IVault"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1667,
                        "name": "IVault",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 1954,
                        "src": "14606:6:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$1954",
                          "typeString": "contract IVault"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1673,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1670,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "14628:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1671,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1964,
                        "src": "14628:11:6",
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
                      "id": 1669,
                      "name": "IVault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1954,
                      "src": "14621:6:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_IVault_$1954_$",
                        "typeString": "type(contract IVault)"
                      }
                    },
                    "id": 1672,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "14621:19:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IVault_$1954",
                      "typeString": "contract IVault"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "14606:34:6"
                },
                {
                  "assignments": [
                    1675
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1675,
                      "name": "closedOrderAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1795,
                      "src": "14720:22:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1674,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "14720:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1688,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1682,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "14784:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1683,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderCancels",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1986,
                          "src": "14784:18:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 1686,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1684,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1660,
                            "src": "14803:6:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1685,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2160,
                          "src": "14803:16:6",
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
                        "src": "14784:36:6",
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
                            "id": 1676,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "14745:5:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1677,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderFills",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1982,
                          "src": "14745:16:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                            "typeString": "mapping(bytes32 => uint256)"
                          }
                        },
                        "id": 1680,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1678,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1660,
                            "src": "14762:6:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1679,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "orderHash",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2160,
                          "src": "14762:16:6",
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
                        "src": "14745:34:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 1681,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "add",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2636,
                      "src": "14745:38:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 1687,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "14745:76:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "14720:101:6"
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
                        "id": 1696,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1693,
                              "name": "closedOrderAmount",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1675,
                              "src": "14937:17:6",
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
                                "id": 1690,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1660,
                                "src": "14917:6:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 1691,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "quantity",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2144,
                              "src": "14917:15:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 1692,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sub",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2612,
                            "src": "14917:19:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 1694,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "14917:38:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 1695,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1662,
                          "src": "14959:13:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "14917:55:6",
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
                      "id": 1689,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "14909:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1697,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "14909:64:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1698,
                  "nodeType": "ExpressionStatement",
                  "src": "14909:64:6"
                },
                {
                  "assignments": [
                    1702
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1702,
                      "name": "requiredBalances",
                      "nodeType": "VariableDeclaration",
                      "scope": 1795,
                      "src": "14984:30:6",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                        "typeString": "uint256[]"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 1700,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "14984:4:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1701,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "14984:6:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1710,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1706,
                            "name": "_order",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1660,
                            "src": "15028:6:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                              "typeString": "struct OrderLibrary.IssuanceOrder memory"
                            }
                          },
                          "id": 1707,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "requiredComponents",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2155,
                          "src": "15028:25:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_memory",
                            "typeString": "address[] memory"
                          }
                        },
                        "id": 1708,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "length",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "15028:32:6",
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
                      "id": 1705,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "nodeType": "NewExpression",
                      "src": "15017:10:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
                        "typeString": "function (uint256) pure returns (uint256[] memory)"
                      },
                      "typeName": {
                        "baseType": {
                          "id": 1703,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "15021:4:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1704,
                        "length": null,
                        "nodeType": "ArrayTypeName",
                        "src": "15021:6:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                          "typeString": "uint256[]"
                        }
                      }
                    },
                    "id": 1709,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "15017:44:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_memory",
                      "typeString": "uint256[] memory"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "14984:77:6"
                },
                {
                  "assignments": [
                    1712
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1712,
                      "name": "requiredMakerTokenAmount",
                      "nodeType": "VariableDeclaration",
                      "scope": 1795,
                      "src": "15124:29:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1711,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "15124:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1721,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1715,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1660,
                          "src": "15199:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1716,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerTokenAmount",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2146,
                        "src": "15199:23:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1717,
                        "name": "_fillQuantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1662,
                        "src": "15236:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1718,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1660,
                          "src": "15263:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1719,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "quantity",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2144,
                        "src": "15263:15:6",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 1713,
                        "name": "OrderLibrary",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2323,
                        "src": "15156:12:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                          "typeString": "type(library OrderLibrary)"
                        }
                      },
                      "id": 1714,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "getPartialAmount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2322,
                      "src": "15156:29:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_nonpayable$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256,uint256,uint256) returns (uint256)"
                      }
                    },
                    "id": 1720,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "15156:132:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "15124:164:6"
                },
                {
                  "body": {
                    "id": 1768,
                    "nodeType": "Block",
                    "src": "15427:606:6",
                    "statements": [
                      {
                        "assignments": [
                          1735
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1735,
                            "name": "tokenBalance",
                            "nodeType": "VariableDeclaration",
                            "scope": 1795,
                            "src": "15483:17:6",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 1734,
                              "name": "uint",
                              "nodeType": "ElementaryTypeName",
                              "src": "15483:4:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1745,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 1738,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1660,
                                "src": "15542:6:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 1739,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "makerAddress",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2136,
                              "src": "15542:19:6",
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
                                  "id": 1740,
                                  "name": "_order",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1660,
                                  "src": "15579:6:6",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                    "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                  }
                                },
                                "id": 1741,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "requiredComponents",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2155,
                                "src": "15579:25:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 1743,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1742,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1723,
                                "src": "15605:1:6",
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
                              "src": "15579:28:6",
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
                              "id": 1736,
                              "name": "vault",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1668,
                              "src": "15503:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_contract$_IVault_$1954",
                                "typeString": "contract IVault"
                              }
                            },
                            "id": 1737,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "getOwnerBalance",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 1953,
                            "src": "15503:21:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$returns$_t_uint256_$",
                              "typeString": "function (address,address) external returns (uint256)"
                            }
                          },
                          "id": 1744,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "15503:118:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "15483:138:6"
                      },
                      {
                        "assignments": [
                          1747
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 1747,
                            "name": "requiredAddition",
                            "nodeType": "VariableDeclaration",
                            "scope": 1795,
                            "src": "15699:21:6",
                            "stateVariable": false,
                            "storageLocation": "default",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            "typeName": {
                              "id": 1746,
                              "name": "uint",
                              "nodeType": "ElementaryTypeName",
                              "src": "15699:4:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "value": null,
                            "visibility": "internal"
                          }
                        ],
                        "id": 1758,
                        "initialValue": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 1750,
                                  "name": "_order",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 1660,
                                  "src": "15770:6:6",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                    "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                  }
                                },
                                "id": 1751,
                                "isConstant": false,
                                "isLValue": true,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "requiredComponentAmounts",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2158,
                                "src": "15770:31:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_memory",
                                  "typeString": "uint256[] memory"
                                }
                              },
                              "id": 1753,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1752,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1723,
                                "src": "15802:1:6",
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
                              "src": "15770:34:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1754,
                              "name": "_fillQuantity",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1662,
                              "src": "15822:13:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 1755,
                                "name": "_order",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1660,
                                "src": "15853:6:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                  "typeString": "struct OrderLibrary.IssuanceOrder memory"
                                }
                              },
                              "id": 1756,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "quantity",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2144,
                              "src": "15853:15:6",
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
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 1748,
                              "name": "OrderLibrary",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2323,
                              "src": "15723:12:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_type$_t_contract$_OrderLibrary_$2323_$",
                                "typeString": "type(library OrderLibrary)"
                              }
                            },
                            "id": 1749,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "getPartialAmount",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2322,
                            "src": "15723:29:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_delegatecall_nonpayable$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                              "typeString": "function (uint256,uint256,uint256) returns (uint256)"
                            }
                          },
                          "id": 1757,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "15723:159:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "15699:183:6"
                      },
                      {
                        "expression": {
                          "argumentTypes": null,
                          "id": 1766,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 1759,
                              "name": "requiredBalances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1702,
                              "src": "15966:16:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                                "typeString": "uint256[] memory"
                              }
                            },
                            "id": 1761,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1760,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1723,
                              "src": "15983:1:6",
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
                            "src": "15966:19:6",
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
                                "id": 1764,
                                "name": "requiredAddition",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1747,
                                "src": "16005:16:6",
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
                                "id": 1762,
                                "name": "tokenBalance",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1735,
                                "src": "15988:12:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1763,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "add",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 2636,
                              "src": "15988:16:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                "typeString": "function (uint256,uint256) pure returns (uint256)"
                              }
                            },
                            "id": 1765,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "15988:34:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "15966:56:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1767,
                        "nodeType": "ExpressionStatement",
                        "src": "15966:56:6"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1730,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1726,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1723,
                      "src": "15384:1:6",
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
                          "id": 1727,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1660,
                          "src": "15388:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1728,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "requiredComponents",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2155,
                        "src": "15388:25:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 1729,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "15388:32:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "15384:36:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1769,
                  "initializationExpression": {
                    "assignments": [
                      1723
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1723,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1795,
                        "src": "15370:8:6",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint16",
                          "typeString": "uint16"
                        },
                        "typeName": {
                          "id": 1722,
                          "name": "uint16",
                          "nodeType": "ElementaryTypeName",
                          "src": "15370:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint16",
                            "typeString": "uint16"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1725,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1724,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "15381:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "15370:12:6"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1732,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "15422:3:6",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1731,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1723,
                        "src": "15422:1:6",
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
                    "id": 1733,
                    "nodeType": "ExpressionStatement",
                    "src": "15422:3:6"
                  },
                  "nodeType": "ForStatement",
                  "src": "15365:668:6"
                },
                {
                  "assignments": [
                    1771
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1771,
                      "name": "makerTokenAmountUsed",
                      "nodeType": "VariableDeclaration",
                      "scope": 1795,
                      "src": "16078:25:6",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 1770,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "16078:4:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1777,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1773,
                        "name": "_orderData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1664,
                        "src": "16141:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_memory_ptr",
                          "typeString": "bytes memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1774,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1660,
                          "src": "16165:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1775,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "makerAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2136,
                        "src": "16165:19:6",
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
                      "id": 1772,
                      "name": "executeExchangeOrders",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1499,
                      "src": "16106:21:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_bytes_memory_ptr_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (bytes memory,address) returns (uint256)"
                      }
                    },
                    "id": 1776,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "16106:88:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "16078:116:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1792,
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
                          "id": 1778,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "16863:5:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1782,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderFills",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1982,
                        "src": "16863:16:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                          "typeString": "mapping(bytes32 => uint256)"
                        }
                      },
                      "id": 1783,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1780,
                          "name": "_order",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1660,
                          "src": "16880:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                            "typeString": "struct OrderLibrary.IssuanceOrder memory"
                          }
                        },
                        "id": 1781,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "orderHash",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2160,
                        "src": "16880:16:6",
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
                      "src": "16863:34:6",
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
                          "id": 1790,
                          "name": "_fillQuantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1662,
                          "src": "16939:13:6",
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
                              "id": 1784,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1989,
                              "src": "16900:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$1987_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1785,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderFills",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 1982,
                            "src": "16900:16:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_bytes32_$_t_uint256_$",
                              "typeString": "mapping(bytes32 => uint256)"
                            }
                          },
                          "id": 1788,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1786,
                              "name": "_order",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1660,
                              "src": "16917:6:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                                "typeString": "struct OrderLibrary.IssuanceOrder memory"
                              }
                            },
                            "id": 1787,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "orderHash",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2160,
                            "src": "16917:16:6",
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
                          "src": "16900:34:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 1789,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2636,
                        "src": "16900:38:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 1791,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "16900:53:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "16863:90:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1793,
                  "nodeType": "ExpressionStatement",
                  "src": "16863:90:6"
                }
              ]
            },
            "documentation": "Check exchange orders acquire correct amount of tokens. Settle accounts for taker\nand relayer.\n     * @param  _order               IssuanceOrder object containing order params\n@param  _fillQuantity        Quantity of Set to be filled\n@param  _orderData           Bytestring encoding all exchange order data",
            "id": 1795,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "settleOrder",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1665,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1660,
                  "name": "_order",
                  "nodeType": "VariableDeclaration",
                  "scope": 1795,
                  "src": "14434:33:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_struct$_IssuanceOrder_$2161_memory_ptr",
                    "typeString": "struct OrderLibrary.IssuanceOrder"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 1659,
                    "name": "OrderLibrary.IssuanceOrder",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 2161,
                    "src": "14434:26:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_IssuanceOrder_$2161_storage_ptr",
                      "typeString": "struct OrderLibrary.IssuanceOrder"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1662,
                  "name": "_fillQuantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1795,
                  "src": "14477:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1661,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "14477:4:6",
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
                  "id": 1664,
                  "name": "_orderData",
                  "nodeType": "VariableDeclaration",
                  "scope": 1795,
                  "src": "14505:16:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes_memory_ptr",
                    "typeString": "bytes"
                  },
                  "typeName": {
                    "id": 1663,
                    "name": "bytes",
                    "nodeType": "ElementaryTypeName",
                    "src": "14505:5:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes_storage_ptr",
                      "typeString": "bytes"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "14424:103:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1666,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "14548:0:6"
            },
            "scope": 1796,
            "src": "14404:2556:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          }
        ],
        "scope": 1797,
        "src": "1575:15387:6"
      }
    ],
    "src": "597:16366:6"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T05:35:59.452Z"
}
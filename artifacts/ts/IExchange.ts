export const IExchange = 
{
  "contractName": "IExchange",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "takerAssetFillAmounts",
          "type": "uint256[]"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "batchFillOrders",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "hash",
          "type": "bytes32"
        },
        {
          "name": "signerAddress",
          "type": "address"
        },
        {
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "preSign",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "leftOrder",
          "type": "tuple"
        },
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "rightOrder",
          "type": "tuple"
        },
        {
          "name": "leftSignature",
          "type": "bytes"
        },
        {
          "name": "rightSignature",
          "type": "bytes"
        }
      ],
      "name": "matchOrders",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "name": "makerAssetFilledAmount",
                  "type": "uint256"
                },
                {
                  "name": "takerAssetFilledAmount",
                  "type": "uint256"
                },
                {
                  "name": "makerFeePaid",
                  "type": "uint256"
                },
                {
                  "name": "takerFeePaid",
                  "type": "uint256"
                }
              ],
              "name": "left",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "name": "makerAssetFilledAmount",
                  "type": "uint256"
                },
                {
                  "name": "takerAssetFilledAmount",
                  "type": "uint256"
                },
                {
                  "name": "makerFeePaid",
                  "type": "uint256"
                },
                {
                  "name": "takerFeePaid",
                  "type": "uint256"
                }
              ],
              "name": "right",
              "type": "tuple"
            },
            {
              "name": "leftMakerAssetSpreadAmount",
              "type": "uint256"
            }
          ],
          "name": "matchedFillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "order",
          "type": "tuple"
        },
        {
          "name": "takerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "fillOrderNoThrow",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "fillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        }
      ],
      "name": "batchCancelOrders",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "takerAssetFillAmounts",
          "type": "uint256[]"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "batchFillOrKillOrders",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "targetOrderEpoch",
          "type": "uint256"
        }
      ],
      "name": "cancelOrdersUpTo",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "takerAssetFillAmounts",
          "type": "uint256[]"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "batchFillOrdersNoThrow",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "assetProxyId",
          "type": "bytes4"
        }
      ],
      "name": "getAssetProxy",
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
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "order",
          "type": "tuple"
        },
        {
          "name": "takerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "fillOrKillOrder",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "fillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "validatorAddress",
          "type": "address"
        },
        {
          "name": "approval",
          "type": "bool"
        }
      ],
      "name": "setSignatureValidatorApproval",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "takerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "marketSellOrders",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "assetProxyId",
          "type": "bytes4"
        },
        {
          "name": "newAssetProxy",
          "type": "address"
        },
        {
          "name": "oldAssetProxy",
          "type": "address"
        }
      ],
      "name": "registerAssetProxy",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "hash",
          "type": "bytes32"
        },
        {
          "name": "signerAddress",
          "type": "address"
        },
        {
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "isValidSignature",
      "outputs": [
        {
          "name": "isValid",
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "makerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "marketBuyOrdersNoThrow",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "order",
          "type": "tuple"
        },
        {
          "name": "takerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "fillOrder",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "fillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "salt",
          "type": "uint256"
        },
        {
          "name": "signerAddress",
          "type": "address"
        },
        {
          "name": "data",
          "type": "bytes"
        },
        {
          "name": "signature",
          "type": "bytes"
        }
      ],
      "name": "executeTransaction",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "order",
          "type": "tuple"
        }
      ],
      "name": "getOrderInfo",
      "outputs": [
        {
          "components": [
            {
              "name": "orderStatus",
              "type": "uint8"
            },
            {
              "name": "orderHash",
              "type": "bytes32"
            },
            {
              "name": "orderTakerAssetFilledAmount",
              "type": "uint256"
            }
          ],
          "name": "orderInfo",
          "type": "tuple"
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
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "order",
          "type": "tuple"
        }
      ],
      "name": "cancelOrder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "takerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "marketSellOrdersNoThrow",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "components": [
            {
              "name": "makerAddress",
              "type": "address"
            },
            {
              "name": "takerAddress",
              "type": "address"
            },
            {
              "name": "feeRecipientAddress",
              "type": "address"
            },
            {
              "name": "senderAddress",
              "type": "address"
            },
            {
              "name": "makerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetAmount",
              "type": "uint256"
            },
            {
              "name": "makerFee",
              "type": "uint256"
            },
            {
              "name": "takerFee",
              "type": "uint256"
            },
            {
              "name": "expirationTimeSeconds",
              "type": "uint256"
            },
            {
              "name": "salt",
              "type": "uint256"
            },
            {
              "name": "makerAssetData",
              "type": "bytes"
            },
            {
              "name": "takerAssetData",
              "type": "bytes"
            }
          ],
          "name": "orders",
          "type": "tuple[]"
        },
        {
          "name": "makerAssetFillAmount",
          "type": "uint256"
        },
        {
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "marketBuyOrders",
      "outputs": [
        {
          "components": [
            {
              "name": "makerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "takerAssetFilledAmount",
              "type": "uint256"
            },
            {
              "name": "makerFeePaid",
              "type": "uint256"
            },
            {
              "name": "takerFeePaid",
              "type": "uint256"
            }
          ],
          "name": "totalFillResults",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\npragma experimental ABIEncoderV2;\n\nimport \"./IExchangeCore.sol\";\nimport \"./IMatchOrders.sol\";\nimport \"./ISignatureValidator.sol\";\nimport \"./ITransactions.sol\";\nimport \"./IAssetProxyDispatcher.sol\";\nimport \"./IWrapperFunctions.sol\";\n\ncontract IExchange is\n    IExchangeCore,\n    IMatchOrders,\n    ISignatureValidator,\n    ITransactions,\n    IAssetProxyDispatcher,\n    IWrapperFunctions\n{}\n",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
    "exportedSymbols": {
      "IExchange": [
        4258
      ]
    },
    "id": 4259,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4238,
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
        "id": 4239,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:31"
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchangeCore.sol",
        "file": "./IExchangeCore.sol",
        "id": 4240,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4293,
        "src": "640:29:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IMatchOrders.sol",
        "file": "./IMatchOrders.sol",
        "id": 4241,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4312,
        "src": "670:28:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/ISignatureValidator.sol",
        "file": "./ISignatureValidator.sol",
        "id": 4242,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4342,
        "src": "699:35:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/ITransactions.sol",
        "file": "./ITransactions.sol",
        "id": 4243,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4356,
        "src": "735:29:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IAssetProxyDispatcher.sol",
        "file": "./IAssetProxyDispatcher.sol",
        "id": 4244,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4237,
        "src": "765:37:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
        "file": "./IWrapperFunctions.sol",
        "id": 4245,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4510,
        "src": "803:33:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4246,
              "name": "IExchangeCore",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4292,
              "src": "864:13:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IExchangeCore_$4292",
                "typeString": "contract IExchangeCore"
              }
            },
            "id": 4247,
            "nodeType": "InheritanceSpecifier",
            "src": "864:13:31"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4248,
              "name": "IMatchOrders",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4311,
              "src": "883:12:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IMatchOrders_$4311",
                "typeString": "contract IMatchOrders"
              }
            },
            "id": 4249,
            "nodeType": "InheritanceSpecifier",
            "src": "883:12:31"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4250,
              "name": "ISignatureValidator",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4341,
              "src": "901:19:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ISignatureValidator_$4341",
                "typeString": "contract ISignatureValidator"
              }
            },
            "id": 4251,
            "nodeType": "InheritanceSpecifier",
            "src": "901:19:31"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4252,
              "name": "ITransactions",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4355,
              "src": "926:13:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ITransactions_$4355",
                "typeString": "contract ITransactions"
              }
            },
            "id": 4253,
            "nodeType": "InheritanceSpecifier",
            "src": "926:13:31"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4254,
              "name": "IAssetProxyDispatcher",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4236,
              "src": "945:21:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IAssetProxyDispatcher_$4236",
                "typeString": "contract IAssetProxyDispatcher"
              }
            },
            "id": 4255,
            "nodeType": "InheritanceSpecifier",
            "src": "945:21:31"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4256,
              "name": "IWrapperFunctions",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4509,
              "src": "972:17:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IWrapperFunctions_$4509",
                "typeString": "contract IWrapperFunctions"
              }
            },
            "id": 4257,
            "nodeType": "InheritanceSpecifier",
            "src": "972:17:31"
          }
        ],
        "contractDependencies": [
          4236,
          4292,
          4311,
          4341,
          4355,
          4509
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4258,
        "linearizedBaseContracts": [
          4258,
          4509,
          4236,
          4355,
          4341,
          4311,
          4292
        ],
        "name": "IExchange",
        "nodeType": "ContractDefinition",
        "nodes": [],
        "scope": 4259,
        "src": "838:154:31"
      }
    ],
    "src": "580:413:31"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchange.sol",
    "exportedSymbols": {
      "IExchange": [
        4258
      ]
    },
    "id": 4259,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4238,
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
        "id": 4239,
        "literals": [
          "experimental",
          "ABIEncoderV2"
        ],
        "nodeType": "PragmaDirective",
        "src": "605:33:31"
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IExchangeCore.sol",
        "file": "./IExchangeCore.sol",
        "id": 4240,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4293,
        "src": "640:29:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IMatchOrders.sol",
        "file": "./IMatchOrders.sol",
        "id": 4241,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4312,
        "src": "670:28:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/ISignatureValidator.sol",
        "file": "./ISignatureValidator.sol",
        "id": 4242,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4342,
        "src": "699:35:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/ITransactions.sol",
        "file": "./ITransactions.sol",
        "id": 4243,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4356,
        "src": "735:29:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IAssetProxyDispatcher.sol",
        "file": "./IAssetProxyDispatcher.sol",
        "id": 4244,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4237,
        "src": "765:37:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/external/0x/Exchange/interfaces/IWrapperFunctions.sol",
        "file": "./IWrapperFunctions.sol",
        "id": 4245,
        "nodeType": "ImportDirective",
        "scope": 4259,
        "sourceUnit": 4510,
        "src": "803:33:31",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4246,
              "name": "IExchangeCore",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4292,
              "src": "864:13:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IExchangeCore_$4292",
                "typeString": "contract IExchangeCore"
              }
            },
            "id": 4247,
            "nodeType": "InheritanceSpecifier",
            "src": "864:13:31"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4248,
              "name": "IMatchOrders",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4311,
              "src": "883:12:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IMatchOrders_$4311",
                "typeString": "contract IMatchOrders"
              }
            },
            "id": 4249,
            "nodeType": "InheritanceSpecifier",
            "src": "883:12:31"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4250,
              "name": "ISignatureValidator",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4341,
              "src": "901:19:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ISignatureValidator_$4341",
                "typeString": "contract ISignatureValidator"
              }
            },
            "id": 4251,
            "nodeType": "InheritanceSpecifier",
            "src": "901:19:31"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4252,
              "name": "ITransactions",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4355,
              "src": "926:13:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ITransactions_$4355",
                "typeString": "contract ITransactions"
              }
            },
            "id": 4253,
            "nodeType": "InheritanceSpecifier",
            "src": "926:13:31"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4254,
              "name": "IAssetProxyDispatcher",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4236,
              "src": "945:21:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IAssetProxyDispatcher_$4236",
                "typeString": "contract IAssetProxyDispatcher"
              }
            },
            "id": 4255,
            "nodeType": "InheritanceSpecifier",
            "src": "945:21:31"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4256,
              "name": "IWrapperFunctions",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4509,
              "src": "972:17:31",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IWrapperFunctions_$4509",
                "typeString": "contract IWrapperFunctions"
              }
            },
            "id": 4257,
            "nodeType": "InheritanceSpecifier",
            "src": "972:17:31"
          }
        ],
        "contractDependencies": [
          4236,
          4292,
          4311,
          4341,
          4355,
          4509
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": false,
        "id": 4258,
        "linearizedBaseContracts": [
          4258,
          4509,
          4236,
          4355,
          4341,
          4311,
          4292
        ],
        "name": "IExchange",
        "nodeType": "ContractDefinition",
        "nodes": [],
        "scope": 4259,
        "src": "838:154:31"
      }
    ],
    "src": "580:413:31"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.374Z"
}
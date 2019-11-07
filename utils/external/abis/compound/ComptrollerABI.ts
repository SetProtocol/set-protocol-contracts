export const ComptrollerABI = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "action",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "pauseState",
                "type": "bool"
            }
        ],
        "name": "ActionPaused",
        "type": "event",
        "signature": "0xef159d9a32b2472e32b098f954f3ce62d232939f1c207070b584df1814de2de0"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "error",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "info",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "detail",
                "type": "uint256"
            }
        ],
        "name": "Failure",
        "type": "event",
        "signature": "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "MarketEntered",
        "type": "event",
        "signature": "0x3ab23ab0d51cccc0c3085aec51f99228625aa1a922b3a8ca89a26b0f2027a1a5"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "MarketExited",
        "type": "event",
        "signature": "0xe699a64c18b07ac5b7301aa273f36a2287239eb9501d81950672794afba29a0d"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            }
        ],
        "name": "MarketListed",
        "type": "event",
        "signature": "0xcf583bb0c569eb967f806b11601c4cb93c10310485c67add5f8362c2f212321f"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldCloseFactorMantissa",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newCloseFactorMantissa",
                "type": "uint256"
            }
        ],
        "name": "NewCloseFactor",
        "type": "event",
        "signature": "0x3b9670cf975d26958e754b57098eaa2ac914d8d2a31b83257997b9f346110fd9"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldCollateralFactorMantissa",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newCollateralFactorMantissa",
                "type": "uint256"
            }
        ],
        "name": "NewCollateralFactor",
        "type": "event",
        "signature": "0x70483e6592cd5182d45ac970e05bc62cdcc90e9d8ef2c2dbe686cf383bcd7fc5"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldLiquidationIncentiveMantissa",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newLiquidationIncentiveMantissa",
                "type": "uint256"
            }
        ],
        "name": "NewLiquidationIncentive",
        "type": "event",
        "signature": "0xaeba5a6c40a8ac138134bff1aaa65debf25971188a58804bad717f82f0ec1316"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldMaxAssets",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newMaxAssets",
                "type": "uint256"
            }
        ],
        "name": "NewMaxAssets",
        "type": "event",
        "signature": "0x7093cf1eb653f749c3ff531d6df7f92764536a7fa0d13530cd26e070780c32ea"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "oldPauseGuardian",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "newPauseGuardian",
                "type": "address"
            }
        ],
        "name": "NewPauseGuardian",
        "type": "event",
        "signature": "0x0613b6ee6a04f0d09f390e4d9318894b9f6ac7fd83897cd8d18896ba579c401e"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "contract PriceOracle",
                "name": "oldPriceOracle",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "contract PriceOracle",
                "name": "newPriceOracle",
                "type": "address"
            }
        ],
        "name": "NewPriceOracle",
        "type": "event",
        "signature": "0xd52b2b9b7e9ee655fcb95d2e5b9e0c9f69e7ef2b8e9d2d0ea78402d576d22e22"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "contract Unitroller",
                "name": "unitroller",
                "type": "address"
            }
        ],
        "name": "_become",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x1d504dc6"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bool",
                "name": "state",
                "type": "bool"
            }
        ],
        "name": "_setBorrowPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x56133fc8"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newCloseFactorMantissa",
                "type": "uint256"
            }
        ],
        "name": "_setCloseFactor",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x317b0b77"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "newCollateralFactorMantissa",
                "type": "uint256"
            }
        ],
        "name": "_setCollateralFactor",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xe4028eee"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newLiquidationIncentiveMantissa",
                "type": "uint256"
            }
        ],
        "name": "_setLiquidationIncentive",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x4fd42e17"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newMaxAssets",
                "type": "uint256"
            }
        ],
        "name": "_setMaxAssets",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xd9226ced"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bool",
                "name": "state",
                "type": "bool"
            }
        ],
        "name": "_setMintPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x9845f280"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "newPauseGuardian",
                "type": "address"
            }
        ],
        "name": "_setPauseGuardian",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x5f5af1aa"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "contract PriceOracle",
                "name": "newOracle",
                "type": "address"
            }
        ],
        "name": "_setPriceOracle",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x55ee1fe1"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bool",
                "name": "state",
                "type": "bool"
            }
        ],
        "name": "_setSeizePaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x2d70db78"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bool",
                "name": "state",
                "type": "bool"
            }
        ],
        "name": "_setTransferPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x8ebf6364"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            }
        ],
        "name": "_supportMarket",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa76b3fda"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "accountAssets",
        "outputs": [
            {
                "internalType": "contract CToken",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xdce15449"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf851a440"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "blockNumber",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x57e871e7"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "borrowAmount",
                "type": "uint256"
            }
        ],
        "name": "borrowAllowed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xda3d454c"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "borrowGuardianPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x9530f644"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "borrowAmount",
                "type": "uint256"
            }
        ],
        "name": "borrowVerify",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x5c778605"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            }
        ],
        "name": "checkMembership",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x929fe9a1"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "closeFactorMantissa",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xe8755446"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "comptrollerImplementation",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xbb82aa5e"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address[]",
                "name": "cTokens",
                "type": "address[]"
            }
        ],
        "name": "enterMarkets",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xc2998238"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cTokenAddress",
                "type": "address"
            }
        ],
        "name": "exitMarket",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xede4edd0"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "blocks",
                "type": "uint256"
            }
        ],
        "name": "fastForward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xfccbe7f6"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "getAccountLiquidity",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x5ec88c79"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "getAssetsIn",
        "outputs": [
            {
                "internalType": "contract CToken[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xabfceffc"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "cTokenModify",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "redeemTokens",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "borrowAmount",
                "type": "uint256"
            }
        ],
        "name": "getHypotheticalAccountLiquidity",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x4e79238f"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isComptroller",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x007e3dd2"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cTokenBorrowed",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "cTokenCollateral",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "liquidator",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "repayAmount",
                "type": "uint256"
            }
        ],
        "name": "liquidateBorrowAllowed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x5fc7e71e"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cTokenBorrowed",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "cTokenCollateral",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "liquidator",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "repayAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "seizeTokens",
                "type": "uint256"
            }
        ],
        "name": "liquidateBorrowVerify",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x47ef3b3b"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "cTokenBorrowed",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "cTokenCollateral",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "repayAmount",
                "type": "uint256"
            }
        ],
        "name": "liquidateCalculateSeizeTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xc488847b"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "liquidationIncentiveMantissa",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x4ada90af"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "markets",
        "outputs": [
            {
                "internalType": "bool",
                "name": "isListed",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "collateralFactorMantissa",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8e8f294b"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "maxAssets",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x94b2294b"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            }
        ],
        "name": "membershipLength",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x4bca0d8c"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "minter",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "mintAmount",
                "type": "uint256"
            }
        ],
        "name": "mintAllowed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x4ef4c3e1"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "mintGuardianPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x5dce0515"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "minter",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "mintAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "mintTokens",
                "type": "uint256"
            }
        ],
        "name": "mintVerify",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x41c728b9"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "oracle",
        "outputs": [
            {
                "internalType": "contract PriceOracle",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x7dc0d1d0"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "pauseGuardian",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x24a3d622"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "pendingAdmin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x26782247"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "pendingComptrollerImplementation",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xdcfbc0c7"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "redeemer",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "redeemTokens",
                "type": "uint256"
            }
        ],
        "name": "redeemAllowed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xeabe7d91"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "redeemer",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "redeemAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "redeemTokens",
                "type": "uint256"
            }
        ],
        "name": "redeemVerify",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x51dff989"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "payer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "repayAmount",
                "type": "uint256"
            }
        ],
        "name": "repayBorrowAllowed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x24008a62"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "payer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "repayAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "borrowerIndex",
                "type": "uint256"
            }
        ],
        "name": "repayBorrowVerify",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x1ededc91"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cTokenCollateral",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "cTokenBorrowed",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "liquidator",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "seizeTokens",
                "type": "uint256"
            }
        ],
        "name": "seizeAllowed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xd02f7351"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "seizeGuardianPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xac0b0bb7"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cTokenCollateral",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "cTokenBorrowed",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "liquidator",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "seizeTokens",
                "type": "uint256"
            }
        ],
        "name": "seizeVerify",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x6d35bf91"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "number",
                "type": "uint256"
            }
        ],
        "name": "setBlockNumber",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa8c3c850"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "src",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "dst",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "transferTokens",
                "type": "uint256"
            }
        ],
        "name": "transferAllowed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xbdcdc258"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "transferGuardianPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x87f76303"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "cToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "src",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "dst",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "transferTokens",
                "type": "uint256"
            }
        ],
        "name": "transferVerify",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x6a56947e"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "contract CToken",
                "name": "cToken",
                "type": "address"
            }
        ],
        "name": "unlist",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xbde3672d"
    }
]
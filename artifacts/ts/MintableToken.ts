export const MintableToken = 
{
  "contractName": "MintableToken",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "mintingFinished",
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
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
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
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
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
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
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
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
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
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
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
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
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
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
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
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "MintFinished",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipRenounced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "finishMinting",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040526000600360146101000a81548160ff02191690831515021790555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061173d8061006f6000396000f3006080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305d2035b146100d5578063095ea7b31461010457806318160ddd1461016957806323b872dd1461019457806340c10f1914610219578063661884631461027e57806370a08231146102e3578063715018a61461033a5780637d64bcb4146103515780638da5cb5b14610380578063a9059cbb146103d7578063d73dd6231461043c578063dd62ed3e146104a1578063f2fde38b14610518575b600080fd5b3480156100e157600080fd5b506100ea61055b565b604051808215151515815260200191505060405180910390f35b34801561011057600080fd5b5061014f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061056e565b604051808215151515815260200191505060405180910390f35b34801561017557600080fd5b5061017e610660565b6040518082815260200191505060405180910390f35b3480156101a057600080fd5b506101ff600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061066a565b604051808215151515815260200191505060405180910390f35b34801561022557600080fd5b50610264600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a24565b604051808215151515815260200191505060405180910390f35b34801561028a57600080fd5b506102c9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c0a565b604051808215151515815260200191505060405180910390f35b3480156102ef57600080fd5b50610324600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e9b565b6040518082815260200191505060405180910390f35b34801561034657600080fd5b5061034f610ee3565b005b34801561035d57600080fd5b50610366610fe8565b604051808215151515815260200191505060405180910390f35b34801561038c57600080fd5b506103956110b0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103e357600080fd5b50610422600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110d6565b604051808215151515815260200191505060405180910390f35b34801561044857600080fd5b50610487600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506112f5565b604051808215151515815260200191505060405180910390f35b3480156104ad57600080fd5b50610502600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506114f1565b6040518082815260200191505060405180910390f35b34801561052457600080fd5b50610559600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611578565b005b600360149054906101000a900460ff1681565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156106a757600080fd5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156106f457600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561077f57600080fd5b6107d0826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115e090919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610863826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115f990919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061093482600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115e090919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a8257600080fd5b600360149054906101000a900460ff16151515610a9e57600080fd5b610ab3826001546115f990919063ffffffff16565b600181905550610b0a826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115f990919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885836040518082815260200191505060405180910390a28273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080831115610d1b576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610daf565b610d2e83826115e090919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610f3f57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a26000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561104657600080fd5b600360149054906101000a900460ff1615151561106257600080fd5b6001600360146101000a81548160ff0219169083151502179055507fae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa0860405160405180910390a16001905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561111357600080fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561116057600080fd5b6111b1826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115e090919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611244826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115f990919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600061138682600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115f990919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156115d457600080fd5b6115dd81611615565b50565b60008282111515156115ee57fe5b818303905092915050565b6000818301905082811015151561160c57fe5b80905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561165157600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582017727eef96a0866d5a3134173d5ffac32fd13d72efde908792ccd32a0910f10c0029",
  "deployedBytecode": "0x6080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305d2035b146100d5578063095ea7b31461010457806318160ddd1461016957806323b872dd1461019457806340c10f1914610219578063661884631461027e57806370a08231146102e3578063715018a61461033a5780637d64bcb4146103515780638da5cb5b14610380578063a9059cbb146103d7578063d73dd6231461043c578063dd62ed3e146104a1578063f2fde38b14610518575b600080fd5b3480156100e157600080fd5b506100ea61055b565b604051808215151515815260200191505060405180910390f35b34801561011057600080fd5b5061014f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061056e565b604051808215151515815260200191505060405180910390f35b34801561017557600080fd5b5061017e610660565b6040518082815260200191505060405180910390f35b3480156101a057600080fd5b506101ff600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061066a565b604051808215151515815260200191505060405180910390f35b34801561022557600080fd5b50610264600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a24565b604051808215151515815260200191505060405180910390f35b34801561028a57600080fd5b506102c9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c0a565b604051808215151515815260200191505060405180910390f35b3480156102ef57600080fd5b50610324600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e9b565b6040518082815260200191505060405180910390f35b34801561034657600080fd5b5061034f610ee3565b005b34801561035d57600080fd5b50610366610fe8565b604051808215151515815260200191505060405180910390f35b34801561038c57600080fd5b506103956110b0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103e357600080fd5b50610422600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110d6565b604051808215151515815260200191505060405180910390f35b34801561044857600080fd5b50610487600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506112f5565b604051808215151515815260200191505060405180910390f35b3480156104ad57600080fd5b50610502600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506114f1565b6040518082815260200191505060405180910390f35b34801561052457600080fd5b50610559600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611578565b005b600360149054906101000a900460ff1681565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156106a757600080fd5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156106f457600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561077f57600080fd5b6107d0826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115e090919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610863826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115f990919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061093482600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115e090919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a8257600080fd5b600360149054906101000a900460ff16151515610a9e57600080fd5b610ab3826001546115f990919063ffffffff16565b600181905550610b0a826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115f990919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885836040518082815260200191505060405180910390a28273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080831115610d1b576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610daf565b610d2e83826115e090919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610f3f57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a26000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561104657600080fd5b600360149054906101000a900460ff1615151561106257600080fd5b6001600360146101000a81548160ff0219169083151502179055507fae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa0860405160405180910390a16001905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561111357600080fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561116057600080fd5b6111b1826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115e090919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611244826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115f990919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600061138682600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115f990919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156115d457600080fd5b6115dd81611615565b50565b60008282111515156115ee57fe5b818303905092915050565b6000818301905082811015151561160c57fe5b80905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561165157600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582017727eef96a0866d5a3134173d5ffac32fd13d72efde908792ccd32a0910f10c0029",
  "sourceMap": "390:1114:44:-;;;548:5;518:35;;;;;;;;;;;;;;;;;;;;575:10:39;567:5;;:18;;;;;;;;;;;;;;;;;;390:1114:44;;;;;;",
  "deployedSourceMap": "390:1114:44:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;518:35;;8:9:-1;5:2;;;30:1;27;20:12;5:2;518:35:44;;;;;;;;;;;;;;;;;;;;;;;;;;;1829:188:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1829:188:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;371:83:40;;8:9:-1;5:2;;;30:1;27;20:12;5:2;371:83:40;;;;;;;;;;;;;;;;;;;;;;;736:470:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;736:470:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;936:312:44;;8:9:-1;5:2;;;30:1;27;20:12;5:2;936:312:44;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3701:425:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3701:425:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1131:99:40;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1131:99:40;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;827:111:39;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:39;;;;;;1362:140:44;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1362:140:44;;;;;;;;;;;;;;;;;;;;;;;;;;;238:20:39;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:39;;;;;;;;;;;;;;;;;;;;;;;;;;;608:321:40;;8:9:-1;5:2;;;30:1;27;20:12;5:2;608:321:40;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2946:293:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2946:293:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2336:153;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2336:153:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1100:103:39;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1100:103:39;;;;;;;;;;;;;;;;;;;;;;;;;;;;518:35:44;;;;;;;;;;;;;:::o;1829:188:45:-;1896:4;1940:6;1908:7;:19;1916:10;1908:19;;;;;;;;;;;;;;;:29;1928:8;1908:29;;;;;;;;;;;;;;;:38;;;;1978:8;1957:38;;1966:10;1957:38;;;1988:6;1957:38;;;;;;;;;;;;;;;;;;2008:4;2001:11;;1829:188;;;;:::o;371:83:40:-;415:7;437:12;;430:19;;371:83;:::o;736:470:45:-;842:4;879:1;864:17;;:3;:17;;;;856:26;;;;;;;;906:8;:15;915:5;906:15;;;;;;;;;;;;;;;;896:6;:25;;888:34;;;;;;;;946:7;:14;954:5;946:14;;;;;;;;;;;;;;;:26;961:10;946:26;;;;;;;;;;;;;;;;936:6;:36;;928:45;;;;;;;;998:27;1018:6;998:8;:15;1007:5;998:15;;;;;;;;;;;;;;;;:19;;:27;;;;:::i;:::-;980:8;:15;989:5;980:15;;;;;;;;;;;;;;;:45;;;;1047:25;1065:6;1047:8;:13;1056:3;1047:13;;;;;;;;;;;;;;;;:17;;:25;;;;:::i;:::-;1031:8;:13;1040:3;1031:13;;;;;;;;;;;;;;;:41;;;;1107:38;1138:6;1107:7;:14;1115:5;1107:14;;;;;;;;;;;;;;;:26;1122:10;1107:26;;;;;;;;;;;;;;;;:30;;:38;;;;:::i;:::-;1078:7;:14;1086:5;1078:14;;;;;;;;;;;;;;;:26;1093:10;1078:26;;;;;;;;;;;;;;;:67;;;;1172:3;1156:28;;1165:5;1156:28;;;1177:6;1156:28;;;;;;;;;;;;;;;;;;1197:4;1190:11;;736:470;;;;;:::o;936:312:44:-;1050:4;682:5;;;;;;;;;;;668:19;;:10;:19;;;660:28;;;;;;;;593:15;;;;;;;;;;;592:16;584:25;;;;;;;;1079;1096:7;1079:12;;:16;;:25;;;;:::i;:::-;1064:12;:40;;;;1126:26;1144:7;1126:8;:13;1135:3;1126:13;;;;;;;;;;;;;;;;:17;;:26;;;;:::i;:::-;1110:8;:13;1119:3;1110:13;;;;;;;;;;;;;;;:42;;;;1168:3;1163:18;;;1173:7;1163:18;;;;;;;;;;;;;;;;;;1213:3;1192:34;;1209:1;1192:34;;;1218:7;1192:34;;;;;;;;;;;;;;;;;;1239:4;1232:11;;936:312;;;;:::o;3701:425:45:-;3804:4;3818:13;3834:7;:19;3842:10;3834:19;;;;;;;;;;;;;;;:29;3854:8;3834:29;;;;;;;;;;;;;;;;3818:45;;3892:8;3873:16;:27;3869:164;;;3942:1;3910:7;:19;3918:10;3910:19;;;;;;;;;;;;;;;:29;3930:8;3910:29;;;;;;;;;;;;;;;:33;;;;3869:164;;;3996:30;4009:16;3996:8;:12;;:30;;;;:::i;:::-;3964:7;:19;3972:10;3964:19;;;;;;;;;;;;;;;:29;3984:8;3964:29;;;;;;;;;;;;;;;:62;;;;3869:164;4064:8;4043:61;;4052:10;4043:61;;;4074:7;:19;4082:10;4074:19;;;;;;;;;;;;;;;:29;4094:8;4074:29;;;;;;;;;;;;;;;;4043:61;;;;;;;;;;;;;;;;;;4117:4;4110:11;;3701:425;;;;;:::o;1131:99:40:-;1187:7;1209:8;:16;1218:6;1209:16;;;;;;;;;;;;;;;;1202:23;;1131:99;;;:::o;827:111:39:-;719:5;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;903:5;;;;;;;;;;;884:25;;;;;;;;;;;;931:1;915:5;;:18;;;;;;;;;;;;;;;;;;827:111::o;1362:140:44:-;1421:4;719:5:39;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;593:15:44;;;;;;;;;;;592:16;584:25;;;;;;;;1451:4;1433:15;;:22;;;;;;;;;;;;;;;;;;1466:14;;;;;;;;;;1493:4;1486:11;;1362:140;:::o;238:20:39:-;;;;;;;;;;;;;:::o;608:321:40:-;671:4;706:1;691:17;;:3;:17;;;;683:26;;;;;;;;733:8;:20;742:10;733:20;;;;;;;;;;;;;;;;723:6;:30;;715:39;;;;;;;;784:32;809:6;784:8;:20;793:10;784:20;;;;;;;;;;;;;;;;:24;;:32;;;;:::i;:::-;761:8;:20;770:10;761:20;;;;;;;;;;;;;;;:55;;;;838:25;856:6;838:8;:13;847:3;838:13;;;;;;;;;;;;;;;;:17;;:25;;;;:::i;:::-;822:8;:13;831:3;822:13;;;;;;;;;;;;;;;:41;;;;895:3;874:33;;883:10;874:33;;;900:6;874:33;;;;;;;;;;;;;;;;;;920:4;913:11;;608:321;;;;:::o;2946:293:45:-;3044:4;3098:46;3132:11;3098:7;:19;3106:10;3098:19;;;;;;;;;;;;;;;:29;3118:8;3098:29;;;;;;;;;;;;;;;;:33;;:46;;;;:::i;:::-;3058:7;:19;3066:10;3058:19;;;;;;;;;;;;;;;:29;3078:8;3058:29;;;;;;;;;;;;;;;:87;;;;3177:8;3156:61;;3165:10;3156:61;;;3187:7;:19;3195:10;3187:19;;;;;;;;;;;;;;;:29;3207:8;3187:29;;;;;;;;;;;;;;;;3156:61;;;;;;;;;;;;;;;;;;3230:4;3223:11;;2946:293;;;;:::o;2336:153::-;2435:7;2459;:15;2467:6;2459:15;;;;;;;;;;;;;;;:25;2475:8;2459:25;;;;;;;;;;;;;;;;2452:32;;2336:153;;;;:::o;1100:103:39:-;719:5;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;1042:110:38:-;1100:7;1127:1;1122;:6;;1115:14;;;;;;1146:1;1142;:5;1135:12;;1042:110;;;;:::o;1214:123::-;1272:9;1297:1;1293;:5;1289:9;;1316:1;1311;:6;;1304:14;;;;;;1331:1;1324:8;;1214:123;;;;:::o;1338:171:39:-;1429:1;1408:23;;:9;:23;;;;1400:32;;;;;;;;1471:9;1443:38;;1464:5;;;;;;;;;;;1443:38;;;;;;;;;;;;1495:9;1487:5;;:17;;;;;;;;;;;;;;;;;;1338:171;:::o",
  "source": "pragma solidity ^0.4.23;\n\nimport \"./StandardToken.sol\";\nimport \"../../ownership/Ownable.sol\";\n\n\n/**\n * @title Mintable token\n * @dev Simple ERC20 Token example, with mintable token creation\n * @dev Issue: * https://github.com/OpenZeppelin/openzeppelin-solidity/issues/120\n * Based on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol\n */\ncontract MintableToken is StandardToken, Ownable {\n  event Mint(address indexed to, uint256 amount);\n  event MintFinished();\n\n  bool public mintingFinished = false;\n\n\n  modifier canMint() {\n    require(!mintingFinished);\n    _;\n  }\n\n  modifier hasMintPermission() {\n    require(msg.sender == owner);\n    _;\n  }\n\n  /**\n   * @dev Function to mint tokens\n   * @param _to The address that will receive the minted tokens.\n   * @param _amount The amount of tokens to mint.\n   * @return A boolean that indicates if the operation was successful.\n   */\n  function mint(\n    address _to,\n    uint256 _amount\n  )\n    hasMintPermission\n    canMint\n    public\n    returns (bool)\n  {\n    totalSupply_ = totalSupply_.add(_amount);\n    balances[_to] = balances[_to].add(_amount);\n    emit Mint(_to, _amount);\n    emit Transfer(address(0), _to, _amount);\n    return true;\n  }\n\n  /**\n   * @dev Function to stop minting new tokens.\n   * @return True if the operation was successful.\n   */\n  function finishMinting() onlyOwner canMint public returns (bool) {\n    mintingFinished = true;\n    emit MintFinished();\n    return true;\n  }\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol",
    "exportedSymbols": {
      "MintableToken": [
        5135
      ]
    },
    "id": 5136,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5031,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:44"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "file": "./StandardToken.sol",
        "id": 5032,
        "nodeType": "ImportDirective",
        "scope": 5136,
        "sourceUnit": 5383,
        "src": "26:29:44",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "../../ownership/Ownable.sol",
        "id": 5033,
        "nodeType": "ImportDirective",
        "scope": 5136,
        "sourceUnit": 4825,
        "src": "56:37:44",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5034,
              "name": "StandardToken",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5382,
              "src": "416:13:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_StandardToken_$5382",
                "typeString": "contract StandardToken"
              }
            },
            "id": 5035,
            "nodeType": "InheritanceSpecifier",
            "src": "416:13:44"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5036,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4824,
              "src": "431:7:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$4824",
                "typeString": "contract Ownable"
              }
            },
            "id": 5037,
            "nodeType": "InheritanceSpecifier",
            "src": "431:7:44"
          }
        ],
        "contractDependencies": [
          4824,
          4920,
          4997,
          5029,
          5382
        ],
        "contractKind": "contract",
        "documentation": "@title Mintable token\n@dev Simple ERC20 Token example, with mintable token creation\n@dev Issue: * https://github.com/OpenZeppelin/openzeppelin-solidity/issues/120\nBased on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol",
        "fullyImplemented": true,
        "id": 5135,
        "linearizedBaseContracts": [
          5135,
          4824,
          5382,
          4920,
          4997,
          5029
        ],
        "name": "MintableToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "anonymous": false,
            "documentation": null,
            "id": 5043,
            "name": "Mint",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5042,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5039,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5043,
                  "src": "454:18:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5038,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "454:7:44",
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
                  "id": 5041,
                  "indexed": false,
                  "name": "amount",
                  "nodeType": "VariableDeclaration",
                  "scope": 5043,
                  "src": "474:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5040,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "474:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "453:36:44"
            },
            "src": "443:47:44"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5045,
            "name": "MintFinished",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5044,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "511:2:44"
            },
            "src": "493:21:44"
          },
          {
            "constant": false,
            "id": 5048,
            "name": "mintingFinished",
            "nodeType": "VariableDeclaration",
            "scope": 5135,
            "src": "518:35:44",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bool",
              "typeString": "bool"
            },
            "typeName": {
              "id": 5046,
              "name": "bool",
              "nodeType": "ElementaryTypeName",
              "src": "518:4:44",
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "66616c7365",
              "id": 5047,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "bool",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "548:5:44",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              },
              "value": "false"
            },
            "visibility": "public"
          },
          {
            "body": {
              "id": 5056,
              "nodeType": "Block",
              "src": "578:43:44",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5052,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "592:16:44",
                        "subExpression": {
                          "argumentTypes": null,
                          "id": 5051,
                          "name": "mintingFinished",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5048,
                          "src": "593:15:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
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
                      "id": 5050,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5400,
                      "src": "584:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5053,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "584:25:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5054,
                  "nodeType": "ExpressionStatement",
                  "src": "584:25:44"
                },
                {
                  "id": 5055,
                  "nodeType": "PlaceholderStatement",
                  "src": "615:1:44"
                }
              ]
            },
            "documentation": null,
            "id": 5057,
            "name": "canMint",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 5049,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "575:2:44"
            },
            "src": "559:62:44",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 5067,
              "nodeType": "Block",
              "src": "654:46:44",
              "statements": [
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
                        "id": 5063,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5060,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5397,
                            "src": "668:3:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 5061,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "668:10:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 5062,
                          "name": "owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4742,
                          "src": "682:5:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "668:19:44",
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
                      "id": 5059,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5400,
                      "src": "660:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5064,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "660:28:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5065,
                  "nodeType": "ExpressionStatement",
                  "src": "660:28:44"
                },
                {
                  "id": 5066,
                  "nodeType": "PlaceholderStatement",
                  "src": "694:1:44"
                }
              ]
            },
            "documentation": null,
            "id": 5068,
            "name": "hasMintPermission",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 5058,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "651:2:44"
            },
            "src": "625:75:44",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 5114,
              "nodeType": "Block",
              "src": "1058:190:44",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5086,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5081,
                      "name": "totalSupply_",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4839,
                      "src": "1064:12:44",
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
                          "id": 5084,
                          "name": "_amount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5072,
                          "src": "1096:7:44",
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
                          "id": 5082,
                          "name": "totalSupply_",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4839,
                          "src": "1079:12:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 5083,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4737,
                        "src": "1079:16:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 5085,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1079:25:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1064:40:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 5087,
                  "nodeType": "ExpressionStatement",
                  "src": "1064:40:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5097,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 5088,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4837,
                        "src": "1110:8:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 5090,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 5089,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5070,
                        "src": "1119:3:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "1110:13:44",
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
                          "id": 5095,
                          "name": "_amount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5072,
                          "src": "1144:7:44",
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
                            "id": 5091,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4837,
                            "src": "1126:8:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 5093,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 5092,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5070,
                            "src": "1135:3:44",
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
                          "src": "1126:13:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 5094,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4737,
                        "src": "1126:17:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 5096,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1126:26:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1110:42:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 5098,
                  "nodeType": "ExpressionStatement",
                  "src": "1110:42:44"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5100,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5070,
                        "src": "1168:3:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5101,
                        "name": "_amount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5072,
                        "src": "1173:7:44",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 5099,
                      "name": "Mint",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5043,
                      "src": "1163:4:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256)"
                      }
                    },
                    "id": 5102,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1163:18:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5103,
                  "nodeType": "EmitStatement",
                  "src": "1158:23:44"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 5106,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1209:1:44",
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
                          "id": 5105,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "1201:7:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 5107,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1201:10:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5108,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5070,
                        "src": "1213:3:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5109,
                        "name": "_amount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5072,
                        "src": "1218:7:44",
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
                      "id": 5104,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5028,
                      "src": "1192:8:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 5110,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1192:34:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5111,
                  "nodeType": "EmitStatement",
                  "src": "1187:39:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 5112,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "1239:4:44",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 5080,
                  "id": 5113,
                  "nodeType": "Return",
                  "src": "1232:11:44"
                }
              ]
            },
            "documentation": "@dev Function to mint tokens\n@param _to The address that will receive the minted tokens.\n@param _amount The amount of tokens to mint.\n@return A boolean that indicates if the operation was successful.",
            "id": 5115,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 5075,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5074,
                  "name": "hasMintPermission",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5068,
                  "src": "996:17:44",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "996:17:44"
              },
              {
                "arguments": null,
                "id": 5077,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5076,
                  "name": "canMint",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5057,
                  "src": "1018:7:44",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1018:7:44"
              }
            ],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5073,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5070,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5115,
                  "src": "955:11:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5069,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "955:7:44",
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
                  "id": 5072,
                  "name": "_amount",
                  "nodeType": "VariableDeclaration",
                  "scope": 5115,
                  "src": "972:15:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5071,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "972:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "949:42:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 5080,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5079,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5115,
                  "src": "1050:4:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5078,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1050:4:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1049:6:44"
            },
            "scope": 5135,
            "src": "936:312:44",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5133,
              "nodeType": "Block",
              "src": "1427:75:44",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5126,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5124,
                      "name": "mintingFinished",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5048,
                      "src": "1433:15:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 5125,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1451:4:44",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "1433:22:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 5127,
                  "nodeType": "ExpressionStatement",
                  "src": "1433:22:44"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "id": 5128,
                      "name": "MintFinished",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5045,
                      "src": "1466:12:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$__$returns$__$",
                        "typeString": "function ()"
                      }
                    },
                    "id": 5129,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1466:14:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5130,
                  "nodeType": "EmitStatement",
                  "src": "1461:19:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 5131,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "1493:4:44",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 5123,
                  "id": 5132,
                  "nodeType": "Return",
                  "src": "1486:11:44"
                }
              ]
            },
            "documentation": "@dev Function to stop minting new tokens.\n@return True if the operation was successful.",
            "id": 5134,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 5118,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5117,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "1387:9:44",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1387:9:44"
              },
              {
                "arguments": null,
                "id": 5120,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5119,
                  "name": "canMint",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5057,
                  "src": "1397:7:44",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1397:7:44"
              }
            ],
            "name": "finishMinting",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5116,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1384:2:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 5123,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5122,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5134,
                  "src": "1421:4:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5121,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1421:4:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1420:6:44"
            },
            "scope": 5135,
            "src": "1362:140:44",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5136,
        "src": "390:1114:44"
      }
    ],
    "src": "0:1505:44"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol",
    "exportedSymbols": {
      "MintableToken": [
        5135
      ]
    },
    "id": 5136,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5031,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".23"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:44"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "file": "./StandardToken.sol",
        "id": 5032,
        "nodeType": "ImportDirective",
        "scope": 5136,
        "sourceUnit": 5383,
        "src": "26:29:44",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "../../ownership/Ownable.sol",
        "id": 5033,
        "nodeType": "ImportDirective",
        "scope": 5136,
        "sourceUnit": 4825,
        "src": "56:37:44",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5034,
              "name": "StandardToken",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5382,
              "src": "416:13:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_StandardToken_$5382",
                "typeString": "contract StandardToken"
              }
            },
            "id": 5035,
            "nodeType": "InheritanceSpecifier",
            "src": "416:13:44"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5036,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4824,
              "src": "431:7:44",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$4824",
                "typeString": "contract Ownable"
              }
            },
            "id": 5037,
            "nodeType": "InheritanceSpecifier",
            "src": "431:7:44"
          }
        ],
        "contractDependencies": [
          4824,
          4920,
          4997,
          5029,
          5382
        ],
        "contractKind": "contract",
        "documentation": "@title Mintable token\n@dev Simple ERC20 Token example, with mintable token creation\n@dev Issue: * https://github.com/OpenZeppelin/openzeppelin-solidity/issues/120\nBased on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol",
        "fullyImplemented": true,
        "id": 5135,
        "linearizedBaseContracts": [
          5135,
          4824,
          5382,
          4920,
          4997,
          5029
        ],
        "name": "MintableToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "anonymous": false,
            "documentation": null,
            "id": 5043,
            "name": "Mint",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5042,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5039,
                  "indexed": true,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5043,
                  "src": "454:18:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5038,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "454:7:44",
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
                  "id": 5041,
                  "indexed": false,
                  "name": "amount",
                  "nodeType": "VariableDeclaration",
                  "scope": 5043,
                  "src": "474:14:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5040,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "474:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "453:36:44"
            },
            "src": "443:47:44"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5045,
            "name": "MintFinished",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5044,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "511:2:44"
            },
            "src": "493:21:44"
          },
          {
            "constant": false,
            "id": 5048,
            "name": "mintingFinished",
            "nodeType": "VariableDeclaration",
            "scope": 5135,
            "src": "518:35:44",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bool",
              "typeString": "bool"
            },
            "typeName": {
              "id": 5046,
              "name": "bool",
              "nodeType": "ElementaryTypeName",
              "src": "518:4:44",
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "66616c7365",
              "id": 5047,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "bool",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "548:5:44",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              },
              "value": "false"
            },
            "visibility": "public"
          },
          {
            "body": {
              "id": 5056,
              "nodeType": "Block",
              "src": "578:43:44",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5052,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "592:16:44",
                        "subExpression": {
                          "argumentTypes": null,
                          "id": 5051,
                          "name": "mintingFinished",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5048,
                          "src": "593:15:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
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
                      "id": 5050,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5400,
                      "src": "584:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5053,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "584:25:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5054,
                  "nodeType": "ExpressionStatement",
                  "src": "584:25:44"
                },
                {
                  "id": 5055,
                  "nodeType": "PlaceholderStatement",
                  "src": "615:1:44"
                }
              ]
            },
            "documentation": null,
            "id": 5057,
            "name": "canMint",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 5049,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "575:2:44"
            },
            "src": "559:62:44",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 5067,
              "nodeType": "Block",
              "src": "654:46:44",
              "statements": [
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
                        "id": 5063,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5060,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5397,
                            "src": "668:3:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 5061,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "668:10:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 5062,
                          "name": "owner",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4742,
                          "src": "682:5:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "668:19:44",
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
                      "id": 5059,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5400,
                      "src": "660:7:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5064,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "660:28:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5065,
                  "nodeType": "ExpressionStatement",
                  "src": "660:28:44"
                },
                {
                  "id": 5066,
                  "nodeType": "PlaceholderStatement",
                  "src": "694:1:44"
                }
              ]
            },
            "documentation": null,
            "id": 5068,
            "name": "hasMintPermission",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 5058,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "651:2:44"
            },
            "src": "625:75:44",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 5114,
              "nodeType": "Block",
              "src": "1058:190:44",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5086,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5081,
                      "name": "totalSupply_",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4839,
                      "src": "1064:12:44",
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
                          "id": 5084,
                          "name": "_amount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5072,
                          "src": "1096:7:44",
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
                          "id": 5082,
                          "name": "totalSupply_",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4839,
                          "src": "1079:12:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 5083,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4737,
                        "src": "1079:16:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 5085,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1079:25:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1064:40:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 5087,
                  "nodeType": "ExpressionStatement",
                  "src": "1064:40:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5097,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 5088,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4837,
                        "src": "1110:8:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 5090,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 5089,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5070,
                        "src": "1119:3:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "1110:13:44",
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
                          "id": 5095,
                          "name": "_amount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5072,
                          "src": "1144:7:44",
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
                            "id": 5091,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4837,
                            "src": "1126:8:44",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 5093,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 5092,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5070,
                            "src": "1135:3:44",
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
                          "src": "1126:13:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 5094,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 4737,
                        "src": "1126:17:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 5096,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1126:26:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "1110:42:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 5098,
                  "nodeType": "ExpressionStatement",
                  "src": "1110:42:44"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5100,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5070,
                        "src": "1168:3:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5101,
                        "name": "_amount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5072,
                        "src": "1173:7:44",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 5099,
                      "name": "Mint",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5043,
                      "src": "1163:4:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256)"
                      }
                    },
                    "id": 5102,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1163:18:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5103,
                  "nodeType": "EmitStatement",
                  "src": "1158:23:44"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 5106,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "1209:1:44",
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
                          "id": 5105,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "1201:7:44",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 5107,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "1201:10:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5108,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5070,
                        "src": "1213:3:44",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5109,
                        "name": "_amount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5072,
                        "src": "1218:7:44",
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
                      "id": 5104,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5028,
                      "src": "1192:8:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 5110,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1192:34:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5111,
                  "nodeType": "EmitStatement",
                  "src": "1187:39:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 5112,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "1239:4:44",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 5080,
                  "id": 5113,
                  "nodeType": "Return",
                  "src": "1232:11:44"
                }
              ]
            },
            "documentation": "@dev Function to mint tokens\n@param _to The address that will receive the minted tokens.\n@param _amount The amount of tokens to mint.\n@return A boolean that indicates if the operation was successful.",
            "id": 5115,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 5075,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5074,
                  "name": "hasMintPermission",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5068,
                  "src": "996:17:44",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "996:17:44"
              },
              {
                "arguments": null,
                "id": 5077,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5076,
                  "name": "canMint",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5057,
                  "src": "1018:7:44",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1018:7:44"
              }
            ],
            "name": "mint",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5073,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5070,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5115,
                  "src": "955:11:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5069,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "955:7:44",
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
                  "id": 5072,
                  "name": "_amount",
                  "nodeType": "VariableDeclaration",
                  "scope": 5115,
                  "src": "972:15:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5071,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "972:7:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "949:42:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 5080,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5079,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5115,
                  "src": "1050:4:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5078,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1050:4:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1049:6:44"
            },
            "scope": 5135,
            "src": "936:312:44",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5133,
              "nodeType": "Block",
              "src": "1427:75:44",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5126,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5124,
                      "name": "mintingFinished",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5048,
                      "src": "1433:15:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 5125,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1451:4:44",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "1433:22:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 5127,
                  "nodeType": "ExpressionStatement",
                  "src": "1433:22:44"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [],
                    "expression": {
                      "argumentTypes": [],
                      "id": 5128,
                      "name": "MintFinished",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5045,
                      "src": "1466:12:44",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$__$returns$__$",
                        "typeString": "function ()"
                      }
                    },
                    "id": 5129,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1466:14:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5130,
                  "nodeType": "EmitStatement",
                  "src": "1461:19:44"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 5131,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "1493:4:44",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 5123,
                  "id": 5132,
                  "nodeType": "Return",
                  "src": "1486:11:44"
                }
              ]
            },
            "documentation": "@dev Function to stop minting new tokens.\n@return True if the operation was successful.",
            "id": 5134,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 5118,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5117,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "1387:9:44",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1387:9:44"
              },
              {
                "arguments": null,
                "id": 5120,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5119,
                  "name": "canMint",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5057,
                  "src": "1397:7:44",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1397:7:44"
              }
            ],
            "name": "finishMinting",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5116,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1384:2:44"
            },
            "payable": false,
            "returnParameters": {
              "id": 5123,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5122,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5134,
                  "src": "1421:4:44",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5121,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "1421:4:44",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1420:6:44"
            },
            "scope": 5135,
            "src": "1362:140:44",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 5136,
        "src": "390:1114:44"
      }
    ],
    "src": "0:1505:44"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.918Z"
}
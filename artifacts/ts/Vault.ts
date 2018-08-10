export const Vault = 
{
  "contractName": "Vault",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_authTarget",
          "type": "address"
        }
      ],
      "name": "addAuthorizedAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "authorities",
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
          "name": "_authTarget",
          "type": "address"
        }
      ],
      "name": "removeAuthorizedAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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
          "name": "_authTarget",
          "type": "address"
        },
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "removeAuthorizedAddressAtIndex",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "authorized",
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
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
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
      "name": "getAuthorizedAddresses",
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
          "name": "authAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "authorizedBy",
          "type": "address"
        }
      ],
      "name": "AddressAuthorized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "addressRemoved",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "authorizedBy",
          "type": "address"
        }
      ],
      "name": "AuthorizedAddressRemoved",
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
      "constant": false,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "withdrawTo",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "incrementTokenOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "decrementTokenOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "transferBalance",
      "outputs": [],
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
          "name": "_token",
          "type": "address"
        }
      ],
      "name": "getOwnerBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405260008054600160a060020a03191633179055610def806100256000396000f3006080604052600436106100da5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631f98ade381146100df57806342f1181e14610118578063494503d41461013b578063707129391461016f578063715018a61461019057806380ddda30146101a55780638da5cb5b146101cf5780639ad26744146101e4578063b19ad57714610208578063b918161114610238578063bada57261461026d578063c23f001f14610297578063c3b35a7e146102be578063d39de6e9146102e8578063f2fde38b1461034d575b600080fd5b3480156100eb57600080fd5b50610106600160a060020a036004358116906024351661036e565b60408051918252519081900360200190f35b34801561012457600080fd5b50610139600160a060020a036004351661039a565b005b34801561014757600080fd5b5061015360043561047d565b60408051600160a060020a039092168252519081900360200190f35b34801561017b57600080fd5b50610139600160a060020a03600435166104a5565b34801561019c57600080fd5b50610139610629565b3480156101b157600080fd5b50610139600160a060020a0360043581169060243516604435610695565b3480156101db57600080fd5b50610153610749565b3480156101f057600080fd5b50610139600160a060020a0360043516602435610758565b34801561021457600080fd5b50610139600160a060020a03600435811690602435811690604435166064356108b1565b34801561024457600080fd5b50610259600160a060020a03600435166109a2565b604080519115158252519081900360200190f35b34801561027957600080fd5b50610139600160a060020a03600435811690602435166044356109b7565b3480156102a357600080fd5b50610106600160a060020a0360043581169060243516610a0b565b3480156102ca57600080fd5b50610139600160a060020a0360043581169060243516604435610a28565b3480156102f457600080fd5b506102fd610c54565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610339578181015183820152602001610321565b505050509050019250505060405180910390f35b34801561035957600080fd5b50610139600160a060020a0360043516610cb7565b600160a060020a0380821660009081526003602090815260408083209386168352929052205492915050565b600054600160a060020a031633146103b157600080fd5b600160a060020a03811660009081526001602052604090205460ff16156103d757600080fd5b600160a060020a0381166000818152600160208181526040808420805460ff1916841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace909101805473ffffffffffffffffffffffffffffffffffffffff191684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b600280548290811061048b57fe5b600091825260209091200154600160a060020a0316905081565b60008054600160a060020a031633146104bd57600080fd5b600160a060020a03821660009081526001602052604090205460ff1615156104e457600080fd5b50600160a060020a0381166000908152600160205260408120805460ff191690555b6002548110156106255781600160a060020a031660028281548110151561052957fe5b600091825260209091200154600160a060020a0316141561061d576002805461055990600163ffffffff610cda16565b8154811061056357fe5b60009182526020909120015460028054600160a060020a03909216918390811061058957fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790556002546105cd906001610cda565b6105d8600282610d7c565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a2610625565b600101610506565b5050565b600054600160a060020a0316331461064057600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b3360009081526001602052604090205460ff1615156106b357600080fd5b600160a060020a038083166000908152600360209081526040808320938716835292905220548111156106e557600080fd5b600160a060020a0380831660009081526003602090815260408083209387168352929052205461071b908263ffffffff610cda16565b600160a060020a03928316600090815260036020908152604080832096909516825294909452919092205550565b600054600160a060020a031681565b600054600160a060020a0316331461076f57600080fd5b600254811061077d57600080fd5b81600160a060020a031660028281548110151561079657fe5b600091825260209091200154600160a060020a0316146107b557600080fd5b600160a060020a0382166000908152600160208190526040909120805460ff191690556002805490916107ee919063ffffffff610cda16565b815481106107f857fe5b60009182526020909120015460028054600160a060020a03909216918390811061081e57fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055600254610862906001610cda565b61086d600282610d7c565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b3360009081526001602052604090205460ff1615156108cf57600080fd5b600160a060020a0380831660009081526003602090815260408083209387168352929052205481111561090157600080fd5b600160a060020a03808316600090815260036020908152604080832093871683529290522054610937908263ffffffff610cda16565b600160a060020a038381166000908152600360209081526040808320888516845290915280822093909355908616815220546109739082610cec565b600160a060020a0392831660009081526003602090815260408083209790951682529590955291909320555050565b60016020526000908152604090205460ff1681565b3360009081526001602052604090205460ff1615156109d557600080fd5b600160a060020a0380831660009081526003602090815260408083209387168352929052205461071b908263ffffffff610cec16565b600360209081526000928352604080842090915290825290205481565b33600090815260016020526040812054819060ff161515610a4857600080fd5b604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a0387166004820152306024820152905173__ERC20Wrapper__________________________9163f7888aec916044808301926020929190829003018186803b158015610ac157600080fd5b505af4158015610ad5573d6000803e3d6000fd5b505050506040513d6020811015610aeb57600080fd5b5051604080517fbeabacc8000000000000000000000000000000000000000000000000000000008152600160a060020a0380891660048301528716602482015260448101869052905191935073__ERC20Wrapper__________________________9163beabacc891606480820192600092909190829003018186803b158015610b7357600080fd5b505af4158015610b87573d6000803e3d6000fd5b5050604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a0389166004820152306024820152905173__ERC20Wrapper__________________________935063f7888aec92506044808301926020929190829003018186803b158015610c0457600080fd5b505af4158015610c18573d6000803e3d6000fd5b505050506040513d6020811015610c2e57600080fd5b50519050610c42828463ffffffff610cda16565b8114610c4d57600080fd5b5050505050565b60606002805480602002602001604051908101604052809291908181526020018280548015610cac57602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610c8e575b505050505090505b90565b600054600160a060020a03163314610cce57600080fd5b610cd781610cff565b50565b600082821115610ce657fe5b50900390565b81810182811015610cf957fe5b92915050565b600160a060020a0381161515610d1457600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b815481835581811115610da057600083815260209020610da0918101908301610da5565b505050565b610cb491905b80821115610dbf5760008155600101610dab565b50905600a165627a7a72305820d3265adb63083ac8826b078a2eb7a8b61d6102405d3fe4651d5d46de692885890029",
  "deployedBytecode": "0x6080604052600436106100da5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631f98ade381146100df57806342f1181e14610118578063494503d41461013b578063707129391461016f578063715018a61461019057806380ddda30146101a55780638da5cb5b146101cf5780639ad26744146101e4578063b19ad57714610208578063b918161114610238578063bada57261461026d578063c23f001f14610297578063c3b35a7e146102be578063d39de6e9146102e8578063f2fde38b1461034d575b600080fd5b3480156100eb57600080fd5b50610106600160a060020a036004358116906024351661036e565b60408051918252519081900360200190f35b34801561012457600080fd5b50610139600160a060020a036004351661039a565b005b34801561014757600080fd5b5061015360043561047d565b60408051600160a060020a039092168252519081900360200190f35b34801561017b57600080fd5b50610139600160a060020a03600435166104a5565b34801561019c57600080fd5b50610139610629565b3480156101b157600080fd5b50610139600160a060020a0360043581169060243516604435610695565b3480156101db57600080fd5b50610153610749565b3480156101f057600080fd5b50610139600160a060020a0360043516602435610758565b34801561021457600080fd5b50610139600160a060020a03600435811690602435811690604435166064356108b1565b34801561024457600080fd5b50610259600160a060020a03600435166109a2565b604080519115158252519081900360200190f35b34801561027957600080fd5b50610139600160a060020a03600435811690602435166044356109b7565b3480156102a357600080fd5b50610106600160a060020a0360043581169060243516610a0b565b3480156102ca57600080fd5b50610139600160a060020a0360043581169060243516604435610a28565b3480156102f457600080fd5b506102fd610c54565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610339578181015183820152602001610321565b505050509050019250505060405180910390f35b34801561035957600080fd5b50610139600160a060020a0360043516610cb7565b600160a060020a0380821660009081526003602090815260408083209386168352929052205492915050565b600054600160a060020a031633146103b157600080fd5b600160a060020a03811660009081526001602052604090205460ff16156103d757600080fd5b600160a060020a0381166000818152600160208181526040808420805460ff1916841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace909101805473ffffffffffffffffffffffffffffffffffffffff191684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b600280548290811061048b57fe5b600091825260209091200154600160a060020a0316905081565b60008054600160a060020a031633146104bd57600080fd5b600160a060020a03821660009081526001602052604090205460ff1615156104e457600080fd5b50600160a060020a0381166000908152600160205260408120805460ff191690555b6002548110156106255781600160a060020a031660028281548110151561052957fe5b600091825260209091200154600160a060020a0316141561061d576002805461055990600163ffffffff610cda16565b8154811061056357fe5b60009182526020909120015460028054600160a060020a03909216918390811061058957fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790556002546105cd906001610cda565b6105d8600282610d7c565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a2610625565b600101610506565b5050565b600054600160a060020a0316331461064057600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b3360009081526001602052604090205460ff1615156106b357600080fd5b600160a060020a038083166000908152600360209081526040808320938716835292905220548111156106e557600080fd5b600160a060020a0380831660009081526003602090815260408083209387168352929052205461071b908263ffffffff610cda16565b600160a060020a03928316600090815260036020908152604080832096909516825294909452919092205550565b600054600160a060020a031681565b600054600160a060020a0316331461076f57600080fd5b600254811061077d57600080fd5b81600160a060020a031660028281548110151561079657fe5b600091825260209091200154600160a060020a0316146107b557600080fd5b600160a060020a0382166000908152600160208190526040909120805460ff191690556002805490916107ee919063ffffffff610cda16565b815481106107f857fe5b60009182526020909120015460028054600160a060020a03909216918390811061081e57fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055600254610862906001610cda565b61086d600282610d7c565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b3360009081526001602052604090205460ff1615156108cf57600080fd5b600160a060020a0380831660009081526003602090815260408083209387168352929052205481111561090157600080fd5b600160a060020a03808316600090815260036020908152604080832093871683529290522054610937908263ffffffff610cda16565b600160a060020a038381166000908152600360209081526040808320888516845290915280822093909355908616815220546109739082610cec565b600160a060020a0392831660009081526003602090815260408083209790951682529590955291909320555050565b60016020526000908152604090205460ff1681565b3360009081526001602052604090205460ff1615156109d557600080fd5b600160a060020a0380831660009081526003602090815260408083209387168352929052205461071b908263ffffffff610cec16565b600360209081526000928352604080842090915290825290205481565b33600090815260016020526040812054819060ff161515610a4857600080fd5b604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a0387166004820152306024820152905173__ERC20Wrapper__________________________9163f7888aec916044808301926020929190829003018186803b158015610ac157600080fd5b505af4158015610ad5573d6000803e3d6000fd5b505050506040513d6020811015610aeb57600080fd5b5051604080517fbeabacc8000000000000000000000000000000000000000000000000000000008152600160a060020a0380891660048301528716602482015260448101869052905191935073__ERC20Wrapper__________________________9163beabacc891606480820192600092909190829003018186803b158015610b7357600080fd5b505af4158015610b87573d6000803e3d6000fd5b5050604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a0389166004820152306024820152905173__ERC20Wrapper__________________________935063f7888aec92506044808301926020929190829003018186803b158015610c0457600080fd5b505af4158015610c18573d6000803e3d6000fd5b505050506040513d6020811015610c2e57600080fd5b50519050610c42828463ffffffff610cda16565b8114610c4d57600080fd5b5050505050565b60606002805480602002602001604051908101604052809291908181526020018280548015610cac57602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610c8e575b505050505090505b90565b600054600160a060020a03163314610cce57600080fd5b610cd781610cff565b50565b600082821115610ce657fe5b50900390565b81810182811015610cf957fe5b92915050565b600160a060020a0381161515610d1457600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b815481835581811115610da057600083815260209020610da0918101908301610da5565b505050565b610cb491905b80821115610dbf5760008155600101610dab565b50905600a165627a7a72305820d3265adb63083ac8826b078a2eb7a8b61d6102405d3fe4651d5d46de692885890029",
  "sourceMap": "996:5009:5:-;;;567:5:61;:18;;-1:-1:-1;;;;;;567:18:61;575:10;567:18;;;996:5009:5;;;;;;",
  "deployedSourceMap": "996:5009:5:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5777:226;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;5777:226:5;-1:-1:-1;;;;;5777:226:5;;;;;;;;;;;;;;;;;;;;;;;;;;2137:497:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2137:497:45;-1:-1:-1;;;;;2137:497:45;;;;;;;1316:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1316:28:45;;;;;;;;;-1:-1:-1;;;;;1316:28:45;;;;;;;;;;;;;;2801:990;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2801:990:45;-1:-1:-1;;;;;2801:990:45;;;;;1001:111:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1001:111:61;;;;4069:476:5;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4069:476:5;-1:-1:-1;;;;;4069:476:5;;;;;;;;;;;;238:20:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:61;;;;4058:852:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4058:852:45;-1:-1:-1;;;;;4058:852:45;;;;;;;4925:645:5;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4925:645:5;-1:-1:-1;;;;;4925:645:5;;;;;;;;;;;;;;;;;1229:43:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1229:43:45;-1:-1:-1;;;;;1229:43:45;;;;;;;;;;;;;;;;;;;;;;;3396:322:5;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3396:322:5;-1:-1:-1;;;;;3396:322:5;;;;;;;;;;;;1781:65;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1781:65:5;-1:-1:-1;;;;;1781:65:5;;;;;;;;;;2238:809;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2238:809:5;-1:-1:-1;;;;;2238:809:5;;;;;;;;;;;;5083:186:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5083:186:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;5083:186:45;;;;;;;;;;;;;;;;;1274:103:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1274:103:61;-1:-1:-1;;;;;1274:103:61;;;;;5777:226:5;-1:-1:-1;;;;;5972:16:5;;;5903:7;5972:16;;;:8;:16;;;;;;;;:24;;;;;;;;;;5777:226;;;;:::o;2137:497:45:-;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2304:23:45;;;;;;:10;:23;;;;;;;;2303:24;2295:33;;;;;;-1:-1:-1;;;;;2380:23:45;;;;;;2406:4;2380:23;;;;;;;;:30;;-1:-1:-1;;2380:30:45;;;;;2465:11;27:10:-1;;23:18;;;45:23;;2465:29:45;;;;;;;;;-1:-1:-1;;2465:29:45;;;;;2551:76;;2607:10;2551:76;;;;;;;;;;;;;;2137:497;:::o;1316:28::-;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1316:28:45;;-1:-1:-1;1316:28:45;:::o;2801:990::-;3122:9;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2953:23:45;;;;;;:10;:23;;;;;;;;2945:32;;;;;;;;-1:-1:-1;;;;;;3083:23:45;;;;;;:10;:23;;;;;3076:30;;-1:-1:-1;;3076:30:45;;;3117:668;3141:11;:18;3137:22;;3117:668;;;3273:11;-1:-1:-1;;;;;3255:29:45;:11;3267:1;3255:14;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3255:14:45;:29;3251:524;;;3399:11;3411:18;;:25;;3434:1;3411:25;:22;:25;:::i;:::-;3399:38;;;;;;;;;;;;;;;;;;3382:11;:14;;-1:-1:-1;;;;;3399:38:45;;;;3394:1;;3382:14;;;;;;;;;;;;;;;:55;;-1:-1:-1;;3382:55:45;-1:-1:-1;;;;;3382:55:45;;;;;;;;;;3525:11;:18;:25;;-1:-1:-1;3525:22:45;:25::i;:::-;3504:46;:11;:46;;:::i;:::-;-1:-1:-1;3630:107:45;;;3709:10;3630:107;;;;-1:-1:-1;;;;;3630:107:45;;;;;;;;;;;;;3755:5;;3251:524;3161:3;;3117:668;;;2801:990;;:::o;1001:111:61:-;719:5;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;1077:5;;;1058:25;;-1:-1:-1;;;;;1077:5:61;;;;1058:25;;;1105:1;1089:18;;-1:-1:-1;;1089:18:61;;;1001:111::o;4069:476:5:-;1525:10:45;1514:22;;;;:10;:22;;;;;;;;1506:31;;;;;;;;-1:-1:-1;;;;;4333:16:5;;;;;;;:8;:16;;;;;;;;:24;;;;;;;;;;:37;-1:-1:-1;4333:37:5;4325:46;;;;;;-1:-1:-1;;;;;4499:16:5;;;;;;;:8;:16;;;;;;;;:24;;;;;;;;;;:39;;4528:9;4499:39;:28;:39;:::i;:::-;-1:-1:-1;;;;;4472:16:5;;;;;;;:8;:16;;;;;;;;:24;;;;;;;;;;;;;;:66;-1:-1:-1;4069:476:5:o;238:20:61:-;;;-1:-1:-1;;;;;238:20:61;;:::o;4058:852:45:-;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;4283:11:45;:18;4274:27;;4266:36;;;;;;4418:11;-1:-1:-1;;;;;4395:34:45;:11;4407:6;4395:19;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;4395:19:45;:34;4387:43;;;;;;-1:-1:-1;;;;;4498:23:45;;;;;;:10;:23;;;;;;;;4491:30;;-1:-1:-1;;4491:30:45;;;4619:11;4631:18;;4619:11;;4631:25;;:18;:25;:22;:25;:::i;:::-;4619:38;;;;;;;;;;;;;;;;;;4597:11;:19;;-1:-1:-1;;;;;4619:38:45;;;;4609:6;;4597:19;;;;;;;;;;;;;;;:60;;-1:-1:-1;;4597:60:45;-1:-1:-1;;;;;4597:60:45;;;;;;;;;;4731:11;:18;:25;;-1:-1:-1;4731:22:45;:25::i;:::-;4710:46;:11;:46;;:::i;:::-;-1:-1:-1;4820:83:45;;;4883:10;4820:83;;;;-1:-1:-1;;;;;4820:83:45;;;;;;;;;;;;;4058:852;;:::o;4925:645:5:-;1525:10:45;1514:22;;;;:10;:22;;;;;;;;1506:31;;;;;;;;-1:-1:-1;;;;;5205:16:5;;;;;;;:8;:16;;;;;;;;:23;;;;;;;;;;:36;-1:-1:-1;5205:36:5;5197:45;;;;;;-1:-1:-1;;;;;5369:16:5;;;;;;;:8;:16;;;;;;;;:23;;;;;;;;;;:38;;5397:9;5369:38;:27;:38;:::i;:::-;-1:-1:-1;;;;;5343:16:5;;;;;;;:8;:16;;;;;;;;:23;;;;;;;;;;;:64;;;;5527:21;;;;;;;:36;;5553:9;5527:25;:36::i;:::-;-1:-1:-1;;;;;5503:16:5;;;;;;;:8;:16;;;;;;;;:21;;;;;;;;;;;;;;:60;-1:-1:-1;;4925:645:5:o;1229:43:45:-;;;;;;;;;;;;;;;:::o;3396:322:5:-;1525:10:45;1514:22;;;;:10;:22;;;;;;;;1506:31;;;;;;;;-1:-1:-1;;;;;3672:16:5;;;;;;;:8;:16;;;;;;;;:24;;;;;;;;;;:39;;3701:9;3672:39;:28;:39;:::i;1781:65::-;;;;;;;;;;;;;;;;;;;;;;;;:::o;2238:809::-;1525:10:45;2449:28:5;1514:22:45;;;:10;:22;;;;;;2449:28:5;;1514:22:45;;1506:31;;;;;;;;2480:70:5;;;;;;-1:-1:-1;;;;;2480:70:5;;;;;;2536:4;2480:70;;;;;;:12;;:22;;:70;;;;;;;;;;;;;;:12;:70;;;5:2:-1;;;;30:1;27;20:12;5:2;2480:70:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2480:70:5;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2480:70:5;2646:91;;;;;;-1:-1:-1;;;;;2646:91:5;;;;;;;;;;;;;;;;;;;;;2480:70;;-1:-1:-1;2646:12:5;;:21;;:91;;;;;-1:-1:-1;;2646:91:5;;;;;;;;:12;:91;;;5:2:-1;;;;30:1;27;20:12;5:2;2646:91:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;2834:70:5;;;;;;-1:-1:-1;;;;;2834:70:5;;;;;;2890:4;2834:70;;;;;;:12;;-1:-1:-1;2834:22:5;;-1:-1:-1;2834:70:5;;;;;;;;;;;;;;:12;:70;;;5:2:-1;;;;30:1;27;20:12;5:2;2834:70:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2834:70:5;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2834:70:5;;-1:-1:-1;3004:35:5;:20;3029:9;3004:35;:24;:35;:::i;:::-;2985:54;;2977:63;;;;;;2238:809;;;;;:::o;5083:186:45:-;5164:9;5251:11;5244:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;5244:18:45;;;;;;;;;;;;;;;;;;;;;;;5083:186;;:::o;1274:103:61:-;719:5;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;1343:29;1362:9;1343:18;:29::i;:::-;1274:103;:::o;1042:110:60:-;1100:7;1122:6;;;;1115:14;;;;-1:-1:-1;1142:5:60;;;1042:110::o;1214:123::-;1293:5;;;1311:6;;;;1304:14;;;;1214:123;;;;:::o;1512:171:61:-;-1:-1:-1;;;;;1582:23:61;;;;1574:32;;;;;;1638:5;;;1617:38;;-1:-1:-1;;;;;1617:38:61;;;;1638:5;;;1617:38;;;1661:5;:17;;-1:-1:-1;;1661:17:61;-1:-1:-1;;;;;1661:17:61;;;;;;;;;;1512:171::o;996:5009:5:-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { Authorizable } from \"../lib/Authorizable.sol\";\nimport { ERC20Wrapper } from \"../lib/ERC20Wrapper.sol\";\n\n\n/**\n * @title Vault\n * @author Set Protocol\n *\n * The vault contract is responsible for holding all funds and keeping track of the\n * fund state and which Sets own which funds.\n *\n */\n\ncontract Vault is\n    Authorizable\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ State Variables ============ */\n\n    // Mapping of token address to map of owner or Set address to balance.\n    // Example of mapping below:\n    // +--------------+---------------------+--------+\n    // | TokenAddress | Set OR User Address | Amount |\n    // +--------------+---------------------+--------+\n    // | TokenA       | User 0x123          |    500 |\n    // |              | User 0xABC          |    300 |\n    // |              | Set  0x456          |   1000 |\n    // | TokenB       | User 0xDEF          |    100 |\n    // |              | Set  0xSET          |    700 |\n    // +--------------+---------------------+--------+\n    mapping (address => mapping (address => uint256)) public balances;\n\n    /* ============ External Functions ============ */\n\n    /*\n     * Withdraws user's unassociated tokens to user account. Can only be\n     * called by authorized core contracts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _to             The address to transfer token to\n     * @param  _quantity       The number of tokens to transfer\n     */\n    function withdrawTo(\n        address _token,\n        address _to,\n        uint256 _quantity\n    )\n        external\n        onlyAuthorized\n    {\n        // Retrieve current balance of token for the vault\n        uint256 existingVaultBalance = ERC20Wrapper.balanceOf(\n            _token,\n            this\n        );\n\n        // Call specified ERC20 token contract to transfer tokens from Vault to user\n        ERC20Wrapper.transfer(\n            _token,\n            _to,\n            _quantity\n        );\n\n        // Verify transfer quantity is reflected in balance\n        uint256 newVaultBalance = ERC20Wrapper.balanceOf(\n            _token,\n            this\n        );\n        // Check to make sure current balances are as expected\n        require(newVaultBalance == existingVaultBalance.sub(_quantity));\n    }\n\n    /*\n     * Increment quantity owned of a token for a given address. Can\n     * only be called by authorized core contracts.\n     *\n     * @param  _owner           The address of the token owner\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to attribute to owner\n     */\n    function incrementTokenOwner(\n        address _owner,\n        address _token,\n        uint256 _quantity\n    )\n        external\n        onlyAuthorized\n    {\n        // Increment balances state variable adding _quantity to user's token amount\n        balances[_token][_owner] = balances[_token][_owner].add(_quantity);\n    }\n\n    /*\n     * Decrement quantity owned of a token for a given address. Can only\n     * be called by authorized core contracts.\n     *\n     * @param  _owner           The address of the token owner\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deattribute to owner\n     */\n    function decrementTokenOwner(\n        address _owner,\n        address _token,\n        uint256 _quantity\n    )\n        external\n        onlyAuthorized\n    {\n        // Require that user has enough unassociated tokens to withdraw tokens or issue Set\n        require(balances[_token][_owner] >= _quantity);\n\n        // Decrement balances state variable subtracting _quantity to user's token amount\n        balances[_token][_owner] = balances[_token][_owner].sub(_quantity);\n    }\n\n    /**\n     * Transfers tokens associated with one account to another account in the vault\n     *\n     * @param  _to             Address token being transferred to\n     * @param  _from           Address token being transferred from\n     * @param  _token          Address of token being transferred\n     * @param  _quantity       Amount of tokens being transferred\n     */\n\n    function transferBalance(\n        address _to,\n        address _from,\n        address _token,\n        uint256 _quantity\n    )\n        external\n        onlyAuthorized\n    {\n        // Require that user has enough unassociated tokens to withdraw tokens or issue Set\n        require(balances[_token][_from] >= _quantity);\n\n        // Decrement balances state variable subtracting _quantity to user's token amount\n        balances[_token][_from] = balances[_token][_from].sub(_quantity);\n\n        // Increment balances state variable adding _quantity to user's token amount\n        balances[_token][_to] = balances[_token][_to].add(_quantity);\n    }\n\n    /*\n     * Get balance of particular contract for owner.\n     *\n     * @param  _owner           The address of the token owner\n     * @param  _token           The address of the ERC20 token\n     */\n    function getOwnerBalance(\n        address _owner,\n        address _token\n    )\n        external\n        view\n        returns (uint256)\n    {\n        // Return owners token balance\n        return balances[_token][_owner];\n    }\n}\n",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/Vault.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/Vault.sol",
    "exportedSymbols": {
      "Vault": [
        867
      ]
    },
    "id": 868,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 670,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:5"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 672,
        "nodeType": "ImportDirective",
        "scope": 868,
        "sourceUnit": 6746,
        "src": "623:73:5",
        "symbolAliases": [
          {
            "foreign": 671,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/lib/Authorizable.sol",
        "file": "../lib/Authorizable.sol",
        "id": 674,
        "nodeType": "ImportDirective",
        "scope": 868,
        "sourceUnit": 5064,
        "src": "697:55:5",
        "symbolAliases": [
          {
            "foreign": 673,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../lib/ERC20Wrapper.sol",
        "id": 676,
        "nodeType": "ImportDirective",
        "scope": 868,
        "sourceUnit": 5243,
        "src": "753:55:5",
        "symbolAliases": [
          {
            "foreign": 675,
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
              "id": 677,
              "name": "Authorizable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5063,
              "src": "1018:12:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Authorizable_$5063",
                "typeString": "contract Authorizable"
              }
            },
            "id": 678,
            "nodeType": "InheritanceSpecifier",
            "src": "1018:12:5"
          }
        ],
        "contractDependencies": [
          5063,
          6831
        ],
        "contractKind": "contract",
        "documentation": "@title Vault\n@author Set Protocol\n * The vault contract is responsible for holding all funds and keeping track of the\nfund state and which Sets own which funds.\n ",
        "fullyImplemented": true,
        "id": 867,
        "linearizedBaseContracts": [
          867,
          5063,
          6831
        ],
        "name": "Vault",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 681,
            "libraryName": {
              "contractScope": null,
              "id": 679,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6745,
              "src": "1098:8:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6745",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1092:27:5",
            "typeName": {
              "id": 680,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1111:7:5",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 687,
            "name": "balances",
            "nodeType": "VariableDeclaration",
            "scope": 867,
            "src": "1781:65:5",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
              "typeString": "mapping(address => mapping(address => uint256))"
            },
            "typeName": {
              "id": 686,
              "keyType": {
                "id": 682,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1790:7:5",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "1781:49:5",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                "typeString": "mapping(address => mapping(address => uint256))"
              },
              "valueType": {
                "id": 685,
                "keyType": {
                  "id": 683,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1810:7:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "nodeType": "Mapping",
                "src": "1801:28:5",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                  "typeString": "mapping(address => uint256)"
                },
                "valueType": {
                  "id": 684,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1821:7:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                }
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 731,
              "nodeType": "Block",
              "src": "2380:667:5",
              "statements": [
                {
                  "assignments": [
                    699
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 699,
                      "name": "existingVaultBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 732,
                      "src": "2449:28:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 698,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2449:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 705,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 702,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 689,
                        "src": "2516:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 703,
                        "name": "this",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7379,
                        "src": "2536:4:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Vault_$867",
                          "typeString": "contract Vault"
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
                          "typeIdentifier": "t_contract$_Vault_$867",
                          "typeString": "contract Vault"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 700,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "2480:12:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 701,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5101,
                      "src": "2480:22:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 704,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2480:70:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2449:101:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 709,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 689,
                        "src": "2681:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 710,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 691,
                        "src": "2701:3:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 711,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 693,
                        "src": "2718:9:5",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 706,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "2646:12:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 708,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5144,
                      "src": "2646:21:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 712,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2646:91:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 713,
                  "nodeType": "ExpressionStatement",
                  "src": "2646:91:5"
                },
                {
                  "assignments": [
                    715
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 715,
                      "name": "newVaultBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 732,
                      "src": "2808:23:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 714,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2808:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 721,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 718,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 689,
                        "src": "2870:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 719,
                        "name": "this",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7379,
                        "src": "2890:4:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Vault_$867",
                          "typeString": "contract Vault"
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
                          "typeIdentifier": "t_contract$_Vault_$867",
                          "typeString": "contract Vault"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 716,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "2834:12:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 717,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5101,
                      "src": "2834:22:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 720,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2834:70:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2808:96:5"
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
                        "id": 728,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 723,
                          "name": "newVaultBalance",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 715,
                          "src": "2985:15:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 726,
                              "name": "_quantity",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 693,
                              "src": "3029:9:5",
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
                              "id": 724,
                              "name": "existingVaultBalance",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 699,
                              "src": "3004:20:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 725,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sub",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6720,
                            "src": "3004:24:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 727,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3004:35:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2985:54:5",
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
                      "id": 722,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "2977:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 729,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2977:63:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 730,
                  "nodeType": "ExpressionStatement",
                  "src": "2977:63:5"
                }
              ]
            },
            "documentation": null,
            "id": 732,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 696,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 695,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4882,
                  "src": "2361:14:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2361:14:5"
              }
            ],
            "name": "withdrawTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 694,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 689,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 732,
                  "src": "2267:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 688,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2267:7:5",
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
                  "id": 691,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 732,
                  "src": "2291:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 690,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2291:7:5",
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
                  "id": 693,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 732,
                  "src": "2312:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 692,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2312:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2257:78:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 697,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2380:0:5"
            },
            "scope": 867,
            "src": "2238:809:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 758,
              "nodeType": "Block",
              "src": "3550:168:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 756,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 743,
                          "name": "balances",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 687,
                          "src": "3645:8:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                            "typeString": "mapping(address => mapping(address => uint256))"
                          }
                        },
                        "id": 746,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 744,
                          "name": "_token",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 736,
                          "src": "3654:6:5",
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
                        "src": "3645:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 747,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 745,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 734,
                        "src": "3662:6:5",
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
                      "src": "3645:24:5",
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
                          "id": 754,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 738,
                          "src": "3701:9:5",
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
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 748,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "3672:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 750,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 749,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 736,
                              "src": "3681:6:5",
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
                            "src": "3672:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 752,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 751,
                            "name": "_owner",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 734,
                            "src": "3689:6:5",
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
                          "src": "3672:24:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 753,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6744,
                        "src": "3672:28:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 755,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "3672:39:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3645:66:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 757,
                  "nodeType": "ExpressionStatement",
                  "src": "3645:66:5"
                }
              ]
            },
            "documentation": null,
            "id": 759,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 741,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 740,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4882,
                  "src": "3531:14:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3531:14:5"
              }
            ],
            "name": "incrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 739,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 734,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 759,
                  "src": "3434:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 733,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3434:7:5",
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
                  "id": 736,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 759,
                  "src": "3458:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 735,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3458:7:5",
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
                  "id": 738,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 759,
                  "src": "3482:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 737,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3482:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3424:81:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 742,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3550:0:5"
            },
            "scope": 867,
            "src": "3396:322:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 795,
              "nodeType": "Block",
              "src": "4223:322:5",
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
                        "id": 777,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 771,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "4333:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 773,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 772,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 763,
                              "src": "4342:6:5",
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
                            "src": "4333:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 775,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 774,
                            "name": "_owner",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 761,
                            "src": "4350:6:5",
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
                          "src": "4333:24:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 776,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 765,
                          "src": "4361:9:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4333:37:5",
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
                      "id": 770,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "4325:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 778,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4325:46:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 779,
                  "nodeType": "ExpressionStatement",
                  "src": "4325:46:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 793,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 780,
                          "name": "balances",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 687,
                          "src": "4472:8:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                            "typeString": "mapping(address => mapping(address => uint256))"
                          }
                        },
                        "id": 783,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 781,
                          "name": "_token",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 763,
                          "src": "4481:6:5",
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
                        "src": "4472:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 784,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 782,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 761,
                        "src": "4489:6:5",
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
                      "src": "4472:24:5",
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
                          "id": 791,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 765,
                          "src": "4528:9:5",
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
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 785,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "4499:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 787,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 786,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 763,
                              "src": "4508:6:5",
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
                            "src": "4499:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 789,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 788,
                            "name": "_owner",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 761,
                            "src": "4516:6:5",
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
                          "src": "4499:24:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 790,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6720,
                        "src": "4499:28:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 792,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "4499:39:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4472:66:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 794,
                  "nodeType": "ExpressionStatement",
                  "src": "4472:66:5"
                }
              ]
            },
            "documentation": null,
            "id": 796,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 768,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 767,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4882,
                  "src": "4204:14:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4204:14:5"
              }
            ],
            "name": "decrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 766,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 761,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 796,
                  "src": "4107:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 760,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4107:7:5",
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
                  "id": 763,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 796,
                  "src": "4131:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 762,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4131:7:5",
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
                  "id": 765,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 796,
                  "src": "4155:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 764,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4155:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4097:81:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 769,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4223:0:5"
            },
            "scope": 867,
            "src": "4069:476:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 849,
              "nodeType": "Block",
              "src": "5095:475:5",
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
                        "id": 816,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 810,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "5205:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 812,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 811,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 802,
                              "src": "5214:6:5",
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
                            "src": "5205:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 814,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 813,
                            "name": "_from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 800,
                            "src": "5222:5:5",
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
                          "src": "5205:23:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 815,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 804,
                          "src": "5232:9:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "5205:36:5",
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
                      "id": 809,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "5197:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 817,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5197:45:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 818,
                  "nodeType": "ExpressionStatement",
                  "src": "5197:45:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 832,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 819,
                          "name": "balances",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 687,
                          "src": "5343:8:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                            "typeString": "mapping(address => mapping(address => uint256))"
                          }
                        },
                        "id": 822,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 820,
                          "name": "_token",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 802,
                          "src": "5352:6:5",
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
                        "src": "5343:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 823,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 821,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 800,
                        "src": "5360:5:5",
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
                      "src": "5343:23:5",
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
                          "id": 830,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 804,
                          "src": "5397:9:5",
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
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 824,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "5369:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 826,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 825,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 802,
                              "src": "5378:6:5",
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
                            "src": "5369:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 828,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 827,
                            "name": "_from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 800,
                            "src": "5386:5:5",
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
                          "src": "5369:23:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 829,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6720,
                        "src": "5369:27:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 831,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5369:38:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "5343:64:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 833,
                  "nodeType": "ExpressionStatement",
                  "src": "5343:64:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 847,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 834,
                          "name": "balances",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 687,
                          "src": "5503:8:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                            "typeString": "mapping(address => mapping(address => uint256))"
                          }
                        },
                        "id": 837,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 835,
                          "name": "_token",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 802,
                          "src": "5512:6:5",
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
                        "src": "5503:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 838,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 836,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 798,
                        "src": "5520:3:5",
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
                      "src": "5503:21:5",
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
                          "id": 845,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 804,
                          "src": "5553:9:5",
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
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 839,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "5527:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 841,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 840,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 802,
                              "src": "5536:6:5",
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
                            "src": "5527:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 843,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 842,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 798,
                            "src": "5544:3:5",
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
                          "src": "5527:21:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 844,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6744,
                        "src": "5527:25:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 846,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5527:36:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "5503:60:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 848,
                  "nodeType": "ExpressionStatement",
                  "src": "5503:60:5"
                }
              ]
            },
            "documentation": "Transfers tokens associated with one account to another account in the vault\n     * @param  _to             Address token being transferred to\n@param  _from           Address token being transferred from\n@param  _token          Address of token being transferred\n@param  _quantity       Amount of tokens being transferred",
            "id": 850,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 807,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 806,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4882,
                  "src": "5076:14:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "5076:14:5"
              }
            ],
            "name": "transferBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 805,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 798,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 850,
                  "src": "4959:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 797,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4959:7:5",
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
                  "id": 800,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 850,
                  "src": "4980:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 799,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4980:7:5",
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
                  "id": 802,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 850,
                  "src": "5003:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 801,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5003:7:5",
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
                  "id": 804,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 850,
                  "src": "5027:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 803,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5027:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4949:101:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 808,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5095:0:5"
            },
            "scope": 867,
            "src": "4925:645:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 865,
              "nodeType": "Block",
              "src": "5916:87:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 859,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 687,
                        "src": "5972:8:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                          "typeString": "mapping(address => mapping(address => uint256))"
                        }
                      },
                      "id": 861,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 860,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 854,
                        "src": "5981:6:5",
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
                      "src": "5972:16:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                        "typeString": "mapping(address => uint256)"
                      }
                    },
                    "id": 863,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 862,
                      "name": "_owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 852,
                      "src": "5989:6:5",
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
                    "src": "5972:24:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 858,
                  "id": 864,
                  "nodeType": "Return",
                  "src": "5965:31:5"
                }
              ]
            },
            "documentation": null,
            "id": 866,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getOwnerBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 855,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 852,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 866,
                  "src": "5811:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 851,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5811:7:5",
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
                  "id": 854,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 866,
                  "src": "5835:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 853,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5835:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5801:54:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 858,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 857,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 866,
                  "src": "5903:7:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 856,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5903:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5902:9:5"
            },
            "scope": 867,
            "src": "5777:226:5",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 868,
        "src": "996:5009:5"
      }
    ],
    "src": "597:5409:5"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/Vault.sol",
    "exportedSymbols": {
      "Vault": [
        867
      ]
    },
    "id": 868,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 670,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:5"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 672,
        "nodeType": "ImportDirective",
        "scope": 868,
        "sourceUnit": 6746,
        "src": "623:73:5",
        "symbolAliases": [
          {
            "foreign": 671,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/lib/Authorizable.sol",
        "file": "../lib/Authorizable.sol",
        "id": 674,
        "nodeType": "ImportDirective",
        "scope": 868,
        "sourceUnit": 5064,
        "src": "697:55:5",
        "symbolAliases": [
          {
            "foreign": 673,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../lib/ERC20Wrapper.sol",
        "id": 676,
        "nodeType": "ImportDirective",
        "scope": 868,
        "sourceUnit": 5243,
        "src": "753:55:5",
        "symbolAliases": [
          {
            "foreign": 675,
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
              "id": 677,
              "name": "Authorizable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5063,
              "src": "1018:12:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Authorizable_$5063",
                "typeString": "contract Authorizable"
              }
            },
            "id": 678,
            "nodeType": "InheritanceSpecifier",
            "src": "1018:12:5"
          }
        ],
        "contractDependencies": [
          5063,
          6831
        ],
        "contractKind": "contract",
        "documentation": "@title Vault\n@author Set Protocol\n * The vault contract is responsible for holding all funds and keeping track of the\nfund state and which Sets own which funds.\n ",
        "fullyImplemented": true,
        "id": 867,
        "linearizedBaseContracts": [
          867,
          5063,
          6831
        ],
        "name": "Vault",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 681,
            "libraryName": {
              "contractScope": null,
              "id": 679,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6745,
              "src": "1098:8:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6745",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1092:27:5",
            "typeName": {
              "id": 680,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1111:7:5",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 687,
            "name": "balances",
            "nodeType": "VariableDeclaration",
            "scope": 867,
            "src": "1781:65:5",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
              "typeString": "mapping(address => mapping(address => uint256))"
            },
            "typeName": {
              "id": 686,
              "keyType": {
                "id": 682,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1790:7:5",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "1781:49:5",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                "typeString": "mapping(address => mapping(address => uint256))"
              },
              "valueType": {
                "id": 685,
                "keyType": {
                  "id": 683,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "1810:7:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  }
                },
                "nodeType": "Mapping",
                "src": "1801:28:5",
                "typeDescriptions": {
                  "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                  "typeString": "mapping(address => uint256)"
                },
                "valueType": {
                  "id": 684,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "1821:7:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                }
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 731,
              "nodeType": "Block",
              "src": "2380:667:5",
              "statements": [
                {
                  "assignments": [
                    699
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 699,
                      "name": "existingVaultBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 732,
                      "src": "2449:28:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 698,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2449:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 705,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 702,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 689,
                        "src": "2516:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 703,
                        "name": "this",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7379,
                        "src": "2536:4:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Vault_$867",
                          "typeString": "contract Vault"
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
                          "typeIdentifier": "t_contract$_Vault_$867",
                          "typeString": "contract Vault"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 700,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "2480:12:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 701,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5101,
                      "src": "2480:22:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 704,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2480:70:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2449:101:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 709,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 689,
                        "src": "2681:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 710,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 691,
                        "src": "2701:3:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 711,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 693,
                        "src": "2718:9:5",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 706,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "2646:12:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 708,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5144,
                      "src": "2646:21:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 712,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2646:91:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 713,
                  "nodeType": "ExpressionStatement",
                  "src": "2646:91:5"
                },
                {
                  "assignments": [
                    715
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 715,
                      "name": "newVaultBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 732,
                      "src": "2808:23:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 714,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2808:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 721,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 718,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 689,
                        "src": "2870:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 719,
                        "name": "this",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 7379,
                        "src": "2890:4:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Vault_$867",
                          "typeString": "contract Vault"
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
                          "typeIdentifier": "t_contract$_Vault_$867",
                          "typeString": "contract Vault"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 716,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "2834:12:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 717,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5101,
                      "src": "2834:22:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 720,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2834:70:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2808:96:5"
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
                        "id": 728,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 723,
                          "name": "newVaultBalance",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 715,
                          "src": "2985:15:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 726,
                              "name": "_quantity",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 693,
                              "src": "3029:9:5",
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
                              "id": 724,
                              "name": "existingVaultBalance",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 699,
                              "src": "3004:20:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 725,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sub",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6720,
                            "src": "3004:24:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 727,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3004:35:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2985:54:5",
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
                      "id": 722,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "2977:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 729,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2977:63:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 730,
                  "nodeType": "ExpressionStatement",
                  "src": "2977:63:5"
                }
              ]
            },
            "documentation": null,
            "id": 732,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 696,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 695,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4882,
                  "src": "2361:14:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2361:14:5"
              }
            ],
            "name": "withdrawTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 694,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 689,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 732,
                  "src": "2267:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 688,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2267:7:5",
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
                  "id": 691,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 732,
                  "src": "2291:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 690,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2291:7:5",
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
                  "id": 693,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 732,
                  "src": "2312:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 692,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2312:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2257:78:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 697,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2380:0:5"
            },
            "scope": 867,
            "src": "2238:809:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 758,
              "nodeType": "Block",
              "src": "3550:168:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 756,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 743,
                          "name": "balances",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 687,
                          "src": "3645:8:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                            "typeString": "mapping(address => mapping(address => uint256))"
                          }
                        },
                        "id": 746,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 744,
                          "name": "_token",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 736,
                          "src": "3654:6:5",
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
                        "src": "3645:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 747,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 745,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 734,
                        "src": "3662:6:5",
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
                      "src": "3645:24:5",
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
                          "id": 754,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 738,
                          "src": "3701:9:5",
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
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 748,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "3672:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 750,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 749,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 736,
                              "src": "3681:6:5",
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
                            "src": "3672:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 752,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 751,
                            "name": "_owner",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 734,
                            "src": "3689:6:5",
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
                          "src": "3672:24:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 753,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6744,
                        "src": "3672:28:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 755,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "3672:39:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3645:66:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 757,
                  "nodeType": "ExpressionStatement",
                  "src": "3645:66:5"
                }
              ]
            },
            "documentation": null,
            "id": 759,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 741,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 740,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4882,
                  "src": "3531:14:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3531:14:5"
              }
            ],
            "name": "incrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 739,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 734,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 759,
                  "src": "3434:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 733,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3434:7:5",
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
                  "id": 736,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 759,
                  "src": "3458:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 735,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3458:7:5",
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
                  "id": 738,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 759,
                  "src": "3482:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 737,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "3482:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3424:81:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 742,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3550:0:5"
            },
            "scope": 867,
            "src": "3396:322:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 795,
              "nodeType": "Block",
              "src": "4223:322:5",
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
                        "id": 777,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 771,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "4333:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 773,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 772,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 763,
                              "src": "4342:6:5",
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
                            "src": "4333:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 775,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 774,
                            "name": "_owner",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 761,
                            "src": "4350:6:5",
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
                          "src": "4333:24:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 776,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 765,
                          "src": "4361:9:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4333:37:5",
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
                      "id": 770,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "4325:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 778,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4325:46:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 779,
                  "nodeType": "ExpressionStatement",
                  "src": "4325:46:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 793,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 780,
                          "name": "balances",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 687,
                          "src": "4472:8:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                            "typeString": "mapping(address => mapping(address => uint256))"
                          }
                        },
                        "id": 783,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 781,
                          "name": "_token",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 763,
                          "src": "4481:6:5",
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
                        "src": "4472:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 784,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 782,
                        "name": "_owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 761,
                        "src": "4489:6:5",
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
                      "src": "4472:24:5",
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
                          "id": 791,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 765,
                          "src": "4528:9:5",
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
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 785,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "4499:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 787,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 786,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 763,
                              "src": "4508:6:5",
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
                            "src": "4499:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 789,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 788,
                            "name": "_owner",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 761,
                            "src": "4516:6:5",
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
                          "src": "4499:24:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 790,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6720,
                        "src": "4499:28:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 792,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "4499:39:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "4472:66:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 794,
                  "nodeType": "ExpressionStatement",
                  "src": "4472:66:5"
                }
              ]
            },
            "documentation": null,
            "id": 796,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 768,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 767,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4882,
                  "src": "4204:14:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4204:14:5"
              }
            ],
            "name": "decrementTokenOwner",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 766,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 761,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 796,
                  "src": "4107:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 760,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4107:7:5",
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
                  "id": 763,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 796,
                  "src": "4131:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 762,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4131:7:5",
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
                  "id": 765,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 796,
                  "src": "4155:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 764,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4155:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4097:81:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 769,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4223:0:5"
            },
            "scope": 867,
            "src": "4069:476:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 849,
              "nodeType": "Block",
              "src": "5095:475:5",
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
                        "id": 816,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 810,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "5205:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 812,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 811,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 802,
                              "src": "5214:6:5",
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
                            "src": "5205:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 814,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 813,
                            "name": "_from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 800,
                            "src": "5222:5:5",
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
                          "src": "5205:23:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 815,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 804,
                          "src": "5232:9:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "5205:36:5",
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
                      "id": 809,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "5197:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 817,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5197:45:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 818,
                  "nodeType": "ExpressionStatement",
                  "src": "5197:45:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 832,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 819,
                          "name": "balances",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 687,
                          "src": "5343:8:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                            "typeString": "mapping(address => mapping(address => uint256))"
                          }
                        },
                        "id": 822,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 820,
                          "name": "_token",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 802,
                          "src": "5352:6:5",
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
                        "src": "5343:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 823,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 821,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 800,
                        "src": "5360:5:5",
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
                      "src": "5343:23:5",
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
                          "id": 830,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 804,
                          "src": "5397:9:5",
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
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 824,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "5369:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 826,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 825,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 802,
                              "src": "5378:6:5",
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
                            "src": "5369:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 828,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 827,
                            "name": "_from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 800,
                            "src": "5386:5:5",
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
                          "src": "5369:23:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 829,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6720,
                        "src": "5369:27:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 831,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5369:38:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "5343:64:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 833,
                  "nodeType": "ExpressionStatement",
                  "src": "5343:64:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 847,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 834,
                          "name": "balances",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 687,
                          "src": "5503:8:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                            "typeString": "mapping(address => mapping(address => uint256))"
                          }
                        },
                        "id": 837,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 835,
                          "name": "_token",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 802,
                          "src": "5512:6:5",
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
                        "src": "5503:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 838,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 836,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 798,
                        "src": "5520:3:5",
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
                      "src": "5503:21:5",
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
                          "id": 845,
                          "name": "_quantity",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 804,
                          "src": "5553:9:5",
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
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 839,
                              "name": "balances",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 687,
                              "src": "5527:8:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                                "typeString": "mapping(address => mapping(address => uint256))"
                              }
                            },
                            "id": 841,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 840,
                              "name": "_token",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 802,
                              "src": "5536:6:5",
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
                            "src": "5527:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 843,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 842,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 798,
                            "src": "5544:3:5",
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
                          "src": "5527:21:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 844,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6744,
                        "src": "5527:25:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 846,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5527:36:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "5503:60:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 848,
                  "nodeType": "ExpressionStatement",
                  "src": "5503:60:5"
                }
              ]
            },
            "documentation": "Transfers tokens associated with one account to another account in the vault\n     * @param  _to             Address token being transferred to\n@param  _from           Address token being transferred from\n@param  _token          Address of token being transferred\n@param  _quantity       Amount of tokens being transferred",
            "id": 850,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 807,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 806,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4882,
                  "src": "5076:14:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "5076:14:5"
              }
            ],
            "name": "transferBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 805,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 798,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 850,
                  "src": "4959:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 797,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4959:7:5",
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
                  "id": 800,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 850,
                  "src": "4980:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 799,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4980:7:5",
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
                  "id": 802,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 850,
                  "src": "5003:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 801,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5003:7:5",
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
                  "id": 804,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 850,
                  "src": "5027:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 803,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5027:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4949:101:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 808,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5095:0:5"
            },
            "scope": 867,
            "src": "4925:645:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 865,
              "nodeType": "Block",
              "src": "5916:87:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "baseExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 859,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 687,
                        "src": "5972:8:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_mapping$_t_address_$_t_uint256_$_$",
                          "typeString": "mapping(address => mapping(address => uint256))"
                        }
                      },
                      "id": 861,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 860,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 854,
                        "src": "5981:6:5",
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
                      "src": "5972:16:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                        "typeString": "mapping(address => uint256)"
                      }
                    },
                    "id": 863,
                    "indexExpression": {
                      "argumentTypes": null,
                      "id": 862,
                      "name": "_owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 852,
                      "src": "5989:6:5",
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
                    "src": "5972:24:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 858,
                  "id": 864,
                  "nodeType": "Return",
                  "src": "5965:31:5"
                }
              ]
            },
            "documentation": null,
            "id": 866,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getOwnerBalance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 855,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 852,
                  "name": "_owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 866,
                  "src": "5811:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 851,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5811:7:5",
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
                  "id": 854,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 866,
                  "src": "5835:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 853,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5835:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5801:54:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 858,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 857,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 866,
                  "src": "5903:7:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 856,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5903:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5902:9:5"
            },
            "scope": 867,
            "src": "5777:226:5",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 868,
        "src": "996:5009:5"
      }
    ],
    "src": "597:5409:5"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.336Z"
}
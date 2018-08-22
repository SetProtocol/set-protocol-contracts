export const StandardTokenMock = 
{
  "contractName": "StandardTokenMock",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
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
      "constant": true,
      "inputs": [],
      "name": "decimals",
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
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
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
      "inputs": [
        {
          "name": "initialAccount",
          "type": "address"
        },
        {
          "name": "initialBalance",
          "type": "uint256"
        },
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_symbol",
          "type": "string"
        },
        {
          "name": "_decimals",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
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
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506040516109bc3803806109bc83398101604090815281516020808401518385015160608601516080870151600160a060020a0386166000908152808652969096208390556006839055908601805194969295909491909201926100799160049186019061009b565b50815161008d90600590602085019061009b565b506003555061013692505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100dc57805160ff1916838001178555610109565b82800160010185558215610109579182015b828111156101095782518255916020019190600101906100ee565b50610115929150610119565b5090565b61013391905b80821115610115576000815560010161011f565b90565b610877806101456000396000f3006080604052600436106100ae5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100b3578063095ea7b31461013d57806318160ddd1461017557806323b872dd1461019c578063313ce567146101c657806366188463146101db57806370a08231146101ff57806395d89b4114610220578063a9059cbb14610235578063d73dd62314610259578063dd62ed3e1461027d575b600080fd5b3480156100bf57600080fd5b506100c86102a4565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101025781810151838201526020016100ea565b50505050905090810190601f16801561012f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014957600080fd5b50610161600160a060020a0360043516602435610332565b604080519115158252519081900360200190f35b34801561018157600080fd5b5061018a610398565b60408051918252519081900360200190f35b3480156101a857600080fd5b50610161600160a060020a036004358116906024351660443561039e565b3480156101d257600080fd5b5061018a610515565b3480156101e757600080fd5b50610161600160a060020a036004351660243561051b565b34801561020b57600080fd5b5061018a600160a060020a036004351661060b565b34801561022c57600080fd5b506100c8610626565b34801561024157600080fd5b50610161600160a060020a0360043516602435610681565b34801561026557600080fd5b50610161600160a060020a0360043516602435610762565b34801561028957600080fd5b5061018a600160a060020a03600435811690602435166107fb565b6004805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561032a5780601f106102ff5761010080835404028352916020019161032a565b820191906000526020600020905b81548152906001019060200180831161030d57829003601f168201915b505050505081565b336000818152600260209081526040808320600160a060020a038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60065481565b6000600160a060020a03831615156103b557600080fd5b600160a060020a0384166000908152602081905260409020548211156103da57600080fd5b600160a060020a038416600090815260026020908152604080832033845290915290205482111561040a57600080fd5b600160a060020a038416600090815260208190526040902054610433908363ffffffff61082616565b600160a060020a038086166000908152602081905260408082209390935590851681522054610468908363ffffffff61083816565b600160a060020a038085166000908152602081815260408083209490945591871681526002825282812033825290915220546104aa908363ffffffff61082616565b600160a060020a03808616600081815260026020908152604080832033845282529182902094909455805186815290519287169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35060019392505050565b60035481565b336000908152600260209081526040808320600160a060020a03861684529091528120548083111561057057336000908152600260209081526040808320600160a060020a03881684529091528120556105a5565b610580818463ffffffff61082616565b336000908152600260209081526040808320600160a060020a03891684529091529020555b336000818152600260209081526040808320600160a060020a0389168085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b600160a060020a031660009081526020819052604090205490565b6005805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561032a5780601f106102ff5761010080835404028352916020019161032a565b6000600160a060020a038316151561069857600080fd5b336000908152602081905260409020548211156106b457600080fd5b336000908152602081905260409020546106d4908363ffffffff61082616565b3360009081526020819052604080822092909255600160a060020a03851681522054610706908363ffffffff61083816565b600160a060020a038416600081815260208181526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b336000908152600260209081526040808320600160a060020a0386168452909152812054610796908363ffffffff61083816565b336000818152600260209081526040808320600160a060020a0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b600160a060020a03918216600090815260026020908152604080832093909416825291909152205490565b60008282111561083257fe5b50900390565b8181018281101561084557fe5b929150505600a165627a7a72305820d8b9603eb2f920cdc52abdb768cc96db3fead58146c567371e1d1db0b20d0d580029",
  "deployedBytecode": "0x6080604052600436106100ae5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100b3578063095ea7b31461013d57806318160ddd1461017557806323b872dd1461019c578063313ce567146101c657806366188463146101db57806370a08231146101ff57806395d89b4114610220578063a9059cbb14610235578063d73dd62314610259578063dd62ed3e1461027d575b600080fd5b3480156100bf57600080fd5b506100c86102a4565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101025781810151838201526020016100ea565b50505050905090810190601f16801561012f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014957600080fd5b50610161600160a060020a0360043516602435610332565b604080519115158252519081900360200190f35b34801561018157600080fd5b5061018a610398565b60408051918252519081900360200190f35b3480156101a857600080fd5b50610161600160a060020a036004358116906024351660443561039e565b3480156101d257600080fd5b5061018a610515565b3480156101e757600080fd5b50610161600160a060020a036004351660243561051b565b34801561020b57600080fd5b5061018a600160a060020a036004351661060b565b34801561022c57600080fd5b506100c8610626565b34801561024157600080fd5b50610161600160a060020a0360043516602435610681565b34801561026557600080fd5b50610161600160a060020a0360043516602435610762565b34801561028957600080fd5b5061018a600160a060020a03600435811690602435166107fb565b6004805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561032a5780601f106102ff5761010080835404028352916020019161032a565b820191906000526020600020905b81548152906001019060200180831161030d57829003601f168201915b505050505081565b336000818152600260209081526040808320600160a060020a038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60065481565b6000600160a060020a03831615156103b557600080fd5b600160a060020a0384166000908152602081905260409020548211156103da57600080fd5b600160a060020a038416600090815260026020908152604080832033845290915290205482111561040a57600080fd5b600160a060020a038416600090815260208190526040902054610433908363ffffffff61082616565b600160a060020a038086166000908152602081905260408082209390935590851681522054610468908363ffffffff61083816565b600160a060020a038085166000908152602081815260408083209490945591871681526002825282812033825290915220546104aa908363ffffffff61082616565b600160a060020a03808616600081815260026020908152604080832033845282529182902094909455805186815290519287169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35060019392505050565b60035481565b336000908152600260209081526040808320600160a060020a03861684529091528120548083111561057057336000908152600260209081526040808320600160a060020a03881684529091528120556105a5565b610580818463ffffffff61082616565b336000908152600260209081526040808320600160a060020a03891684529091529020555b336000818152600260209081526040808320600160a060020a0389168085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b600160a060020a031660009081526020819052604090205490565b6005805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561032a5780601f106102ff5761010080835404028352916020019161032a565b6000600160a060020a038316151561069857600080fd5b336000908152602081905260409020548211156106b457600080fd5b336000908152602081905260409020546106d4908363ffffffff61082616565b3360009081526020819052604080822092909255600160a060020a03851681522054610706908363ffffffff61083816565b600160a060020a038416600081815260208181526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b336000908152600260209081526040808320600160a060020a0386168452909152812054610796908363ffffffff61083816565b336000818152600260209081526040808320600160a060020a0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b600160a060020a03918216600090815260026020908152604080832093909416825291909152205490565b60008282111561083257fe5b50900390565b8181018281101561084557fe5b929150505600a165627a7a72305820d8b9603eb2f920cdc52abdb768cc96db3fead58146c567371e1d1db0b20d0d580029",
  "sourceMap": "127:450:63:-;;;279:295;8:9:-1;5:2;;;30:1;27;20:12;5:2;279:295:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;428:24:63;;:8;:24;;;;;;;;;;:41;;;475:11;:28;;;279:295;;;509:12;;279:295;;;;;;;;;;;509:12;;:4;;:12;;;;:::i;:::-;-1:-1:-1;527:16:63;;;;:6;;:16;;;;;:::i;:::-;-1:-1:-1;549:8:63;:20;-1:-1:-1;127:450:63;;-1:-1:-1;;;127:450:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;127:450:63;;;-1:-1:-1;127:450:63;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;",
  "deployedSourceMap": "127:450:63:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;202:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;202:18:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;202:18:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1814:188:73;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1814:188:73;-1:-1:-1;;;;;1814:188:73;;;;;;;;;;;;;;;;;;;;;;;;;248:26:63;;8:9:-1;5:2;;;30:1;27;20:12;5:2;248:26:63;;;;;;;;;;;;;;;;;;;;726:470:73;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;726:470:73;-1:-1:-1;;;;;726:470:73;;;;;;;;;;;;175:23:63;;8:9:-1;5:2;;;30:1;27;20:12;5:2;175:23:63;;;;3679:431:73;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3679:431:73;-1:-1:-1;;;;;3679:431:73;;;;;;;1131:99:69;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1131:99:69;-1:-1:-1;;;;;1131:99:69;;;;;224:20:63;;8:9:-1;5:2;;;30:1;27;20:12;5:2;224:20:63;;;;608:321:69;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;608:321:69;-1:-1:-1;;;;;608:321:69;;;;;;;2926:296:73;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2926:296:73;-1:-1:-1;;;;;2926:296:73;;;;;;;2321:153;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2321:153:73;-1:-1:-1;;;;;2321:153:73;;;;;;;;;;202:18:63;;;;;;;;;;;;;;;-1:-1:-1;;202:18:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;1814:188:73:-;1901:10;1881:4;1893:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;1893:29:73;;;;;;;;;;;:38;;;1942;;;;;;;1881:4;;1893:29;;1901:10;;1942:38;;;;;;;;-1:-1:-1;1993:4:73;1814:188;;;;:::o;248:26:63:-;;;;:::o;726:470:73:-;832:4;-1:-1:-1;;;;;854:17:73;;;;846:26;;;;;;-1:-1:-1;;;;;896:15:73;;:8;:15;;;;;;;;;;;886:25;;;878:34;;;;;;-1:-1:-1;;;;;936:14:73;;;;;;:7;:14;;;;;;;;951:10;936:26;;;;;;;;926:36;;;918:45;;;;;;-1:-1:-1;;;;;988:15:73;;:8;:15;;;;;;;;;;;:27;;1008:6;988:27;:19;:27;:::i;:::-;-1:-1:-1;;;;;970:15:73;;;:8;:15;;;;;;;;;;;:45;;;;1037:13;;;;;;;:25;;1055:6;1037:25;:17;:25;:::i;:::-;-1:-1:-1;;;;;1021:13:73;;;:8;:13;;;;;;;;;;;:41;;;;1097:14;;;;;:7;:14;;;;;1112:10;1097:26;;;;;;;:38;;1128:6;1097:38;:30;:38;:::i;:::-;-1:-1:-1;;;;;1068:14:73;;;;;;;:7;:14;;;;;;;;1083:10;1068:26;;;;;;;;:67;;;;1146:28;;;;;;;;;;;1068:14;;1146:28;;;;;;;;;;;-1:-1:-1;1187:4:73;726:470;;;;;:::o;175:23:63:-;;;;:::o;3679:431:73:-;3826:10;3785:4;3818:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;3818:29:73;;;;;;;;;;3857:27;;;3853:164;;;3902:10;3926:1;3894:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;3894:29:73;;;;;;;;;:33;3853:164;;;3980:30;:8;3993:16;3980:30;:12;:30;:::i;:::-;3956:10;3948:19;;;;:7;:19;;;;;;;;-1:-1:-1;;;;;3948:29:73;;;;;;;;;:62;3853:164;4036:10;4058:19;;;;:7;:19;;;;;;;;-1:-1:-1;;;;;4027:61:73;;4058:29;;;;;;;;;;;4027:61;;;;;;;;;4036:10;4027:61;;;;;;;;;;;-1:-1:-1;4101:4:73;;3679:431;-1:-1:-1;;;3679:431:73:o;1131:99:69:-;-1:-1:-1;;;;;1209:16:69;1187:7;1209:16;;;;;;;;;;;;1131:99::o;224:20:63:-;;;;;;;;;;;;;;;-1:-1:-1;;224:20:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;608:321:69;671:4;-1:-1:-1;;;;;691:17:69;;;;683:26;;;;;;742:10;733:8;:20;;;;;;;;;;;723:30;;;715:39;;;;;;793:10;784:8;:20;;;;;;;;;;;:32;;809:6;784:32;:24;:32;:::i;:::-;770:10;761:8;:20;;;;;;;;;;;:55;;;;-1:-1:-1;;;;;838:13:69;;;;;;:25;;856:6;838:25;:17;:25;:::i;:::-;-1:-1:-1;;;;;822:13:69;;:8;:13;;;;;;;;;;;;:41;;;;874:33;;;;;;;822:13;;883:10;;874:33;;;;;;;;;;-1:-1:-1;920:4:69;608:321;;;;:::o;2926:296:73:-;3089:10;3027:4;3081:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;3081:29:73;;;;;;;;;;:46;;3115:11;3081:46;:33;:46;:::i;:::-;3049:10;3041:19;;;;:7;:19;;;;;;;;-1:-1:-1;;;;;3041:29:73;;;;;;;;;;;;:87;;;3139:61;;;;;;3041:29;;3139:61;;;;;;;;;;;-1:-1:-1;3213:4:73;2926:296;;;;:::o;2321:153::-;-1:-1:-1;;;;;2444:15:73;;;2420:7;2444:15;;;:7;:15;;;;;;;;:25;;;;;;;;;;;;;2321:153::o;1042:110:67:-;1100:7;1122:6;;;;1115:14;;;;-1:-1:-1;1142:5:67;;;1042:110::o;1214:123::-;1293:5;;;1311:6;;;;1304:14;;;;1214:123;;;;:::o",
  "source": "pragma solidity 0.4.24;\n\n\nimport \"zeppelin-solidity/contracts/token/ERC20/StandardToken.sol\";\n\n\n// mock class using BasicToken\ncontract StandardTokenMock is StandardToken {\n  uint256 public decimals;\n  string public name;\n  string public symbol;\n  uint256 public totalSupply;\n\n  constructor(\n    address initialAccount,\n    uint256 initialBalance,\n    string _name,\n    string _symbol,\n    uint256 _decimals)\n    public\n  {\n    balances[initialAccount] = initialBalance;\n    totalSupply = initialBalance;\n    name = _name;\n    symbol = _symbol;\n    decimals = _decimals;\n  }\n\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/tokens/StandardTokenMock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/tokens/StandardTokenMock.sol",
    "exportedSymbols": {
      "StandardTokenMock": [
        8337
      ]
    },
    "id": 8338,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 8289,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:63"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "file": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "id": 8290,
        "nodeType": "ImportDirective",
        "scope": 8338,
        "sourceUnit": 9293,
        "src": "26:67:63",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 8291,
              "name": "StandardToken",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 9292,
              "src": "157:13:63",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_StandardToken_$9292",
                "typeString": "contract StandardToken"
              }
            },
            "id": 8292,
            "nodeType": "InheritanceSpecifier",
            "src": "157:13:63"
          }
        ],
        "contractDependencies": [
          8936,
          9013,
          9045,
          9292
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 8337,
        "linearizedBaseContracts": [
          8337,
          9292,
          8936,
          9013,
          9045
        ],
        "name": "StandardTokenMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 8294,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 8337,
            "src": "175:23:63",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 8293,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "175:7:63",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 8296,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 8337,
            "src": "202:18:63",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 8295,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "202:6:63",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 8298,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 8337,
            "src": "224:20:63",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 8297,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "224:6:63",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 8300,
            "name": "totalSupply",
            "nodeType": "VariableDeclaration",
            "scope": 8337,
            "src": "248:26:63",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 8299,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "248:7:63",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 8335,
              "nodeType": "Block",
              "src": "422:152:63",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8317,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 8313,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8853,
                        "src": "428:8:63",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 8315,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 8314,
                        "name": "initialAccount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8302,
                        "src": "437:14:63",
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
                      "src": "428:24:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8316,
                      "name": "initialBalance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8304,
                      "src": "455:14:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "428:41:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 8318,
                  "nodeType": "ExpressionStatement",
                  "src": "428:41:63"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8321,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8319,
                      "name": "totalSupply",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        8300
                      ],
                      "referencedDeclaration": 8300,
                      "src": "475:11:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8320,
                      "name": "initialBalance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8304,
                      "src": "489:14:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "475:28:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 8322,
                  "nodeType": "ExpressionStatement",
                  "src": "475:28:63"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8325,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8323,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8296,
                      "src": "509:4:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8324,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8306,
                      "src": "516:5:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "509:12:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 8326,
                  "nodeType": "ExpressionStatement",
                  "src": "509:12:63"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8329,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8327,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8298,
                      "src": "527:6:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8328,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8308,
                      "src": "536:7:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "527:16:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 8330,
                  "nodeType": "ExpressionStatement",
                  "src": "527:16:63"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8333,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8331,
                      "name": "decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8294,
                      "src": "549:8:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8332,
                      "name": "_decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8310,
                      "src": "560:9:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "549:20:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 8334,
                  "nodeType": "ExpressionStatement",
                  "src": "549:20:63"
                }
              ]
            },
            "documentation": null,
            "id": 8336,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8311,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8302,
                  "name": "initialAccount",
                  "nodeType": "VariableDeclaration",
                  "scope": 8336,
                  "src": "296:22:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8301,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "296:7:63",
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
                  "id": 8304,
                  "name": "initialBalance",
                  "nodeType": "VariableDeclaration",
                  "scope": 8336,
                  "src": "324:22:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 8303,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "324:7:63",
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
                  "id": 8306,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 8336,
                  "src": "352:12:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 8305,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "352:6:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 8308,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 8336,
                  "src": "370:14:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 8307,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "370:6:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 8310,
                  "name": "_decimals",
                  "nodeType": "VariableDeclaration",
                  "scope": 8336,
                  "src": "390:17:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 8309,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "390:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "290:118:63"
            },
            "payable": false,
            "returnParameters": {
              "id": 8312,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "422:0:63"
            },
            "scope": 8337,
            "src": "279:295:63",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 8338,
        "src": "127:450:63"
      }
    ],
    "src": "0:578:63"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/tokens/StandardTokenMock.sol",
    "exportedSymbols": {
      "StandardTokenMock": [
        8337
      ]
    },
    "id": 8338,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 8289,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:63"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "file": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "id": 8290,
        "nodeType": "ImportDirective",
        "scope": 8338,
        "sourceUnit": 9293,
        "src": "26:67:63",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 8291,
              "name": "StandardToken",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 9292,
              "src": "157:13:63",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_StandardToken_$9292",
                "typeString": "contract StandardToken"
              }
            },
            "id": 8292,
            "nodeType": "InheritanceSpecifier",
            "src": "157:13:63"
          }
        ],
        "contractDependencies": [
          8936,
          9013,
          9045,
          9292
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 8337,
        "linearizedBaseContracts": [
          8337,
          9292,
          8936,
          9013,
          9045
        ],
        "name": "StandardTokenMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 8294,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 8337,
            "src": "175:23:63",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 8293,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "175:7:63",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 8296,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 8337,
            "src": "202:18:63",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 8295,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "202:6:63",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 8298,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 8337,
            "src": "224:20:63",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 8297,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "224:6:63",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 8300,
            "name": "totalSupply",
            "nodeType": "VariableDeclaration",
            "scope": 8337,
            "src": "248:26:63",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 8299,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "248:7:63",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 8335,
              "nodeType": "Block",
              "src": "422:152:63",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8317,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 8313,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8853,
                        "src": "428:8:63",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 8315,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 8314,
                        "name": "initialAccount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8302,
                        "src": "437:14:63",
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
                      "src": "428:24:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8316,
                      "name": "initialBalance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8304,
                      "src": "455:14:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "428:41:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 8318,
                  "nodeType": "ExpressionStatement",
                  "src": "428:41:63"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8321,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8319,
                      "name": "totalSupply",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        8300
                      ],
                      "referencedDeclaration": 8300,
                      "src": "475:11:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8320,
                      "name": "initialBalance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8304,
                      "src": "489:14:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "475:28:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 8322,
                  "nodeType": "ExpressionStatement",
                  "src": "475:28:63"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8325,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8323,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8296,
                      "src": "509:4:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8324,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8306,
                      "src": "516:5:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "509:12:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 8326,
                  "nodeType": "ExpressionStatement",
                  "src": "509:12:63"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8329,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8327,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8298,
                      "src": "527:6:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8328,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8308,
                      "src": "536:7:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "527:16:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 8330,
                  "nodeType": "ExpressionStatement",
                  "src": "527:16:63"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 8333,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 8331,
                      "name": "decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8294,
                      "src": "549:8:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 8332,
                      "name": "_decimals",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 8310,
                      "src": "560:9:63",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "549:20:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 8334,
                  "nodeType": "ExpressionStatement",
                  "src": "549:20:63"
                }
              ]
            },
            "documentation": null,
            "id": 8336,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 8311,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 8302,
                  "name": "initialAccount",
                  "nodeType": "VariableDeclaration",
                  "scope": 8336,
                  "src": "296:22:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 8301,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "296:7:63",
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
                  "id": 8304,
                  "name": "initialBalance",
                  "nodeType": "VariableDeclaration",
                  "scope": 8336,
                  "src": "324:22:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 8303,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "324:7:63",
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
                  "id": 8306,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 8336,
                  "src": "352:12:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 8305,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "352:6:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 8308,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 8336,
                  "src": "370:14:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 8307,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "370:6:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 8310,
                  "name": "_decimals",
                  "nodeType": "VariableDeclaration",
                  "scope": 8336,
                  "src": "390:17:63",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 8309,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "390:7:63",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "290:118:63"
            },
            "payable": false,
            "returnParameters": {
              "id": 8312,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "422:0:63"
            },
            "scope": 8337,
            "src": "279:295:63",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 8338,
        "src": "127:450:63"
      }
    ],
    "src": "0:578:63"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T08:07:49.217Z"
}
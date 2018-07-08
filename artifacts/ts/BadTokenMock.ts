export const BadTokenMock = 
{
  "contractName": "BadTokenMock",
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
    }
  ],
  "bytecode": "0x6080604052601260035534801561001557600080fd5b506040516109503803806109508339810160409081528151602080840151838501516060860151600160a060020a03851660009081528085529590952082905560068290558501805193959194909391019161007691600491850190610094565b50805161008a906005906020840190610094565b505050505061012f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100d557805160ff1916838001178555610102565b82800160010185558215610102579182015b828111156101025782518255916020019190600101906100e7565b5061010e929150610112565b5090565b61012c91905b8082111561010e5760008155600101610118565b90565b6108128061013e6000396000f3006080604052600436106100ae5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100b3578063095ea7b31461013d57806318160ddd1461017557806323b872dd1461019c578063313ce567146101c657806366188463146101db57806370a08231146101ff57806395d89b4114610220578063a9059cbb14610235578063d73dd62314610259578063dd62ed3e1461027d575b600080fd5b3480156100bf57600080fd5b506100c86102a4565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101025781810151838201526020016100ea565b50505050905090810190601f16801561012f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014957600080fd5b50610161600160a060020a0360043516602435610332565b604080519115158252519081900360200190f35b34801561018157600080fd5b5061018a610398565b60408051918252519081900360200190f35b3480156101a857600080fd5b50610161600160a060020a036004358116906024351660443561039e565b3480156101d257600080fd5b5061018a610515565b3480156101e757600080fd5b50610161600160a060020a036004351660243561051b565b34801561020b57600080fd5b5061018a600160a060020a036004351661060b565b34801561022c57600080fd5b506100c8610626565b34801561024157600080fd5b50610161600160a060020a0360043516602435610681565b34801561026557600080fd5b50610161600160a060020a03600435166024356106fd565b34801561028957600080fd5b5061018a600160a060020a0360043581169060243516610796565b6004805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561032a5780601f106102ff5761010080835404028352916020019161032a565b820191906000526020600020905b81548152906001019060200180831161030d57829003601f168201915b505050505081565b336000818152600260209081526040808320600160a060020a038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60065481565b6000600160a060020a03831615156103b557600080fd5b600160a060020a0384166000908152602081905260409020548211156103da57600080fd5b600160a060020a038416600090815260026020908152604080832033845290915290205482111561040a57600080fd5b600160a060020a038416600090815260208190526040902054610433908363ffffffff6107c116565b600160a060020a038086166000908152602081905260408082209390935590851681522054610468908363ffffffff6107d316565b600160a060020a038085166000908152602081815260408083209490945591871681526002825282812033825290915220546104aa908363ffffffff6107c116565b600160a060020a03808616600081815260026020908152604080832033845282529182902094909455805186815290519287169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35060019392505050565b60035481565b336000908152600260209081526040808320600160a060020a03861684529091528120548083111561057057336000908152600260209081526040808320600160a060020a03881684529091528120556105a5565b610580818463ffffffff6107c116565b336000908152600260209081526040808320600160a060020a03891684529091529020555b336000818152600260209081526040808320600160a060020a0389168085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b600160a060020a031660009081526020819052604090205490565b6005805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561032a5780601f106102ff5761010080835404028352916020019161032a565b6000600160a060020a038316151561069857600080fd5b336000908152602081905260409020548211156106b457600080fd5b604080518381529051600160a060020a0385169133917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a350600192915050565b336000908152600260209081526040808320600160a060020a0386168452909152812054610731908363ffffffff6107d316565b336000818152600260209081526040808320600160a060020a0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b600160a060020a03918216600090815260026020908152604080832093909416825291909152205490565b6000828211156107cd57fe5b50900390565b818101828110156107e057fe5b929150505600a165627a7a72305820d8bf7ffe499c7999aecd7214111272c0eb51c2a200017893e94df470897c87660029",
  "deployedBytecode": "0x6080604052600436106100ae5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100b3578063095ea7b31461013d57806318160ddd1461017557806323b872dd1461019c578063313ce567146101c657806366188463146101db57806370a08231146101ff57806395d89b4114610220578063a9059cbb14610235578063d73dd62314610259578063dd62ed3e1461027d575b600080fd5b3480156100bf57600080fd5b506100c86102a4565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101025781810151838201526020016100ea565b50505050905090810190601f16801561012f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014957600080fd5b50610161600160a060020a0360043516602435610332565b604080519115158252519081900360200190f35b34801561018157600080fd5b5061018a610398565b60408051918252519081900360200190f35b3480156101a857600080fd5b50610161600160a060020a036004358116906024351660443561039e565b3480156101d257600080fd5b5061018a610515565b3480156101e757600080fd5b50610161600160a060020a036004351660243561051b565b34801561020b57600080fd5b5061018a600160a060020a036004351661060b565b34801561022c57600080fd5b506100c8610626565b34801561024157600080fd5b50610161600160a060020a0360043516602435610681565b34801561026557600080fd5b50610161600160a060020a03600435166024356106fd565b34801561028957600080fd5b5061018a600160a060020a0360043581169060243516610796565b6004805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561032a5780601f106102ff5761010080835404028352916020019161032a565b820191906000526020600020905b81548152906001019060200180831161030d57829003601f168201915b505050505081565b336000818152600260209081526040808320600160a060020a038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60065481565b6000600160a060020a03831615156103b557600080fd5b600160a060020a0384166000908152602081905260409020548211156103da57600080fd5b600160a060020a038416600090815260026020908152604080832033845290915290205482111561040a57600080fd5b600160a060020a038416600090815260208190526040902054610433908363ffffffff6107c116565b600160a060020a038086166000908152602081905260408082209390935590851681522054610468908363ffffffff6107d316565b600160a060020a038085166000908152602081815260408083209490945591871681526002825282812033825290915220546104aa908363ffffffff6107c116565b600160a060020a03808616600081815260026020908152604080832033845282529182902094909455805186815290519287169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35060019392505050565b60035481565b336000908152600260209081526040808320600160a060020a03861684529091528120548083111561057057336000908152600260209081526040808320600160a060020a03881684529091528120556105a5565b610580818463ffffffff6107c116565b336000908152600260209081526040808320600160a060020a03891684529091529020555b336000818152600260209081526040808320600160a060020a0389168085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b600160a060020a031660009081526020819052604090205490565b6005805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561032a5780601f106102ff5761010080835404028352916020019161032a565b6000600160a060020a038316151561069857600080fd5b336000908152602081905260409020548211156106b457600080fd5b604080518381529051600160a060020a0385169133917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a350600192915050565b336000908152600260209081526040808320600160a060020a0386168452909152812054610731908363ffffffff6107d316565b336000818152600260209081526040808320600160a060020a0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b600160a060020a03918216600090815260026020908152604080832093909416825291909152205490565b6000828211156107cd57fe5b50900390565b818101828110156107e057fe5b929150505600a165627a7a72305820d8bf7ffe499c7999aecd7214111272c0eb51c2a200017893e94df470897c87660029",
  "sourceMap": "127:825:51:-;;;196:2;170:28;;279:246;8:9:-1;5:2;;;30:1;27;20:12;5:2;279:246:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;405:24:51;;:8;:24;;;;;;;;;;:41;;;452:11;:28;;;279:246;;486:12;;279:246;;;;;;;;;486:12;;:4;;:12;;;;:::i;:::-;-1:-1:-1;504:16:51;;;;:6;;:16;;;;;:::i;:::-;;279:246;;;;127:825;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;127:825:51;;;-1:-1:-1;127:825:51;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;",
  "deployedSourceMap": "127:825:51:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;202:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;202:18:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;202:18:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1829:188:64;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1829:188:64;-1:-1:-1;;;;;1829:188:64;;;;;;;;;;;;;;;;;;;;;;;;;248:26:51;;8:9:-1;5:2;;;30:1;27;20:12;5:2;248:26:51;;;;;;;;;;;;;;;;;;;;736:470:64;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;736:470:64;-1:-1:-1;;;;;736:470:64;;;;;;;;;;;;170:28:51;;8:9:-1;5:2;;;30:1;27;20:12;5:2;170:28:51;;;;3701:425:64;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3701:425:64;-1:-1:-1;;;;;3701:425:64;;;;;;;1131:99:60;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1131:99:60;-1:-1:-1;;;;;1131:99:60;;;;;224:20:51;;8:9:-1;5:2;;;30:1;27;20:12;5:2;224:20:51;;;;679:271;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;679:271:51;-1:-1:-1;;;;;679:271:51;;;;;;;2946:293:64;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2946:293:64;-1:-1:-1;;;;;2946:293:64;;;;;;;2336:153;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2336:153:64;-1:-1:-1;;;;;2336:153:64;;;;;;;;;;202:18:51;;;;;;;;;;;;;;;-1:-1:-1;;202:18:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;1829:188:64:-;1916:10;1896:4;1908:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;1908:29:64;;;;;;;;;;;:38;;;1957;;;;;;;1896:4;;1908:29;;1916:10;;1957:38;;;;;;;;-1:-1:-1;2008:4:64;1829:188;;;;:::o;248:26:51:-;;;;:::o;736:470:64:-;842:4;-1:-1:-1;;;;;864:17:64;;;;856:26;;;;;;-1:-1:-1;;;;;906:15:64;;:8;:15;;;;;;;;;;;896:25;;;888:34;;;;;;-1:-1:-1;;;;;946:14:64;;;;;;:7;:14;;;;;;;;961:10;946:26;;;;;;;;936:36;;;928:45;;;;;;-1:-1:-1;;;;;998:15:64;;:8;:15;;;;;;;;;;;:27;;1018:6;998:27;:19;:27;:::i;:::-;-1:-1:-1;;;;;980:15:64;;;:8;:15;;;;;;;;;;;:45;;;;1047:13;;;;;;;:25;;1065:6;1047:25;:17;:25;:::i;:::-;-1:-1:-1;;;;;1031:13:64;;;:8;:13;;;;;;;;;;;:41;;;;1107:14;;;;;:7;:14;;;;;1122:10;1107:26;;;;;;;:38;;1138:6;1107:38;:30;:38;:::i;:::-;-1:-1:-1;;;;;1078:14:64;;;;;;;:7;:14;;;;;;;;1093:10;1078:26;;;;;;;;:67;;;;1156:28;;;;;;;;;;;1078:14;;1156:28;;;;;;;;;;;-1:-1:-1;1197:4:64;736:470;;;;;:::o;170:28:51:-;;;;:::o;3701:425:64:-;3842:10;3804:4;3834:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;3834:29:64;;;;;;;;;;3873:27;;;3869:164;;;3918:10;3942:1;3910:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;3910:29:64;;;;;;;;;:33;3869:164;;;3996:30;:8;4009:16;3996:30;:12;:30;:::i;:::-;3972:10;3964:19;;;;:7;:19;;;;;;;;-1:-1:-1;;;;;3964:29:64;;;;;;;;;:62;3869:164;4052:10;4074:19;;;;:7;:19;;;;;;;;-1:-1:-1;;;;;4043:61:64;;4074:29;;;;;;;;;;;4043:61;;;;;;;;;4052:10;4043:61;;;;;;;;;;;-1:-1:-1;4117:4:64;;3701:425;-1:-1:-1;;;3701:425:64:o;1131:99:60:-;-1:-1:-1;;;;;1209:16:60;1187:7;1209:16;;;;;;;;;;;;1131:99::o;224:20:51:-;;;;;;;;;;;;;;;-1:-1:-1;;224:20:51;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;679:271;742:4;-1:-1:-1;;;;;762:17:51;;;;754:26;;;;;;813:10;804:8;:20;;;;;;;;;;;794:30;;;786:39;;;;;;895:33;;;;;;;;-1:-1:-1;;;;;895:33:51;;;904:10;;895:33;;;;;;;;;-1:-1:-1;941:4:51;679:271;;;;:::o;2946:293:64:-;3106:10;3044:4;3098:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;3098:29:64;;;;;;;;;;:46;;3132:11;3098:46;:33;:46;:::i;:::-;3066:10;3058:19;;;;:7;:19;;;;;;;;-1:-1:-1;;;;;3058:29:64;;;;;;;;;;;;:87;;;3156:61;;;;;;3058:29;;3156:61;;;;;;;;;;;-1:-1:-1;3230:4:64;2946:293;;;;:::o;2336:153::-;-1:-1:-1;;;;;2459:15:64;;;2435:7;2459:15;;;:7;:15;;;;;;;;:25;;;;;;;;;;;;;2336:153::o;1042:110:58:-;1100:7;1122:6;;;;1115:14;;;;-1:-1:-1;1142:5:58;;;1042:110::o;1214:123::-;1293:5;;;1311:6;;;;1304:14;;;;1214:123;;;;:::o",
  "source": "pragma solidity 0.4.24;\n\n\nimport \"zeppelin-solidity/contracts/token/ERC20/StandardToken.sol\";\n\n\n// mock class using BasicToken\ncontract BadTokenMock is StandardToken {\n  uint256 public decimals = 18;\n  string public name;\n  string public symbol;\n  uint256 public totalSupply;\n\n  constructor(\n    address initialAccount,\n    uint256 initialBalance,\n    string _name,\n    string _symbol)\n    public\n  {\n    balances[initialAccount] = initialBalance;\n    totalSupply = initialBalance;\n    name = _name;\n    symbol = _symbol;\n  }\n\n  /**\n  * @dev Transfer token for a specified address\n  * @param _to The address to transfer to.\n  * @param _value The amount to be transferred.\n  */\n  function transfer(address _to, uint256 _value) public returns (bool) {\n    require(_to != address(0));\n    require(_value <= balances[msg.sender]);\n\n    // BAD TOKEN which does not update balances properly\n\n    emit Transfer(msg.sender, _to, _value);\n    return true;\n  }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/tokens/BadTokenMock.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/tokens/BadTokenMock.sol",
    "exportedSymbols": {
      "BadTokenMock": [
        4705
      ]
    },
    "id": 4706,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4626,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:51"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "file": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "id": 4627,
        "nodeType": "ImportDirective",
        "scope": 4706,
        "sourceUnit": 6342,
        "src": "26:67:51",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4628,
              "name": "StandardToken",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6341,
              "src": "152:13:51",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_StandardToken_$6341",
                "typeString": "contract StandardToken"
              }
            },
            "id": 4629,
            "nodeType": "InheritanceSpecifier",
            "src": "152:13:51"
          }
        ],
        "contractDependencies": [
          5985,
          6062,
          6094,
          6341
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4705,
        "linearizedBaseContracts": [
          4705,
          6341,
          5985,
          6062,
          6094
        ],
        "name": "BadTokenMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 4632,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "170:28:51",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 4630,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "170:7:51",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "3138",
              "id": 4631,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "196:2:51",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_18_by_1",
                "typeString": "int_const 18"
              },
              "value": "18"
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 4634,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "202:18:51",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 4633,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "202:6:51",
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
            "id": 4636,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "224:20:51",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 4635,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "224:6:51",
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
            "id": 4638,
            "name": "totalSupply",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "248:26:51",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 4637,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "248:7:51",
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
              "id": 4667,
              "nodeType": "Block",
              "src": "399:126:51",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4653,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4649,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5902,
                        "src": "405:8:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 4651,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4650,
                        "name": "initialAccount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4640,
                        "src": "414:14:51",
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
                      "src": "405:24:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 4652,
                      "name": "initialBalance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4642,
                      "src": "432:14:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "405:41:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4654,
                  "nodeType": "ExpressionStatement",
                  "src": "405:41:51"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4657,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4655,
                      "name": "totalSupply",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        4638
                      ],
                      "referencedDeclaration": 4638,
                      "src": "452:11:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 4656,
                      "name": "initialBalance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4642,
                      "src": "466:14:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "452:28:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4658,
                  "nodeType": "ExpressionStatement",
                  "src": "452:28:51"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4661,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4659,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4634,
                      "src": "486:4:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 4660,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4644,
                      "src": "493:5:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "486:12:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 4662,
                  "nodeType": "ExpressionStatement",
                  "src": "486:12:51"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4665,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4663,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4636,
                      "src": "504:6:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 4664,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4646,
                      "src": "513:7:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "504:16:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 4666,
                  "nodeType": "ExpressionStatement",
                  "src": "504:16:51"
                }
              ]
            },
            "documentation": null,
            "id": 4668,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4647,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4640,
                  "name": "initialAccount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4668,
                  "src": "296:22:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4639,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "296:7:51",
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
                  "id": 4642,
                  "name": "initialBalance",
                  "nodeType": "VariableDeclaration",
                  "scope": 4668,
                  "src": "324:22:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4641,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "324:7:51",
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
                  "id": 4644,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 4668,
                  "src": "352:12:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 4643,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "352:6:51",
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
                  "id": 4646,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 4668,
                  "src": "370:14:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 4645,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "370:6:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "290:95:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 4648,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "399:0:51"
            },
            "scope": 4705,
            "src": "279:246:51",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 4703,
              "nodeType": "Block",
              "src": "748:202:51",
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
                        "id": 4682,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4678,
                          "name": "_to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4670,
                          "src": "762:3:51",
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
                              "id": 4680,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "777:1:51",
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
                            "id": 4679,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "769:7:51",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 4681,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "769:10:51",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "762:17:51",
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
                      "id": 4677,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6359,
                      "src": "754:7:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4683,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "754:26:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4684,
                  "nodeType": "ExpressionStatement",
                  "src": "754:26:51"
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
                        "id": 4691,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4686,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4672,
                          "src": "794:6:51",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4687,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5902,
                            "src": "804:8:51",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 4690,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 4688,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 6356,
                              "src": "813:3:51",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 4689,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "813:10:51",
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
                          "src": "804:20:51",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "794:30:51",
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
                      "id": 4685,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6359,
                      "src": "786:7:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4692,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "786:39:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4693,
                  "nodeType": "ExpressionStatement",
                  "src": "786:39:51"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4695,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "904:3:51",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4696,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "904:10:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4697,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4670,
                        "src": "916:3:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4698,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4672,
                        "src": "921:6:51",
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
                      "id": 4694,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6093,
                      "src": "895:8:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 4699,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "895:33:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4700,
                  "nodeType": "EmitStatement",
                  "src": "890:38:51"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 4701,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "941:4:51",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 4676,
                  "id": 4702,
                  "nodeType": "Return",
                  "src": "934:11:51"
                }
              ]
            },
            "documentation": "@dev Transfer token for a specified address\n@param _to The address to transfer to.\n@param _value The amount to be transferred.",
            "id": 4704,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4673,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4670,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4704,
                  "src": "697:11:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4669,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "697:7:51",
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
                  "id": 4672,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 4704,
                  "src": "710:14:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4671,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "710:7:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "696:29:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 4676,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4675,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4704,
                  "src": "742:4:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4674,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "742:4:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "741:6:51"
            },
            "scope": 4705,
            "src": "679:271:51",
            "stateMutability": "nonpayable",
            "superFunction": 5972,
            "visibility": "public"
          }
        ],
        "scope": 4706,
        "src": "127:825:51"
      }
    ],
    "src": "0:953:51"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/mocks/tokens/BadTokenMock.sol",
    "exportedSymbols": {
      "BadTokenMock": [
        4705
      ]
    },
    "id": 4706,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4626,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:51"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "file": "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol",
        "id": 4627,
        "nodeType": "ImportDirective",
        "scope": 4706,
        "sourceUnit": 6342,
        "src": "26:67:51",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 4628,
              "name": "StandardToken",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6341,
              "src": "152:13:51",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_StandardToken_$6341",
                "typeString": "contract StandardToken"
              }
            },
            "id": 4629,
            "nodeType": "InheritanceSpecifier",
            "src": "152:13:51"
          }
        ],
        "contractDependencies": [
          5985,
          6062,
          6094,
          6341
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4705,
        "linearizedBaseContracts": [
          4705,
          6341,
          5985,
          6062,
          6094
        ],
        "name": "BadTokenMock",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 4632,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "170:28:51",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 4630,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "170:7:51",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "3138",
              "id": 4631,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "196:2:51",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_18_by_1",
                "typeString": "int_const 18"
              },
              "value": "18"
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 4634,
            "name": "name",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "202:18:51",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 4633,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "202:6:51",
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
            "id": 4636,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "224:20:51",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 4635,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "224:6:51",
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
            "id": 4638,
            "name": "totalSupply",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "248:26:51",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 4637,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "248:7:51",
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
              "id": 4667,
              "nodeType": "Block",
              "src": "399:126:51",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4653,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4649,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5902,
                        "src": "405:8:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 4651,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4650,
                        "name": "initialAccount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4640,
                        "src": "414:14:51",
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
                      "src": "405:24:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 4652,
                      "name": "initialBalance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4642,
                      "src": "432:14:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "405:41:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4654,
                  "nodeType": "ExpressionStatement",
                  "src": "405:41:51"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4657,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4655,
                      "name": "totalSupply",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        4638
                      ],
                      "referencedDeclaration": 4638,
                      "src": "452:11:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 4656,
                      "name": "initialBalance",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4642,
                      "src": "466:14:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "452:28:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4658,
                  "nodeType": "ExpressionStatement",
                  "src": "452:28:51"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4661,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4659,
                      "name": "name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4634,
                      "src": "486:4:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 4660,
                      "name": "_name",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4644,
                      "src": "493:5:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "486:12:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 4662,
                  "nodeType": "ExpressionStatement",
                  "src": "486:12:51"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4665,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 4663,
                      "name": "symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4636,
                      "src": "504:6:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 4664,
                      "name": "_symbol",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4646,
                      "src": "513:7:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_memory_ptr",
                        "typeString": "string memory"
                      }
                    },
                    "src": "504:16:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 4666,
                  "nodeType": "ExpressionStatement",
                  "src": "504:16:51"
                }
              ]
            },
            "documentation": null,
            "id": 4668,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4647,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4640,
                  "name": "initialAccount",
                  "nodeType": "VariableDeclaration",
                  "scope": 4668,
                  "src": "296:22:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4639,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "296:7:51",
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
                  "id": 4642,
                  "name": "initialBalance",
                  "nodeType": "VariableDeclaration",
                  "scope": 4668,
                  "src": "324:22:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4641,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "324:7:51",
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
                  "id": 4644,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 4668,
                  "src": "352:12:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 4643,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "352:6:51",
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
                  "id": 4646,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 4668,
                  "src": "370:14:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 4645,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "370:6:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "290:95:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 4648,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "399:0:51"
            },
            "scope": 4705,
            "src": "279:246:51",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 4703,
              "nodeType": "Block",
              "src": "748:202:51",
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
                        "id": 4682,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4678,
                          "name": "_to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4670,
                          "src": "762:3:51",
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
                              "id": 4680,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "777:1:51",
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
                            "id": 4679,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "769:7:51",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 4681,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "769:10:51",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "762:17:51",
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
                      "id": 4677,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6359,
                      "src": "754:7:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4683,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "754:26:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4684,
                  "nodeType": "ExpressionStatement",
                  "src": "754:26:51"
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
                        "id": 4691,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4686,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4672,
                          "src": "794:6:51",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4687,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5902,
                            "src": "804:8:51",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 4690,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 4688,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 6356,
                              "src": "813:3:51",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 4689,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "813:10:51",
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
                          "src": "804:20:51",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "794:30:51",
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
                      "id": 4685,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6359,
                      "src": "786:7:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 4692,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "786:39:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4693,
                  "nodeType": "ExpressionStatement",
                  "src": "786:39:51"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4695,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "904:3:51",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4696,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "904:10:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4697,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4670,
                        "src": "916:3:51",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4698,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4672,
                        "src": "921:6:51",
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
                      "id": 4694,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 6093,
                      "src": "895:8:51",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 4699,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "895:33:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4700,
                  "nodeType": "EmitStatement",
                  "src": "890:38:51"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "hexValue": "74727565",
                    "id": 4701,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "bool",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "941:4:51",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 4676,
                  "id": 4702,
                  "nodeType": "Return",
                  "src": "934:11:51"
                }
              ]
            },
            "documentation": "@dev Transfer token for a specified address\n@param _to The address to transfer to.\n@param _value The amount to be transferred.",
            "id": 4704,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4673,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4670,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 4704,
                  "src": "697:11:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4669,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "697:7:51",
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
                  "id": 4672,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 4704,
                  "src": "710:14:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4671,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "710:7:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "696:29:51"
            },
            "payable": false,
            "returnParameters": {
              "id": 4676,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4675,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4704,
                  "src": "742:4:51",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 4674,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "742:4:51",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "741:6:51"
            },
            "scope": 4705,
            "src": "679:271:51",
            "stateMutability": "nonpayable",
            "superFunction": 5972,
            "visibility": "public"
          }
        ],
        "scope": 4706,
        "src": "127:825:51"
      }
    ],
    "src": "0:953:51"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.204Z"
}